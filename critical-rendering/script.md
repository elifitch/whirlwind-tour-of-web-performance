# Critical Loading

## Intro
It's an aknowledged axiom of web performance that our sites feel faster if we get users into content as quickly as possible.  We throw around metrics like time to first paint and time to first interactivity as some of the most important things to optimize for.  If that's true, AND we can identify what the most important content is on the page, the content that users are most likely to want to interact with first, then we could get a speedup by optimizing to render that content first, while deferring everything else.

## Pixels equal
Generally, by default anyway, most developers don't really do this.  We generally tend to just dump everything in an HTML file, add in a CSS file for styling and some javascript and call it a day.  That's how we get the example on the bottom here, where the page only renders when CSS for all content is ready to go, AND render blocking javascript and fonts are loaded.  What we WANT on the other hand, is the top row, where we progressively render the page as resources load, and not necessarily from top to bottom, rather we want to load content from most critical to least critical.  This means analyzing our page to determine what's most important, as well as looking at our render blocking requests, somtimes called the critical request chain or critical path, and figuring out how to best defer everything that isn't absolutely essential.

## What is a render blocking resource
First we need to figure out what exactly a render blocking resource is.  The quote unquote traditional way of requesting a stylesheet via a link tag will block rendering until it's downloaded and parsed.  A normal script tag without the async or defer attributes will cause the browser to halt, download, and execute before it proceeds on to render content. This, by the way, is why it became a common practice to put script tags at the end of the body.  Webfonts will similarly block rendering of any text that uses those fonts until they're loaded.  Now that we know what types of resource loading will block page rendering, that paints kind of a bleak picture.  We can't exactly just chuck CSS, javascript, and webfonts in the garbage bin can we?  The good news is that there are ways around all of these constaints.  Special techniques for fonts and scripts were deserving of their own separate videos in this series, so I strongly suggest you check those out, but they wont strictly be necessary for this session, though we *will* touch on them briefly.

## What's critical
Now that we know what resources can block page loading, we need to sit down and figure out what critical means.  Oftentimes critical is assumed to be a euphemism for above the fold, and while that can be a good starting place for how to think about critical resource loading, we can take it a step further by getting closer to users.  Users frequently DO interact with content above the fold first, but not all content above the fold is neccessarily of equal importance.  If we look at our users's behavior, or make some educated assumptions about their priorities, we can optimize even more and get them into the content they truly need even faster.

## Demo time
Because the specifics can vary on a case by case basis, I'll run through a demo of improving the performance of a marketing site landing page to show the general thought process behind optimizing the critical rendering path so you can apply this same way-of-thinking to own projects.  Lets hop over to the browser and get started.

# Browser: Landing page
Here's the landing page we're going to be improving.  Lets break it down a little bit.  Up top, we have this navbar with a few important links, and the all important login button.  Then we've got this big hero image, with the page's most important call to action: the signup button.  Alongside, we've got this extremely irritating newsletter signup prompt, we can go ahead and dismiss that.
[[
    close prompt
]]
Aaaand, moving on down the page, we've got a few great features our site is touting.  Now, lets pause for a second.  What is the most important content here on this page?  The navbar is definitely important, containing the login button and some other critical things.  This hero is important too.  The image here is important to our brand, and it contains the page's central call to action.  The rest of the stuff, like all this text about features, and DEFINITELY this newsletter signup, are all less important.  Okay, now that we've got a basic impression of the page, lets head over to the performance tab to get a sense of what our loading behavior looks like.

# performance tab
Here in our old friend the performance tab, we can click this little checkbox labeled "screenshots" and reload the page to generate a filmstrip of what the page looks like when it's loading

[[click and reload]]

Yikes look at that, the whole page is blank, until it loads and the page suddenly pops in all at once.  We can zoom in on the timeline here to see when exactly our first paint was.

[[zoom in on first paint]]

Looks like our first paint took [[]] seconds to happen, which is quite a while, especially considering the modest size of this page.  We can get our site to load much more progressively by splitting our CSS, inlining the critical CSS, and asynchronously loading the rest.  Lets head over to our text editor and make that happen.

# Sublime
[[style.css]]
First things first, lets pull out the critical CSS rules.  Luckily for us, they're all here at the top of the file.  Lets copy these style definitions and inline them in the head of our HTML.
[[
    cut html - .button, inline in html, back to css
]]

Lets rename this remaining CSS, the less critical CSS, separately, so we have 3 chunks of CSS in total: a file with all of our css, the inline CSS we just created, and now this: less-critical dot css.

[[Save as, name as less-critical]]
[[go to html]]

First thing we can do is comment out this link to styles.css. Now that we've got our css split into inlined critical CSS, and less critical CSS, there's no longer a need to load our styles in one big lump like this.
[[
    comment out style.css
]]
Next, we need to load our less critical css asynchronously.  link rel preload is a fantastic tool for asking the browser to go get a resource before it's discovered during HTML parsing or dynamically in some future asynchronous request.

```
<link rel="preload" as="style" href="less-critical.css" />
```

What we're doing here is basically telling the browser, "go get the less critical stylesheet, even though you don't know what we're going to do with it yet, trust us, we'll need it in a sec".

[[add onload]]
```
 onload="this.rel='stylesheet'"
```

Now what we're doing is adding an onload javascript handler, which will change this link tag from a preload tag to a stylesheet tag once its loaded, so that way, when its ready, the browser will parse it and use it as a stylesheet.  The key difference here between using link rel preload and switching it over to a stylesheet tag when its ready, versus just popping a normal stylesheet link tag in, is that link rel stylesheet is blocking, while preload is not.  So by using a preload tag, we're letting the browser use the immediately available inline css we pasted in earlier WHILE it loads the rest of our styles in the background.  If we used a traditional link rel stylesheet tag, the browser would still block rendering until the styles loaded, which would defeat the purpose of inlining our critical css.

There is one catch though: browser support for link rel preload is only just okay, so we'll need to polyfill it with some really handy javascript from the web performance experts over at the Filiment Group.

[[load-css.js]]
I'm going to just copy and paste load css dot js into a script tag, but I'll make the github link for this library available in the course notes.
[[copy load-css.js]]

[[HTML]]
[[
    paste load css js into a script tag
]]
Just in case a user doesn't support link rel preload, and they also don't have javascript available or enabled, well they'll still need their css.  We can take care of them by putting a normal, plain stylesheet tag inside a noscript tag.

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

There is, of course, one last thing.  Some of you might be thinking, "this seems like a lot of tedious manual work that could absolutely be automated", and you'd be 100% completely right.

# Tools
10 times out of 10, working on a real project, I'd automate critical CSS generation in a build step.  Addy Osmani's "Critical" library powers an assortment of critical css build tools that make the process we just demoed quick and virtually labor free.  It's not uncommon under real world conditions to see the similarly spectacular improvements in time-to-first-paint that we saw in the demo we just finished, but once this step is automated, you can get the same level of speedup with very little continuous effort.  That said, these libraries don't do your thinking for you, and I think it's worth walking this process manually at least once for yourself, to firm up understaning of critical rendering concepts, better illustrate what these libraries do, why they're important and how they can help hand you extraordinary speedups.


General info
https://varvy.com/pagespeed/critical-render-path.html
https://www.smashingmagazine.com/2015/08/understanding-critical-css/

Preloading
https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
