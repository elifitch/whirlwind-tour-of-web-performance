const button = document.querySelectorAll('.js-nav-toggle')[0];
const body = document.body;

button.addEventListener('click', function() {
	if (!body.classList.contains('off-canvas-open')) {
		body.classList.add('off-canvas-open');
	} else {
		body.classList.remove('off-canvas-open');
	}
});