let userChannel;

const roomId = 342546591;

window.addEventListener('onWidgetLoad', function (obj) {
  userChannel = obj.detail.channel.username;
})

window.addEventListener('onEventReceived', function (obj) {

  if (obj.detail.event.listener === 'widget-button') {
    const type = obj.detail.event.field;

    let detail;
    let detail2;

    switch (type) {
      case "streamerMessage":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 1704067200,
              tags: {
                'badge-info': 'subscriber/14',
                badges: 'broadcaster/1,subscriber/0',
                color: '#4400FFFF',
                'display-name': userChannel,
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: '54b903a4-1130-4c46-820b-f589b7102c4b',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '1',
                'tmi-sent-ts': '5683921687254',
                turbo: '0',
                'user-id': '342546591',
                'user-type': '',
              },
              nick: userChannel,
              userId: '342546591',
              displayName: userChannel,
              displayColor: '#4400FFFF',
              badges: [
                {
                  type: 'broadcaster',
                  version: '1',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3',
                  description: 'Broadcaster',
                },
                {
                  type: 'subscriber',
                  version: '0',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3',
                  description: 'Subscriber',
                },
              ],
              channel: userChannel,
              text: 'The streamer send a message!',
              isAction: false,
              emotes: [],
              msgId: '39cf1c85-ca8d-4fe5-899b-ecb5d57d0426',
            },
            renderedText: 'The streamer send a message!',
          },
        };
        break;
      case "moderatorMessage":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 1872244746,
              tags: {
                'badge-info': '',
                badges: 'moderator/1',
                color: '#FF003CFF',
                'display-name': 'Moderator',
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: '8bc1f9e0-46ff-4f8d-aee0-5a40870f98a1',
                mod: '1',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '0',
                'tmi-sent-ts': '9128475391864',
                turbo: '0',
                'user-id': '882005875',
                'user-type': 'mod',
              },
              nick: 'moderator',
              userId: '882005875',
              displayName: 'Moderator',
              displayColor: '#FF003CFF',
              badges: [
                {
                  type: 'moderator',
                  version: '1',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3',
                  description: 'Moderator',
                },
              ],
              channel: userChannel,
              text: 'Moderator User Send a Message',
              isAction: false,
              emotes: [
                {
                  type: 'ffz',
                  name: 'BunnyRabbit',
                  id: '407874',
                  gif: false,
                  urls: {
                    '1': 'https://cdn.frankerfacez.com/emoticon/407874/1',
                    '2': 'https://cdn.frankerfacez.com/emoticon/407874/2',
                    '4': 'https://cdn.frankerfacez.com/emoticon/407874/4',
                  },
                  start: 10,
                  end: 18,
                },
              ],
              msgId: '8bc1f9e0-46ff-4f8d-aee0-5a40870f98a1',
            },
            renderedText:
              'Moderator User Send a Message <img src="https://cdn.frankerfacez.com/emoticon/407874/1" srcset="https://cdn.frankerfacez.com/emoticon/407874/1 1x, https://cdn.betterttv.net/emote/5d7eefb7c0652668c9e4d394/2x 2x, https://cdn.frankerfacez.com/emoticon/407874/4 4x" title="BunnyRabbit" class="emote">',
          },
        };
        break;
      case "vipMessage":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 5050981253,
              tags: {
                'badge-info': '',
                badges: 'vip/1',
                color: '#BFFF00FF',
                'display-name': 'VIP User',
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: 'ef13af3d-b141-4e35-aa65-f388f83be35a',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '0',
                'tmi-sent-ts': '9487919804653',
                turbo: '0',
                'user-id': '658731449',
                'user-type': '',
                vip: '1',
              },
              nick: 'vipuser',
              userId: '658731449',
              displayName: 'VIP User',
              displayColor: '#BFFF00FF',
              badges: [
                {
                  type: 'vip',
                  version: '1',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3',
                  description: 'VIP',
                },
              ],
              channel: userChannel,
              text: 'VIP User Send A Message CoolStoryBunny',
              isAction: false,
              emotes: [
                {
                  type: 'ffz',
                  name: 'CoolStoryBunny',
                  id: '594713',
                  gif: false,
                  urls: {
                    '1': 'https://cdn.frankerfacez.com/emote/594713/1',
                    '2': 'https://cdn.frankerfacez.com/emote/594713/2',
                    '4': 'https://cdn.frankerfacez.com/emote/594713/4',
                  },
                  start: 24,
                  end: 37,
                },
              ],
              msgId: 'ef13af3d-b141-4e35-aa65-f388f83be35a',
            },
            renderedText:
              'VIP User Send A Message <img src="https://cdn.frankerfacez.com/emote/594713/1" srcset="https://cdn.frankerfacez.com/emote/594713/1 1x, https://cdn.frankerfacez.com/emote/594713/2 2x, https://cdn.frankerfacez.com/emote/594713/4 4x" title="CoolStoryBunny" class="emote">',
          },
        };
        break;
      case "subscriberMessage":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 2166795590,
              tags: {
                'badge-info': 'subscriber/14',
                badges: ' subscriber/0',
                color: '#00FBFFFF',
                'display-name': 'NewSubs',
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: '22c694d7-53fd-4d9f-bde4-dfa9507cda30',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '1',
                'tmi-sent-ts': '8268724918673',
                turbo: '0',
                'user-id': '211928254',
                'user-type': '',
              },
              nick: 'newsubs',
              userId: '211928254',
              displayName: 'NewSubs',
              displayColor: '#00FBFFFF',
              badges: [
                {
                  type: 'subscriber',
                  version: '0',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3',
                  description: 'Subscriber',
                },
              ],
              channel: userChannel,
              text: 'Subscriber Send a Message!',
              isAction: false,
              emotes: [],
              msgId: '22c694d7-53fd-4d9f-bde4-dfa9507cda30',
            },
            renderedText: 'Subscriber Send a Message!',
          },
        };
        break;
      case "regularMessage":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 7846546471,
              tags: {
                'badge-info': '',
                badges: '',
                color: '#FFC400FF',
                'display-name': 'RegularViewer',
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: 'df217113-51c7-4bc4-97b0-01b8e172d3cc',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '0',
                'tmi-sent-ts': '6981068195784',
                turbo: '0',
                'user-id': '602417148',
                'user-type': '',
              },
              nick: 'regular user',
              userId: '602417148',
              displayName: 'Regular User',
              displayColor: '#FFC400FF',
              badges: [],
              channel: userChannel,
              text: 'Regular User Send a Message!',
              isAction: false,
              emotes: [],
              msgId: 'df217113-51c7-4bc4-97b0-01b8e172d3cc',
            },
            renderedText: 'Regular User Send a Message!',
          },
        };
        break;
      case "emoteOnlyMessage":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 8257361965,
              tags: {
                'badge-info': 'subscriber/14',
                badges: 'broadcaster/1,subscriber/0',
                color: '#FF69B4',
                'display-name': userChannel,
                'emote-only': '1',
                emotes: '407882:0-8,10-18,20-28',
                'first-msg': '0',
                flags: '',
                id: 'a227f479-4a3d-4c2b-9e12-91657d191ece',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '1',
                'tmi-sent-ts': '8287918670284',
                turbo: '0',
                'user-id': '886981399',
                'user-type': '',
              },
              nick: "emote only",
              userId: '886981399',
              displayName: "EmoteOnly",
              displayColor: '#FF69B4',
              badges: [
                {
                  type: 'subscriber',
                  version: '0',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3',
                  description: 'Subscriber',
                },
              ],
              channel: userChannel,
              text: 'CupBunny CupBunny CupBunny',
              isAction: false,
              emotes: [
                {
                  type: 'ffz',
                  name: 'CupBunny',
                  id: '407882',
                  gif: false,
                  urls: {
                    '1': 'https://cdn.frankerfacez.com/emoticon/407882/1',
                    '2': 'https://cdn.frankerfacez.com/emoticon/407882/2',
                    '4': 'https://cdn.frankerfacez.com/emoticon/407882/4',
                  },
                  positions: [[0, 8], [10, 18], [20, 28]]
                },
              ],
              msgId: 'a227f479-4a3d-4c2b-9e12-91657d191ece',
            },
            renderedText:
              '<img src="https://cdn.frankerfacez.com/emoticon/407882/1" srcset="https://cdn.frankerfacez.com/emoticon/407882/1 1x, https://cdn.frankerfacez.com/emoticon/407882/2 2x, https://cdn.frankerfacez.com/emoticon/407882/4 4x" title="CupBunny" class="emote"> ' +
              '<img src="https://cdn.frankerfacez.com/emoticon/407882/1" srcset="https://cdn.frankerfacez.com/emoticon/407882/1 1x, https://cdn.frankerfacez.com/emoticon/407882/2 2x, https://cdn.frankerfacez.com/emoticon/407882/4 4x" title="CupBunny" class="emote"> ' +
              '<img src="https://cdn.frankerfacez.com/emoticon/407882/1" srcset="https://cdn.frankerfacez.com/emoticon/407882/1 1x, https://cdn.frankerfacez.com/emoticon/407882/2 2x, https://cdn.frankerfacez.com/emoticon/407882/4 4x" title="CupBunny" class="emote">',
          },
        };
        break;
      case "wideEmoteOnlyMessage":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 8257361965,
              tags: {
                'badge-info': 'subscriber/14',
                badges: 'broadcaster/1,subscriber/0',
                color: '#FF69B4',
                'display-name': userChannel,
                'emote-only': '1',
                emotes: '407882:0-8,10-18,20-28',
                'first-msg': '0',
                flags: '',
                id: 'a227f479-4a3d-4c2b-9e12-91657d191ece',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '1',
                'tmi-sent-ts': '8287918670284',
                turbo: '0',
                'user-id': '886981399',
                'user-type': '',
              },
              nick: "emote only",
              userId: '886981399',
              displayName: "Emote Only",
              displayColor: '#FF69B4',
              badges: [
                {
                  type: 'subscriber',
                  version: '0',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3',
                  description: 'Subscriber',
                },
              ],
              channel: userChannel,
              text: 'CupBunny CupBunny CupBunny',
              isAction: false,
              emotes: [
                {
                  type: 'ffz',
                  name: 'CupBunny',
                  id: '407882',
                  gif: false,
                  urls: {
                    '1': 'https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp',
                    '2': 'https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp',
                    '4': 'https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp',
                  },
                  positions: [[0, 8], [10, 18], [20, 28]]
                },
              ],
              msgId: 'a227f479-4a3d-4c2b-9e12-91657d191ece',
            },
            renderedText:
              '<img src="https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp" srcset="https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp 1x, https://cdn.frankerfacez.com/emoticon/407882/2 2x, https://cdn.frankerfacez.com/emoticon/407882/4 4x" title="CupBunny" class="emote"> ' +
              '<img src="https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp" srcset="https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp 1x, https://cdn.frankerfacez.com/emoticon/407882/2 2x, https://cdn.frankerfacez.com/emoticon/407882/4 4x" title="CupBunny" class="emote"> ' +
              '<img src="https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp" srcset="https://cdn.7tv.app/emote/01GWDGXVG0000FVNNHM4H1HZRF/1x.webp 1x, https://cdn.frankerfacez.com/emoticon/407882/2 2x, https://cdn.frankerfacez.com/emoticon/407882/4 4x" title="CupBunny" class="emote"> '
          },
        };
        break;
      case "subscriberMessageTier1":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 1704067200,
              tags: {
                'badge-info': 'subscriber/14', // Months subscribed
                badges: 'subscriber/1', // Tier 1 subscriber
                color: '#4400FFFF',
                'display-name': userChannel,
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: '54b903a4-1130-4c46-820b-f589b7102c4b',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '1', // Subscriber flag
                'tmi-sent-ts': '5683921687254',
                turbo: '0',
                'user-id': '342546591',
                'user-type': '',
              },
              nick: userChannel,
              userId: '342546591',
              displayName: userChannel,
              displayColor: '#4400FFFF',
              badges: [
                {
                  type: 'broadcaster',
                  version: '1',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3',
                  description: 'Broadcaster',
                },
                {
                  type: 'subscriber',
                  version: '1', // Tier 1
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3',
                  description: 'Subscriber',
                },
              ],
              channel: userChannel,
              text: 'The streamer sent a message as a Tier 1 subscriber!',
              isAction: false,
              emotes: [],
              msgId: '39cf1c85-ca8d-4fe5-899b-ecb5d57d0426',
            },
            renderedText: 'The streamer sent a message as a Tier 1 subscriber!',
          },
        };
        break;
      case "subscriberMessageTier2":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 1704067200,
              tags: {
                'badge-info': 'subscriber/14', // Months subscribed
                badges: 'subscriber/2', // Tier 2 subscriber
                color: '#4400FFFF',
                'display-name': userChannel,
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: '54b903a4-1130-4c46-820b-f589b7102c4b',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '1', // Subscriber flag
                'tmi-sent-ts': '5683921687254',
                turbo: '0',
                'user-id': '342546591',
                'user-type': '',
              },
              nick: userChannel,
              userId: '342546591',
              displayName: userChannel,
              displayColor: '#4400FFFF',
              badges: [
                {
                  type: 'broadcaster',
                  version: '1',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3',
                  description: 'Broadcaster',
                },
                {
                  type: 'subscriber',
                  version: '2', // Tier 2
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3',
                  description: 'Subscriber',
                },
              ],
              channel: userChannel,
              text: 'The streamer sent a message as a Tier 2 subscriber!',
              isAction: false,
              emotes: [],
              msgId: '39cf1c85-ca8d-4fe5-899b-ecb5d57d0426',
            },
            renderedText: 'The streamer sent a message as a Tier 2 subscriber!',
          },
        };
        break;
      case "subscriberMessageTier3":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 1704067200,
              tags: {
                'badge-info': 'subscriber/14', // Months subscribed
                badges: 'subscriber/3', // Tier 3 subscriber
                color: '#4400FFFF',
                'display-name': userChannel,
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: '54b903a4-1130-4c46-820b-f589b7102c4b',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '1', // Subscriber flag
                'tmi-sent-ts': '5683921687254',
                turbo: '0',
                'user-id': '342546591',
                'user-type': '',
              },
              nick: userChannel,
              userId: '342546591',
              displayName: userChannel,
              displayColor: '#4400FFFF',
              badges: [
                {
                  type: 'broadcaster',
                  version: '1',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3',
                  description: 'Broadcaster',
                },
                {
                  type: 'subscriber',
                  version: '3', // Tier 3
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3',
                  description: 'Subscriber',
                },
              ],
              channel: userChannel,
              text: 'The streamer sent a message as a Tier 3 subscriber!',
              isAction: false,
              emotes: [],
              msgId: '39cf1c85-ca8d-4fe5-899b-ecb5d57d0426',
            },
            renderedText: 'The streamer sent a message as a Tier 3 subscriber!',
          },
        };
        break;
      case "replyMessage":
        detail = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 8634971684,
              tags: {
                'badge-info': '',
                badges: '',
                color: '#FF8400FF',
                'display-name': 'ORENJI',
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: '7701b38b-5821-448a-863b-c4bb048cfae7',
                mod: '0',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '0',
                'tmi-sent-ts': '8184916384719',
                turbo: '0',
                'user-id': '896800563',
                'user-type': '',
              },
              nick: 'orenji',
              userId: '896800563',
              displayName: 'ORENJI',
              displayColor: '#FF8400FF',
              badges: [],
              channel: 'ORENJI',
              text: 'Send me your favorite quote!',
              isAction: false,
              emotes: [],
              msgId: '7701b38b-5821-448a-863b-c4bb048cfae7',
            },
            renderedText: 'Send me your favorite quote!',
          },
        };
        detail2 = {
          listener: 'message',
          event: {
            service: 'twitch',
            data: {
              time: 8110303092,
              tags: {
                'badge-info': 'subscriber/14',
                badges: 'broadcaster/1,subscriber/0',
                color: '#00FF99FF',
                'display-name': 'ORENJI',
                emotes: '',
                'first-msg': '0',
                flags: '',
                id: '1dee195b-5023-4883-99ea-45759e7549e8',
                mod: '0',
                'reply-parent-display-name': 'ORENJI',
                'reply-parent-msg-body':
                  'May\\sI\\shave\\sa\\srandom\\scool\\sfact?',
                'reply-parent-msg-id':
                  '177329b8-ca97-4b2b-b3cd-7e7fa2ee6a4b',
                'reply-parent-user-id': '947868099',
                'reply-parent-user-login': 'ORENJI',
                'reply-thread-parent-msg-id':
                  '177329b8-ca97-4b2b-b3cd-7e7fa2ee6a4b',
                'reply-thread-parent-user-login': 'ORENJI',
                'returning-chatter': '0',
                'room-id': roomId,
                subscriber: '1',
                'tmi-sent-ts': '7818592684930',
                turbo: '0',
                'user-id': '370315518',
                'user-type': '',
              },
              nick: userChannel,
              userId: '370315518',
              displayName: userChannel,
              displayColor: '#00FF99FF',
              badges: [
                {
                  type: 'subscriber',
                  version: '0',
                  url: 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3',
                  description: 'Subscriber',
                },
              ],
              channel: userChannel,
              text: "@ORENJI The most difficult thing is the decision to act, the rest is merely tenacity. The fears are paper tigers. You can do anything you decide to do. You can act to change and control your life; and the procedure, the process is its own reward.",
              isAction: false,
              emotes: [],
              msgId: '1dee195b-5023-4883-99ea-45759e7549e8',
            },
            renderedText:
              "@ORENJI The most difficult thing is the decision to act, the rest is merely tenacity. The fears are paper tigers. You can do anything you decide to do. You can act to change and control your life; and the procedure, the process is its own reward.",
          },
        };
        let emulated = new CustomEvent('onEventReceived', {
          detail: detail
        });

        let emulated2 = new CustomEvent('onEventReceived', {
          detail: detail2
        });
        window.dispatchEvent(emulated);
        setTimeout(() => {
          window.dispatchEvent(emulated2);
        }, 1500);

        return;
      case "streamerMessageYt":
        detail = {
          listener: "message",
          event: {
            service: "youtube",
            data: {
              "kind": "youtube#liveChatMessage",
              "etag": "FFyVMBdCnaFyluxPZjqEqsPq7wg",
              "id": "LCC.EhwKGkNMTHRfczIzMUl3REZYSEx3Z1FkcUJVaERB",
              "snippet": {
                "type": "textMessageEvent",
                "liveChatId": "KicKGFVDbExPdm5PNXNtSHNqeXZCZjBwdXAzQRILMEtIaUhXWURHcm8",
                "authorChannelId": "UClLOvnO5smHsjyvBf0pup3A",
                "publishedAt": "2025-04-13T06:59:23.930585+00:00",
                "hasDisplayContent": true,
                "displayMessage": "Streamer Testing Message",
                "textMessageDetails": {
                  "messageText": "Streamer Testing Message"
                }
              },
              "authorDetails": {
                "channelId": "UClLOvnO5smHsjyvBf0pup3A",
                "channelUrl": "http://www.youtube.com/channel/UClLOvnO5smHsjyvBf0pup3A",
                "displayName": "ChatWidget Testing",
                "profileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nspOsTSamNj0y-PPtCxi_dLjrzu6MKDPux2Xcl3-cqoi3a3KTrnVdMRxc3I3eEbQVJnQ=s88-c-k-c0x00ffffff-no-rj",
                "isVerified": false,
                "isChatOwner": true,
                "isChatSponsor": false,
                "isChatModerator": false
              },
              "msgId": "LCCEhwKGkNMTHRfczIzMUl3REZYSEx3Z1FkcUJVaERB",
              "userId": "UClLOvnO5smHsjyvBf0pup3A",
              "nick": "Streamer",
              "badges": [],
              "displayName": "Streamer",
              "isAction": false,
              "time": 1744527570705,
              "tags": [],
              "displayColor": null,
              "channel": "UClLOvnO5smHsjyvBf0pup3A",
              "text": "Streamer Testing Message",
              "emotes": [],
              "avatar": "https://yt3.ggpht.com/ytc/AIdro_nspOsTSamNj0y-PPtCxi_dLjrzu6MKDPux2Xcl3-cqoi3a3KTrnVdMRxc3I3eEbQVJnQ=s88-c-k-c0x00ffffff-no-rj",
              "perm": "default"
            }
          }
        }
        break;
      case "userMessageYt":
        detail = {
          listener: "message",
          event: {
            service: "youtube",
            data: {
              "kind": "youtube#liveChatMessage",
              "etag": "FFyVMBdCnaFyluxPZjqEqsPq7wg",
              "id": "LCC.EhwKGkNMTHRfczIzMUl3REZYSEx3Z1FkcUJVaERB",
              "snippet": {
                "type": "textMessageEvent",
                "liveChatId": "KicKGFVDbExPdm5PNXNtSHNqeXZCZjBwdXAzQRILMEtIaUhXWURHcm8",
                "authorChannelId": "UClLOvnO5smHsjyvBf0pup3A",
                "publishedAt": "2025-04-13T06:59:23.930585+00:00",
                "hasDisplayContent": true,
                "displayMessage": "User Testing Message",
                "textMessageDetails": {
                  "messageText": "User Testing Message"
                }
              },
              "authorDetails": {
                "channelId": "UClLOvnO5smHsjyvBf0pup3A",
                "channelUrl": "http://www.youtube.com/channel/UClLOvnO5smHsjyvBf0pup3A",
                "displayName": "ChatWidget Testing",
                "profileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nspOsTSamNj0y-PPtCxi_dLjrzu6MKDPux2Xcl3-cqoi3a3KTrnVdMRxc3I3eEbQVJnQ=s88-c-k-c0x00ffffff-no-rj",
                "isVerified": false,
                "isChatOwner": false,
                "isChatSponsor": false,
                "isChatModerator": false
              },
              "msgId": "LCCEhwKGkNMTHRfczIzMUl3REZYSEx3Z1FkcUJVaERB",
              "userId": "UClLOvnO5smHsjyvBf0pup3A",
              "nick": "User",
              "badges": [],
              "displayName": "User",
              "isAction": false,
              "time": 1744527570705,
              "tags": [],
              "displayColor": null,
              "channel": "UClLOvnO5smHsjyvBf0pup3A",
              "text": "User Testing Message",
              "emotes": [],
              "avatar": "https://yt3.ggpht.com/ytc/AIdro_nspOsTSamNj0y-PPtCxi_dLjrzu6MKDPux2Xcl3-cqoi3a3KTrnVdMRxc3I3eEbQVJnQ=s88-c-k-c0x00ffffff-no-rj",
              "perm": "default"
            }
          }
        }
        break;
      case "moderatorMessageYt":
        detail = {
          listener: "message",
          event: {
            service: "youtube",
            data: {
              "kind": "youtube#liveChatMessage",
              "etag": "FFyVMBdCnaFyluxPZjqEqsPq7wg",
              "id": "LCC.EhwKGkNMTHRfczIzMUl3REZYSEx3Z1FkcUJVaERB",
              "snippet": {
                "type": "textMessageEvent",
                "liveChatId": "KicKGFVDbExPdm5PNXNtSHNqeXZCZjBwdXAzQRILMEtIaUhXWURHcm8",
                "authorChannelId": "UClLOvnO5smHsjyvBf0pup3A",
                "publishedAt": "2025-04-13T06:59:23.930585+00:00",
                "hasDisplayContent": true,
                "displayMessage": "Moderator Testing Message",
                "textMessageDetails": {
                  "messageText": "Moderator Testing Message"
                }
              },
              "authorDetails": {
                "channelId": "UClLOvnO5smHsjyvBf0pup3A",
                "channelUrl": "http://www.youtube.com/channel/UClLOvnO5smHsjyvBf0pup3A",
                "displayName": "ChatWidget Testing",
                "profileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nspOsTSamNj0y-PPtCxi_dLjrzu6MKDPux2Xcl3-cqoi3a3KTrnVdMRxc3I3eEbQVJnQ=s88-c-k-c0x00ffffff-no-rj",
                "isVerified": false,
                "isChatOwner": false,
                "isChatSponsor": false,
                "isChatModerator": true
              },
              "msgId": "LCCEhwKGkNMTHRfczIzMUl3REZYSEx3Z1FkcUJVaERB",
              "userId": "UClLOvnO5smHsjyvBf0pup3A",
              "nick": "Moderator",
              "badges": [],
              "displayName": "Moderator",
              "isAction": false,
              "time": 1744527570705,
              "tags": [],
              "displayColor": null,
              "channel": "UClLOvnO5smHsjyvBf0pup3A",
              "text": "Moderator Testing Message",
              "emotes": [],
              "avatar": "https://yt3.ggpht.com/ytc/AIdro_nspOsTSamNj0y-PPtCxi_dLjrzu6MKDPux2Xcl3-cqoi3a3KTrnVdMRxc3I3eEbQVJnQ=s88-c-k-c0x00ffffff-no-rj",
              "perm": "default"
            }
          }
        }
        break;
      case "subscriberMessageYt":
        console.log("ORENJI EVENT TYPE RECEIVED");
        detail = {
          listener: 'message',
          event: {
            service: "youtube",
            data: {
              "kind": "youtube#liveChatMessage",
              "etag": "FFyVMBdCnaFyluxPZjqEqsPq7wg",
              "id": "LCC.EhwKGkNMTHRfczIzMUl3REZYSEx3Z1FkcUJVaERB",
              "snippet": {
                "type": "textMessageEvent",
                "liveChatId": "KicKGFVDbExPdm5PNXNtSHNqeXZCZjBwdXAzQRILMEtIaUhXWURHcm8",
                "authorChannelId": "UClLOvnO5smHsjyvBf0pup3A",
                "publishedAt": "2025-04-13T06:59:23.930585+00:00",
                "hasDisplayContent": true,
                "displayMessage": "Subscriber Testing Message",
                "textMessageDetails": {
                  "messageText": "Subscriber Testing Message"
                }
              },
              "authorDetails": {
                "channelId": "UClLOvnO5smHsjyvBf0pup3A",
                "channelUrl": "http://www.youtube.com/channel/UClLOvnO5smHsjyvBf0pup3A",
                "displayName": "ChatWidget Testing",
                "profileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nspOsTSamNj0y-PPtCxi_dLjrzu6MKDPux2Xcl3-cqoi3a3KTrnVdMRxc3I3eEbQVJnQ=s88-c-k-c0x00ffffff-no-rj",
                "isVerified": false,
                "isChatOwner": false,
                "isChatSponsor": true,
                "isChatModerator": false
              },
              "msgId": "LCCEhwKGkNMTHRfczIzMUl3REZYSEx3Z1FkcUJVaERB",
              "userId": "UClLOvnO5smHsjyvBf0pup3A",
              "nick": "Subscriber",
              "badges": [],
              "displayName": "Subscriber",
              "isAction": false,
              "time": 1744527570705,
              "tags": [],
              "displayColor": null,
              "channel": "UClLOvnO5smHsjyvBf0pup3A",
              "text": "Subscriber Testing Message",
              "emotes": [],
              "avatar": "https://yt3.ggpht.com/ytc/AIdro_nspOsTSamNj0y-PPtCxi_dLjrzu6MKDPux2Xcl3-cqoi3a3KTrnVdMRxc3I3eEbQVJnQ=s88-c-k-c0x00ffffff-no-rj",
              "perm": "default"
            }
          }
        }
        break;
    }

    let emulated = new CustomEvent('onEventReceived', {
      detail: detail
    });

    console.log("ORENJI EMULATED", emulated);

    window.dispatchEvent(emulated);

    return;
  }
})
