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

		elements.forEach(function(el) {
			document.body.appendChild(el)
		});
	})
	.catch(function(error) {
		console.error(error);
	})
}

simulateNetwork(lazyloadContent, 2000);