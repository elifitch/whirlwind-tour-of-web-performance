const bar = document.querySelectorAll('.js-bar')[0];

window.addEventListener('scroll', function(e) {
	bar.style.width = `${(window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100}%`
})