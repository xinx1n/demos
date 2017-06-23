$(function () {
	var timer,text_temp,audioEl
	var mp3url = 'http://omh8xg82p.bkt.clouddn.com/3520e5664afd420989e88bc3a694c237.mp3'
	play(mp3url)
	lyric('lrc/lrc.json')
	bindBtnEve()
	function play(url) {
		audioEl = document.createElement('audio')
		audioEl.src = mp3url	
		$(audioEl).on('canplay',function () {
			$('.disc').addClass('playing')
			timer&&clearTimeout(timer)
			timer = setTimeout(function () {
				$('.icon-pause').addClass('later')
			}, 2000)
			audioEl.play()
		})
		$(audioEl).on('ended',function () {
			$('.icon-pause').click()
		})
	}
	function lyric(url) {
		$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
			})
			.done(function(data) {
				var $container = $('.lines')
				var Lyric = parseLyric(data.lyric,$container)
				audioEl.ontimeupdate= function () {
					currentTime = this.currentTime
					scrollLyirc(Lyric,currentTime,$container)
				}
			})
	}
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
	function parseLyric(lrc,$container) {
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
	                top: (index-1)*32*myglobaldpr
	            }
	            timeStamp.push(time)
	            elStr += '<p data-time="'+ time +'"">'+text+'</p>'
	        })
	    }
	    $container.append($(elStr))
	    timeStamp.sort(function (a,b) {return b-a })
		Lyric.lrcObjParsed = lrcObjParsed
		Lyric.timeStamp = timeStamp
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
		    var top = Math.min(0,-lrc.top)
		    $container.css({'transform':'translateY(-'+lrc.top+'px)'});
		    text_temp = text
		}
	}
})
