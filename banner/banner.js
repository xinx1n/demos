let bannerNode = document.getElementById('banner')
bannerNode.addEventListener('mousemove', function(e) {
    let width = bannerNode.offsetWidth
    let height = bannerNode.offsetHeight
    let xDeg = (e.layerX - width / 2) / (width / 2) * 4
    let yDeg = (e.layerY - height / 2) / (height / 2) * 12
    bannerNode.style.transform = `translateZ(-100px) rotateX(${-yDeg}deg) rotateY(${xDeg}deg)`
})
bannerNode.addEventListener('mouseout', e => {
    bannerNode.style.transition = 'transform 0.4s ease-in-out'
    bannerNode.style.transform = `translateZ(-100px) rotateX(0deg) rotateY(0deg)`
    setTimeout(function () {
    	bannerNode.style.transition = 'transform 0s ease-in-out'
    }, 1)

})
