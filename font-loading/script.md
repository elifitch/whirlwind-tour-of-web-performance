# Script

## Intro
Let's talk font loading!


## Super Important
Font loading might not seem like something that deserves its own separate video, but it is both extermely important and fraught with interesting challenges.  It is extremely important because fonts are a render blocking resource.  Browsers wont draw any text on a page if that element has a web font assigned.  Putting this another way, that means that if you use web fonts, your users will have to wait for the fonts to load in order to see any content.  One of the core tenets of web performance is getting users into content as quickly as possible, so this is...bad.  Very bad.  Making matters worse, if the request for our font hangs, older browsers will hang too, forever, meaning that users will never get any content at all.


### FOIT
This phenomenon of hidden content is called the "flash of invisible text", or FOIT for short.  This is what FOIT looks like.

[[CLICK PLAY]]

As you can see, it's clean, the layout doesn't shift around, the fonts just pop in.  The problem is it takes almost four seconds in this example for that to happen.  All the while there was HTML and CSS here ready to be rendered, but the browser made the decision to hide it while the fonts were loading, keeping users out of content.  Not great.


### FOUT
The alternative to FOIT, and how browsers natively handled font loading a few years ago, is the "Flash of Unstyled Text", or FOUT.  Lets see what this looks like.  

[[CLICK PLAY]]

Well that was...something.  Yeah there's a word for it, it's ugly.  It's jarring.  It's why browser vendors prefer FOIT.  Content jumps around, fonts pop in, it looks weird.  That being said, it *does* get users into content faster, so there's a nugget of a performance gain in here, but yeah, it's definitely counterbalanced by some undesirable behavior.


### Why FOUT is better
Lets take a minute and go over why FOUT is better than FOIT, even in spite of all this weird layout reflowing.  This is a headline from 2015, as the 2016 election cycle was just creaking into motion in the national media.  It proclaimed that Mitt Romney was officially running for president....for 2016.  If you remember, Mitt Romney didn't run for president in 2016, and in fact, that's what this headline was *trying* to express.  Here's the headline after webfonts were given a few more seconds to load. 


### Why FOUT is better
On this mobile connection, the webfont for the italicized "not" took a while to load, and because of FOIT, the article appeared to represent the exact opposite of its true intent.  Sure the word "not" did eventually load, but it loaded long after most users would have scrolled past the headline, eager to learn more about Mitt Romney's impending 2016 presidential bid.

FOIT is bad, not just for web performance, but it also undermines your content in other subtle, potentially catastrophic ways.


## Why FOUT is better
This comination of reliability and speed is why FOUT is definitively better than FOIT, especially if we can figure out a way around its janky loading experience.


## Browsers prefer FOIT
This leaves us in a bit of a quandary though.  Browsers, when left alone, will hide content with webfonts, leading to all these problems.  This is the point where some designers and developers throw their hands up and say "just use system fonts".  And while that has some very valid arguments that we're not going to get into today...


## So we have to cheat
...suffice it to say that we can reach into our bag of tricks and force the browser to give us FOUT.  This technique is called "Critical FOFT" (which stands for Flash of Faux Text), and it gives us the speed of FOUT with the clean loading experience of FOIT, the best of all worlds.


## Lets try critical foft
An ingenious technique developed by Zach Leatherman, Critical FOFT, or it's full name, "Critical FOFT with Data URI", takes the primary weight and style of each font we want to load (think just a regular font for body copy, no bold, no italic) and inlines that font as a data URI so its immediately available, while it asynchronously loads bold, light, and/or italic fonts.  This immediate availablility for most characters on the page means there's no invisible text, and it relies on the browsers ability to draw a regular font a bit heavier to "fake" bold, or draw regular text on a slant to "fake" italics while we wait for the real bolds and italics to load.  That's where the "faux" of "flash of faux text" comes in.

I know what you're thinking though, an inline data uri of a whole font could be massive, and really increase the size of our HTML, and you'd be right!  That's why this technique goes a step further.  We're going to inline not a full font file, but a stripped down subset, without any non-latin characters, fancy math symbols, or seldom used punctuation that's bundled in with most widely used fonts.  This will make our inline data uri much smaller, and result in a font loading experience that is almost as fast as using system fonts, has no FOIT, and minimal-to-imperceptible FOUT-like layout reflow.  We're going to take this method and add our own flourishes to make it even better.

Lets see how it works in practice.


