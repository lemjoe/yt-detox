# YouTube Detox

A Firefox extension that helps you stay focused by removing distracting elements from YouTube.

## Features

- Removes YouTube Shorts completely
- Hides video recommendations on the home page
- Hides the sidebar recommendations on video pages
- Hides comments by default (with a toggle button to show them if needed)
- Removes end screen recommendations
- Hides the Trending tab
- Keeps your subscription feed intact
- Shows a clean, distraction-free homepage

## Installation

1. Open Firefox and go to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to the extension's directory and select the `manifest.json` file

For permanent installation, you'll need to submit the extension to Firefox Add-ons store.

## Development

The extension consists of:
- `manifest.json`: Extension configuration
- `styles/youtube-detox.css`: CSS rules for hiding and modifying YouTube elements
- `content-scripts/youtube-detox.js`: JavaScript for handling dynamic elements and adding functionality

## Contributing

Feel free to submit issues and enhancement requests! 