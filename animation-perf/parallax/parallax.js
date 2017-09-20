const NUM_BALLS = 100;
for (let i = 0; i < NUM_BALLS; i++) {
	let ball = document.createElement('div');
	ball.classList.add('ball');
	document.body.appendChild(ball);
}

const balls = document.querySelectorAll('.ball');
let bodyHeight = document.body.offsetHeight;
let windowHeight = window.innerHeight;
let bodyWidth = document.body.offsetWidth;


balls.forEach(function(ball, index) {
	ball.setAttribute('gravity', 1);
	ball.setAttribute('velocity', getRandom(10, 50));
	const x = bodyWidth/(balls.length + 1) * index;
	const y = windowHeight * Math.random();
	ball.setAttribute('yPos', y);
	ball.style.transform = `translate(${x}px, ${y}px)`;
	// ball.style.left = `${x}px`;
	// ball.style.top = `${y}px`;
});

window.addEventListener('resize', function() {
	bodyHeight = document.body.offsetHeight;
	windowHeight = window.innerHeight;
	bodyWidth = document.body.offsetWidth;
});

window.addEventListener('scroll', function(e) {
	const scroll = window.scrollY;
	balls.forEach(function(ball, index) {
		const currentGravity = ball.getAttribute('gravity');
		const x = bodyWidth/(balls.length + 1) * index;
		const currentY = Number(ball.getAttribute('yPos'));
		const y = currentY + ball.getAttribute('velocity') * currentGravity;

		if (y >= (windowHeight + scroll) || y <= 0) {
			ball.setAttribute('gravity', -currentGravity);
		}
		ball.setAttribute('yPos', y);
		ball.style.transform = `translate(${x}px, ${y}px)`;
		// ball.style.left = `${x}px`;
		// ball.style.top = `${y}px`;
	});
});

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}