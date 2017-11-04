// const targets = document.querySelectorAll('img[data-src]');
// if (!('IntersectionObserver' in window)) {
//   loadScript('intersection-observer-polyfill.js', createLazyLoadObserver);
// } else {
//   createLazyLoadObserver();
// }

// function loadScript(src, done) {
//   var js = document.createElement('script');
//   js.src = src;
//   js.onload = done;
//   js.onerror = function() {
//     console.error('Failed to load script ' + src)
//   };
//   document.head.appendChild(js);
// }

// function createLazyLoadObserver() {
//   const observer = new IntersectionObserver(lazyload, {
//     rootMargin: '20%'
//   });
//   targets.forEach(el => {
//     observer.observe(el);
//   })
// }

// function lazyload(entries) {
//   entries.forEach(entry => {
//     if (entry.intersectionRatio > 0) {
//       lazyloadImg(entry.target)
//     }
//   })
// }

// function lazyloadImg(el) {
//   el.src = el.getAttribute('data-src');
//   el.classList.add('opacity-1');
// }





const targets = document.querySelectorAll('img[data-src]');
function createLazyLoadObserver() {
  const observer = new IntersectionObserver(function() {
    console.log('hi there')
  });
  targets.forEach(el => {
    observer.observe(el);
  })
}

function lazyloadImg(el) {
  el.src = el.getAttribute('data-src');
}


createLazyLoadObserver();






