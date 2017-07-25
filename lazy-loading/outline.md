# Lazy Loading

## Intro
Lazyloading is the art of asynchronously loading content, resources, whatever, after your page has already loaded.  This allows us to get the user onto the page as quickly as possible while we work on loading any additional content.  The most common use case for lazyloading is to asynchronously load media, like images, after main written content loads.  However, we can also lazyload the entire page after showing a minimal loading screen, and use it to create UI patterns like infinite scrolling.

* Lazyloading images
* Deferring all secondary content

## Lazyload images
Lazyloading images is in many cases the most impactful quick win applying this technique can give us. Images are often the largest portion of assets to be loaded on a page, so putting off loading them until a user is on the page can offer a significant speedup [[data here??]]. There are plenty of libraries that will do this for you, and many provide lots of helpful features on top of the basics.  For this example we're going to build our own lazyloading micro library from scratch to better understand what's happening under the hood.
[ use and mention https://github.com/verlok/lazyload as a reference, especially  ]

## Lazyloading main content
We can expand take this technique much further, and instead of just lazyloading images, we can lazyload almost the entire page.  After doing some research, we can make sure that we only immediately load content our users tend to interact with first, and lazyload everything else.  This reduces initial page weight and gets users into what they need faster, everything else is secondary, and can be safely deferred.
[[ demo where the main menu and hero image loads first, other product recommendations loads second ]]

