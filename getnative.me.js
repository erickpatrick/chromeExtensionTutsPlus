if (window.location.href.search('getnative.me') !== -1) {
  let interval = setInterval(function() {
    const download = document.querySelector('.download')
    const hasListener = false

    if (download) {
      window.clearInterval(interval)

      if (!hasListener) {
        download.addEventListener('click', function () {
          setTimeout(function () {
            sendMessageToBackground({
              name: 'open-file'
            })
          }, 1000)
        })
      }

      download.click()
    }
  }, 1000)
}
