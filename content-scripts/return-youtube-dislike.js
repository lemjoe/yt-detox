// Basic test to verify script loading
console.log('YouTube Detox: RYD script starting');

document.addEventListener('DOMContentLoaded', function() {
    console.log('YouTube Detox: DOM Content Loaded');
});

// Also try with load event
window.addEventListener('load', function() {
    console.log('YouTube Detox: Window Loaded');
});

// Return YouTube Dislike API integration
const RYD_API_URL = 'https://returnyoutubedislikeapi.com/votes';

// Cache to store dislike counts and reduce API calls
const dislikeCache = new Map();
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour in milliseconds

// Fetch dislike count for a video
async function fetchDislikes(videoId) {
    try {
        const cachedData = dislikeCache.get(videoId);
        if (cachedData) return cachedData.dislikes;

        const response = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${RYD_API_URL}?videoId=${videoId}`);
            xhr.onload = () => xhr.status === 200 ? resolve(xhr.responseText) : reject();
            xhr.onerror = reject;
            xhr.send();
        });

        const data = JSON.parse(response);
        if (!data?.dislikes) return null;

        dislikeCache.set(videoId, { dislikes: data.dislikes });
        return data.dislikes;
    } catch {
        return null;
    }
}

// Format number for display (e.g., 1.5K, 1.2M, or 1,5 млн, 1,2 тыс. for Russian)
function formatNumber(number) {
    const isRussian = document.documentElement.lang === 'ru-RU';
    
    if (isRussian) {
        if (number >= 1000000) {
            // Use comma as decimal separator for Russian locale
            return (number / 1000000).toFixed(1).replace('.', ',') + ' млн';
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(1).replace('.', ',') + ' тыс.';
        }
        return number.toString();
    } else {
        if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
        if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
        return number.toString();
    }
}

// Wait for an element to be present in the DOM
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timeout waiting for ${selector}`));
        }, timeout);
    });
}

// Update dislike count in the UI
async function updateDislikeUI(dislikeCount) {
    try {
        // Wait for the dislike button view model
        const dislikeButton = await waitForElement('dislike-button-view-model');
        if (!dislikeButton) return;

        // Find the button element within the view model structure
        const button = dislikeButton.querySelector('button.yt-spec-button-shape-next');
        if (!button) return;

        // Find existing text content container or create new one
        let textContainer = button.querySelector('.yt-spec-button-shape-next__button-text-content');
        if (!textContainer) {
            textContainer = document.createElement('div');
            textContainer.className = 'yt-spec-button-shape-next__button-text-content';
            textContainer.style.marginLeft = '0px';
            
            // Insert after the icon
            const iconDiv = button.querySelector('.yt-spec-button-shape-next__icon');
            if (iconDiv && iconDiv.nextSibling) {
                button.insertBefore(textContainer, iconDiv.nextSibling);
            } else {
                button.appendChild(textContainer);
            }
        }

        // Find or create the dislike count span
        let dislikeText = textContainer.querySelector('.ytd-dislike-count');
        if (!dislikeText) {
            dislikeText = document.createElement('span');
            dislikeText.className = 'ytd-dislike-count';
            textContainer.appendChild(dislikeText);
        }

        // Update the text and aria-label
        if (dislikeCount !== null) {
            const formattedCount = formatNumber(dislikeCount);
            dislikeText.textContent = formattedCount;
            button.setAttribute('aria-label', `${button.getAttribute('aria-label')} и ещё ${formattedCount} пользователям`);
        }
    } catch (error) {
        console.error('[RYD] Error updating UI:', error);
    }
}

// Extract video ID from URL
function getVideoId(url = window.location.href) {
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    } catch {
        return null;
    }
}

// Main function to handle dislike display
async function handleDislikes() {
    const videoId = getVideoId();
    if (!videoId) {
        console.log('[RYD] No video ID found');
        return;
    }

    console.log('[RYD] Processing video:', videoId);
    try {
        await waitForElement('ytd-watch-flexy');
        const dislikes = await fetchDislikes(videoId);
        await updateDislikeUI(dislikes);
    } catch (error) {
        console.error('[RYD] Error:', error);
    }
}

// Initialize
document.addEventListener('yt-navigate-finish', handleDislikes);

// Initial load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleDislikes);
} else {
    handleDislikes();
} 