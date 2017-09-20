// Set the heights for all these movers in simple CSS style.top
var movers = document.querySelectorAll('.mover');
(function init() {
	for(var m = 0; m < movers.length; m++) {
		movers[m].style.top = (m * 20) + 'px';
	}
})();

// animation loop
function update(timestamp) {
	for(var m = 0; m < movers.length; m++) {
		movers[m].style.left = ((Math.sin(movers[m].offsetTop + timestamp/1000)+1) * 500) + 'px';
		//movers[m].style.left = ((Math.sin(m + timestamp/1000)+1) * 500) + 'px';
	}
	rAF(update);
};
rAF(update);