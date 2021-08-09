let input = document.querySelector('input'),
    textGPA = document.getElementById('textGPA'),
    btnClear = document.getElementById('btnClear'),
    outputGPA = document.querySelector('.outputGPA'),
    btnBack = document.querySelector('.btnBack'),
    btnGroupTwo = document.querySelector('.btn-groupTwo'),
    textBall = document.querySelector('.textBall');
localStorage.leng = 0;

function addGPA () {
    if (input.value !== '') {
        textGPA.innerText = Number(input.value) / Number(localStorage.leng);
        textBall.classList.add('textBall-active');
        btnClear.classList.add('btnClearActive');
        btnBack.classList.add('btnBackActive');
        if (textGPA.innerText > 10) {
            alert('Произошел сбой, попробуйте заново')
        }
    }
}

function buttonClear () {
    input.value = '';
    textGPA.innerText = '';
    outputGPA.innerHTML = '';
    btnBack.classList.remove('btnBackActive');
    btnClear.classList.remove('btnClearActive');
    outputGPA.classList.remove('outputGPA-active');
    textBall.classList.remove('textBall-active');
    localStorage.leng = 0;
}

function activeBlock() {
    outputGPA.classList.add('outputGPA-active');
    btnClear.classList.add('btnClearActive');
    btnBack.classList.add('btnBackActive');
}

document.getElementById('btn-group').addEventListener( 'click', e => {
    if (e.target.tagName === 'BUTTON' ) {
        input.value = Number(input.value) +  Number(e.target.innerText);
        localStorage.leng++;
        console.log(localStorage.leng);
        outputGPA.innerHTML += e.target.innerText + '+';
        outputGPA.classList.add('outputGPA-active');
        btnClear.classList.add('btnClearActive');
        btnBack.classList.add('btnBackActive');
    }
})

document.querySelector('.btn-groupTwo').addEventListener( 'click', e => {
    if (e.target.tagName === 'BUTTON' ) {
        input.value = Number(input.value) +  Number(e.target.innerText);
        localStorage.leng++;
        console.log(localStorage.leng);
        outputGPA.innerHTML += e.target.innerText + '+';
    }
})

document.getElementById('addGPA').addEventListener('click', e => {
    addGPA();
})

btnClear.addEventListener('click', () => {
    buttonClear();
})

btnBack.addEventListener('click', () => {
    const nums = outputGPA.innerHTML;

    const numSum = nums.split('+').reduce(
        (sum, num) => sum + Number(num),
        0
    );

    input.value = numSum;
    if (localStorage.leng > 1) {
        localStorage.leng--;
    }
    if (input.value <= 0 || outputGPA.innerHTML === '') {
        buttonClear();
    }
    let text = outputGPA.textContent;
    text = text.split('+');
    text.pop();
    outputGPA.textContent = text.join('+');
})

document.getElementById('icon-settings').addEventListener('click', () => {
    Swal.fire({
        title: 'Настройки',
        html:
            'Включить <b>пятибалльную систему?</b>&nbsp;' +
            '  <input type="checkbox" id="checkbox" class="mt-1">\n<br>' +
            'Включить <b>пятибалльную систему?</b>&nbsp;\n' +
            '  <input type="checkbox" class="mt-1">\n',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonText: 'Сохранить',
    })
    if (localStorage.getItem('checkBoxOne') === '1') {
        let checkbox = document.getElementById('checkbox');
        checkbox.checked = !checkbox.checked;
    }

    document.getElementById('checkbox').addEventListener('click', () =>  {
        let checkbox = document.getElementById('checkbox');
        if (checkbox.checked) {
            localStorage.setItem('checkBoxOne', 1);
            btnGroupTwo.classList.add('btn-groupTwo-dont-active');
            console.log(localStorage.getItem('checkBoxOne'));
        } else {
            localStorage.setItem('checkBoxOne', 0);
            btnGroupTwo.classList.remove('btn-groupTwo-dont-active');
            console.log(localStorage.getItem('checkBoxOne'));
        }
    })
});

window.onload = function () {
    if (localStorage.getItem('checkBoxOne') === '0') {
        btnGroupTwo.classList.remove('btn-groupTwo-dont-active');
    } else {
        btnGroupTwo.classList.add('btn-groupTwo-dont-active');
    }
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        addGPA();
    }
    if (event.keyCode === 49) {
        activeBlock();
        outputGPA.innerHTML += 1 + '+';
        console.log('Hello world');
    }
});