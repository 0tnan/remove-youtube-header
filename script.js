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

  console.log('remove-youtube-header')

  const isYouTubeVideo = /(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:&.*|$)/i.test(window.location.href)

  if (isYouTubeVideo) {
    const style = document.createElement('style')
    style.id = 'remove-youtube-header'
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
    `
    document.head.appendChild(style);
  } else {
    document.getElementById('remove-youtube-header').remove()
  }
})();