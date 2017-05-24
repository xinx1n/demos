 var app = new Vue({
         el: '#articles',
         data: {
             articles:[
                 {
                     id:'article1',
                     link:'https://medium.com/google-design/seoul-printed-matter-politics-and-performance-fa3af37c7547',
                     title:'Seoul: Printed Matter, Politics, and Performance',
                     description:'Four studios talk about the current design scene in South Korea’s capital.',
                     tag:'Medium / Google Design',
                     src:'http://omh8xg82p.bkt.clouddn.com/17-5-9/70548308-file_1494332126006_38fd.jpg?imageView2/0/interlace/1/q/45|imageslim',
                 },{
                     id:'article2',
                     link:'https://design.google.com/articles/daydream/',
                     title:'Speaking Volumes',
                     description:'Best practices for designing a brand in VR.',
                     tag:' Article / Tutorial ',
                     src:'http://omh8xg82p.bkt.clouddn.com/17-5-9/17187570-file_1494330587178_5e88.png?imageView2/0/interlace/1/q/45|imageslim',
                 },{
                     id:'article3',
                     link:'https://design.google.com/articles/asana/',
                     title:'Asana: Productivity with Personality',
                     description:'Making to-dos more doable with color and character.',
                     tag:'Article / Case Study',
                     src:'http://omh8xg82p.bkt.clouddn.com/17-5-9/39663127-file_1494321627684_c0c7.png?imageView2/0/interlace/1/q/45|imageslim',
                 },{
                     id:'article4',
                     link:'https://design.google.com/articles/stickers/',
                     title:'Sticky Conversations',
                     description:'Allo sticker sets balance the universal and unique.',
                     tag:'Article / Roundtable',
                     src:'http://omh8xg82p.bkt.clouddn.com/17-5-9/63563146-file_1494321656179_100fe.jpg?imageView2/0/interlace/1/q/45|imageslim',
                 },{
                     id:'article5',
                     link:'https://design.google.com/articles/digital-natives/',
                     title:'No Such Thing as Offline',
                     description:'Digital natives are redesigning the way we build tech one tap at a time.',
                     tag:'Article / Op Ed',
                     src:'https://g-design.storage.googleapis.com/production/v6/assets/article/digital-natives/GOE_Digital_Natives_tile_4960_4960.svg',
                 },{
                     id:'article6',
                     link:'https://design.google.com/articles/guide-span-tokyo/',
                     title:'Guide to SPAN Tokyo',
                     description:'Get to know our speakers and livestream the event on October 6.',
                     tag:'Article / Announcement',
                     src:'http://omh8xg82p.bkt.clouddn.com/17-5-9/19386308-file_1494321679260_b288.png?imageView2/0/interlace/1/q/45|imageslim',
                 },{
                     id:'article7',
                     link:'https://design.google.com/articles/design-is-never-done/',
                     title:'Design Is Never Done',
                     description:'Material Design’s new suite of tools and guidelines—all in one place.',
                     tag:'Article / Announcement',
                     src:'https://g-design.storage.googleapis.com/production/v6/assets/article/design-is-never-done/homepage-tile-1x1.svg',
                 },{
                     id:'article8',
                     link:'https://design.google.com/articles/making-motion-meaningful/',
                     title:'Making Motion Meaningful',
                     description:'Learn from motion designers working on Google Photos, YouTube Kids, Android, and Google Duo.',
                     tag:'Article / Op Ed',
                     src:'http://omh8xg82p.bkt.clouddn.com/17-5-9/45493750-file_1494321694765_130e9.png?imageView2/0/interlace/1/q/45|imageslim',
                 },{
                     id:'article9',
                     link:'https://design.google.com/articles/volume-two/',
                     title:'Volume Two',
                     description:'Explore Tokyo and Los Angeles with our SPAN 2016 reader.',
                     tag:'Article / Case Study',
                     src:'http://omh8xg82p.bkt.clouddn.com/17-5-9/44715793-file_1494321697036_12262.jpg?imageView2/0/interlace/1/q/45|imageslim',
                 },
             ]
         }
 });
