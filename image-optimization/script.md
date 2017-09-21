# Image Optimization Script

## Intro
Web performance, by and large, is all about loading content as fast as possible.  Image optimization is so important, because ... 

## Image KB
... generally most bytes we request on a day to day basis make up images.  Estimating the size of the quote un-quote average webpage is much trickier than it sounds, but Tammy Evarts of speedcurve found that the average page in July 2017 was about 3 megabytes, and images made up more than half of that, at 1800 kilobytes.  Because images occupy such a large proportion of the bytes we're sending down to our users, in order to be an expert on web performance, well you need to be an expert on images as well.

## What we'll cover
A common approach to image optimization is to take a cursory pass at making sure image resolution isn't needlessly high, and to integrate some standard automated image minifiers into your build system.  While image minifiers can really help, and we'll cover them, what's more important is understanding how to choose the right image format.  There are some easily avoided pitfalls that we can sidestep and shave off hundreds of kilobytes from our page weight.  First we're going to start with two special image types, SVGs and GIFs.

## SVG
SVGs are different than any other image we're going to cover, because they're vector based.  What this means is that instead of having information about a grid of pixels like raster images, it contains information that the browser can use to draw shapes.  The advantage of this is that it is infinitely scalable: no matter the size, an SVG will be perfectly crisp.  Because they hold drawing instructions, SVG are also generally much smaller than raster images, and they can be manipulated, animated and interacted with kind of like HTML.  This file size advantage makes SVGs very well suited to icons and illustration, of the animated or static variety.

## SVG vs JPG
As we can see here, the size difference between an SVG illustration and a reasonably high res JPG can be enormous.  The SVG is a slight 9kb, while the JPG is about 16 times larger.

## SVG 
So if SVG is smaller than raster images, infinitely scalable, and interactive, heck why don't we make everything an SVG.  Well that's the catch.

## SVG conversion
You can't often feasibly convert a raster image to an SVG.  There are some algorithms that attempt to trace features in a raster image to create vector shapes in order to make this conversion possible, but they almost always require a significant amount of tedious manual touchup, and end up larger than the source raster image anyways.  An axiom I keep in mind when thinking about SVGs is this: Everything that can reasonably be an SVG probably should be, but not everything can be.

## GIFs
On to gifs!  Everybody loves gifs!  Gifs make the internet a fun pleasant hilarious cat filled place where we all want to spend our time and make fast performant websites right? Wellllllllll not quite.  I have a secret to tell you: GIFs are bad.  They have a limited color table that makes for poor color depth, and when you compare them with video they can be an order of magnitude or more larger.  I know what you're thinking: don't use gifs?  Who does this joker think he is?  I mean this is, sacrelige right?  Well don't take my word for it, why don't we ask an authority on the matter liiiiike say a little site called "giphy" ...

## Giphy
...  That's right, not even giphy uses gifs, and I'll prove it to you.

## Browser

