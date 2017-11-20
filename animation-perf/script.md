# Animation performance script
Welcome to our session covering animation performance!

## Perf of a different color
This will have a very different focus from our other sessions, because for the first time, we're going to take a break from focusing on outright speed.  Fast page loads are incredibly important, but that doesn't mean that once the page loads, the browser is done rendering content.  With today's highly interactive sites and apps, we need to be extra aware of how the browser renders content, and how to make it easy for the browser to get pixels onto your display.  In this video we're going to cover
* Why rendering performance is worth talking about
* Give an overview of the portion of the browsers rendering pipeline we need to worry about in the context of animation on the web
* and How to test, diagnose, and fix bad animation performance

## Why important
Just like poor page loads are bad for business, in a literal sense, so is poor animation and interaction performance.  According to a then-facebook engineer, Shane O'Sullivan in 2013, Facebook degraded scrolling performance to 30fps instead of 60fps for a small number of users, small meaning 20 to 30 million, which I guess counts as small for facebook?  In any case, according to Shane, engagement quote unquote "collapsed".  Now, I don't know the specifics of what "collapsed" actually means in this case, but I do know that I would like to avoid having my sites characterized with that type of word, and I hope the same applies to you.  A stuttering, janky webpage doesn't just look & feel unpolished, it's actively annoying for people to interact with.

As mobile devices occupy a large and increasing amount of total web traffic, user expectations have and will continue to change.  Touch interfaces expose janky interactions, because users expect a 1 to 1 relationship with what their finger is doing and the response on the screen.  When scrolling on a webpage, if the page jutters and their finger loses its relationship to the content on the screen, it creates a really bad experience.  Making matters worse, mobile devices have significantly slower graphics hardware than even basic desktops and laptops, making poor animation performance much more common.  Further, as even desktop sites continue to become more interactive, more app-like, and more "native" feeling, smooth animation and interaction will continue to increase in importance.

## Rendering pipeline
In order to understand how to keep our sites buttery smooth, or to fix one that isn't, we have to understand a little bit about the process by which the browser gets pixels onto the display, affectionately known as the browser's pixel pipeline.  It has three main steps we need to worry about: Layout, paint, and composite.  Layout is arranging elements on a page, painting is rasterizing the page's elements into image data, and compositing is turning that image data into textures and passing them to the GPU to be displayed.

Animating CSS properties requires one or more of these steps to run, and these steps happen one after the other.  So if we trigger composite, the browser won't have to do anything else, but if we make the browser perform layout, it will then have to go through the paint and composite steps.  How do you what stage we trigger with our CSS animation?  It depends on the CSS property you're animating.  Some properties need to go through the full chain, others need just paint and composite to be run, and a select few can skip both layout and paint, just triggering a composite.

We'll look at each of these steps a little more in depth to understand how our code impacts, and potentially slows down, the browser, and go over some common CSS properties that trigger each.

## Layout
The layout step is all about arranging elements on the page and establishing spacial relationships between elements.  Because an updated position of one element can nudge other elements, which in turn can nudge their neighbors, layout is scoped at the document level.  Even if you're moving one element, the browser has to lay out the entire page again to be sure where everything is.  This is called a "reflow".  This also means that the layout step will take longer the more elements are in the dom at any given time.

This step usually takes longer than painting and compositing, sometimes significantly longer.  This is why it's important to not "thrash" your layout.  This is a term that describes repetitively reading and then altering elements position, which puts the browser in a state where it reflows the page to get an element's position, and then reflows the page to lay out the elements after the style update, over and over again.  The browser runs faster when you batch reads and writes together.

Generally though, try to avoid triggering layout completely.  Its an expensive operation for the browser, "expensive" being a performance term for "time consuming", and there are ways to use non-layout triggering CSS properties instead, to sidestep all these problems.  Lets take a look at layout-triggering CSS properties we should steer clear of.

## Layout props
Because Layout is best thought about as a spacial operation, it's easy to remember that CSS properties that trigger layout are spacial properties.  Animating CSS properties that change an object's size and position with respect to other elements cause layout.  The good news is a lot of these properties have easy alternatives.  For example instead of animating top bottom left or right, you can use translate.  Instead of animating width and height, you can use scale.

## Paint
Painting, also called rasterization if you want to be more precise, is a dual step that creates a series of draw calls, and then draws the elements into a bitmap image in memory.  I know that sounds a little strange to think of what you see in a browser as a series of images, but just like a movie cut into frames, it's exactly the same with web browsers.  The browser typically doesn't just draw one image, it cuts the screen up into layers, just like you might see in photoshop.

