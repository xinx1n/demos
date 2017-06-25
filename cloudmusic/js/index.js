$(function () {
	function initData(url) {
		$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
			})
			.done(function(data) {
				console.log(data,'ss')
				var elStr = ''
				$.each(data,function (index,item) {
					console.log(item)
					elStr += '<li><a href="./song.html?id='+item.id+'">'+ item.name +'-'+item.singer+'</a></li>'
				})
				console.log($(elStr))
				$('#songs').append(elStr)
			})
			.fail(function (error) {
				console.log(error)
			})
	}
	initData('./data/data.json')
})