[[Go to https://giphy.com/gifs/mashable-l3q2K5jinAlChoCLS (in firefox?); make sure caching is enabled]]
Here we are on giphy.com, looking at a gif of a perplexed person.   Lets inspect this gif here and see what we have.

[[inspect]]

So there *IS* a gif present, but what's this?  The gif's opacity is set to zero.  Lets remove it from the DOM and see what happens.

[[Delete it]]
Well, there's no change at all.  Lets Undo that and try removing this video instead.
[[undo, remove vid]]  
Well I guess it turns out we were really looking at this mp4 the whole time.  Hopping over to the network tab, we can see what's going on here.

[[GO TO NETWORK TAB]]

See, here's the animated gif, coming in at [[time]], 
[[media tab]]
and here's the video, loading at [[time]], much sooner.  They're loading the gif after the mp4, because the MP4 is much smaller & quicker to get over the wire and gives giphy something they can show to the user asap.  The gif can come later, because it's not visually shown to the user, and it exists to give the user something to right click to save.  If that's not surprising enough for you, I'll go one step further, lets refresh the page.

[[Refresh]]
When the page loads, you get this nice animation in Giphy's logo.  Here I'll refresh so you can see it again.  With a name like giphy, their logo animation has got to be a gif right?

[[Inspect it]]
Nope.  It's an animated SVG.  Even Giphy's logo isn't actually a gif.  Maybe they should call themselves mp4-y?  Giphy, like many other sites, twitter for example, convert gifs you upload into mp4s, because they're so much smaller, and don't look any different.  

## Gif vs Mp4
Here we've got two animations, one saved as a gif, and one saved as an MP4.  The GIF is more than 20 times larger than the MP4.  Twenty times!  That's an enormous difference in size for something that visually looks almost identical. In fact if we wanted to split hairs, .mp4 videos can look much nicer than gifs, with richer color depth and smoother color gradiation.

## GIF
So what are GIFs good for anyways?  Well, not much to be completely honest.  In almost every case, you should choose something else.  Static GIF?  Go with a JPG.  Animated GIF, go with an mp4 video.  That being said, one thing GIFs are definitely still useful for is animated content on older IOS devices.  Older IOS devices wont autoplay videos inline, they open up in IOS's native video player, which isn't what anyone wants for a video background or something of the sort.  So you can substitute a GIF in for videos in those cases to get around that problem.  Except for that specific case, whenever you reach for a GIF, remember that you should usually reach for something else.

## JPGs
On to JPGs!  JPGs are our bread and butter image type.  The reason for this is that they tend to be smaller and more flexible than basically everything else, including PNGs.  JPGs are a lossy image format, which despite its name is actually a very good thing.  This means that we can adjust the image's quality to find a sweet spot that is both smaller than a lossless format with compression artifacts that are visually imperceptible.

## JPG vs JPG
Here's what I'm talking about.  The image on the left is a jpg set to a quality level of "30" and on the right is a JPG with quality level set to "80".  They look almost exactly the same, a keen eye might be able to spot some slight banding or artifacts in the left image, but it would take more effort than web users would ever reasonably expend to spot those differences.  What we get from this tiny degradation is an image that's more than four times smaller.  This is an obvious tradeoff to make, which is why it's so perplexing that many designers and developers don't take the step of exporting images at lower quality levels.  The reason I chose 80 and 30 quality for this example is that they are photoshop's default "very high" and "medium" export quality levels respectively.  30 quality is usually a fine option to take, but for larger JPGs, like for big vibrant hero images, you might want to go with 60, and for images that are smaller or less significant, you could reasonably go as low as 10.  Setting the right quality level is something that can be done programatically as a build step, but I recommend making image quality a conscious choice, and doing this manually.  Different quality levels make sense for different images, and it's difficult to get right in an automated image minifier.

## JPG
The one true downside of JPGs is that they don't offer transparency.  This, in large part, accounts for the popularity of our next image format: PNGs.

## PNG
The major advantage of PNGs is that they give you easy transparency, something that you just can't get with a plain old JPG.  PNGs comes in two flavors we need to be concerned about, 24 bit and 8 bit, which corresponds to the number of colors available in the image.  8bit PNGs can have up to 256 colors, while 24 bit PNGs can handle 16 million colors.  That's a huge difference, but believe it or not, much of the time you can get away with 256 colors without a problem.

## 8bit vs 24bit
Here's an 8 bit png and a 24 bit png.  They look basically the same, but the 24 bit version of the image is more than four times larger.  Granted if you want smooth color gradiation or a very large image, you will get noticeably nicer looking results in a 24 bit png.

## PNG
That said, if you want a high resolution image with rich color gradiation, like say, for a hero image, your PNG will end up being positively enormous.

## PNG vs JPG
Here's the same photo in JPG and PNG format, 2000px across, that might be appropriate for a big glorious hero image on desktop sites.  The JPG is a manageable 260kb, while the PNG is almost 3 megabytes!  That image alone is the size of the "average" website we discussed earlier.  Photos like this should always, 100% of the time, be JPGs.

## PNG
Always ask yourself, does this *need* to be a PNG?  For icons and illustrations that naturally need transparency, you should use SVGs.  For images that contain rich colors, you should opt for a JPG.  So what happens when we do need a high resolution image, with rich color, AND transparency?  Are we forced to use PNGs and just live with the huge file size?  Well, not quite.

## SVG Masking
We can exploit a special feature of SVGs, called masking.  What this means, is we can put an image inside an SVG, and tell the browser what parts of the image should be opaque, and what parts of the image should be transparent.  We give the browser this show/hide information in a separate, grayscale image, called a mask.

## SVG Masking
The syntax for how this works isn't super complicated. You define an image element within the SVG, a mask element, and reference the mask in the main image.  You could do this with CSS as well, but SVG masking has far better browser support.

## SVG Masking
With the two images combined, we get something that looks like this.  Nice clean edges, perfectly normal transparency.  If I saw this in the wild, I'd just assume it was a PNG, but we get all the filesize savings of using JPGs instead.  It's a really elegant solution that gives us the best of both worlds.

## JPNG
We don't have to do this mask creation manually, a very skilled developer named Stephen Shaw made a tool called JPNG.svg that will do all this work for us.  Lets take a peek of how it works

[[Browser: https://codepen.io/shshaw/full/LVKEdv]]
Here's JPNG.svg on codepen, I'll include a link to it in the course notes.  Lets try it out.  The default quality level of 60 for the main image and 50 for the mask works well for the image we're going to use so we can leave it alone. Now I'm going to upload this very high resolution 1800x1800px, 1.4 megabyte PNG.
[[upload, wait for it to finish]]
And here's our result. Veeeeery nice. Effectively a transparent JPG, the holy grail of image types, and it's just 132kb, more than 10 times smaller than the equivalent PNG.  If you don't want to use the JPNG.svg interface here, I created an NPM module that takes PNGs and cranks out JPNGs, making it easy to integrate into your build chain.  I'll put a link to that library in the course notes.

## Automated Optimizers
This brings us to the matter of automated image optimization.  There are a million options out there and it's easy to be overwhelmed by choice.  I can't make that choice for you, but I can state my preferences.  I am a big fan of the imagemin suite, which consists of a core module and an ecosystem of specific image minifiers to be used as plugins.  Folks have also already integrated it with gulp, grunt, webpack, brunch and other build systems and task runners.  One thing to keep in mind is that many image optimization options use lossless minifiers by default.  While we can sometimes get satisfactory gains from lossless optimization, the improvements we can get from lossy optimizations can be much greater, while still being visually imperceptible to the lossless version.  All the specific optimizers I've listed here are lossy.  They require a little more calibration, but offer exceptional filesize savings.

## Remember
I know I threw a lot at you in this session, but just remember a few key things.  Knowing when to reach for each each image format is even more important than a robust automated image optimization build system.  BUT When it comes to automated optimizers, go with lossy optimizers over lossless optimizers because of the greater filesize savings.  Remember to use SVGs for icons, illustration or specialized interactive content.  Use MP4s instead of gifs wherever possible.  Instead of PNGs, use JPNG.svg to make masked JPGs inside SVGs. And lean on moderate quality JPGs for everything else.











