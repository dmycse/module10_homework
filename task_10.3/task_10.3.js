// Модуль 10. Задание 3
/*
Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.
Добавить в чат механизм отправки гео-локации: 
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат 
вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. 
Сообщение, которое отправит обратно эхо-сервер, не выводить.
*/

let btnSend = document.querySelector('.j-btn-send');
let btnGeo = document.querySelector('.j-btn-geo');
let divChat = document.querySelector('.chat');

function chat() {
	let url = 'wss://echo-ws-service.herokuapp.com';
	
	let websocket = new WebSocket(url);
	websocket.onopen = () => {
		
		btnSend.addEventListener('click', () => {
			let customMessage = document.querySelector('.input').value;
			if(!customMessage) return;
			websocket.send(customMessage);
			showMessage(customMessage, 'client');
			document.querySelector('.input').value = '';

			websocket.onmessage = event => showMessage(`Ответ от сервера: ${event.data}`, 'server');
		});
	
		btnGeo.addEventListener('click', () => {
			let success = (position) => {
			let geoUrl = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
			websocket.send(geoUrl);
			showMessage(`<a href=${geoUrl} target="_blank">Ваша гео-локация</a>`, 'client');	
			}
			websocket.onmessage = event => event.data;

			let error = () => showMessage(`Невозможно получить Ваше местоположение!`);
		
			if (!navigator.geolocation) {
				showMessage(`Гео-локация не поддерживается браузером`);
			} else {
				navigator.geolocation.getCurrentPosition(success, error);
			}
		});

	}
	websocket.onerror = error => showMessage(`Ошибка передачи данных: ${error.message}`);
}
		
function showMessage(message, className) {
	divChat.insertAdjacentHTML('beforeend', `<p class="${(className == 'client') ? "chat-text" : (className == 'server') ? "chat-text-server" : "warn-text"}">${message}</p>`);
}
document.addEventListener("DOMContentLoaded", chat);
