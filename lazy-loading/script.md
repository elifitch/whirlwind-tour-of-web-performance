# Lazy Loading

## Intro
If there's one mantra of web performance, it's this: "get users into content as fast as possible".  In pursuit of that goal, one of our most powerful tools is loading as little as possible up front, deferring everything that isn't primary content until just before we need it, in other words, lazy loading.

## Lazyload images
One of, if not THE, most common use of lazyloading is with images.  Images represent most of the kilobytes of the average webpage, so if you can defer all or most of the images, you can slice potentially hundreds of KB off your initial page weight.  Especially when images are outside of the viewport as the page loads, or "below the fold" so to speak, there's just no reason NOT to defer loading those images until just before they enter the viewport.  Using lazyloading on images is in many cases the most impactful quick win applying this technique can give us.

## Lazyload images
There are plenty of libraries that will lazyload images for you, and many provide lots of helpful features on top of the basics.  However, many of them have a kitchen sink approach, doing way more than we need, which bloats their file size, or have external dependencies like jQuery, angular or react, and don't rely on modern browser features like the intersection observer api.  For this example we're going to build our own lazyloading micro library from scratch to better understand what's happening under the hood, and to do the bare minimum of what we need with no extra fluff.

## Browser Time
Lets hop on over to the browser to see how we can get some easy performance gains with just something like 30 lines of javascript.

[CHROME]
Here's our page, a little blog post about some Goats.  There are a handful of images here, and it'll serve as a good case study for any image heavy content page.

[index.html]
Hopping over to the code, you can see the HTML here is dead simple, just some CSS, paragraphs, and images, so it should be fairly easy to get some lazy loading going on.  The first thing we need to do is take care of these source attributes on all the images.  The browser will immediately start downloading and displaying images with a src attribute, so to make sure these images get deferred, we'll have to rename src to something else....like maybe data dash source.

[[rename src -> data-src]]

[Browser]
Refreshing the browser, we can see our images are gone. Good!  That means the browser isn't downloading them before we need them.  The next step is to write some javascript to let the browser know when its okay to load these images into our page.

[index.html]
[[make lazyload.js]]
[[`<script type="text/javascript" defer src="lazyload.js"></script>`]]

[lazyload.js]
First thing we'll need to do is get our images and assign them to a variable.
[[`const targets = document.querySelectorAll('img[data-src]');`]]
Next we'll make a function to take the an element's data-src attribute and create a source attribute for it.  This function would also be the place to add a class to an image to animate or fade it into view, or perform other onload tasks.
```
function lazyloadImg(el) {
  el.src = el.getAttribute('data-src');
}
```
As soon as we add a source attribute to any of these elements, the browser will start downloading the image.  If we loop over all our images, and call this function on them, the browser should load them all right away.
```
targets.forEach(imgElement => {
    lazyLoadImg(imgElement);
})
```

[Browser]
Refreshing here, nice, we get our images back!

[lazyload.js]
This is a good first step, being able to load our images via javascript, but we need to figure out a way to call it just before an image enters the viewport.  Lucky for us theres a new browser api called the "Intersection Observer" that gives us a lot of simple yet powerful tools to help make this happen.  Lets make a function that creates an observer for us.
```
function createLazyLoadObserver() {
  const observer = new IntersectionObserver(function() {
    console.log('hi')
  });
}
```
And lets have our new observer watch all of our images.
```
targets.forEach(el => {
    observer.observe(el);
})
```
Finally lets call this function, and head back to the browser to see if we get any messages in our console that let us know we're on the right track.
`createLazyLoadObserver()`

[Browser]
Scrolling down here, we get some "hi there" messages printed in the console, so our observer is wired up and working.  Lets go back to our javascript and call something more interesting than a console.log.

