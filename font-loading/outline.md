# Font Loading Outline

## Intro
* Why is font loading important
* What is FOUT, what is FOIT
* Why FOUT is better than FOIT (mitt romney), also gets users into content faster
* Browsers natively skew for FOIT, so we need to force FOUT

## Critical FOFT with data URI
* Technique comes from Zach Leatherman
* Basically what it does is we make a subset of our font by using font squirrel or similar service, we can automate this as well, but font squirrel is simplest
* Include that in our (critical, inlined) CSS
* Because our inlined font is render blocking, we get no FOUT, and no FOIT either, we immediately get into content. TODO: test to see how much faster you get into content with inlining the font vs just loading it async like normal b/c of FOIT.
* DEMO live code how this works

## Critical FOFT steps
* Steps:
* FIRST BASELINE
* Show structure of page, loading two font files, a basic headline
* Show what the page looks like, and perform a chrome audit
* Go back and comment out the css and font stuff, do it again to show how much slower traditional font rendering is
* Looks like first paint of the site is 2 seconds, not terrible BUT we're loading no other resources! This means that the fonts are holding us up by two whole seconds!
* -------------------------------------------
* Get the otf, ttf whatever of brandon grotesque
* Go to font squirrel and do an optimal build
* Get the woff and woff2 files out, delete the rest
* Do it again with expert settings; just woff, NO woff2; check boxes for custom subsetting, do lower, upper and numbers, base64
* Get that font css and paste it into the head of the bare demo
* Get the unicode range from https://codepen.io/elifitch/pen/Ljqway
* then basically fill out the page to match the sample

## Conclusion
* This is definitely enough to get you started, but Zach Leatherman has tons of fascinating deeper details involved in this technique on his blog, and I urge you to check it out if you're curious.
