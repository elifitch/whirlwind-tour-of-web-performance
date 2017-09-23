# Animation performance script
Welcome to our session covering animation performance!

## Perf of a different color
This will have a very different focus from our other sessions, because for the first time, we're going to take a break from focusing on outright speed.  Fast page loads are incredibly important, but that doesn't mean that once the page loads, the browser is done rendering content.  With today's highly interactive sites and apps, we need to be extra aware of how the browser renders content, and how to make it easy for the browser to get pixels onto your display.  In this video we're going to cover
* Why rendering performance is worth talking about
* Give an overview of the portion of the browsers rendering pipeline we need to worry about in the context of animation on the web
* How to test, diagnose, and fix bad animation performance

## Why important
Just like poor page loads are bad for business, in a literal sense, so is poor animation and interaction performance.  According to a then-facebook engineer, Shane O'Sullivan in 2013, Facebook degraded scrolling performance to 30fps instead of 60fps for a small number of users, small meaning 20 to 30 million, which I guess counts as small for facebook?  In any case, according to Shane, engagement quote unquote "collapsed".  Now, I don't know the specifics of what "collapsed" actually means in this case, but I do know that I would like to avoid having my sites characterized with that type of word, and I hope the same applies to you.  A stuttering, janky webpage doesn't just look & feel unpolished, it's actively annoying for people to interact with.

As mobile devices occupy a large and increasing amount of total web traffic, user expectations have and will continue to change.  Touch interfaces expose janky interactions, because users expect a 1 to 1 relationship with what their finger is doing and the response on the screen.  When scrolling on a webpage, if the scroll animation jutters and their finger loses its relationship to the content on the screen, it creates a really bad experience.  Making matters worse, mobile devices have significantly slower graphics hardware than even basic desktops and laptops, making poor animation performance much more common.  Further, as even desktop sites continue to become more interactive, more app-like, and more "native" feeling, smooth animation and interaction will continue to increase in importance.

## Rendering pipeline
In order to understand how to keep our sites buttery smooth, or to fix one that isn't, we have to understand a little bit about the process by which the browser gets pixels onto the display, affectionately known as the browser's pixel pipeline.  It has three main steps we need to worry about: Layout, paint, and composite.  Layout is arranging elements on a page, painting is rasterizing the page's elements into image data, and compositing is turning that image data into textures and passing them to the GPU to be displayed.

These steps happen one after the other, but the browser will skip steps whenever it can.  Animating CSS properties require one or more of these steps to run, but the browser will skip steps if it can.  How do you know whether the browser will do the full layout-paint-composite, or skip layout, just doing paint to composite or even just composite?  It depends on the CSS property you're animating.  Some properties need to go through the full chain, others need just paint and composite to be run, and a select few can skip both layout and paint, just triggering a composite.

We'll look at each of these steps a little more in depth to understand how our code impacts, and potentially slows down, the browser, and go over some common CSS properties that trigger each.

## Layout
The layout step is all about arranging elements on the page and establishing spacial relationships between elements.  Because an updated position of one element can nudge other elements, which in turn can nudge their neighbors, layout is scoped at the document level.  Even if you're moving one element, the browser has to lay out the entire page again to be sure where everything is.  This is called a "reflow".  This also means that the layout step will take longer the more elements are in the dom at any given time.

This step usually takes longer than painting and compositing, sometimes significantly longer.  This is why it's important to not "thrash" your layout.  This is a term that describes repetitively reading and then altering elements position in javascript, which puts the browser in a state where it reflows the page to get an element's position, and then reflows the page to lay out the elements after the style update, over and over again.  The browser runs faster when you batch reads and writes together.

Generally though, try to avoid layout.  Its an expensive, a performance term for "time consuming", operation for the browser, and there are ways to use non-layout triggering CSS properties instead, to sidestep all these problems.  Lets take a look at these no-no, layout CSS properties we should steer clear of.

## Layout props


Because Layout is best thought about as a spacial operation, it's easy to remember that CSS properties that trigger layout are spacial properties.  animating CSS properties that change an object's size and position with respect to other elements cause layout.













