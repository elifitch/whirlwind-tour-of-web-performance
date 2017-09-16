# Image Optimization Outline

## Intro
* Optimizing images, and knowing when to use each, is important because images are the largest part of a website a lot of the time
* Cover: The three main types of images: png, jpg, and gif and talk when to use each one. Also talk about how webp changes things
* There are a million automated image optimization tools you can integrate into your build system. We'll recommend some good ones and eliminate the guesswork

## Image KB
* According to research by performance expert Tammy Everts in 2015, the average website included about 1.3mb of images in mid 2015.  Today, that can easily climb to 1.7mb or more
* If we don't get really good at optimizing images, our sites will never be fast.
* Looking at this another way, improving our images offers some of the best performance gains for moderate developer effort

## What we'll cover
* Choosing the right format is super important because a lot of times just by being judicious about image types, we can get most of our gains without setting up any tooling or fiddling with image optimizations and tradeoffs; Knowing this is the most important part.
* Once we're sure we're choosing the best format for the job, how to fine tune each one
* Lets jump in with two special image types: the SVG and the GIF

## SVG
* Vector based: explain what this is
* Generally smaller than raster formats
* Different capabilities, show: https://codepen.io/sdras/pen/waXKPw?q=sdras&limit=all&type=type-pens
* Basically prefer SVGs for anything that's drawn in a vector program. If it was ever a vector, there's a good chance that it should stay a vector.
* Cant feasibly export, so this really is another category

## GIF
* Go here, show this is an mp4 https://giphy.com/gifs/rip-picard-luc-1mqtps3UcfDXi
* Not even giphy uses gifs: https://giphy.com/gifs/mashable-l3q2K5jinAlChoCLS
* Almost no reason ever to not use a video instead of a gif
* A bunch of people, even giphy?, conver to video

## Jpg
* bread and butter, always prefer JPG for static images
* Try to keep quality as low as possible

## png
* use when you need easy transparency
* Prefer 8 bit to 24 bit unless you need smooth color gradiation
* They can get huge so be careful about using big ones

## JPNG
* What do you do if you really need a large transparent png? JPNG to the rescue! https://codepen.io/shshaw/full/LVKEdv

## Optimizers
* Go through list, show imagemin github page while you talk

## Resources
* jpng stuff [Ref: https://css-tricks.com/transparent-jpg-svg/; http://quasimondo.com/ZorroSVG/; https://github.com/Quasimondo/ZorroJS/blob/master/zorro.js]
* Average image weight: https://www.soasta.com/blog/page-bloat-average-web-page-2-mb/
* average page https://speedcurve.com/blog/web-performance-page-bloat/
* Great perf stuff in general, lots of great insights on images: https://medium.com/@fox/talk-the-state-of-the-web-3e12f8e413b3
