$(function () {
	function initData(url,cb) {
		$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
			})
			.done(function(data) {
				cb.call(undefined,data)
			})
			.fail(function (error) {
				console.log(error)
			})
	}
	function latstestmusiccb(data){
		var elStr = ''
		$.each(data,function (index,item) {
			var malias = item.alias==''?'':'<span>('+item.alias+')</span>'
			elStr += '<li> <a href="./song.html?id='+item.id+'"> <div class="info"> <div class="songtitle">'+item.name+malias+'</div> <div class="songinfo"> <svg class="sqimg"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use> </svg> '+item.singer+' - '+item.album+' </div> </div> <div class="playimg"> <svg> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-circled"></use> </svg> </div> </a> </li>'

		})
		$('#lastestmusic').append(elStr)
		$('#loadingmusic').remove()
	}
	function hotmusiccb(data) {
		var elStr = ''
		$.each(data,function (index,item) {
			var malias = item.alias==''?'':'<span>('+item.alias+')</span>'
			elStr += '<li> <a href="./song.html?id='+item.id+'"><div class="num">'+ pad(index+1) +'</div> <div class="info"> <div class="songtitle">'+item.name+malias+'</div> <div class="songinfo"> <svg class="sqimg"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use> </svg> '+item.singer+' - '+item.album+' </div> </div> <div class="playimg"> <svg> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-circled"></use> </svg> </div> </a> </li>'

		})
		$('#hotmusiclist').append(elStr)
	}
	initData('./data/lastestmusic.json',latstestmusiccb)
	setTimeout(function () {
		initData('./data/hotmusic.json',hotmusiccb)
		$li = $('.mtabcontent>li').eq(1)
	},300)
	$('.mtabnav').on('click','li.tabtitle',function (e) {
		var $li = $(e.currentTarget)
		var index = $li.index()
		$li.addClass('active').siblings().removeClass('active')
		$('.mtabcontent>li').removeClass('active').eq(index).addClass('active')
		// $li.trigger('tabChange', index)
	})
	/*
	$('.mtabnav').on('tabChange',function (e,index) {
		var $li = $('.mtabcontent>li').eq(index)
		if($li.attr('data-downloaded') === 'yes'){
		      return 
		}
		if (index === 1) {
			console.log('get2')
	        $.get('./data/indextab2.json').then(function (response) {
	          $li.text(response.msg.content)
	          $li.attr('data-downloaded', 'yes')
	        })
	    }else if(index === 2){
			console.log('get3')
	        $.get('./data/indextab3.json').then(function (response) {
	          // $li.text(response.msg.content)
	          $li.attr('data-downloaded', 'yes')
	        })
	    }
	})
	*/
	//tools
	function pad(num) {
		return num>=10?num+'':'0'+num
	}
})
