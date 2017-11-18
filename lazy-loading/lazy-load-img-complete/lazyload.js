const targets = document.querySelectorAll('img[data-src]');
if (!('IntersectionObserver' in window)) {
  loadScript('interesection-observer-polyfill', createLazyLoadObserver)
} else {
  createLazyLoadObserver();
}

function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = done;
  js.onerror = function() {
    console.error('Failed to load script ' + src)
  };
  document.head.appendChild(js);
}

function createLazyLoadObserver() {
  const observer = new IntersectionObserver(lazyloadManager, {
    rootMargin: '20%'
  });
  targets.forEach(el => {
    observer.observe(el);
  })
}

function lazyloadManager(entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      lazyloadImg(entry.target)
    }
  })
}

function lazyloadImg(el) {
  el.src = el.getAttribute('data-src');
}

createLazyLoadObserver();