//
 $(function() {
     let toTop = $(window).scrollTop()
     changleTitle()
     $(window).on('scroll', function() {
         toTop = $(window).scrollTop()
         changleTitle()
         showGoToTop()
         
     })
     $(window).on('resize', function() {
         changleTitle()
     })
     $('#gototop').on('click', function() {
         // let toTop = $(window).scrollTop()
         $("html,body").animate({scrollTop: 0}, Math.sqrt(toTop)*20)         
     })
     /* clickEffect */
     let $clickEl;
     $('body').on('mousedown', 'a', function(e) {
         $clickEl = clickEffect(e, 100, false)
     })
     $('body').on('mouseup', function(e) {
         clickEffect(e, 3000, true, $clickEl)
     })
     $('body').on('mouseout','a',function(e) {
         clickEffect(e, 3000, true, $clickEl)
     })
     $('body').on('click','a:not([href^=#]):not(.myTemp)',function (e) {
         e.preventDefault()
         setTimeout(function () {
            newWindow(e.currentTarget.href)
            // window.open(e.currentTarget.href,e.currentTarget.href)
         },150)
     })

     /* Swiper */
     var mySwiper = new Swiper('.swiper-container', {
         pagination: '.swiper-pagination',
         paginationClickable: true,
         nextButton: '.swiper-button-next',
         prevButton: '.swiper-button-prev',
         parallax: true,
         autoplayDisableOnInteraction:false,
         loop: true,
         grabCursor: true,
         speed: 1000,
         autoplay: 3000,
     });
     $('.swiper-container').on('mouseenter',()=>{
         mySwiper.stopAutoplay()
     });
     $('.swiper-container').on('mouseleave',()=>{
         mySwiper.startAutoplay()
     });
     // 加载背景
     $('.article-bg').each(function() {
         let tempImage = document.createElement('img')
         let msrc = $(this).data('src')
         tempImage.src = msrc
         let $this = $(this)
         tempImage.onload = function(){
            $this.css({
                 'background-image':`url(${msrc})`
            })
         }
     })
     // 给标题添加 · 和 ¬
     formatSrt()
     // 锚链接平滑滚动
     $('a[href^=#]').click(function(event) {
         var targetId = $(this).attr('href').replace(/\w+.html/,'')
         setTimeout(function () {
             let target = $(targetId).offset().top
             let len = Math.abs(toTop-target)
             $("html,body").animate({scrollTop: target-65}, Math.sqrt(len)*20)
         }, 100)
         return false
     });
// declaration function
     // 切换 title 
     function changleTitle() {
         let t1 = $('.header-container .title')
         let t2 = $('.header-fade .header-fade-text')
         // let toTop = $(window).scrollTop()
         if ($(window).width() <= 800) {
             t2.css('opacity', '0')
             t1.css('display', 'block')
             t1.css('opacity', '1')
             $('.header-fade').css('height','100px')
             $('.header-container').css('box-shadow', toTop >0 ? '0 1px 5px 1px hsla(0,0%,0%,.6)' : 'none')
         }else{
             $('.header-fade').css('height','256px')
             if (toTop >= 50) {
                 t2.css('opacity', '0')
                 t1.css('display', 'block')
                 t1.offset()
                 t1.css('opacity', '1')
             } else {
                 t2.css('opacity', '1')
                 t1.css('opacity', '0')
                 t1.one('transitionend', function() {
                     if (t1.css('opacity') === '0') {
                         t1.css('display', 'none')
                     }
                 })
             }
         $('.header-container').css('box-shadow', toTop > 190 ? '0 1px 5px 1px hsla(0,0%,0%,.6)' : 'none')
         }
     }
     // 点击特效
     function clickEffect(e, value, bl, $el) {
         if (bl && !$el) return
         let x = e.clientX
         let y = e.clientY
         let $div = $el || $('<div data-roal="shin"></div>')
         let transSty = $el ? 'all .05s ease-out' : 'all .2s ease-in-out'
         if (!bl && !$el) {
             $div.css({
                 'position': 'fixed',
                 'z-index': '10086',
                 'left': x,
                 'top': y,
                 'transform': 'translate(-50%,-50%)',
                 'background': 'hsla(0,100%,100%,.3)',
                 'border-radius': '50%',
                 'width': '0',
                 'height': '0',
                 'pointer-events': 'none',
                 'filter':'brightness(1.9)'
             })
             $div.appendTo('body')
             $div.offset()
         }
         $div.css({
             'transition': transSty,
             'width': value,
             'height': value
         })
         if (bl && $el) {
             $div.one("transitionend", function() {
                 $div.css({
                     'background': 'hsla(0,100%,100%,0)',
                 })
                 setTimeout(function() {
                     $div.remove()
                 }, 0)
             })
         }
         return $div
     }
     function showGoToTop(){
        // let toTop = $(window).scrollTop()
        $('#gototop').css('transform',`translateX(${toTop>300?'0':'42px'})`)
     }
     function formatSrt () {
         // 给标题添加 · 和 ¬
         let $spanOri = $('span.ori')
         $spanOri.each(function () {
             let textArr = $(this).text().trim(' ').split(' ')
             let jsDotStr
             let jsReturnStr = `<span class="js-return">${textArr.pop()}</span>`
             if(textArr.length>0){
                 jsDotStr = textArr.map(function(elem, index) {
                     return `<span class="js-dot">${elem}</span> `
                 }).join(' ')
             }
             $('<span></span>').append($(jsDotStr+' '+jsReturnStr)).insertAfter($(this))
             $(this).remove()
         })
     }
     // 新窗口打开链接，window.open 容易被拦截
     function newWindow(url) {
         var aEl = document.createElement('a')
         aEl.setAttribute('href', url)
         aEl.setAttribute('target', url)
         aEl.setAttribute('class', 'myTemp')
         document.body.appendChild(aEl);
         aEl.click()
         aEl.remove()
     }


// declaration function end
 }); //$(); end



