// Модуль 10. Задание 2
/*
Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
*/

let btn = document.querySelector('.j-btn');
let btnDiv = document.querySelectorAll('.btn_icon');

btn.addEventListener('click', () => {
	let widht = window.screen.width;
	let height =  window.screen.height;
	alert(`Размеры экрана. Ширина: ${widht}px. Высота: ${height}px.`)
});