[lazyload.js]
The function we pass as an argument to the intersection observer constructor by default gets called every time an observed element enters or leaves the viewport.  That means that we need to make a funciton that does a little logic to make sure we load images as the ENTER the viewport, not as they leave.
```
function lazyloadManager(entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      lazyloadImg(entry.target)
    }
  })
}
```
intersectionratio represents how much percent the image is within the viewport in a range from 1 to zero.  Since our observer by default only calls this function when an item enters or leaves, if intersectionratio is above zero, we can be sure the element is on its way into the viewport.  It'll get called again with an intersection ratio value of 0 just as it leaves.  We can add an option to the intersection observer constructor that lets us specify an offset, which we'll definitely want to do.
```
const observer = new IntersectionObserver(lazyloadManager, {
  rootMargin: '20%'
});
```
This means that instead of firing our function just as the image peeks into the viewport, it'll fire our lazyload when the item is 20% of the viewport away.  This gives us a little buffer and decreases the chance that a user will see images pop in if they scroll quickly.  Lets head back to chrome and see if this works.

[browser]
Eureka, it's working!  We can confirm in the network tab that the images are popping in as we scroll.

[lazyload.js]
It's pretty cool that we were able to get basic lazyloading up and running in [[[20]]] lines of javascript, and the outrageously small implementation here is why its sometimes worth it to write your own solution to problems like this instead of grabbing something off the shelf.  However, we're not quiiiite done yet.  As of time of recording, intersection observer is supported the last few versions of chrome, and the last two versions of firefox and edge, but outside those browsers, support is a little sparse.  Definitely growing, but still sparse.  Lets bring in a polyfill to make sure users on older browsers aren't left out in the cold.

[https://github.com/que-etc/intersection-observer-polyfill]
For this we'll use the official W3C intersection observer polyfill.  I'll have the link to it in the course notes, so don't worry about scrambling to write down the URL.

[polyfill]
I've got it saved down to the project here.

[lazyload.js]
Lets write a little bit of JS to conditionally load the polyfill for users that need it, while not sucking up any bandwidth & JS parsing time for users with modern browsers.
```
if (!('IntersectionObserver' in window)) {
  
} else {
  createLazyLoadObserver();
}
[DELETE createLazyLoadObserver(); FROM BOTTOM]
```
This creates a conditional that says, if intersection observer is not available on the window, that is if it's not supported, do something, and if it is supported, call the function we've been using up to this point.  Now we need to write a function that will fetch and load our polyfill on demand.
```
function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = done;
  js.onerror = function() {
    console.error('Failed to load script ' + src)
  };
  document.body.appendChild(js);
}
//...
if (!('IntersectionObserver' in window)) {
  loadScript('interesection-observer-polyfill', createLazyLoadObserver)
}
```
This function creates a script element, sets the source to our polyfill, and then adds it to the body. Once that script is done loading, it'll use the polyfill to execute our existing intersection observer code just the same as if it were natively supported.

There's just one small remaining edge case we haven't handled yet.  Lets go back over to the browser and see what I mean.

[browser]
Everything's working, images are lazyloading just fine, but what happens if I turn off javascript?
[devtools -> settings -> debugger -> disable JS]
Welllllllp that's not good.  Because we're setting our image src attributes in javascript, a user without JS enabled will get a blank page!  Luckily there's an extremely straightforward way to fix this.

[index.html]
There's a seldom used HTML element, the noscript tag, which instructs the browser to only render its contents if javascript is disabled.  We'll just wrap a standard image tag in a noscript tag for each image.
[[noscript tags]]

[browser]
And voila, we have our images back! 

#TLDR
We've got a solution here that does exactly what we need, supports modern and legacy browsers, supports users with disabled JS, and we accomplish this with less than 40 lines of unpolyfilled javascript.  It would be super easy to extend what we've built to load, play and pause video, bring in extra content on demand, or trigger anything else based on scroll position, like loading commenting UI at the bottom of the page.  And it wouldn't take a lot of code to get there.

Implementing lazyloading is so quick and easy nowadays that it's definitely worth thinking twice before grabbing a 3rd party library, when you can build your own teensy tiny micro library that does exactly what you need and nothing more, saving kilobytes both coming and going.

------------------------------

## Lazyloading main content
We can expand take this technique much further, and instead of just lazyloading images, we can lazyload almost the entire page.  After doing some research, we can make sure that we only immediately load content our users tend to interact with first, and lazyload everything else.  This reduces initial page weight and gets users into what they need faster, everything else is secondary, and can be safely deferred.
[[ demo where the main menu and hero image loads first, other product recommendations loads second ]]

[ mention https://github.com/verlok/lazyload as a reference, especially  ]

