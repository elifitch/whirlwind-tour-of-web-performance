# Image Optimization Script

## Intro
Web performance, by and large, is all about loading content as fast as possible.  Image optimization is so important, because ... 

## Image KB
... most bytes floating around on the internet are images.  Estimating the size of the quote un-quote average webpage is much trickier than it sounds, but Tammy Evarts of speedcurve found that the average page in July 2017 was about 3 megabytes, and images made up more than half of that, at 1800 kilobytes.  Because images occupy such a large proportion of the bytes we're sending down to our users, in order to be an expert on web performance, you need to be an expert on images as well.

## What we'll cover
A common approach to image optimization is to take a cursory pass at making sure image resolution isn't needlessly high, and to integrate some standard automated image minifiers into your build system.  While image minifiers can really help, and we'll cover them, what's more important is understanding how to choose the right image format.  There are some easily avoided pitfalls that we can sidestep and shave off hundreds of kilobytes from our page weight.  First we're going to start with two special image types, SVGs and GIFs.

## SVG
SVGs are different than any other image we're going to cover, because they're vector based.  What this means that instead of having information about a grid of pixels like raster images, it contains information that the browser can use to draw shapes.  The advantage of this is that it is infinitely scalable: no matter the size, an SVG will be perfectly crisp.  Because they hold drawing instructions, SVG are also generally much smaller than raster images, and they can be manipulated, animated and interacted with kind of like HTML.  This file size advantage makes SVGs very well suited to icons and illustration, of the animated or static variety.

## SVG vs JPG
As we can see here, the size difference between an SVG illustration and a reasonably high res JPG can be enormous.  The SVG is a slight 9kb, while the JPG is about 16 times larger.

## SVG 
So if SVG is smaller than raster images, infinitely scalable, and interactive, heck why don't we make everything an SVG.  Well that's the catch.

## SVG conversion
You can't often feasibly convert a raster image to an SVG.  There are some algorithms that attempt to trace features in a raster image to create vector shapes in order to make this conversion possible, but they almost always require a significant amount of tedious manual touchup, and end up larger than the source raster image anyways.  An axiom I keep in mind when thinking about SVGs is this: Everything that can be an SVG probably should be, but not everything can be.

## GIFs
On to gifs!  Everybody loves gifs!  Gifs make the internet a fun pleasant hilarious cat filled place where we all want to spend our time and make fast performant websites right? Wellllllllll not quite.  I have a secret to tell you: GIFs are bad.  They have a limited color table that makes for poor color depth, and when you compare them with video they can be an order of magnitude or more larger.  I know what you're thinking: don't use gifs?  Who does this joker think he is?  I mean this is, sacrelige right?  Well don't take my word for it, why don't we ask an authority on the matter ...

## Giphy
... liiiiike say a little site called "giphy". That's right, not even giphy uses gifs, and I'll prove it to you.

[[Go to https://giphy.com/gifs/mashable-l3q2K5jinAlChoCLS (in firefox?)]]


[[logo]]
I mean with a name like giphy, this fancy animated logo, that's got to be a gif right? [[inspect]] noooope its an animated svg.


