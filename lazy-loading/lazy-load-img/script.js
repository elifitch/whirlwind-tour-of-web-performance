const LAZYLOAD_THRESHOLD = 200;
const lazyloadElements = document.querySelectorAll('.js-lazyload');

function lazyload(elements) {
	function checkAndLoad(scrollEvent) {
		/* NodeList.forEach will have to be polyfilled in some browsers */
		elements.forEach(function(el, index) {
			const elBoundingRect = el.getBoundingClientRect();
			const isInViewport = elBoundingRect.top >= -LAZYLOAD_THRESHOLD && 
				elBoundingRect.bottom <= window.innerHeight + LAZYLOAD_THRESHOLD;
			if (isInViewport) {
				el.src = el.getAttribute('data-src');
			}
		});
	}
	checkAndLoad();
	window.addEventListener('scroll', checkAndLoad);
}

lazyload(lazyloadElements);