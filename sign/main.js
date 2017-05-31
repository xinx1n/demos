var allInput = document.querySelectorAll('input:not([type="submit"])')
Array.prototype.forEach.call(allInput, function(element, index) {
    element.addEventListener('mousedown', function(e) {
        console.log(3, 'mousedown');
        let targetEl = e.target
        let inputGroup = targetEl.closest('.input-group')
        let line2 = inputGroup.children[2]
        line2.style.cssText = `transform-origin: ${e.layerX}px center 0px; transform: scaleX(0); transition: all 0s;`
    })
    element.addEventListener('focus', function(e) {
        let targetEl = e.target
        let inputGroup = targetEl.closest('.input-group')
        let line2 = inputGroup.children[2]
        setTimeout(function() {
            console.log(4, 'focus');
            line2.style.transition = 'all .3s cubic-bezier(0.4,0,0.2,1)'
            line2.style.transform = 'scale(1)'
        }, 0)
    })
    element.addEventListener('blur', function(e) {
        let targetEl = e.target
        let inputGroup = targetEl.closest('.input-group')
        let line2 = inputGroup.children[2]
        line2.style.transform = 'scaleX(0)'
        addFilled(targetEl)
    })
    element.addEventListener('change', function(e) {
        let targetEl = e.target
        addFilled(targetEl)
    })
    addFilled(element)
});

function addFilled (element) {
    if (element.value !== '') {
        element.classList.add('filled')
    } else {
        element.classList.remove('filled')
    }
}


// var myinput = document.getElementById('myinput')
// myinput.onclick = function (e) {
//  let inputGroup = e.target.closest('.input-group')
//  let line2 = inputGroup.children[2]
//  line2.style.cssText = `transform-origin: ${e.layerX}px center 0px;transform: scaleX(1);`
//  setTimeout(function () {
//      line2.style.transform = 'scale(1)'
//  },1)
// }
// myinput.onblur = function (e) {
//  let inputGroup = e.target.closest('.input-group')
//  let line2 = inputGroup.children[2]
//  line2.style.transform = 'scaleX(0)'
// }
