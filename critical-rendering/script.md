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
Because the specifics can vary on a case by case basis, I'll run through a demo of improving the performance of a marketing site landing page to show the thought process behind critical rendering that you can apply to your own projects.  Lets hop over to the browser and get started.

# Browser: Landing page
Here's the landing page we're going to be improving.  Lets break it down a little bit.  Up top, we have this navbar with a few important links, and the all important login button.  Then we've got this big hero image, with the page's most important call to action: the signup button.  Alongside, we've got an extremely irritating newsletter signup prompt, we can go ahead and dismiss that.  Moving on down the page, we've got a few great features our site is touting.  Now lets pause for a second, what is the most important content here on this page?  The navbar is definitely important, containing the login button and some other critical things.  This hero is important too.  The image here is important to our brand, and it contains the page's central call to action.  The rest of the stuff, like all this text about features, and DEFINITELY this newsletter signup, are all less important.  Lets hop over to the performance tab to get a sense of what our loading behavior looks like.

# performance tab
Here in our old friend the performance tab, we can click this little checkbox and reload the page to generate a filmstrip of what the page looks like when it's loading

[[click and reload]]

Yikes look at that, the whole page is blank, until [[[]]] seconds when the page pops in all at once.  We can zoom in on the timeline here to see when exactly our first paint was.

[[zoom in on first paint]]

Looks like our first paint took [[]] seconds to happen, which is quite a while, especially considering the modest size of this page.  We can get our site to load much more progressively by splitting our CSS, inlining the critical CSS, and asynchronously loading the rest.  Lets head over to our text editor and make that happen.

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

There is one catch though: browser support for link rel preload is only just okay, so we'll need to polyfill it with some really handy javascript from the web performance experts over at the Filiment Group.

[[grab load-css.js, paste it in script tag]]

Next, just in case a user doesn't support link rel preload, and they also don't have javascript available, well they'll still need their css.  We can take care of them by putting a link rel stylesheet tag inside a noscript tag.

```
<noscript>
    <link rel="stylesheet" type="text/css" href="style.css" />
</noscript>
```

Okay, with that taken care of, we're ready to get back to the browser and see how much faster our site loads.

# Browser
[[reload in performance tab]]

That's much better!

[[zoom in on first paint]]

Looks like we got our time to first paint down to [[]] seconds, which is an astronomical jump from [[[BAD TIME]]] seconds.  It's still taking a while for our site to fully load, which we can see here on the timeline, but the key takeaway is that we're getting our users into the most important content about [[DIFFERENCE]] seconds faster, which is a really phenomenal improvement that illustrates why optimizing for critical rendering is an essential piece of the web performance puzzle.

One last thing.  Some of you might be thinking, "this seems like a lot of tedious manual work that could absolutely be automated", and you'd be 100% completely right.

# Tools
10 times out of 10, working on a real project, I'd automate critical CSS generation in a build step.  Addy Osmani's "Critical" library powers an assortment of critical css build tools that make the process we just demoed quick and labor free.  It's not uncommon under real world conditions to see the similarly spectacular improvements in time-to-first-paint that we saw in the demo we just finished, but once this step is automated, you can get the same level of speedup with very little continuous effort.  That said, I think it's worth working through the steps manually at least once for yourself, to better illustrate what these libraries do, why they're important and how they help.


General info
https://varvy.com/pagespeed/critical-render-path.html
https://www.smashingmagazine.com/2015/08/understanding-critical-css/

Preloading
https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf

Base64
https://varvy.com/tools/base64/