if (window.location.href.search('getnative.me') !== -1) {
	let interval = setInterval(function() {
		const download = document.querySelector('.download')
		if (download) {
			window.clearInterval(interval)
			download.click()
		}
	}, 1000)
}
