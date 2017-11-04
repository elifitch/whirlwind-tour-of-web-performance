# Lazy Loading

## Intro
If there's one mantra of web performance, it's this: "get users into content as fast as possible".  In pursuit of that goal, one of our most powerful tools is just to load nothing at all, deferring everything that isn't primary content until just before we need it, in other words, lazy loading.

## Lazyload images
One of, if not THE, most common use of lazyloading is with images.  Image represent most of the kilobytes of the average webpage, so if you can defer all or most of the images, you can slice potentially hundreds of KB off your initial page weight.  Especially when images are outside of the viewport as the page loads, or "below the fold" so to speak, there's just no reason NOT to defer loading those images until just before they enter the viewport.  Using lazyloading on images is in many cases the most impactful quick win applying this technique can give us.

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
Next we'll make a function to take the an element's data-src attribute and create a source attribute for it.
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
Scrolling down here, we get some "hi there" messages printed in the console, so our observer is wired up and working.  Lets go back to our javascript and call something more interesting than a console.log

[lazyload.js]





------------------------------

## Lazyloading main content
We can expand take this technique much further, and instead of just lazyloading images, we can lazyload almost the entire page.  After doing some research, we can make sure that we only immediately load content our users tend to interact with first, and lazyload everything else.  This reduces initial page weight and gets users into what they need faster, everything else is secondary, and can be safely deferred.
[[ demo where the main menu and hero image loads first, other product recommendations loads second ]]

[ mention https://github.com/verlok/lazyload as a reference, especially  ]

