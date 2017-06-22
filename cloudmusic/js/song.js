$(function () {
	var timer
	// var mp3url = 'http://101.28.249.62/m10.music.126.net/20170622174535/767cba8a2cf4ce6b3c78f187402428eb/ymusic/3466/f88c/165c/3520e5664afd420989e88bc3a694c237.mp3?wshc_tag=1&wsts_tag=594b8be3&wsid_tag=dbe8c782&wsiphost=ipdbm'
	var mp3url = 'http://omh8xg82p.bkt.clouddn.com/3520e5664afd420989e88bc3a694c237.mp3'
	var audioEl = document.createElement('audio')
	audioEl.src = mp3url	
	$(audioEl).on('canplay',function () {
		audioEl.play()
		$('.disc').addClass('playing')
		bindBtnEve()
		timer&&clearTimeout(timer)
		timer = setTimeout(function () {
			$('.icon-pause').addClass('later')
		}, 2000)
	})

	function bindBtnEve () {
		$('#play-btn').on('click','.icon-play',function () {
			audioEl.play()
			$('.disc').removeClass('stop')
			timer&&clearTimeout(timer)
			timer = setTimeout(function () {
				$('.icon-pause').addClass('later')
			}, 2000)
		})
		$('#play-btn').on('click','.icon-pause',function () {
			audioEl.pause()
			$('.disc').addClass('stop')
			timer&&clearTimeout(timer)
			$('.icon-pause').removeClass('later')
		})
	}

});