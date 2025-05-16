# YouTube Detox

Take back control of your YouTube experience. In a world of endless recommendations and addictive short-form content, YouTube Detox empowers you to choose what you watch consciously. Your time is precious - spend it on content that matters to you, not what algorithms suggest you should watch.

This Firefox extension transforms YouTube into a focused, distraction-free space where you decide what to watch based on your subscriptions and intentional choices, not algorithmic suggestions.

## Features

- **No More Distractions**
  - Removes all recommendation feeds (home, trending, explore)
  - Eliminates end screen video suggestions
  - Removes the sidebar recommendations on video pages
  - Automatically redirects homepage to your subscription feed

- **Shorts-Free Experience**
  - Completely removes YouTube Shorts
  - Blocks navigation to Shorts URLs
  - Removes Shorts from subscription feeds
  - Hides Shorts tab and navigation elements

- **Clean, Focused Interface**
  - Centers video content for better viewing experience
  - Removes unnecessary navigation items
  - Keeps only essential elements you need
  - Maintains a clean, minimal design

- **Smart Protection**
  - Handles YouTube's dynamic page updates
  - Prevents automatic redirects to recommended content
  - Works with YouTube's single-page application design
  - Maintains functionality while browsing subscriptions

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes between versions.

## Installation

1. Open Firefox and go to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to the extension's directory and select the `manifest.json` file

For permanent installation, check the Firefox Add-ons store - this extension might already be available there!

## Development

The extension consists of:
- `manifest.json`: Extension configuration
- `styles/youtube-detox.css`: CSS rules for hiding elements and layout modifications
- `content-scripts/youtube-detox.js`: JavaScript for handling dynamic content, navigation, and functionality

## Contributing

Feel free to submit issues and enhancement requests! Together we can build a more mindful YouTube experience.

## License

This project is licensed under the Mozilla Public License 2.0 (MPL-2.0) - see the [LICENSE](LICENSE) file for details.