Paint is generally a good deal faster than layout, but not necessarily.  Just like how the speed of layout is directly affected by the size of the dom, the speed of paint is affected by the size of paint areas.  The paint area is determined by the size of the screen, and the size of a region you're asking the browser to repaint.  For example, it's much faster to repaint a small element than a large one, and it's much faster to repaint an element on a low resolution display than on a high resolution display.

Think of paint as being primarily concerned with pixels.  The more pixels you want to repaint, the longer it will take.

## Paint props
So what CSS properties trigger a repaint?  Well, generally anything that changes the appearance of an element.  There are some obvious ones like color and background, but there are also some paint properties that might seem a bit counter intuitive.  We're going to have to be especially aware of position fixed elements on a page, which cause repaints whenever you scroll and can degrade scrolling performance.  Lets hop over to a quick demo so I can show you what I mean.

## https://codepen.io/elifitch/debug/MEbeog
Here we've got a page that has a fixed background behind this text.  Lets go into dev tools and turn on "show paint flashing".
[[turn on]]
See how the whole page was flashing green?  That means that the whole page is repainting over and over again as we scroll.  This is because rather than just moving the browsers viewport up and down over existing bitmaps, the position of the text on top of the image has changed, meaning that the browser has to repaint the bitmaps and send them off to the GPU again, every frame.  This is a bad thing, and part of the reason why you used to see so many parallax sites struggle with poor performance.  Lets turn off the fixed background and see what happens.
[[turn off fixed bg]]
voila, no more full page paints.

## Composite
Composite is the process by which the browser takes the images it painted, and prepares them to be displayed.  When discussing the Paint step, we briefly touched on the concept of layers.  The browser doesn't necessarily paint the entire page into one big image, it cuts the image up into tiles and layers before uploading them to the GPU.  They have to be composited in the right order or else the wrong elements could be on top, and the page would be an unintelligible jumble of elements.  This is *by far* the fastest step we've discussed so far, so it's ideal for animation.

## Composite properties
In fact, whenever possible we only ever want to animate CSS properties that skip both layout AND paint, and just trigger the composite step.  With compositor only properties, we can animate an element while keeping it completely separate from the rest of the page as far as the GPU is concerned, allowing us to avoid a lot of expensive reflows and repaints.  The bad news is, there's just two of these properties.  Transform and opacity are the only properties that trigger composition and nothing else.  The silver lining on that dark cloud is that transform is an almost comically powerful CSS property.

## Composite properties
See transform can do a lot.  You can reposition elements with transform, change their size with scale, spin them with rotate, warp them with skew, and do all of the above at once with matrix.  Plus you can do all of these things in 3d if you want.  Sometimes you need to think a little creatively when converting an animation to use transform instead of layout and/or paint properties, but nine times out of ten it can be done.

## Debugging
Great, we know all about how the browser makes pixels, but how do we put this to use?  I'm going to walk through two real world scenarios and debug two sites' render problems in real time: First, we're going to fix a mobile menu animation that is janky on old phones, and next, we're going to debug a website that has some herky jerky scrolling performance on old and underpowered desktops.

## MENU DEMO
[[Go to the site]]
Here's our site that we're dealing with.  We got some reports from a colleague on their old tablet that this menu has a janky animation and it's annoying.  Lets see what she's on about.
[[Open the menu and close it a few times]]
Okay, I'm seeing some very slight hesitation when the menu opens and closes, but it's very small and indistinct, and certainly not worth fretting over.  Maybe our coworker was exaggerating?  Good thing for us, there's a way we can double check that with the chrome performance tools.
[[open devtools perf tab]]
In the performance tab we can emulate a slower CPU, which will give us a much clearer picture of what our friend saw.  Lets set it to 20x slowdown.  Believe it or not, mobile devices from just 3 to 4 years ago are sometimes around 20 times slower than the computer I'm using right now.
[[set it to 20x slower, hit the menu button again]]
noooow we're seeing some definite jank.  Yikes that's really bad.  Lets measure exactly how bad it is by taking a peek at the framrate.  We can open up the chrome framerate monitor in order to test and verify that the changes we make move things in the right direction.
[[open chrome framerate monitor, hit it a few times]]
Yeah we can see here that we're getting a very unstable framerate, but it's between 5 and about 10 or so, which is really far from where we want to be at 60 frames per second.  Lets look at the animation and see what can be done.
[[with menu open, inspect element on main]]
Okay so it looks like we're applying the `off-canvas-open` class to the body, which is setting the left property of our main content block to shift it over.  Remember `left` is a layout property, so we're triggering a cascade of reflows by animating the menu in this way.  Lets change it to a composite-only property, transform, to get this done.
[[set transform on it instead]]
There we go, lets test it.
[[click the button]]
Niiiiice that's so so much better.  If we look up here at the framerate monitor we can see that, with the exception of these blips here, we're at a rock solid 60fps, and the animation looks so much better.  A key takeaway here is that this problem never would have revealted itself had our coworker not tested it on an old device.  Failing testing your work on as many devices as possible, make heavy use of the CPU throttler in the performance tab to make sure your interactions are good for everyone, regardless of how fast their device is.

