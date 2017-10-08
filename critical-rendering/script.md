# Critical Loading

## Intro
It's an aknowledged axiom of web performance that our sites feel faster if we get users into content as quickly as possible.  We throw around metrics like time to first paint and time to first interactivity as some of the most important things to optimize for.  If that's true, and we can identify what the most important content is on the page, the content that users are most likely to want to interact with first, then we could get a speedup by optimizing to render that content first, while deferring everything else.

## Pixels equal
Generally by default we don't really do this.  We generally tend to just dump everything in an HTML file, add in a CSS file for styling and some javascript and call it a day.  That's how we get the example on the bottom here, where the page only renders when CSS for all content is ready to go, and render blocking javascript and fonts are loaded.  What we WANT on the other hand, is the top row, where we progressively render the page as resources load, and not necessarily from top to bottom, rather we want to load content from most critical to least critical.  This means analyzing our page to determine what's most important, as well as looking at our render blocking requests, somtimes called the critical request chain or critical path, and figuring out how to best defer everything that isn't absolutely essential.

## What is a render blocking resource
First we need to figure out what exactly a render blocking resource is.  The quote unquote traditional way of requesting a stylesheet via a link tag will block rendering until it's downloaded and parsed.  A normal script tag without the async or defer attributes will cause the browser to halt, download, and execute before it proceeds on to render content. This, by the way, is why it became a common practice to put script tags at the end of the body.  Webfonts will similarly block rendering of any text that uses those fonts until they're loaded.  Now that we know what types of resource loading will block page rendering, that paints kind of a bleak picture.  We can't exactly just chuck CSS, javascript, and webfonts in the garbage bin can we?  The good news is that there are ways around all of these constaints.  {{{Special techniques for fonts and scripts were deserving of their own separate videos in this series, so I strongly suggest you check those out, but they wont strictly be necessary for this session and we'll touch on the specifics briefly.}}}

## What's critical
Now that we know what resources can block page loading, we need to sit down and figure out what critical means.  Oftentimes critical is assumed to be a euphemism for above the fold, and while that can be a good starting place for how to think about critical resource loading, we can take it a step further by getting closer to users.  Users frequently DO interact with content above the fold first, but not all content above the fold is neccessarily of equal importance.  If we look at our users's behavior, or make some educated assumptions about their priorities, we can optimize even more and get them into the content they need even faster.

## Demo time
Because the specifics vary on a case by case basis, I'll do two quick demos to show a thought process you can apply to your own projects.  We're going to improve the performance of two different pages: a landing page on a marketing site, and a blog post.  Lets hop over to the browser and get started.

# Browser: Landing page
Here's the landing page we're going to be improving.  Lets break it down a little bit.  Up top, we have this navbar with a few important links, and the all important login button.  Then we've got this big hero image, with the page's most important call to action: the signup button.  Alongside, we've got an extremely irritating newsletter signup prompt, we can go ahead and dismiss that.  Moving on down the page, we've got a few great features our site is touting.  Now lets pause for a second, what is the most important content here on this page?  The navbar is definitely important, containing the login button and some other critical things.  This hero is important too.  The image here is important to our brand, and it contains the page's central call to action.  The rest of the stuff, like all this text about features, and DEFINITELY this newsletter signup, are all less important.  Lets hop over to the network tab to get a sense of what our loading behavior looks like.

# Network tab
Here in our old friend the network tab, we can click this little camera button and reload the page to generate a filmstrip of what the page looks like when it's loading

[[click and reload]]

Yikes look at that, the whole page is blank, until [[[]]] seconds when the page pops in all at once.  We can get our site to load much more progressively by splitting our CSS, inlining the critical CSS, and asynchronously loading the rest.  Lets head over to our text editor and make that happen.

# Sublime
First things first, lets pull out the critical CSS rules.  Luckily for us, they're all here at the top of the file.  Lets rip these out and inline them in the head of our HTML.

[[cut, inline in html, go back to CSS]]

Lets rename this remaining CSS, the less critical CSS, separately, so we have 3 chunks of CSS in total: a file with all of our css, the inline CSS we just created, and now this: less-critical dot css.

[[Save as, name as less-critical]]
[[go to html]]

Next, we need to load our less critical css asynchronously.  link rel preload is a fantastic tool for asking the browser to go get a resource before it's discovered during HTML parsing or dynamically in some future asynchronous request.

```
<link rel="preload" as="style" href="less-critical.css" />
```

What we're doing here is basically telling the browser, "go get the less critical stylesheet, even though you don't know what we're going to do with it yet, trust us, we'll need it later".

[[add onload]]
```
 onload="this.rel='stylesheet'"
```

Now what we're doing is adding an onload javascript handler, that will change this link tag from a preload tag to a stylesheet tag, so that way, once the css is loaded, the browser will parse it and use it as a stylesheet.  The key difference here between using link rel preload switching it over to a stylesheet tag when its ready, and just popping a link rel stylesheet tag in, is that link rel stylesheet is blocking, while preload is not.  So by using a preload tag, we're letting the browser use the immediately available inline css we pasted in earlier WHILE it loads the rest of our styles in the background.  If we used a traditional link rel stylesheet tag, the browser would still block rendering until the styles loaded, which would defeat the purpose of inlining our critical css.

* Move remaining CSS into site-wide.css
* noscript style.css
* loadCSS for site-wide css
* 







General info
https://varvy.com/pagespeed/critical-render-path.html
https://www.smashingmagazine.com/2015/08/understanding-critical-css/

Preloading
https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf

Base64
https://varvy.com/tools/base64/