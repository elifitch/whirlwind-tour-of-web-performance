const targets = document.querySelectorAll('.js-lazyload');
if (!('IntersectionObserver' in window)) {
  targets.forEach(lazyloadImg);
} else {
  const lazyLoadObserver = new IntersectionObserver(lazyload, {
    rootMargin: '20%'
  });
  const infiniteObserver = new IntersectionObserver(loadNext, {
    rootMargin: '0%'
  });
  targets.forEach(el => {
    lazyLoadObserver.observe(el);
  });
  infiniteObserver.observe(document.body);
}

function lazyload(entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      lazyloadImg(entry.target)
    }
  })
}

function lazyloadImg(el) {
  el.src = el.getAttribute('data-src');
  el.classList.add('opacity-1');
}

function loadNext(entries) {
  const entry = entries[0];
  console.log(entry.intersectionRatio);
}

