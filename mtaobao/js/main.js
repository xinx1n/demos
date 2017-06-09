!function () {
		//swiper
		var myoptions = {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        autoplayDisableOnInteraction:true,
		        loop: true,
		        grabCursor: true,
		        speed: 1000,
		        autoplay: 3000,
		}
	    var swiper = new Swiper('.swiper-container', myoptions);
	  //   window.onresize = function () {
			// window.location.reload()
	 	// }
	 	//加载背景图
	 	function loadBackgrImg (els) {
	 		Array.prototype.forEach.call(els,function (el) {
	 		  // el.style.backgroundImage = `url(${el.dataset.src})`
	 		  el.style.backgroundImage = 'url(' + el.dataset.src + ')'
	 		})
	 	}
	 	//显示隐藏 gotop 按钮
	 	function showGoTop () {
	 		var goTopEl = document.getElementById('goTop')
	 		goTopEl.style.display = window.scrollY<463*myglobaldpr ? 'none': 'block'
	 	}
	 	document.addEventListener("DOMContentLoaded", function(){
	 		var mbody = document.querySelector('body')
	 		mbody.style.backgroundColor = '#eee'
	 		//显示隐藏 gotop 按钮
	 		showGoTop()
	 		//加载背景图
	 	  	var els1 = document.querySelectorAll('.fscreen [data-src],.fscreen[data-src]')
		 	var els2 = document.querySelectorAll('.sscreen [data-src],.sscreen[data-src]')
		 	var els3 = document.querySelectorAll('.tscreen [data-src],.tscreen[data-src]')
		 	loadBackgrImg(els1)
		 	setTimeout(function() {
		 		loadBackgrImg(els2)
		 	},500)
		 	setTimeout(function() {
		 		loadBackgrImg(els3)
		 	},800)
		 	//头条滚动
		 	var scrollEl = document.querySelectorAll('.horizontal-container>.horizontal-view')
		 	var scrollContainer = document.querySelector('.horizontal-container')
		 	var length = scrollEl.length
		 	var count = 1
		 	setInterval(function () {
		 	  if(count >= length ){ count = 0 }
		 	  // scrollContainer.style.transform = `translateY(-${100*count}%)`
		 	  scrollContainer.style.transform = 'translateY(-' + 100*count + '%)'
		 	  count++
		 	},2500)
		 	//细分割线
		 	//垂直
		 	var speys = document.querySelectorAll('.spey')
		 	Array.prototype.forEach.call(speys,function (spe) {
		 		spe.style.backgroundColor = '#E8E8E8'
		 		spe.style.width = '1px'
		 		spe.style.height = spe.parentElement.getBoundingClientRect().height + 'px'
		 	})
		 	//水平
		 	var spexs = document.querySelectorAll('.spex')
		 	Array.prototype.forEach.call(spexs,function (spe) {
		 		spe.style.backgroundColor = '#E8E8E8'
		 		spe.style.height = '1px'
		 		spe.style.width = spe.parentElement.getBoundingClientRect().width + 'px'
		 	})
		 	//显示隐藏 gotop 按钮
		 	var scrollTime=null
		 	window.addEventListener('scroll',function () {
		 		scrollTime&&clearTimeout(scrollTime)
		 		scrollTime = setTimeout(function () {
			 		showGoTop()
		 		}, 300)
		 	})
		 	var goTopEl = document.getElementById('goTop')
 			var goTopTimer = null
		 	goTopEl.addEventListener('click',function () {
		 		var perlen = Math.sqrt(window.scrollY)/1.5 * myglobaldpr
		 		goTopTimer =  setInterval(function(){
		 			if(window.scrollY<=0){
		 				clearInterval(goTopTimer)
		 			}
		 			window.scrollBy(0,-perlen)
		 		},10)
		 	})
		 	document.addEventListener('touchstart',function () {
		 		goTopTimer&&clearInterval(goTopTimer);
		 	})
		 	document.addEventListener('mousedown',function () {
		 		goTopTimer&&clearInterval(goTopTimer);
		 	})
	 	});
}();

