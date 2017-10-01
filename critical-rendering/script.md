# Critical Loading

## Intro
It's an aknowledged axiom of web performance that our sites feel faster if we get users into content as quickly as possible.  We throw around metrics like time to first paint and time to first interactivity as some of the most important to optimize for.  If that's true, and we can identify what the most important content is on the page, the content that users are most likely to want to interact with first, then we could get a speedup by optimizing to render that content first, while deferring everything else.

## Pixels equal
By default, we don't really do this.  We generally tend to just dump everything in an HTML file, add in a CSS file for styling and some javascript and call it a day.  That's how we get the example on the bottom here, where the page only renders when render blocking javascript and fonts are loaded, and CSS for all content is ready to go.  We want to shoot for the top row, where we progressively render the page as resources load, and not necessarily from top to bottom, rather we want to load content from most critical to least critical.  This means analyzing our page to determine what's most important, as well as looking at our render blocking requests, somtimes called the critical request chain or critical path, and figuring out how to best defer everything that isn't absolutely essential.

## What is a render blocking resource
First we need to know what exactly a render blocking resource is.  The news isn't great.  The quote unquote traditional way of requesting a stylesheet via a link tag will block rendering until it's downloaded and parsed.  A normal script tag without any addiontal attributes will cause the browser to halt, download, and execute the page before it proceeds on to render content, this is why it became a common practice to put script tags at the end of the body.  Webfonts will similarly block rendering of any text that uses those fonts until they're loaded.  Now that we know what types of resource loading will block page rendering, that paints kind of a bleak picture.  CSS, javascript, and webfonts are parts of what make the web awesome, we can't just chuck them in the garbage bin.  The good news is that there are ways around all of these constaints.  Special techniques for fonts and scripts were deserving of their own separate videos in this series, so I strongly suggest you check those out, but they wont strictly be necessary for this session and we'll touch on the specifics briefly.

## What's critical
Now that we know what resources can block page loading, we need to sit down and figure out what critical means.  Oftentimes critical is assumed to be a euphemism for above the fold, and while that can be a good starting place for how to think about critical resource laoding, we can take it a step further by getting closer to users.  If you have the resources to study your users behavior and definitively determine what parts of the page they interact with first, that's the best way to discover what should have the highest priority in loading the page.  By deciding to defer some content that might be above the fold, but isn't frequently interaced with, we can get even greater speed to our first paint.

## Demo time
Because the specifics vary on a case by case basis, I'll do two quick demos to elucidate a thought process you can apply to your own projects.  We're going to improve the performance of two different pages: a landing page on a marketing site, and a blog post.  Lets hop over to the browser and get started.










General info
https://varvy.com/pagespeed/critical-render-path.html
https://www.smashingmagazine.com/2015/08/understanding-critical-css/

Preloading
https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf

Base64
https://varvy.com/tools/base64/