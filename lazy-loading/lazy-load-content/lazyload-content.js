const LAZYLOAD_CONTAINER = document.querySelectorAll('.js-lazyload')[0];
const SPINNER = document.querySelectorAll('.js-spinner')[0];

function simulateNetwork(fn, delay) {
	return setTimeout(fn, delay);
}

function lazyloadContent() {
	fetch('product-recommendations.html').then(function(res) {
		return res.text();
	})
	.then(function(htmlString) {
		const div = document.createElement('div');
		div.innerHTML = htmlString;
		const elements = div.childNodes;
		SPINNER.parentNode.removeChild(SPINNER);
		elements.forEach(function(el) {
			LAZYLOAD_CONTAINER.appendChild(el)
		});
	})
	.catch(function(error) {
		console.error(error);
	})
}

simulateNetwork(lazyloadContent, 2000);