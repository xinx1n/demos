// 登录注册
const leanCloudErrorCodeMsg = {
        124: "网络异常，请刷新页面",
        125: "此邮箱地址无效",
        126: "用户名错误",
        200: "用户名为空",
        201: "密码为空",
        202: "用户名已存在",
        203: "邮箱已存在",
        210: "用户名或密码错误",
        211: "找不到该账号",
        216: "未验证的邮箱地址",
        217: "无效用户名，不允许为空",
        218: "无效的密码，不允许为空",
        219: "登录失败次数超过限制，请稍候尝试登录",
        502: "服务器维护",
        unknown:"请求失败，请稍后尝试"
}
function getErrorMessage ({code}) {
    return leanCloudErrorCodeMsg[code]||leanCloudErrorCodeMsg.unknown
}
const appId = '1KeILo7moWLtykR7uCWTcXUJ-gzGzoHsz';
const appKey = '9wRLsRPHHN4f26bBoKY10W0l';
AV.init({ appId, appKey });
var currentUser = AV.User.current();
if (currentUser) { 
    setTimeout(function () {
        window.location.href = 'result.html'
    }, 300)
}
var signInForm = document.querySelector('#sign-in-form')
signInForm.addEventListener('submit', function (e) {
    e.preventDefault()
    var password = signInForm.password.value
    var email = signInForm.email.value
    var errEl = document.querySelector('#sign-in-form span.error')
    logIn(email, password,errEl)
})
var signUpForm = document.querySelector('#sign-up-form')
signUpForm.addEventListener('submit', function (e) {
    e.preventDefault()
    var username = signUpForm.nickname.value
    var password = signUpForm.password.value
    var email = signUpForm.email.value
    var errEl = document.querySelector('#sign-up-form span.error')
    signUp(username,password,email,errEl)
})

function logIn(email, password,errEl){
    AV.User.logIn(email, password).then(function (loginedUser) {
        errEl.textContent = ''
        window.location.href = 'result.html'
     }, function (error) {
        errEl.textContent = getErrorMessage(error)
     });
}
function signUp (username,password,email,errEl) {
    var user = new AV.User()
    user.setUsername(username)
    user.set('nickname', username)
    user.setPassword(password)
    user.setEmail(email)
    user.signUp().then(function (loginedUser) {
        localStorage.setItem('defaultTabNav', 'sign-in-nav')
        errEl.textContent = ''
        window.location.href = 'result.html'
    }, function (error) {
        errEl.textContent = getErrorMessage(error)
    })
}


// input 下划线动画
var allInput = document.querySelectorAll('input:not([type="submit"])')
Array.prototype.forEach.call(allInput, function(element, index) {
    var isFocus = false
    element.addEventListener('mousedown', function(e) {
        let targetEl = e.target
        let inputGroup = targetEl.closest('.input-group')
        let line2 = inputGroup.children[2]
        if(!isFocus){
            line2.style.cssText = `transform-origin: ${e.offsetX}px center 0px; transform: scaleX(0); transition: all 0s;`
        }
    })
    element.addEventListener('focus', function(e) {
        let targetEl = e.target
        let inputGroup = targetEl.closest('.input-group')
        let line2 = inputGroup.children[2]
        setTimeout(function() {
            line2.style.transition = 'all .3s cubic-bezier(0.4,0,0.2,1)'
            line2.style.transform = 'scale(1)'
        }, 0)
        isFocus = true
    })
    element.addEventListener('blur', function(e) {
        let targetEl = e.target
        let inputGroup = targetEl.closest('.input-group')
        let line2 = inputGroup.children[2]
        line2.style.transform = 'scaleX(0)'
        addFilled(targetEl)
        isFocus = false
    })
    element.addEventListener('change', function(e) {
        let targetEl = e.target
        addFilled(targetEl)
    })
    addFilled(element)
});
window.onload = function() {
    if (window.navigator.userAgent.indexOf('Chrome') > -1) {
        var times = 0
        ;(function loop() {
            times++
            var emailEl = document.querySelector('input[type="email"]')
            if (emailEl.value) {
                var passwordEls = document.querySelectorAll('input[type="password"]')
                Array.prototype.forEach.call(passwordEls, function(element, index) {
                        element.classList.add('filled')
                })
            } else if (times < 20) {
                setTimeout(function() { loop() }, 50)
            }
        })()
    }
}

// sign-in sign-up 切换
var animationTimer = null
var tabNav = document.querySelector('[data-role="tabs-nav"]')
var tabPane = document.querySelector('[data-role="tabs-panes"]')
eventDelegation(tabNav,'click','.sign-logo:not(.active)',function (el,e) {
    Array.prototype.forEach.call(e.currentTarget.children, function (childEl) {
        childEl.classList.remove('active')
    })
    el.classList.add('active')
    localStorage.setItem('defaultTabNav', el.id)
    Array.prototype.forEach.call(tabPane.children, function (childEl) {
        childEl.children[0].classList.remove('active')
    })
    var elIndex = getIndex(el)
    animationTimer&&clearTimeout(animationTimer)
    animationTimer = setTimeout(function () {
        tabPane.children[elIndex].children[0].classList.add('active')
    }, 400)
})
document.addEventListener('DOMContentLoaded',function () {
    //页面加载完后再给切换登陆、注册的动画元素加上 transiton
    var signLogo = document.querySelectorAll('.sign-container>.sign-wrapper>.sign-logo-container>.sign-logo')
    var signMain = document.querySelectorAll('.sign-container>.sign-wrapper>.sign-main-container .sign-main')
    Array.prototype.forEach.call(signLogo,function(element, index) {
        element.style.transition = 'all .4s ease-in-out'
    })
    Array.prototype.forEach.call(signMain,function(element, index) {
        element.style.transition = 'all .4s ease-in-out'
    })
    // 获取默认是切换到登陆还是注册
    var defaultTabNavId = localStorage.getItem('defaultTabNav') || 'sign-up-nav'
    var defaultTabNav = document.getElementById(defaultTabNavId)
    defaultTabNav.click()

})
// tools
function eventDelegation (element, eventType, selector, func) {
    element.addEventListener(eventType, function(e) {
        let el = e.target
        while (!el.matches(selector)) {
            if (el === element) {
                el = null
                break;
            }
            el = el.parentNode
        }
        el && func.call(el, el, e)
    })
    return element
}
function getIndex(element) {
    let siblings = element.parentNode.children
    for (let index = 0; index < siblings.length; index++) {
      if (siblings[index] === element) {
        return index
      }
    }
    return -1
}
function addFilled (element) {
    if (element.value !== '') {
        element.classList.add('filled')
    } else {
        element.classList.remove('filled')
    }
}

// TODO 登陆注册前的校验



