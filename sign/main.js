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
// sign-in sign-up 切换
var tabNav = document.querySelector('[data-role="tabs-nav"]')
var tabPane = document.querySelector('[data-role="tabs-panes"]')
eventDelegation(tabNav,'click','.sign-logo:not(.active)',function (el,e) {
    Array.prototype.forEach.call(e.currentTarget.children, function (chileEl) {
        chileEl.classList.remove('active')
    })
    el.classList.add('active')
    Array.prototype.forEach.call(tabPane.children, function (chileEl) {
        chileEl.classList.remove('active')
    })
    var elIndex = getIndex(el)
    setTimeout(function () {
        tabPane.children[elIndex].classList.add('active')
    }, 400)
})
//页面加载完后再给切换登陆、注册的动画元素加上 transiton
document.addEventListener('DOMContentLoaded',function () {
    var signLogo = document.querySelectorAll('.sign-container>.sign-wrapper>.sign-logo-container>.sign-logo')
    var signMain = document.querySelectorAll('.sign-container>.sign-wrapper>.sign-main-container>.sign-main')
    Array.prototype.forEach.call(signLogo,function(element, index) {
        element.style.transition = 'all .4s ease-in-out'
    })
    Array.prototype.forEach.call(signMain,function(element, index) {
        element.style.transition = 'all .4s ease-in-out'
    })
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
function uniqueClass(element, className) {
    dom.every(element.parentNode.children, el => {
      el.classList.remove(className)
    })
    element.classList.add(className)
    return element
}
function addFilled (element) {
    if (element.value !== '') {
        element.classList.add('filled')
    } else {
        element.classList.remove('filled')
    }
}

