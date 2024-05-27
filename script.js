// ==UserScript==
// @name         Remove YouTube Header
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  remove the youtube header on videos to provide a more in-app like experience
// @author       0tnan
// @match        *://*.youtube.com/*
// @exclude      *://music.youtube.com/*
// @exclude      *://*.music.youtube.com/*
// @grant        GM.xmlHttpRequest
// @connect      youtube.com
// @grant        GM_addStyle
// @run-at       document-end
// @downloadURL    https://raw.githubusercontent.com/0tnan/remove-youtube-header/main/script.js
// @updateURL    https://raw.githubusercontent.com/0tnan/remove-youtube-header/main/script.js
// ==/UserScript==

(function() {
  'use strict';

  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
      checkUrlChange();
  });

  function checkUrlChange() {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
          console.log('URL changed:', currentUrl);
          handleStyleChange(currentUrl);
          lastUrl = currentUrl;
      }
  }

  function handleStyleChange(url) {
      const isVideoUrl = /\/watch\?v=/.test(url);
      const styleElement = document.getElementById('custom-video-style');

      if (isVideoUrl && !styleElement) {
          // Add custom style
          const style = document.createElement('style');
          style.id = 'custom-video-style';
          style.innerHTML = `
            #header-bar {
              display: none;
            }
      
            .mobile-topbar-header-background {
              display: none;
            }
      
            .player-container.sticky-player {
              transform: translateY(-48px);
            }
      
            ytm-app.sticky-player {
              transform: translateY(-48px);
            }
          `;
          document.head.appendChild(style);
          console.log('Custom style added for video page.');
      } else if (!isVideoUrl && styleElement) {
          // Remove custom style
          styleElement.remove();
          console.log('Custom style removed for non-video page.');
      }
  }

  // Start observing
  function startObserving() {
      observer.observe(document, { subtree: true, childList: true });
      console.log('Started observing URL changes.');
      handleStyleChange(location.href); // Initial check
  }

  // Stop observing
  function stopObserving() {
      observer.disconnect();
      console.log('Stopped observing URL changes.');
  }

  // Monitor popstate event for browser navigation
  window.addEventListener('popstate', checkUrlChange);

  // Intercept clicks on links
  document.addEventListener('click', function(event) {
      const target = event.target;
      if (target.tagName.toLowerCase() === 'a' && target.href) {
          const href = target.href;
          // Delay the check to allow the navigation to complete
          setTimeout(() => {
              if (href !== lastUrl) {
                  checkUrlChange();
              }
          }, 100);
      }
  });

  // Automatically start observing
  startObserving();

  // Expose functions to start and stop observing (for debugging or other purposes)
  window.startObserving = startObserving;
  window.stopObserving = stopObserving;
})();