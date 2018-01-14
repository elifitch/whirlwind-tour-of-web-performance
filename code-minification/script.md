# Code Minification

## Intro
We always want to load a site as fast as possible, so naturally for us, less kilobytes is better than more kilobytes, but it almost always involves a tradeoff.  Less image resolution, fewer features, grainy video, et cetera et cetera.  But what about our code itself?  What if there were ways to make our code significantly smaller without giving up anything?  That's what minification is all about.  In this video we'll also cover Gzipping, which lets us serve browsers compressed files, instead of files at full size.  Both minification and gzipping are so important, that you should seriously think twice before shipping a site to production without checking these boxes.


## what minification is
So what exactly is minification anyways, and what about gzipping for that matter?  How are they similar and how are they different?  They serve the same goal, of sending less kilobytes down in a given request, but they're implemented quite differently.  Minification removes unneeded whitespace, semicolons, comments, and that type of thing, in order to create a physically smaller file.  Minifiers will even rename variables to as few characters as possible in pursuit of stripping out even more unneded bytes.  Minification makes your code somewhere between hard and impossible for us humans to read, but it's still perfectly valid and usable code as far as the browser's concerned.  It's okay to not worry about the impact minification has on readilility since we'll be developing with unminified code, and only use minified code on production where speed is far more important than readability.  The minification process will create a new file, oftentimes you'll see it abbreviated with "min", like styles.min.css or app.min.js.

## Impact of minification (maybe do a few slides for this because of the narrative progression)
The impact of minfication varies widely depending on whether you're minifying HTML, CSS or Javascript. Minifying HTML offers such paltry benefits that in many cases it's not minified at all. If there's a lot of HTML dynamically generated on your page as is the case with many client side web apps, you'll be saving a few kb at most.  It's much more important to minify CSS and Javscript where the benefits can be much greater. How much greater? Something in the range of 15-20% savings with CSS, and with javascript, it gets even better. Because variable names are reduced to a single character wherever possible, and a smattering of other tricks, minifiers can cut file sizes by 60% or more.  Because javascript makes up the bulk of the code on most modern websites, minifying production code stands as a turly critical step before releasing your project.

## minification for specific build systems
So how do you actually do this?  I wouldn't expect you to go through and manually rename varialbes and delete semicolons and all that.  Minification is always an automated process, one that gets included in your build system of choice.  I'll provide links in the course notes to some minifiers for popular build systems, all of which have a wealth of tutorial resources to use when implementing them.  If you're not used to setting up a build process, minification can be a great first toe in the water.  In my experience it's been no more tricky than learning any other new javascript library, and the benefits are enormous, so there's plenty of good motivation there.
[NOTES]
https://github.com/terinjokes/gulp-uglify
https://github.com/gruntjs/grunt-contrib-uglify
https://github.com/webpack-contrib/uglifyjs-webpack-plugin
CSS nano, used through postcss
https://github.com/nDmitry/grunt-postcss
https://github.com/postcss/gulp-postcss
https://github.com/webpack-contrib/css-loader

## what gzip is
Moving on from minification, lets talk about gzipping.  "gzipping" means that the server sending files down to a browser will compress files the instant before sending them in order to save on bandwidth.  The time it takes the server to compress a file and the browser to decompress it is negligible when compared to the speed advantages of sending a smaller file.  The gzip compression algorithm works by looking for repeating characters in a file and replacing any repeated character patterns with a pointer back to the first instance.  So, for example, imagine how many times in an HTML file you see the characters "left angle bracket d-i-v". Dozens and dozens of times.  All of these would be replaced with a reference to a single instance of those characters.

## Example
Julia evans put together an astonishing, stellar demo of how gzipping works by animating how it walks through a text file, in this case Edgar Allen Poe's the raven.  I'll go ahead and play it now so you can get a more expressive sense of how gzipping works.
[[show video]]
Wow, I must've watched this video dozens of times but it never gets old.  Did you notice how as the video went along, it went quicker and quicker?  As the file gets longer, more and more text will be replaced as the algorithm is able to find more instances where characters repeat. Gzipping has more drastic benefits the larger a file is and the more repeatable text there is in a file.

## Impact
Gzipping almost always yields more impressive file size savings than minification.  How much better?  About *five times better*.  Minifying is important. Gzipping is essential.  That said, you can and absolutely should use minification and gzipping together.  They are not mutually exclusive and approach the file size problem from two different angles.

## how to set gzipping up
Whereas minification is set up as a build process, gzipping is a little more murky and even more variable based on the situation. Gzipping is set up 100% server side, but it is available on most popular web servers, including nginx and apache, and it's easy to get going if you're managing your web server yourself. For example, with Nginx, enabling gzip is as simple as including a line in your configuration that reads "gzip on".  While I admit that it can feel a little more complex in practice, it's still remarkably easy to set up.  I'll include tutorials for how to enable gzipping on apache and nginx in the course notes.  If mucking around with server configuration isn't your thing, many static site hosting services such as github pages enable gzip compression by default.  Just make sure to check for this when you're looking for where to host a site.

## Checking for gzip compression
You can verify gzipping is set up on your site by looking in the network tab of chrome devtools. Lets hop over to the browser for a hot second to see where exactly.
[[BROWSER: ELI.WTF]]
This is my personal site, which I serve from Amazon S3 & cloudfront with gzip compression.  We can double check that gzipping is set up properly by looking over here in the network tab, and clicking on any html, css or js resource. Check the content encoding here in the response header, and if it says "gzip" you're good to go, gzip is set up and working.

## TLDR?
If there's one takeaway from this session, remember that gzipping and minifying production assets are *really* important. You could cut your file sizes by 80% or more. 80%! That's a lot of percents!  Before you deploy code to production, it's worth taking the time to set up minification in a build step.  If youre not comfortable with build systems yet, setting up minification can be a really good introduction, and if you do it once, you'll have it down pat for your next projects.  Gzipping is even more fire and forget.  If you host your sites yourself, once you enable Gzipping on your server, it's done forever.  If you use a hosting provider, it's even easier. Any hosting provider worth their salt will either enable gzip compression for text assets out of the box, or make it trivially easy to turn on.  Just take a minute to double check that your provider of choice is in on the fun.  Minification and gzipping isn't something to skimp on, so even if this feels like it deviates from the usual front end web dev workflow, it's very much worth your attention.


RESOURCES
https://css-tricks.com/the-difference-between-minification-and-gzipping/
nginx gzip: https://www.nginx.com/resources/admin-guide/compression-and-decompression/
apache gzip: https://gtmetrix.com/enable-gzip-compression.html