Next lets look at improving scrolling performance, this time on a real live site.  On the google developers render performance page, no less!

## DEMO https://developers.google.com/web/fundamentals/performance/rendering/
[[GO TO THE PAGE]]
This is actually a real thing that I encountered when getting an old computer set up for an art installation.  It was so much slower, you could almost hear it creaking under the strain of even simple webpages.
[[scroll up and down]]
Scrolling around now though, on my nice fast laptop, I don't see any issues.  Lets turn to our friend the CPU throttler, and see if we can get my fast computer to walk a mile in the shoes of a slow one.
[[20x throttle, scroll around]]
Oof yeah, now we can see this is pretty bad.
[[scroll up to the top and scroll a bit]]
What's interesting is that at the top of the page, the scrolling performance is actually pretty good, no problems here, but once we get into the meat of the page, a little bit, the scrolling performance gets much much worse.  We can use chrome devtools' paint flashing option to help us visualize where the problems might be.
[[click it and scroll]]
See right as the page gets into the area where it struggles to scroll smoothly, we see that both the right and left panels here continuously repaint against the background.  Once these sticky navs become fixed in our viewport, the browser is forced to repaint whenever we scroll as the relative positions of these menus and the rest of the content changes.  This is similar to the text over fixed background demo we looked at earlier, but the question is how do we fix it?  We can fix it by combining our knowledge of paints, with our knowledge of the composite step.  Recall that elements on their own GPU layer are painted separately, and sent up to the GPU in separate chunks.  If we could make the menus separate from the main content area, the browser wouldn't have to repaint them as their relative positions changed, because they'd always be separate, and just arranged next to each other by the compositor.  We can force elements on to their own layer by using the css property `will-change`.  Lets see how it works.
[[inspect the right menu, left menu, at the root, add will change]]
Okay so I just added will-change: transform to the element, but how do we know it actually worked?  How do we know if it's on its own layer?  We can use another chrome render tool, `show layer borders`
[[GO TO NEW CHROME toggle on show layer borders]]
See this orange border around the elements?  They're on their own layers now!
[[do will change on the left menu]]
Just as we predicted, there's no more continuous painting, and almost like magic, the scroll jank is *completely* gone.

## Layer management
We solved that scrolling problem by manually creating a layer with `will-change`, but you can also create a layer with any 3d transform.  In fact, for browsers that don't support `will-change` you can use transform translate Z 0 to put that element on its own layer.  Just because we solved this one problem by putting a few elements on layers doesn't mean that we should do that for every element.  Each layer occupies memory on the GPU, and excessive use of layers can cause slowdowns and even crashes on less capable hardware.  Excessive in this case means hundreds to thousands of layers, so most of the time this won't be a concern, but it's something to be aware of.

## TLDR
So, some things to hang on to.  If you walk away from this video with one thing, it would be to animate transform and opacity instead of paint and especially layout properties.  If you walk away from this video with two things, it would be to *especially* avoid animating layout properties.  Following those two pieces of advice will help you have nice performant animations all the time.  Be mindful of fixed elements, as they can cause jank when scrolling.  You used to see it a lot with parallax sites, but it's still commonly found in sites with fixed background and sticky navigation.  Rely on devtools to verify assumptions and check that your fixes improve framerate.  Use the CPU throttler to approximate older devices, and use the FPS meter, layer borders, and paint flashing tool to peek under the hood and give you hints as to where the solutions lie.  Like render performance guru Paul Lewis says, "dont guess it, test it", so we want to always be mindful of what our performance looks like and how far we're moving the needle in the right direction.