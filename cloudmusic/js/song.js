$(function () {
	var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
	isiOS&&$('.disc .cover,.disc .lightshadow').css({'animation':'initial'})
	var timer,text_temp,audioEl
	let id = (location.search.match(/\bid=([^&]*)/) || [,'1'])[1]||'1'
	loadData('./data/songs/'+ id +'.json')
	function loadData(url) {
		$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
			})
			.done(function(data) {
				renderSongInfo(data)
				play(data.url)
				bindBtnEve()
				var $container = $('.lines')
				var Lyric = parseAndRenderLyric(data.lyric,$container)
				audioEl.ontimeupdate= function () {
					currentTime = this.currentTime
					scrollLyirc(Lyric,currentTime,$container)
				}
			})
			.fail(function (error) {
				loadData('./data/songs/1.json')
			})
	}
	function play(url) {
		audioEl = document.createElement('audio')
		audioEl.src = url	
		$(audioEl).on('canplay',function () {
			$('.disc').addClass('playing')
			isiOS&&ani()
			timer&&clearTimeout(timer)
			timer = setTimeout(function () {
				$('.icon-pause').addClass('later')
			}, 2000)
			audioEl.play()
		})
		audioEl.play()
		$(audioEl).on('ended',function () {
			$('.icon-pause').click()
		})
	}
	function bindBtnEve () {
		$('#play-btn').on('click','.icon-play',function () {
			audioEl.play()
			$('.disc').addClass('playing')
			isiOS&&ani()
			timer&&clearTimeout(timer)
			timer = setTimeout(function () {
				$('.icon-pause').addClass('later')
			}, 2000)
		})
		$('#play-btn').on('click','.icon-pause',function () {
			audioEl.pause()
			$('.disc').removeClass('playing')
			$('.disc .cover,.disc .lightshadow').stop()
			timer&&clearTimeout(timer)
			$('.icon-pause').removeClass('later')
		})
	}
	function ani(){
		AnimateRotate('.disc .cover,.disc .lightshadow',360,20000,'linear',ani)
	}
	function renderSongInfo (songInfo) {
		let{name,singer,coverSrc,bgSrc} = songInfo
		$("#bg-img").css('background-image','url('+bgSrc+')')
		$("#cover").attr('src',coverSrc)
		$("#song-name").text(name)
		$("#singer").text(singer)
		
	}
	function parseAndRenderLyric(lrc,$container) {
    	var Lyric = {}
    	var lrcObjParsed = {}
    	var timeStamp = []
    	var index=0
        var elStr = ''
	    var lyrics = lrc.split("\n")
	    var len = lyrics.length
	    for(var i=0;i<len;i++){
	        var lyric = decodeURIComponent(lyrics[i])
	        var timeReg = /\[\d*:\d*(\.\d*)*\]/g
	        var timeRegExpArr = lyric.match(timeReg)
	        if(!timeRegExpArr)continue
	        var clause = lyric.replace(timeReg,'')
	        timeRegExpArr.forEach(function (element) {
	            var min = Number(String(element.match(/\[\d*/i)).slice(1))
	            var sec = Number(String(element.match(/\:\d*\.\d*/i)).slice(1))
	            var time = min * 60 + sec
	            var text = clause||'&nbsp;'
	            lrcObjParsed[time] = {
	                index:index++,
	                text:text,
	                // top: (index-1)*32*myglobaldpr
	            }
	            timeStamp.push(time)
	            elStr += '<p>'+text+'</p>'
	        })
	    }
	    $container.append($(elStr))
	    timeStamp.sort(function (a,b) {return b-a })
		Lyric.lrcObjParsed = lrcObjParsed
		Lyric.timeStamp = timeStamp
		// Lyric.height =  $container.find('p').get(0).getBoundingClientRect().height
		Lyric.height = $container.find('p').outerHeight()
		return Lyric
	}

	function getCurrentTimeStamp (timeStamp,currentTime) {
		var len = timeStamp.length
		for(var i=0;i<len;i++){
			let element = timeStamp[i]
			if(element<=currentTime){
				return element
			}
		}
		return null
	}
	function scrollLyirc (Lyric,currentTime,$container) {
		var lrcObjParsed = Lyric.lrcObjParsed
		if(!lrcObjParsed)return
		var timeStamp = Lyric.timeStamp
		var currentTimeStamp = getCurrentTimeStamp(timeStamp,currentTime)
		if(!currentTimeStamp) return
		var lrc = lrcObjParsed[currentTimeStamp]
		if(!lrc)return
		var text = lrc.text
		if(text != text_temp){
		    $container.find('p.current').removeClass('current')
		    var $p = $container.find('p:nth-child('+(lrc.index+1)+')')
		    $p.addClass('current')
		    var top = (lrc.index-1)*Lyric.height
		    $container.css({'transform':'translateY(-'+top+'px)'});
		    text_temp = text
		}
	}
	function AnimateRotate(slector,d,duration,easing,complete){
		$(slector).animate({deg: d}, {
			duration: duration,
			easing: easing,
			step: function(now){
				$(slector).css({
					transform: "rotate(" + now + "deg)"
				})
			},
			complete:complete
		})
		// $({deg: 0}).animate({deg: d}, {
		// 	duration: duration,
		// 	easing: easing,
		// 	step: function(now){
		// 		$(slector).css({
		// 			transform: "rotate(" + now + "deg)"
		// 		})
		// 	},
		// 	complete:complete
		// })
	}
})

