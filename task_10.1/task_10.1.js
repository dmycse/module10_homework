// Модуль 10. Задание 1
/*
Сверстайте кнопку, которая будет содержать в себе icon_01 (https://icons.getbootstrap.com/icons/arrow-down-left-circle/).
При клике на кнопку иконка должна меняться на icon_02 (https://icons.getbootstrap.com/icons/arrow-down-left-circle-fill/). 
Повторный клик меняет иконку обратно.
*/

let btn = document.querySelector('.j-btn');
let btnDiv = document.querySelectorAll('.btn_icon');

btn.addEventListener('click', () => {
	btnDiv.forEach(icon => icon.classList.toggle('js-icon'));
});
