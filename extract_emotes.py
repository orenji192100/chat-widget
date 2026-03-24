#!/usr/bin/env python3
"""
Extract emotes from HTML file and convert to JavaScript format.
Usage: python3 extract_emotes.py
"""
import re
import os

# File paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(SCRIPT_DIR, 'emotes.html')
OUTPUT_FILE = os.path.join(SCRIPT_DIR, 'emotes_new.js')

def extract_emotes(html_file):
    """Extract aria-label and src from img tags in HTML file."""
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Find all img tags with aria-label and src
    pattern = r'<img[^>]*aria-label="([^"]*)"[^>]*src="([^"]*)"[^>]*>'
    matches = re.findall(pattern, html_content)

    # Create emotes dictionary
    emotes = {}
    for aria_label, src in matches:
        emotes[aria_label] = src

    return emotes

def format_as_js(emotes):
    """Format emotes dictionary as single-line JavaScript object with single quotes."""
    items = [f"'{label}':'{url}'" for label, url in emotes.items()]
    return "{" + ",".join(items) + "}"

def main():
    print(f"Reading from: {INPUT_FILE}")

    if not os.path.exists(INPUT_FILE):
        print(f"Error: {INPUT_FILE} not found!")
        return

    # Extract emotes
    emotes = extract_emotes(INPUT_FILE)
    print(f"Extracted {len(emotes)} emotes")

    # Format as JavaScript
    js_output = format_as_js(emotes)

    # Write to output file
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_output)

    print(f"Output written to: {OUTPUT_FILE}")
    print(f"\nAll extracted emotes:")
    for i, (label, url) in enumerate(emotes.items(), 1):
        print(f"  {i}. '{label}': '{url}'")

if __name__ == "__main__":
    main()
