// Redirect shorts, home page and trending to subscription feed
function handleNavigation() {
    if (window.location.pathname.startsWith('/shorts') ||
        window.location.pathname.endsWith('/shorts') ||
        window.location.pathname === '/' || 
        window.location.pathname === '/home' ||
        window.location.pathname.startsWith('/feed/recommended') ||
        window.location.pathname.startsWith('/feed/explore') ||
        window.location.pathname.startsWith('/feed/trending')) {
        window.location.replace('/feed/subscriptions');
    }
}

// Function to process channels properly
function isChannelPage() {
    return window.location.pathname.startsWith('/@') ||
        window.location.pathname.startsWith('/channel/') ||
        window.location.pathname.startsWith('/c/');
}

// Function to remove sections by its titles
function removeSectionsByTitle(containers, titles) {
    const normalizedTitles = titles.map(t => t.toLowerCase());
    containers.forEach(container => {
        const titleEl = container.querySelector('#title-text');
        if (!titleEl) {
            return;
        }
        const title = titleEl.textContent.trim().toLowerCase();
        if (normalizedTitles.some(t => title.includes(t))) {
            container.remove();
        }
    });
}

// Function to swap all Home links to Feed
function updateHomeLinks() {
    const homeSelectors = [
        'a[href="/"]',
        'a[href="/home"]',
        'a[href^="/?"]',
        'a[href^="/home?"]',
        'a[href="https://www.youtube.com/"]',
        'a[href="https://www.youtube.com"]',
        'a[href="https://m.youtube.com/"]',
        'a[href="https://m.youtube.com"]'
    ];
    const homeLinks = document.querySelectorAll(homeSelectors.join(','));
    homeLinks.forEach(link => {
        link.setAttribute('href', '/feed/subscriptions');
    });
}

