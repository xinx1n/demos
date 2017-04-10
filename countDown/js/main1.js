var button = document.querySelector('#start')
var timeNodes = document.querySelectorAll('.times')
var id = null

var myGlobal = {
    sta: true,
    times: 7200
}
button.addEventListener('click', function() {
    if (myGlobal.sta === true) {
        timer(myGlobal.times)
        myGlobal.sta = false
        button.innerText = 'PAUSE'
        for (var item of timeNodes) {
            item.disabled = true
        }
    } else {
        clearInterval(id)
        myGlobal.sta = true
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
        myGlobal.times = result
        hour.value = results[0]
        minute.value = results[1]
        second.value = results[2]
    })
})

function timer(seconds) {
    id = setInterval(function() {
        if (seconds <= 0) {
            clearInterval(id)
        }
        seconds--
        myGlobal.times = seconds
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
