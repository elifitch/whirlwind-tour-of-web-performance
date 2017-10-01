const popup = document.querySelectorAll('.popup')[0];
const closeButton = document.querySelectorAll('.popup__close')[0];

setTimeout(function() {
	popup.classList.add('popup--show');
}, 2000);

closeButton.addEventListener('click', function() {
	popup.classList.remove('popup--show');
})
