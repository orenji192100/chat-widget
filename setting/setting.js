/* ============================================================
   Chat Widget Settings UI — fields.js
   - fields.json  : read from ChatWidget folder via Directory Access API
   - data.json    : read/written from same folder
   - Dir handle   : persisted in IndexedDB (pick once, forever)
   ============================================================ */

(function () {
  'use strict';

  // ── IndexedDB ───────────────────────────────────────────────
  const IDB_NAME  = 'chat-widget-settings';
  const IDB_STORE = 'handles';
  const IDB_KEY   = 'chatWidgetDir';

  // ── State ───────────────────────────────────────────────────
  let fieldsConfig   = null;
  let settingsData   = null;
  let defaultsData   = null;
  let dirHandle      = null;
  let previewScale   = 1;
  let openColorPopover = null;
  let iframeEl       = null;
  let testEvents     = {};

  // ── IndexedDB helpers ────────────────────────────────────────
  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
  }
  async function idbGet(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx  = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
  }
  async function idbSet(key, value) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx  = db.transaction(IDB_STORE, 'readwrite');
      const req = tx.objectStore(IDB_STORE).put(value, key);
      req.onsuccess = () => resolve();
      req.onerror   = () => reject(req.error);
    });
  }

  // ── Directory helpers ────────────────────────────────────────
  async function readJsonFromDir(dir, filename) {
    const fileHandle = await dir.getFileHandle(filename);
    const file = await fileHandle.getFile();
    const text = await file.text();
    return JSON.parse(text);
  }
  async function writeJsonToDir(dir, filename, data) {
    const fileHandle = await dir.getFileHandle(filename, { create: false });
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
  }

  // ── Init ─────────────────────────────────────────────────────
  async function init() {
    // 1. Test events — inlined (fetch fails on file://)
    testEvents = {"twitch_user":{"event":"message","payload":{"username":"Regular User","message":"Regular User Send a Message!","role":"user"}},"twitch_subscriber":{"event":"message","payload":{"username":"Subscriber","message":"Subscriber Send a Message!","role":"subscriber"}},"twitch_vip":{"event":"message","payload":{"username":"VIP User","message":"VIP User Send A Message CoolStoryBunny","role":"vip"}},"twitch_moderator":{"event":"message","payload":{"username":"Moderator","message":"Moderator User Send a Message","role":"moderator"}},"twitch_broadcaster":{"event":"message","payload":{"username":"Streamer","message":"The streamer send a message!","role":"broadcaster"}},"twitch_reply":{"event":"message","payload":{"username":"Streamer","message":"@almosthirteen From a dreamy little realm painted in starlight and pastel skies, I floated into this world with a heart full of magic and wonder. My past is a gentle mystery, but my smile is real. Let's explore this cozy adventure together, one sparkle at a time!","replyBody":"Here's an example of a long message.","role":"broadcaster"}},"twitch_emoteonly":{"event":"message","payload":{"username":"EmoteOnly","message":"CupBunny CupBunny CupBunny","emoteOnly":true,"role":"user"}},"twitch_follow":{"event":"alert","payload":{"username":"NewFollower","content":"New Follower!","message":""}},"twitch_sub":{"event":"alert","payload":{"username":"NewSubber","content":"just subscribed!","message":"Love the stream!"}},"twitch_resub":{"event":"alert","payload":{"username":"LoyalSub","content":"just resubscribed for 6 months!","message":"Still here!"}},"twitch_giftsub":{"event":"alert","payload":{"username":"GiftGiver","content":"gifted a sub to LuckyViewer!","message":""}},"twitch_giftbomb":{"event":"alert","payload":{"username":"GenerousUser","content":"just gifted 10 subs!","message":""}},"twitch_cheer":{"event":"alert","payload":{"username":"BitCheer","content":"cheered x500!","message":"Cheer for the stream!"}},"twitch_raid":{"event":"alert","payload":{"username":"RaidLeader","content":"raiding with 150 viewers!","message":""}},"youtube_user":{"event":"message","payload":{"username":"User","message":"User Testing Message","role":"user"}},"youtube_subscriber":{"event":"message","payload":{"username":"Subscriber","message":"Subscriber Testing Message","role":"subscriber"}},"youtube_moderator":{"event":"message","payload":{"username":"Moderator","message":"Moderator Testing Message","role":"moderator"}},"youtube_broadcaster":{"event":"message","payload":{"username":"Streamer","message":"Streamer Testing Message","role":"broadcaster"}},"youtube_long":{"event":"message","payload":{"username":"Streamer","message":"From a dreamy little realm painted in starlight and pastel skies, I floated into this world with a heart full of magic and wonder. My past is a gentle mystery, but my smile is real. Let's explore this cozy adventure together, one sparkle at a time!","role":"user"}},"youtube_membership":{"event":"alert","payload":{"username":"YTMember","content":"just became a member!","message":""}},"youtube_superchat":{"event":"alert","payload":{"username":"YTSuperChat","content":"super chatted $5.00!","message":"Love the stream!"}}};

    // 2. Load ChatWidget folder via saved directory handle
    const savedHandle = await idbGet(IDB_KEY).catch(() => null);
    if (savedHandle) {
      const perm = await savedHandle.queryPermission({ mode: 'readwrite' });
      if (perm === 'granted') {
        try {
          dirHandle    = savedHandle;
          fieldsConfig = await readJsonFromDir(dirHandle, 'fields.json');
          settingsData = await readJsonFromDir(dirHandle, 'data.json');
          defaultsData = JSON.parse(JSON.stringify(settingsData));
        } catch (e) {
          showPickerScreen(savedHandle);
          return;
        }
      } else {
        showPickerScreen(savedHandle);
        return;
      }
    } else {
      showPickerScreen(null);
      return;
    }

    buildUI();
  }

  function buildUI() {
    buildNav();
    buildAllSections();
    buildPreviewIframe();
    bindSaveReset();
    bindScaleButtons();
    bindInteraction();
    pushConfigToIframe();

    document.addEventListener('click', (e) => {
      if (openColorPopover && !openColorPopover.contains(e.target)) {
        const trigger = openColorPopover._trigger;
        if (trigger && trigger.contains(e.target)) return;
        closeColorPopover();
      }
    });
  }

  // ── Picker screen ─────────────────────────────────────────────
  function showPickerScreen(existingHandle) {
    const isReturning = !!existingHandle;
    const btnLabel = isReturning ? 'Allow Access' : 'Select ChatWidget Folder';
    const btnIcon  = isReturning
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
    const subText = isReturning
      ? 'Click to re-allow access to your <code style="background:#ededf0;padding:2px 6px;border-radius:4px;">ChatWidget</code> folder.'
      : 'Select your <code style="background:#ededf0;padding:2px 6px;border-radius:4px;">ChatWidget</code> folder to load your settings.<br><span style="color:#8888a0;font-size:12px;">You only need to do this once.</span>';

    document.body.innerHTML = `
      <div id="picker-screen" style="display:flex;align-items:center;justify-content:center;
        height:100vh;font-family:'Inter',sans-serif;background:#f0f0f2;color:#111115;
        flex-direction:column;gap:16px;text-align:center;padding:24px;">
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#9147ff"/>
          <path d="M8 8h16v12H17l-4 4v-4H8V8z" fill="#fff"/>
          <rect x="11" y="13" width="2" height="2" rx="1" fill="#9147ff"/>
          <rect x="15" y="13" width="2" height="2" rx="1" fill="#9147ff"/>
          <rect x="19" y="13" width="2" height="2" rx="1" fill="#9147ff"/>
        </svg>
        <strong style="font-size:20px;">Chat Widget Settings</strong>
        <p style="color:#4a4a5a;font-size:14px;max-width:360px;line-height:1.6;margin:0;">${subText}</p>
        <button id="pick-btn" style="display:flex;align-items:center;gap:8px;padding:10px 24px;
          background:#9147ff;color:#fff;border:none;border-radius:6px;font-size:14px;
          font-weight:600;cursor:pointer;">
          ${btnIcon} ${btnLabel}
        </button>
        <span id="pick-error" style="color:#dc2626;font-size:12px;display:none;"></span>
      </div>`;

    document.getElementById('pick-btn').addEventListener('click', async () => {
      const errEl = document.getElementById('pick-error');
      try {
        let handle = existingHandle;
        if (isReturning) {
          const result = await handle.requestPermission({ mode: 'readwrite' });
          if (result !== 'granted') {
            errEl.textContent = 'Permission denied.';
            errEl.style.display = 'block';
            return;
          }
        } else {
          handle = await window.showDirectoryPicker({ mode: 'readwrite' });
          await idbSet(IDB_KEY, handle);
        }
        dirHandle    = handle;
        fieldsConfig = await readJsonFromDir(dirHandle, 'fields.json');
        settingsData = await readJsonFromDir(dirHandle, 'data.json');
        defaultsData = JSON.parse(JSON.stringify(settingsData));
        location.reload();
      } catch (e) {
        if (e.name !== 'AbortError') {
          errEl.textContent = 'Error: ' + e.message;
          errEl.style.display = 'block';
        }
      }
    });
  }

  // ── Navigation ────────────────────────────────────────────────
  const SECTIONS = [
    { id: 'setup',     label: 'Setup',          icon: 'settings'  },
    { id: 'colors',    label: 'Colors',          icon: 'palette'   },
    { id: 'animation', label: 'Animation',       icon: 'animation' },
    { id: 'delete',    label: 'Delete Messages', icon: 'trash'     },
    { id: 'alerts',    label: 'Alerts',          icon: 'bell'      },
    { id: 'custom',    label: 'Customization',   icon: 'sliders'   },
    { id: 'test',      label: 'Test',            icon: 'test'      },
  ];

  function buildNav() {
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = '';
    SECTIONS.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'nav-item' + (i === 0 ? ' active' : '');
      btn.dataset.section = s.id;
      btn.innerHTML = `${navIcon(s.icon)}<span>${s.label}</span>`;
      btn.addEventListener('click', () => switchSection(s.id));
      nav.appendChild(btn);
    });
  }

  function switchSection(id) {
    document.querySelectorAll('.nav-item').forEach(b =>
      b.classList.toggle('active', b.dataset.section === id));
    document.querySelectorAll('.section-panel').forEach(p =>
      p.classList.toggle('active', p.dataset.section === id));
  }

  // ── Section panels ────────────────────────────────────────────
  function buildAllSections() {
    const container = document.getElementById('sidebar-content');
    container.innerHTML = '';
    SECTIONS.forEach((s, i) => {
      const panel = document.createElement('div');
      panel.className = 'section-panel' + (i === 0 ? ' active' : '');
      panel.dataset.section = s.id;
      container.appendChild(panel);
    });
    renderSections();
  }

  function renderSections() {
    document.querySelectorAll('.section-panel').forEach(panel => {
      panel.innerHTML = '';
      if (panel.dataset.section === 'test') {
        panel.appendChild(buildTestPanel());
      } else {
        getSectionGroups(panel.dataset.section)
          .forEach(g => panel.appendChild(buildGroup(g)));
      }
    });
  }

  // ── Section → field groups ────────────────────────────────────
  function getSectionGroups(sectionId) {
    const f = fieldsConfig;
    const groups = [];
    const push = (title, fields) => groups.push({ title, fields });

    if (sectionId === 'setup') {
      push('Connection',  { wsHost: f['Setup'].wsHost, wsPort: f['Setup'].wsPort });
      push('General',     filterOutTypes(omitKeys(f['Setup'] || {}, ['wsHost','wsPort']), ['colorpicker']));
    }
    if (sectionId === 'colors') {
      push('Message & Title Colors', f['Message Colors'] || {});
      push('Alert Colors',           f['Alert Colors']   || {});
      push('Background',             filterTypes(f['Setup'] || {}, ['colorpicker']));
    }
    if (sectionId === 'animation') push('Animation',        f['Message Animation'] || {});
    if (sectionId === 'delete')    push('Delete Behaviour', f['Delete Message']     || {});
    if (sectionId === 'alerts')    push('Alerts',           f['Alerts']             || {});
    if (sectionId === 'custom')    push('Font & Size',      f['Customization']      || {});

    return groups;
  }

  function filterOutTypes(fields, types) {
    return Object.fromEntries(Object.entries(fields).filter(([, v]) => v && !types.includes(v.type)));
  }
  function filterTypes(fields, types) {
    return Object.fromEntries(Object.entries(fields).filter(([, v]) => v && types.includes(v.type)));
  }
  function omitKeys(fields, keys) {
    return Object.fromEntries(Object.entries(fields).filter(([k]) => !keys.includes(k)));
  }

  // ── Group card ────────────────────────────────────────────────
  function buildGroup({ title, fields }) {
    const entries = Object.entries(fields).filter(([, v]) => v);
    if (!entries.length) return document.createDocumentFragment();

    const group = document.createElement('div');
    group.className = 'field-group';

    const header = document.createElement('div');
    header.className = 'group-header';
    header.innerHTML = `
      <span class="group-title">${title}</span>
      <svg class="group-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>`;
    header.addEventListener('click', () => group.classList.toggle('collapsed'));
    group.appendChild(header);

    const body = document.createElement('div');
    body.className = 'group-body';

    const colorEntries = entries.filter(([, v]) => v.type === 'colorpicker');
    const otherEntries = entries.filter(([, v]) => v.type !== 'colorpicker');

    otherEntries.forEach(([key, def]) => body.appendChild(buildField(key, def)));

    if (colorEntries.length) {
      if (otherEntries.length) {
        const div = document.createElement('div');
        div.className = 'field-divider';
        body.appendChild(div);
      }
      const grid = document.createElement('div');
      grid.className = 'color-group';
      colorEntries.forEach(([key, def]) => grid.appendChild(buildField(key, def)));
      body.appendChild(grid);
    }

    group.appendChild(body);
    return group;
  }

  // ── Field builder ─────────────────────────────────────────────
  function buildField(key, def) {
    const value = settingsData[key] !== undefined ? settingsData[key]
                : def.value !== undefined ? def.value : '';
    switch (def.type) {
      case 'checkbox':    return buildCheckbox(key, def, value);
      case 'number':      return buildNumber(key, def, value);
      case 'text':        return buildText(key, def, value);
      case 'textarea':    return buildTextarea(key, def, value);
      case 'dropdown':    return buildDropdown(key, def, value);
      case 'colorpicker': return buildColorpicker(key, def, value);
      default:            return document.createDocumentFragment();
    }
  }

  function buildCheckbox(key, def, value) {
    const id  = `field-${key}`;
    const row = document.createElement('div');
    row.className = 'toggle-row';
    row.innerHTML = `
      <label class="toggle-label" for="${id}">${def.label}</label>
      <label class="toggle-switch">
        <input type="checkbox" id="${id}" ${value ? 'checked' : ''}>
        <span class="toggle-track"></span>
      </label>`;
    row.querySelector('input').addEventListener('change', (e) => {
      updateData(key, e.target.checked);
    });
    return row;
  }

  function buildNumber(key, def, value) {
    const id  = `field-${key}`;
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `<label class="field-label" for="${id}">${def.label}</label>`;

    const wrap  = document.createElement('div');
    wrap.className = 'number-wrap';
    const minus = document.createElement('button');
    minus.className = 'step-btn'; minus.textContent = '−'; minus.type = 'button';
    const input = document.createElement('input');
    input.type = 'number'; input.id = id; input.value = value;
    if (def.min !== undefined) input.min = def.min;
    if (def.max !== undefined) input.max = def.max;
    if (def.step !== undefined) input.step = def.step;
    const plus = document.createElement('button');
    plus.className = 'step-btn'; plus.textContent = '+'; plus.type = 'button';

    const step = parseFloat(def.step || 1);
    minus.addEventListener('click', () => {
      const v = parseFloat(input.value || 0) - step;
      input.value = def.min !== undefined ? Math.max(def.min, v) : v;
      updateData(key, parseFloat(input.value));
    });
    plus.addEventListener('click', () => {
      const v = parseFloat(input.value || 0) + step;
      input.value = def.max !== undefined ? Math.min(def.max, v) : v;
      updateData(key, parseFloat(input.value));
    });
    input.addEventListener('change', () => updateData(key, parseFloat(input.value)));

    wrap.append(minus, input, plus);
    row.appendChild(wrap);
    return row;
  }

  function buildText(key, def, value) {
    const id  = `field-${key}`;
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `
      <label class="field-label" for="${id}">${def.label}</label>
      <input type="text" id="${id}" value="${escapeAttr(String(value))}">`;
    row.querySelector('input').addEventListener('input', (e) => updateData(key, e.target.value));
    return row;
  }

  function buildTextarea(key, def, value) {
    const id  = `field-${key}`;
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `
      <label class="field-label" for="${id}">${def.label}</label>
      <textarea id="${id}" spellcheck="false">${escapeHtml(String(value))}</textarea>`;
    row.querySelector('textarea').addEventListener('input', (e) => updateData(key, e.target.value));
    return row;
  }

  function buildDropdown(key, def, value) {
    const id  = `field-${key}`;
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `<label class="field-label" for="${id}">${def.label}</label>`;
    const sel = document.createElement('select');
    sel.id = id;
    Object.entries(def.options || {}).forEach(([val, label]) => {
      const opt = document.createElement('option');
      opt.value = val; opt.textContent = label;
      if (val === value) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', (e) => updateData(key, e.target.value));
    row.appendChild(sel);
    return row;
  }

  function buildColorpicker(key, def, value) {
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `<label class="field-label">${def.label}</label>`;

    const colorRow = document.createElement('div');
    colorRow.className = 'color-row';

    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    const swatchInner = document.createElement('div');
    swatchInner.className = 'color-swatch-inner';
    swatchInner.style.background = value;
    swatch.appendChild(swatchInner);

    const valSpan = document.createElement('span');
    valSpan.className = 'color-value';
    valSpan.textContent = value;

    const editBtn = document.createElement('button');
    editBtn.className = 'color-edit-btn';
    editBtn.type = 'button';
    editBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>`;

    colorRow.append(swatch, valSpan, editBtn);

    const popover = buildColorPopover(value, (newColor) => {
      swatchInner.style.background = newColor;
      valSpan.textContent = newColor;
      updateData(key, newColor);
    });
    popover._trigger = colorRow;
    document.body.appendChild(popover);

    const openPopover = () => {
      if (openColorPopover && openColorPopover !== popover) closeColorPopover();
      const rect = colorRow.getBoundingClientRect();
      popover.style.top  = (rect.bottom + 4) + 'px';
      popover.style.left = Math.min(rect.left, window.innerWidth - 240) + 'px';
      popover.classList.add('open');
      openColorPopover = popover;
    };

    colorRow.addEventListener('click', openPopover);
    editBtn.addEventListener('click', (e) => { e.stopPropagation(); openPopover(); });

    row.appendChild(colorRow);
    return row;
  }

  function buildColorPopover(initialValue, onChange) {
    const popover = document.createElement('div');
    popover.className = 'color-popover';

    const presets = [
      '#ffffff','#000000','#ff0000','#00ff00','#0000ff',
      '#ffff00','#ff00ff','#00ffff','#8c7a78','#9147ff',
      '#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff',
      'rgba(0,0,0,0)'
    ];
    const presetGrid = document.createElement('div');
    presetGrid.className = 'color-presets';
    presets.forEach(c => {
      const sw = document.createElement('div');
      sw.className = 'color-preset';
      sw.title = c;
      if (c === 'rgba(0,0,0,0)') {
        sw.style.cssText = `background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:8px 8px;background-position:0 0,0 4px,4px -4px,-4px 0;background-color:#fff;`;
      } else {
        sw.style.background = c;
      }
      sw.addEventListener('click', () => {
        hexInput.value = c;
        nativePicker.value = colorToHex(c);
        updateFromHex(c);
      });
      presetGrid.appendChild(sw);
    });
    popover.appendChild(presetGrid);

    const nativePicker = document.createElement('input');
    nativePicker.type  = 'color';
    nativePicker.value = colorToHex(initialValue);
    popover.appendChild(nativePicker);

    const hexInput = document.createElement('input');
    hexInput.type        = 'text';
    hexInput.className   = 'color-hex-input';
    hexInput.value       = initialValue;
    hexInput.placeholder = '#rrggbb or rgba(...)';
    popover.appendChild(hexInput);

    const opacityWrap  = document.createElement('div');
    opacityWrap.className = 'color-opacity-row';
    const opacityLabel = document.createElement('span');
    opacityLabel.className = 'color-opacity-label';
    opacityLabel.textContent = 'Opacity: 100%';
    const opacitySlider = document.createElement('input');
    opacitySlider.type  = 'range';
    opacitySlider.min   = 0;
    opacitySlider.max   = 100;
    opacitySlider.value = Math.round(colorToAlpha(initialValue) * 100);
    opacityWrap.append(opacityLabel, opacitySlider);
    popover.appendChild(opacityWrap);

    function updateFromHex(rawValue) {
      const alpha = parseInt(opacitySlider.value) / 100;
      let finalColor;
      if (rawValue.startsWith('rgba')) {
        finalColor = rawValue;
      } else {
        const hex = rawValue.replace('#', '');
        if (hex.length === 6) {
          const r = parseInt(hex.slice(0,2), 16);
          const g = parseInt(hex.slice(2,4), 16);
          const b = parseInt(hex.slice(4,6), 16);
          finalColor = alpha < 1 ? `rgba(${r},${g},${b},${alpha})` : `#${hex}`;
        } else {
          finalColor = rawValue;
        }
      }
      opacityLabel.textContent = `Opacity: ${opacitySlider.value}%`;
      onChange(finalColor);
    }

    nativePicker.addEventListener('input', () => {
      hexInput.value = nativePicker.value;
      updateFromHex(nativePicker.value);
    });
    hexInput.addEventListener('input', () => updateFromHex(hexInput.value));
    opacitySlider.addEventListener('input', () => updateFromHex(hexInput.value));

    const actions  = document.createElement('div');
    actions.className = 'color-popover-actions';
    const closeBtn = document.createElement('button');
    closeBtn.className   = 'btn btn-ghost';
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = 'font-size:12px;padding:5px 12px';
    closeBtn.addEventListener('click', closeColorPopover);
    actions.appendChild(closeBtn);
    popover.appendChild(actions);

    return popover;
  }

  function closeColorPopover() {
    if (openColorPopover) {
      openColorPopover.classList.remove('open');
      openColorPopover = null;
    }
  }

  // ── Test panel ────────────────────────────────────────────────
  function buildTestPanel() {
    const wrap = document.createElement('div');

    // Platform tabs
    const tabs = document.createElement('div');
    tabs.className = 'test-platform-tabs';
    ['twitch', 'youtube'].forEach((p, i) => {
      const btn = document.createElement('button');
      btn.className = 'test-platform-btn' + (i === 0 ? ' active' : '');
      btn.dataset.p = p;
      btn.textContent = p === 'twitch' ? '🟣 Twitch' : '🔴 YouTube';
      btn.addEventListener('click', () => {
        tabs.querySelectorAll('.test-platform-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        wrap.querySelectorAll('.test-sub-panel').forEach(p => p.classList.remove('active'));
        wrap.querySelector(`.test-sub-panel[data-p="${p}"]`).classList.add('active');
      });
      tabs.appendChild(btn);
    });
    wrap.appendChild(tabs);

    // Twitch panel
    const twitchPanel = document.createElement('div');
    twitchPanel.className = 'test-sub-panel active';
    twitchPanel.dataset.p = 'twitch';
    twitchPanel.innerHTML = `
      <div class="test-section-label">Chat Messages</div>
      <div class="test-btn-grid">
        <button class="test-btn twitch" data-ev="twitch_user">Regular</button>
        <button class="test-btn twitch" data-ev="twitch_subscriber">Subscriber</button>
        <button class="test-btn twitch" data-ev="twitch_vip">VIP</button>
        <button class="test-btn twitch" data-ev="twitch_moderator">Moderator</button>
        <button class="test-btn twitch" data-ev="twitch_broadcaster">Streamer</button>
        <button class="test-btn twitch" data-ev="twitch_reply">Reply</button>
        <button class="test-btn twitch alert-btn" data-ev="twitch_emoteonly">Emote Only</button>
      </div>
      <div class="test-section-label">Alerts</div>
      <div class="test-btn-grid">
        <button class="test-btn twitch" data-ev="twitch_follow">Follow</button>
        <button class="test-btn twitch" data-ev="twitch_sub">Sub</button>
        <button class="test-btn twitch" data-ev="twitch_resub">Resub</button>
        <button class="test-btn twitch" data-ev="twitch_giftsub">Gift Sub</button>
        <button class="test-btn twitch" data-ev="twitch_giftbomb">Gift Bomb</button>
        <button class="test-btn twitch" data-ev="twitch_cheer">Cheer</button>
        <button class="test-btn twitch alert-btn" data-ev="twitch_raid">Raid</button>
      </div>`;
    wrap.appendChild(twitchPanel);

    // YouTube panel
    const ytPanel = document.createElement('div');
    ytPanel.className = 'test-sub-panel';
    ytPanel.dataset.p = 'youtube';
    ytPanel.innerHTML = `
      <div class="test-section-label">Chat Messages</div>
      <div class="test-btn-grid">
        <button class="test-btn youtube" data-ev="youtube_user">Regular</button>
        <button class="test-btn youtube" data-ev="youtube_subscriber">Member</button>
        <button class="test-btn youtube" data-ev="youtube_moderator">Moderator</button>
        <button class="test-btn youtube" data-ev="youtube_broadcaster">Streamer</button>
        <button class="test-btn youtube alert-btn" data-ev="youtube_long">Long Message</button>
      </div>
      <div class="test-section-label">Alerts</div>
      <div class="test-btn-grid">
        <button class="test-btn youtube" data-ev="youtube_membership">Membership</button>
        <button class="test-btn youtube" data-ev="youtube_superchat">Superchat</button>
      </div>`;
    wrap.appendChild(ytPanel);

    // Wire all buttons
    wrap.querySelectorAll('.test-btn[data-ev]').forEach(btn => {
      btn.addEventListener('click', () => sendTestEvent(btn.dataset.ev));
    });

    return wrap;
  }

  function sendTestEvent(eventKey) {
    if (!iframeEl) return;
    const entry = testEvents[eventKey];
    if (!entry) return;
    iframeEl.contentWindow.postMessage({ type: 'kwTest', event: entry.event, payload: entry.payload }, '*');
  }

  // ── Data update ───────────────────────────────────────────────
  function updateData(key, value) {
    settingsData[key] = value;
    pushConfigToIframe();
  }

  // ── Save & Reset ──────────────────────────────────────────────
  function bindSaveReset() {
    document.getElementById('save-btn').addEventListener('click', saveData);
    document.getElementById('reset-btn').addEventListener('click', resetData);
  }

  async function saveData() {
    const btn = document.getElementById('save-btn');
    btn.disabled = true;
    try {
      await writeJsonToDir(dirHandle, 'data.json', settingsData);
      showToast('Settings saved to data.json');
    } catch (e) {
      showToast('Save failed: ' + e.message, true);
    } finally {
      btn.disabled = false;
    }
  }

  function resetData() {
    if (!confirm('Reset all settings to defaults?')) return;
    settingsData = JSON.parse(JSON.stringify(defaultsData));
    renderSections();
    pushConfigToIframe();
    showToast('Reset to defaults');
  }

  // ── Preview iframe ────────────────────────────────────────────
  function buildPreviewIframe() {
    const wrap = document.getElementById('preview-iframe-wrap');
    if (!wrap) return;

    const w = settingsData.previewWidth  || 400;
    const h = settingsData.previewHeight || 600;
    const l = settingsData.previewLeft   != null ? settingsData.previewLeft : 40;
    const t = settingsData.previewTop    != null ? settingsData.previewTop  : 40;

    const container = document.getElementById('preview-frame-container');
    if (container) {
      container.style.left = l + 'px';
      container.style.top  = t + 'px';
    }

    iframeEl = document.createElement('iframe');
    iframeEl.src    = '../index.html';
    iframeEl.style.cssText = `width:${w}px;height:${h}px;border:none;background:transparent;display:block;`;
    iframeEl.setAttribute('scrolling', 'no');
    wrap.appendChild(iframeEl);

    // Transparent overlay — sits on top of the iframe to capture mouse events
    // for drag/resize. Removed during active drag so iframe stays visible.
    const mouseOverlay = document.createElement('div');
    mouseOverlay.id = 'iframe-mouse-overlay';
    mouseOverlay.style.cssText = 'position:absolute;inset:0;z-index:5;cursor:default;';
    wrap.appendChild(mouseOverlay);

    iframeEl.addEventListener('load', () => pushConfigToIframe());
  }

  function pushConfigToIframe() {
    if (!iframeEl || !iframeEl.contentWindow) return;
    iframeEl.contentWindow.postMessage({ type: 'kwTest', event: 'config', data: settingsData }, '*');
  }

  // ── Unified resize + move interaction ─────────────────────────
  // Edge zone size in px — within this distance of any edge triggers resize
  const EDGE = 8;

  function getHitZone(e, el) {
    const r   = el.getBoundingClientRect();
    const x   = e.clientX - r.left;
    const y   = e.clientY - r.top;
    const onL = x <= EDGE;
    const onR = x >= r.width  - EDGE;
    const onT = y <= EDGE;
    const onB = y >= r.height - EDGE;
    if (onT && onL) return 'nw';
    if (onT && onR) return 'ne';
    if (onB && onL) return 'sw';
    if (onB && onR) return 'se';
    if (onT)        return 'n';
    if (onB)        return 's';
    if (onL)        return 'w';
    if (onR)        return 'e';
    return 'move';
  }

  const CURSORS = { nw:'nw-resize', ne:'ne-resize', sw:'sw-resize', se:'se-resize',
                    n:'n-resize',   s:'s-resize',   w:'w-resize',   e:'e-resize',
                    move:'move' };

  function bindInteraction() {
    const wrap      = document.getElementById('preview-iframe-wrap');
    const container = document.getElementById('preview-frame-container');
    if (!wrap || !container || !iframeEl) return;

    const mouseOverlay = document.getElementById('iframe-mouse-overlay');

    let action = null;
    let startX, startY, startW, startH, startL, startT;

    // Update cursor based on mouse position over the overlay
    mouseOverlay.addEventListener('mousemove', (e) => {
      if (action) return;
      mouseOverlay.style.cursor = CURSORS[getHitZone(e, mouseOverlay)];
    });
    mouseOverlay.addEventListener('mouseleave', () => {
      if (!action) mouseOverlay.style.cursor = 'default';
    });

    mouseOverlay.addEventListener('mousedown', (e) => {
      action = getHitZone(e, mouseOverlay);
      startX = e.clientX;
      startY = e.clientY;
      startW = iframeEl.offsetWidth;
      startH = iframeEl.offsetHeight;
      startL = parseInt(container.style.left, 10) || 0;
      startT = parseInt(container.style.top,  10) || 0;

      // Full-page drag overlay to keep cursor correct and prevent other elements
      // from interfering while dragging outside the iframe bounds
      const dragOverlay = document.createElement('div');
      dragOverlay.id = 'drag-overlay';
      dragOverlay.style.cssText = `position:fixed;inset:0;z-index:9999;cursor:${CURSORS[action]};`;
      document.body.appendChild(dragOverlay);
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!action) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (action === 'move') {
        container.style.left = Math.max(0, startL + dx) + 'px';
        container.style.top  = Math.max(0, startT + dy) + 'px';
        // Keep overlay sized to iframe
        mouseOverlay.style.width  = iframeEl.offsetWidth  + 'px';
        mouseOverlay.style.height = iframeEl.offsetHeight + 'px';
        return;
      }

      let newW = startW, newH = startH, newL = startL, newT = startT;
      if (action.includes('e')) newW = Math.max(100, startW + dx);
      if (action.includes('s')) newH = Math.max(100, startH + dy);
      if (action.includes('w')) { newW = Math.max(100, startW - dx); newL = startL + (startW - newW); }
      if (action.includes('n')) { newH = Math.max(100, startH - dy); newT = startT + (startH - newH); }

      iframeEl.style.width  = newW + 'px';
      iframeEl.style.height = newH + 'px';
      mouseOverlay.style.width  = newW + 'px';
      mouseOverlay.style.height = newH + 'px';
      container.style.left = Math.max(0, newL) + 'px';
      container.style.top  = Math.max(0, newT) + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (!action) return;
      const dragOverlay = document.getElementById('drag-overlay');
      if (dragOverlay) dragOverlay.remove();
      settingsData.previewWidth  = iframeEl.offsetWidth;
      settingsData.previewHeight = iframeEl.offsetHeight;
      settingsData.previewLeft   = parseInt(container.style.left, 10) || 0;
      settingsData.previewTop    = parseInt(container.style.top,  10) || 0;
      action = null;
    });
  }

  // ── Scale ─────────────────────────────────────────────────────
  function bindScaleButtons() {
    document.getElementById('scale-down').addEventListener('click', () => {
      previewScale = Math.max(0.25, +(previewScale - 0.1).toFixed(2));
      applyScale();
    });
    document.getElementById('scale-up').addEventListener('click', () => {
      previewScale = Math.min(3, +(previewScale + 0.1).toFixed(2));
      applyScale();
    });
    document.getElementById('scale-reset').addEventListener('click', () => {
      previewScale = 1;
      applyScale();
    });
  }

  function applyScale() {
    document.getElementById('preview-frame-container').style.transform = `scale(${previewScale})`;
    document.getElementById('scale-label').textContent = Math.round(previewScale * 100) + '%';
  }

  // ── Toast ─────────────────────────────────────────────────────
  function showToast(msg, isError) {
    const toast = document.getElementById('toast');
    toast.querySelector('span').textContent = msg;
    toast.style.background = isError ? 'var(--error)' : 'var(--success)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ── Helpers ───────────────────────────────────────────────────
  function escapeAttr(s) { return s.replace(/"/g, '&quot;'); }
  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function colorToHex(color) {
    if (!color || color === 'rgba(0,0,0,0)') return '#000000';
    if (color.startsWith('#')) return color.slice(0, 7);
    const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m) return '#' + [m[1],m[2],m[3]].map(n => parseInt(n).toString(16).padStart(2,'0')).join('');
    return '#000000';
  }

  function colorToAlpha(color) {
    const m = color && color.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
    return m ? parseFloat(m[1]) : 1;
  }

  function navIcon(name) {
    const icons = {
      settings:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      palette:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
      animation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 9-14 9V3z"/></svg>`,
      trash:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
      bell:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
      sliders:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
      test:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>`,
    };
    return icons[name] || '';
  }

  // ── Kick off ──────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