## Demo time
[[STYLE.CSS]]
This is the CSS of the page we're going to be working with.  We're starting with a normal, traditional font loading scheme.  We're loading two font files, a medium weight Brandon Grotesque for our body copy, and Brandon Grotesque bold for headlines.  We're assinging this font family to everything in the body.
[[INDEX.HTML]]
Over here in our markup we've got a headline and posted date, both bold, and some body copy of our standard font.
[[SHOW PAGE IN BROWSER]]
This is what it looks like in a browser.  Pretty much as expected, we see our bold headline and date, with our medium body copy.  Lets open up chrome devtools and run a lighthouse performance audit.  These can take a little bit, so we'll come back to the video when it's finished.  Hmm not great, we got some FOIT, and our first meaningful paint is at [[[\\]]] seconds.  If we look here at our critical request chains, we can see that it took around [[[\\]]] miliseconds to request each of these fonts.  I'm willing to bet using Critical FOFT will greatly improve this time.
[[FONT SQUIRREL]]
The first step of Critical FOFT is creating our custom, much smaller font subset.  There are a variety of ways to do this, including some nifty command line tools that I'll link to in the course notes, but fontsquirrel gives you a nice interface to get this done, and since this a once-per-project step, it's nearly as efficient as nifty stuff on the command line.  Our first step is to click generator here at the top.
[[CLICK GENERATOR]]
Then click "upload fonts".
[[CLICK UPLOAD fonts]]
And select brandon grotesque medium.
[[WAIT FOR UPLOAD TO FINISH]]
Now that our font is uploaded, we need to click expert, because we're font experts now
[[CLICK EXPERT]]
We want to only export our font in woff format to keep our browser support as high as possible.
[[SELECT ONLY WOFF]]
Then we want to come down here and select custom subsetting.
[[CLICK CUSTOM SUBSETTING]]
For our custom subset we want to include upper and lower case latin characters, as well as numbers.  The specifric characters you absolutely need will vary not just from project to project but from page to page, but I find that uppers, lowers and numbers is a good starting point and rule of thumb.
[[SELECT UPPER LOWER NUMBERS]]
We can see here below where we get a visual preview of our subset.  This will givee us a font that consists only of these 62 characters.  Believe it or not that a non-optimized font can contain more than a thousand characters, so this is much much smaller!  The last option we want to check is "base64", to because we want the font available as an data URI so we can inline it right in the head of our HTML
[[SELECT BASE64]]
Then we're going to check yes, we agree to the license terms, and hit the button to download our font kit.
[[CLICK AGREEMENT AND DOWNLOAD]]
This generating and downloading the font can take a minute, so we'll come back when it's ready.
[[OPEN FINDER]]
So here we've got our font kit downloaded and unzipped, lets see what we got.
[[OPEN CSS]]
the included stylesheet has our custom font subset inlined and ready to go.  We just need to copy it from here and paste it into a style block in the head of our HTML.
[[inline it in the head]]
While we're at it let me rename the font family to something a little more memorable, like "brandon grotesque subset"
[[[RENAME, ADJUST, W/E]]]
Next we need to define a unicode-range in our CSS so the browser knows what characters this font can be applied to.  Getting unicode ranges can be a tedious process, so I made a little tool that will generate them for you.
[[[GO TO CODEPEN LINK]]]
You just input the characters you want in this text input, and then it'll generate the appropriate unicode range for what you need.
[[[DO THE TOOL]]]
Voila, there's our unicode range, lets just copy that into our code.
[[[COPY IT INTO CODE]]]
Next need to tell the browser to use our font subset as soon as possible, so lets put that in our style block as well.
[[[PUT BODY FONT DEFINITION IN THERE]]]
So right now, we've got our custom subset going great, but we're not loading any supplementary fonts, so lets do that with just a pinch of javascript.
[[[write script tags DEFER, write IIFE, copy in font face observer]]]
I just copied in FontFaceObserver, a javascirpt library made by Bram Stein that lets us know when fonts have downloaded and are ready for use.  The link to it will be made available in the course notes.  I inlined it here just to save a request.  Lets put this library to use and tell it to observe our full font.
[[[
`const brandonGrotesqueFull = new FontFaceObserver('brandon grotesque');`
`Promise.all([brandonGrotesqueFull.load()])`
]]]
I'm using the Promise.all syntax here just so that in the event that we were loading more than one font family, like if we had separate fonts for headlines and body copy, we wouldn't have to change our syntax at all.
[[[
```
.then(() => {
    document.documentElement.className += ' fonts-stage-2';
});
```
]]]
All this is doing is applying a class to the document that we can hook into with our CSS to switch from using our performance optimized subset, to our rich, full featured webfont when it's downloaded
[[[
in style block
```
.fonts-stage-2 body {
    font-family: 'brandon grotesque';
}
```
]]]
and here we're defining that rule.  We just need one last little optimization for repeat visitors.
[[[
```
<link rel="preload" type="font/woff2" as="font" href="fonts/brandon-grotesque-medium-webfont.woff2">
    <link rel="preload" type="font/woff2" as="font" href="fonts/brandon-grotesque-bold-webfont.woff2">
```
]]]
Here we're just putting in preload tags to give browsers that support preload a head start downloading our full fonts and our CSS so they'll be ready ASAP.  In a non-demo situation you might be more judicious about what to preload, but that's a story for another session.
[[[
`sessionStorage.criticalFoftFontsLoaded = true;`
(above, right at the beginning)
```
if(sessionStorage.criticalFoftFontsLoaded) {
    document.documentElement.className += ' fonts-stage-2';
    return;
}
```
]]]
We're just tucking a note away in our session storage that we've loaded webfonts already, so we can bail out of this whole process on repeat views, as the font is likely to be cached in the browser.  You could likely get a lot smarter with this by using a service worker, but this will work fine for sites without service workers, like this demo page.  So lets head back to the browser and see the fruit of our labor.
[[[IN BROWSER]]]
Okay looking good, looking normal, lets run a performance audit.
[[[RUN AUDIT]]]
Well, well that's a good deal faster than before!  We've shaved down [[[\\]]] seconds, which is impressive on its own, but that advantage grows as the site grows in size and complexity, so in the real world it's likely to be even better than that.  *Critically*, there's no FOIT, no FOUT, just a fast, buttery smooth experience.

Just one last thing, for the system font crowd, lets delete all this stuff out of the head, and comment out the CSS to see how much faster it would be to have no fonts at all.
[[[DELETE/COMMENT THE SHIT]]]
Okay we can see the fonts are gone, lets run an audit and see the difference between Critical FOFT and no fonts at all
[[[RUN AUDIT]]]
Okay, so it is a little faster, but a really tiny amount.  In a page with more resources that's a little more complex than this demo, that difference becomes even less significant.  This method of loading fonts really does give you the option to use webfonts at a very small performance penalty, with a smooth loading experience to boot.  With this tweaked take on Critical FOFT you really can have your cake and eat it too.












