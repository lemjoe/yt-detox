// Block navigation to Shorts URLs and redirect home to feed
function handleNavigation() {
    // If we're on a shorts page, redirect to feed
    if (window.location.pathname.startsWith('/shorts')) {
        window.location.replace('/feed/subscriptions');
        return;
    }
    
    // Redirect home page and trending to subscription feed
    if (window.location.pathname === '/' || 
        window.location.pathname === '/home' ||
        window.location.pathname.startsWith('/feed/recommended') ||
        window.location.pathname.startsWith('/feed/explore') ||
        window.location.pathname.startsWith('/feed/trending')) {
        window.location.replace('/feed/subscriptions');
    }
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

    const sidebarElements = document.querySelectorAll(sidebarSelectors.join(','));
    sidebarElements.forEach(element => element.remove());
}

// Run immediately when script loads
(function() {
    handleNavigation();
})();

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
    removeDistractingElements();
});

// Listen for URL changes (YouTube is a SPA)
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        handleNavigation();
        removeDistractingElements();
    }
}).observe(document, { subtree: true, childList: true });

// Create an observer to handle dynamically loaded content
const observer = new MutationObserver(() => {
    removeDistractingElements();
});

// Start observing the document for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Block programmatic navigation to shorts and handle home redirects
const pushState = history.pushState;
history.pushState = function() {
    pushState.apply(history, arguments);
    setTimeout(handleNavigation, 0);
};

const replaceState = history.replaceState;
replaceState = function() {
    replaceState.apply(history, arguments);
    setTimeout(handleNavigation, 0);
};

// Also handle popstate events (browser back/forward buttons)
window.addEventListener('popstate', () => {
    setTimeout(handleNavigation, 0);
}); 