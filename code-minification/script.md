# Code Minification

## Intro
We always want to load a site as fast as possible, so naturally for us, less kilobytes is better than more kilobytes, but it almost always involves a tradeoff.  Less image resolution, fewer features, grainy video, et cetera et cetera.  But what about our code itself?  What if there were ways to make our code significantly smaller without giving up anything?  That's what minification is all about.  In this video we'll also cover Gzipping, which lets us serve browsers compressed files, instead of files at full size.  Both minification and gzipping are so important, that you should seriously think twice before shipping a site to production without checking these boxes.


## what minification is
applies to all types of code
javascript minification is usually most important
CSS minification has a ceiling 
So what exactly is minification anyways, and what about gzipping for that matter?  What are they, how are they similar and how are they different?  They serve the same goal, of sending less kilobytes down in a given request, but they're implemented quite differently.  Minification removes unneeded whitespace, semicolons, comments, and that type of thing.  It'll even rename variables to as few characters as possible.  Minification makes your code somewhere between hard and impossible to read, but it's still perfectly valid and usable code as far as the browser's code.  It's okay to not worry about the impact minification has on readilility since we'll be developing with unminified code, and only use minified code on production where speed is far more important than readability.  The minification process creates a new file, oftentimes you'll see it abbreviated with "min", like styles.min.css or app.min.js.

## Impact of minification (maybe do a few slides for this because of the narrative progression)
The impact of minfication varies widely depending on whether you're minifying HTML, CSS or Javascript. Minifying HTML offers such paltry benefits that in many cases it's not minified at all, especially if there's a lot of HTML dynamically generated on your page as is the case with many client side web apps, you'll be saving a few kb at most.  It's much more important to minify CSS and Javscript where the benefits can be much greater. How much greater? Something in the range of 15-20% savings with CSS, and with javascript, it gets even better. Because variable names are reduced to a single character wherever possible, and a smattering of other tricks, minifiers can cut file sizes by 60% or more.  Because javascript makes up the bulk of the code on most modern websites, minification becomes even more critical.

## minification for specific build systems
So how do you actually do this?  I wouldn't expect you to go through and manually rename varialbes and delete semicolons and all that.  Minification is always an automated process, one that gets included in your build system of choice.  I'll provide links in the course notes to some minifiers for popular build systems, all of which have a wealth of tutorial resources to use when implementing them.  If you're not used to setting up a build process, minification can be a great first toe in the water.  In my experience it's been no more tricky than learning any other new javascript library, and the benefits are enormous, so there's plenty of good motivation there.

## what gzip is
Moving on from minification, lets talk about gzipping.

## how to set gzipping up

## TLDR?



[[]]
something about the internet is kilobytes
less kilobytes
[[]]


DO NOT GET INTO SPECIFICS OF BUILD SYSTEMS
DO NOT GET INTO SPECIFICS OF BUILD SYSTEMS
DO NOT GET INTO SPECIFICS OF BUILD SYSTEMS
DO NOT GET INTO SPECIFICS OF BUILD SYSTEMS
DO NOT GET INTO SPECIFICS OF BUILD SYSTEMS


cover average gains from minification
cover concat + source maps


Talk about what minification is, why it's important, what gzipping is, why it's important, and point people at resources

Minification and gzipping are so important and ubiquitous that you should not ship a production site withouth making sure these boxes are checked.