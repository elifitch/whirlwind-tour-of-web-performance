# Image Optimization Outline

## Intro
* Optimizing images, and knowing when to use each, is important because images are the largest part of a website a lot of the time
* Cover: The three main types of images: png, jpg, and gif and talk when to use each one. Also talk about how webp changes things
* There are a million automated image optimization tools you can integrate into your build system. We'll recommend some good ones and eliminate the guesswork

## SVG
* special case, as svg is vector based.
* Fantastically small and high quality for simple designs like icons, bad for things like photos
* Recommended optimizer: imagemin-svgo
* SLIDE: show a photo represented in svg with the file size as crazypants


## Jpg
* bread and butter, always prefer JPG for static images
* Progressive rendering
* Try to keep quality as low as possible
* Recommended optimizer: imagemin-jpgoptim
* SLIDE: Show differences in quality

## png
* use when you need easy transparency
* Prefer 8 bit to 24 bit unless you need smooth color gradiation
* In browsers that support it, you can mask jpgs and look just like a png with less file size [Ref: https://css-tricks.com/transparent-jpg-svg/; http://quasimondo.com/ZorroSVG/; https://github.com/Quasimondo/ZorroJS/blob/master/zorro.js]
* Recommended optimizer: imagemin-pngquant
* SLIDE: show difference between 8bit and 24 bit png
* SLIDE: just like my doge demo, show the kb savings in a line up

## GIF
* Everybody loves gifs, but they're inefficient and enormous
* Almost no reason ever to not use a video instead of a gif
* A bunch of people, even giphy?, conver to video
* Recommended optimizer: imagemin-giflossy
* SLIDE: gif and a video next to each other with a note on file size

## webp
* smaller than png, jpg, and gif, and supports transparency, best of all worlds!
* Downside is it's only supported in chrome, opera, opera mini, android, and android chrome at the moment, but that may change, and you can polyfill it today