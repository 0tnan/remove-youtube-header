const isYouTubeVideo = /(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:&.*|$)/i.test(window.location.href)
const headerBar = document.getElementById('header-bar')
const topbar = document.querySelectorAll('.mobile-topbar-header-background')[0]
const deleted = false

if (isYouTubeVideo) {
  const interval = setInterval(() => {
    headerBar.remove()
    topbar.remove()
    deleted = true
  }, 300)

  deleted ? clearInterval(interval) : () => {}
}
