var button = document.querySelector('#start')
var timeNodes = document.querySelectorAll('.times')
var hour = document.getElementById('hour')
var minute = document.getElementById('minute')
var second = document.getElementById('second')
var id = null
var mytime = {
    status:true,
    time:7200
}
button.addEventListener('click', function() {
    if (mytime.status === true) {
        timer(mytime.time)
        mytime.status = false
        button.innerText = 'PAUSE'
        for (var item of timeNodes) {
            item.disabled = true
        }
    } else {
        clearInterval(id)
        mytime.status = true
        button.innerText = 'CONTINUE'
        for (var item of timeNodes) {
            item.disabled = false
        }
    }
})

Array.prototype.forEach.call(timeNodes, function(ele) {
    ele.addEventListener('change', function() {
        if (id) {
            clearInterval(id)
        }
        button.innerText = 'START'
        var result = timeToSecond(timeNodes[0].value, timeNodes[1].value, timeNodes[2].value)
        var results = timeFormat(result)
        mytime.time = result
        hour.value = results[0]
        minute.value = results[1]
        second.value = results[2]
    })
})

window.onload = function () {
    document.getElementById('second').focus()
    mytime.time = timeToSecond(hour.value, minute.value, second.value)
}


//计时函数
function timer(seconds) {
    id = setInterval(function() {
        if (seconds <= 0) {
            clearInterval(id)
        }
        seconds--
        mytime.time = seconds
            // timeLeft.innerText = timeFormat(seconds)
        var times = timeFormat(seconds)
        hour.value = times[0]
        minute.value = times[1]
        second.value = times[2]
    }, 1000)
}

function timeFormat(sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor(sec / 60 % 60);
    var s = sec % 60
    h = numberFormat(h)
    m = numberFormat(m)
    s = numberFormat(s)
    var result = sec <= 0 ? ['00', '00', '00'] : [h, m, s];
    return result
}

function timeToSecond(h, m, s) {
    h = parseInt(h) > 0 ? parseInt(h) : 0
    m = parseInt(m) > 0 ? parseInt(m) : 0
    s = parseInt(s) > 0 ? parseInt(s) : 0
    if (m > 60) {
        m = 60
    }
    if (s > 60) {
        s = 60
    }
    return h * 3600 + m * 60 + s
}

function numberFormat(num) {
    return num >= 10 ? num : ('0' + num)
}