# Lazy Loading

## Intro
If there's one mantra of web performance, it's this: "get users into content as fast as possible".  In pursuit of that goal, one of our most powerful tools is just to load nothing at all, deferring everything that isn't primary content until just before we need it, in other words, lazy loading.

## Lazyload images
One of, if not THE, most common use of lazyloading is with images.  Image represent most of the kilobytes of the average webpage, so if you can defer all or most of the images, you can get 

## Lazyload images
Lazyloading images is in many cases the most impactful quick win applying this technique can give us. Images are often the largest portion of assets to be loaded on a page, so putting off loading them until a user is on the page can offer a significant speedup [[data here??]]. There are plenty of libraries that will do this for you, and many provide lots of helpful features on top of the basics.  For this example we're going to build our own lazyloading micro library from scratch to better understand what's happening under the hood.
[ use and mention https://github.com/verlok/lazyload as a reference, especially  ]

## Lazyloading main content
We can expand take this technique much further, and instead of just lazyloading images, we can lazyload almost the entire page.  After doing some research, we can make sure that we only immediately load content our users tend to interact with first, and lazyload everything else.  This reduces initial page weight and gets users into what they need faster, everything else is secondary, and can be safely deferred.
[[ demo where the main menu and hero image loads first, other product recommendations loads second ]]

