
function step() {
    var mydate = new Date()
    var hour = mydate.getHours()
    var minute = mydate.getMinutes()
    var second = mydate.getSeconds()
    hour %= 12
    var secondDeg = second / 60 * 360
    var minuteDeg = (minute * 60 + second) / 3600 * 360
    var hourDeg = (hour * 3600 + minute * 60 + second) / (12 * 3600) * 360

    var ss = document.querySelector('.second-hand').style 
    var ms = document.querySelector('.minute-hand').style 
    var hs = document.querySelector('.hour-hand').style 
    changeHand(secondDeg,ss)
    changeHand(minuteDeg,ms)
    changeHand(hourDeg,hs)
}
step()
setInterval(function() {
    step()
}, 1000)
function changeHand(deg,oo){
    if(deg===0){
        oo.transition='all 0s'
        oo.transform = `rotate(${deg}deg)`
    }else{
        oo.transition='all 0.1s'
        oo.transform = `rotate(${deg}deg)`
    }

}