// Function to remove distracting elements from navigation
function removeDistractingElements() {
    // Only clean up navigation elements
    const sidebarSelectors = [
        'ytd-guide-entry-renderer[aria-label="Home"]',
        'ytd-mini-guide-entry-renderer[aria-label="Home"]',
        'ytd-guide-section-renderer[aria-label="More from YouTube"]',
        'ytd-guide-entry-renderer[aria-label="Trending"]',
        'ytd-guide-section-renderer[aria-label="Explore"]',
        'ytd-guide-entry-renderer[aria-label="Music"]',
        'ytd-guide-entry-renderer[aria-label="Movies"]',
        'ytd-guide-entry-renderer[aria-label="Gaming"]',
        'ytd-guide-entry-renderer[aria-label="Sports"]',
        'ytd-guide-entry-renderer[aria-label="News"]',
        'ytd-guide-entry-renderer[aria-label="Learning"]',
        'ytd-guide-entry-renderer[aria-label="Fashion & Beauty"]',
        'ytd-guide-entry-renderer[aria-label="YouTube Music"]',
        'ytd-guide-entry-renderer[aria-label="YouTube Kids"]',
        'ytd-guide-entry-renderer[aria-label="YouTube TV"]',
        'ytd-guide-entry-renderer[aria-label="Browse channels"]',
        'ytd-guide-entry-renderer[aria-label="Manage subscriptions"]',
        'ytd-mini-guide-entry-renderer[aria-label="Shorts"]',
        'ytd-guide-entry-renderer[aria-label="Shorts"]'
    ];

    const endScreenSelectors = [
        'ytd-watch-next-secondary-results-renderer',  // End screen recommendations
        '.ytp-endscreen-content',                    // Video end screen overlay
        '.ytp-fullscreen-grid',                      // New video end screen overlay
        '.ytp-ce-element'                           // Clickable end screen elements
    ];

    const shortsSelectors = [
        'ytd-rich-shelf-renderer:has(#title-text[title="Shorts"])',  // Shorts shelf in feeds
        'ytd-rich-section-renderer:has(#title-text[title="Shorts"])', // Alternative shorts section
        'ytd-reel-shelf-renderer',                                    // Another shorts container
        'ytd-video-renderer:has(a[href*="/shorts/"])',               // Individual short videos in feeds
        'yt-tab-shape[tab-title="Shorts"]',                          // Shorts tab in navigation
        'tp-yt-paper-tab:has(paper-item[role="tab"][aria-label="Shorts"])'  // Alternative Shorts tab structure
    ];

    const postsSelectors = [
        'ytd-backstage-post-thread-renderer',                        // Community posts thread
        'ytd-backstage-post-renderer',                               // Single community post
        'ytd-post-renderer',                                         // Post renderer in feeds
        'ytd-rich-item-renderer:has(ytd-backstage-post-renderer)',   // Rich item wrapping posts
        'ytd-rich-item-renderer:has(ytd-post-renderer)',             // Rich item wrapping posts
        'ytd-rich-section-renderer:has(ytd-backstage-post-renderer)',// Section with posts
        'ytd-rich-section-renderer:has(ytd-post-renderer)',          // Section with posts
        'yt-tab-shape[tab-title="Posts"]',                           // Posts tab in channel
        'tp-yt-paper-tab:has(paper-item[role="tab"][aria-label="Posts"])',
        'yt-tab-shape[tab-title="Записи"]',
        'tp-yt-paper-tab:has(paper-item[role="tab"][aria-label="Записи"])',
        'a[href^="/post/"]',                                         // Direct post links
        'a[href*="/post/"]'
    ];

    const noConnectionSelectors = [
        'ytd-section-list-renderer' // No connection screen in the middle of redirect to subscriptions
    ]

    // Remove sidebar elements
    const sidebarElements = document.querySelectorAll(sidebarSelectors.join(','));
    sidebarElements.forEach(element => element.remove());

    // Rewrite home links to subscriptions for faster navigation
    updateHomeLinks();

    // Remove end screen recommendations
    const endScreenElements = document.querySelectorAll(endScreenSelectors.join(','));
    endScreenElements.forEach(element => element.remove());

    // Remove shorts from feeds
    const shortsElements = document.querySelectorAll(shortsSelectors.join(','));
    shortsElements.forEach(element => element.remove());

    // Remove posts from feeds and channel tabs
    const postsElements = document.querySelectorAll(postsSelectors.join(','));
    postsElements.forEach(element => element.remove());

    // Remove no connection screen (avoid nuking channel page content)
    if (!isChannelPage()) {
        const noConnectionElements = document.querySelectorAll(noConnectionSelectors.join(','));
        noConnectionElements.forEach(element => element.remove());
    }

    // On channel pages, remove Shorts and recommendation sections by title
    if (isChannelPage()) {
        const recommendationTitles = [
            'recommended',
            'for you',
            'videos you may like',
            'рекомендованные',
            'рекомендовано',
            'для вас',
            'вам может понравиться',
            'posts',
            'записи',
            'сообщество'
        ];
        const channelSections = document.querySelectorAll(
            'ytd-shelf-renderer, ytd-item-section-renderer, ytd-rich-section-renderer'
        );
        removeSectionsByTitle(Array.from(channelSections), recommendationTitles);
    }
}

// Run immediately when script loads
(function() {
    handleNavigation();
})();

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
    updateHomeLinks();
    removeDistractingElements();
});

// Listen for URL changes (YouTube is a SPA)
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        handleNavigation();
        updateHomeLinks();
        removeDistractingElements();
    }
}).observe(document, { subtree: true, childList: true });

// Create an observer to handle dynamically loaded content
const observer = new MutationObserver(() => {
    updateHomeLinks();
    removeDistractingElements();
});

// Start observing the document for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Handle history changes without modifying the original methods
window.addEventListener('pushState', handleNavigation);
window.addEventListener('replaceState', handleNavigation);
window.addEventListener('popstate', handleNavigation); 