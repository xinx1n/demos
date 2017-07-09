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
		$('#loadinghotmusic').remove()
	}
	function hotsearchcb(data) {
		var elStr = ''
		$.each(data,function (index,item) {
			elStr += '<li>'+item+'</li>'
		})
		$('#hotsearchlist').append(elStr)
	}
	function searchsuggestioncb(data,val){
		var elStr = ''
		var dataProcessed = []
		data.forEach(function(element){
			uniAdd(dataProcessed,element.name)
			uniAdd(dataProcessed,element.singer)
			uniAdd(dataProcessed,element.album)
			uniAdd(dataProcessed,element.alias)
		})
		var suggestArr = dataProcessed.filter(function(element){
			return (element.toLowerCase().search(regTr(val).toLowerCase())!==-1)
		})
		$.each(suggestArr,function (index,item) {
			elStr += '<li><i class="icon"></i><span>'+item+'</span></li>'
		})
		$('#searchsuggestionlist').html(elStr)
	}
	function searchcb(data,val){
		var elStr = ''
		var searchResult = data.filter(function(element){
			return (changeSongInfoToString(element).toLowerCase().search(regTr(val).toLowerCase())!==-1)
		})
		$.each(searchResult,function (index,item) {
			var malias = item.alias==''?'':'<span>('+item.alias+')</span>'
			elStr += '<li> <a href="./song.html?id='+item.id+'"> <div class="info"> <div class="songtitle">'+item.name+malias+'</div> <div class="songinfo"> <svg class="sqimg"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use> </svg> '+item.singer+' - '+item.album+' </div> </div> <div class="playimg"> <svg> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-circled"></use> </svg> </div> </a> </li>'
		})
		addHistory(val)
		$('#searchresultlist').html(elStr)
		$('#loadingsearch').hide()
	}
	initData('./data/lastestmusic.json',latstestmusiccb)
	setTimeout(function () {
		initData('./data/hotmusic.json',hotmusiccb)
	},100)
	setTimeout(function(){
		initData('./data/hotsearch.json',hotsearchcb)
	},100)
	initSearchHistory()
	$('.mtabnav').on('click','li.tabtitle',function (e) {
		var $li = $(e.currentTarget)
		var index = $li.index()
		$li.addClass('active').siblings().removeClass('active')
		$('.mtabcontent>li').removeClass('active').eq(index).addClass('active')
	})
	var inputTimer = null
	$('#searchinput').on('input',function(e){
		var newval = this.value.trim()
		if(newval!==''){
			$('#searchform').addClass('notempty')
			$('#searchmain').addClass('hidden')
			$('#searchsuggestion').removeClass('hidden')
			inputTimer&&clearTimeout(inputTimer)
			inputTimer=setTimeout(function() {
				initData('./data/allsongs.json',function(data){
					searchsuggestioncb(data,newval)
				})
			}, 350);
			$('body').trigger('toggleSearch',2)
		}else{
			$('body').trigger('toggleSearch',1)
		}
		$('#searchingtxt').text(newval)
	})
	$('#searchform').on('submit',function(e,val){
		e.preventDefault()
		val = val||$('#searchinput').val().trim()
		if(val=='')return 
		$('#loadingsearch').show()
		initData('./data/allsongs.json',function(data) {
			searchcb(data,val)
		})
		$('body').trigger('toggleSearch',3)
	})
	$('#searchclose').on('click',function(e){
		$('#searchinput').val('')
		$('#searchinput').trigger('input')
	})
	$('#hotsearchlist').on('click','li',function(e){
		$('#searchinput').val($(this).text())
		$('#searchform').trigger('submit')
	})
	$('#searchsuggestionlist,#searchhistory').on('click','li',function(e){
		$('#searchinput').val($(this).text())
		$('#searchform').trigger('submit')
	})
	// $('#searchhistory').on('click','li',function(e){
	// 	$('#searchinput').val($(this).find('.historytxt').text())
	// 	$('#searchform').trigger('submit')
	// })
	$('#searchhistory').on('click','li .close',function(e){
		e.stopPropagation()
		var val = $(this).siblings('.historytxt').text()
		delHistory(val)
	})
	$('body').on('toggleSearch',function(e,status){
		switch (status) {
			case 1:
				$('#searchform').removeClass('notempty')
				$('#searchmain').removeClass('hidden')
				$('#searchsuggestion').addClass('hidden')
				$('#searchresult').addClass('hidden')
				break;
			case 2:
				$('#searchform').addClass('notempty')
				$('#searchmain').addClass('hidden')
				$('#searchsuggestion').removeClass('hidden')
				$('#searchresult').addClass('hidden')
				break;
			case 3:
				$('#searchform').addClass('notempty')
				$('#searchmain').addClass('hidden')
				$('#searchsuggestion').addClass('hidden')
				$('#searchresult').removeClass('hidden')
				break;
			default:
				break;
		}
	})
	//tools
	function initSearchHistory() {
		var arr = getHistory()
		var elStr = ''
		arr.forEach(function(element){
			elStr += '<li><i class="icon"></i><div class="historycontent"><span class="historytxt">'+element+'</span><figure class="close"><i class="closeicon"></i></figure></div></li>'
		})
		$('#searchhistory').html(elStr)
	}
	function addHistory(val) {
		addLocalStorage('searchHistory',val)
		initSearchHistory()
	}
	function delHistory(val) {
		delLocalStorage('searchHistory',val)
		initSearchHistory()
	}
	function getHistory(){
		return getLocalStorage('searchHistory')
	}
	function addLocalStorage(key,val) {
		var localItem = localStorage.getItem(key) || '[]'
		var localItemObj = JSON.parse(localItem)
		if(!(val instanceof Array)){val = [val]}
		val.forEach(function(element) {
			var index = localItemObj.indexOf(element)
			if(index>=0){
				localItemObj.splice(index,1)
			}
			localItemObj.unshift(element)
		})
		localStorage.setItem(key,JSON.stringify(localItemObj))
	}
	function delLocalStorage(key,val) {
		var localItem = localStorage.getItem(key) || '[]'
		var localItemObj = JSON.parse(localItem)
		if(!(val instanceof Array)){val = [val]}
		val.forEach(function(element) {
			var index = localItemObj.indexOf(element)
			if(index>=0){
				localItemObj.splice(index,1)
			}
		})
		localStorage.setItem(key,JSON.stringify(localItemObj))
	}
	function getLocalStorage(key){
		var localItem = localStorage.getItem(key) || '[]'
		return JSON.parse(localItem)
	}
	function changeSongInfoToString(item) {
		return item.name+item.singer+item.album+item.alias
	}
	function pad(num) {
		return num>=10?num+'':'0'+num
	}
	function uniAdd(arr,val){
		if(arr.indexOf(val)===-1){
			arr.push(val)
		}
	}
	//^ . [ $ ( ) | * + ? { \
	function regTr(str) {
		var reg = /\^|\.|\[|\$|\(|\)|\||\*|\+|\?|\{|\\/g
		return str.replace(reg,'\\$&')
	}
})
