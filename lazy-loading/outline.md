# Lazy loading outline

## Intro
* What lazy loading is.
* What we'll cover: lazyloading images, lazyloading main content, infinite scrolling

## Lazyloading images
* Why lazyloading images is such a great & easy performance win
* DEMO: how to implement from scratch
    - Lazyloading libraries can be great, especially https://github.com/verlok/lazyload, but they often offer a kitchen sink approach, and are a bit bigger and more complex than necessary
    - 2nd reason: can be really instructive coding up a basic lazy loading library from scratch
    - That said I think in production it's fine, and even beneficial, to use an off-the-shelf lazyloading solution, they have internal performance optimizations that we won't touch on here, like throttling the scroll event listener, and they work with a variety of different media types.
    - It is still beneficial to write a very basic lazyloading library from scratch, so you can get a sense of how they work in broad strokes, and how far you can push very minimal code.

## Lazyloading main content
* Why is important: can identify content we know users engage with first, in this case a header menu, load that first, defer everything else
* DEMO: Load menu and hero, lazyload product recommendations

## Infinite scrolling (if we have time)
* Talk about what infinite scrolling is, its plusses and minuses
* Infinite scrolling is held out often as a separate thing, but it's really just lazyloading of a different kind
* We're going to combine our techniques for loading images on scroll, and ancillary content on load. We're going to ajax in content on scroll.
* DEMO