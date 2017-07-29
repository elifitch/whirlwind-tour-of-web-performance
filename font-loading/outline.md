# Font Loading Outline

## Intro
* What is FOUT, what is FOIT
* Why FOUT is better than FOIT (mitt romney), also gets users into content faster
* Browsers natively skew for FOIT, so we need to force FOUT

## Critical FOFT with data URI
* Technique comes from Zach Leatherman
* Basically what it does is we make a subset of our font by using font squirrel or similar service, we can automate this as well, but font squirrel is simplest
* Include that in our (critical, inlined) CSS
* Because our inlined font is render blocking, we get no FOUT, and no FOIT either, we immediately get into content. TODO: test to see how much faster you get into content with inlining the font vs just loading it async like normal b/c of FOIT.
* DEMO live code how this works

## Conclusion
* This is definitely enough to get you started, but Zach Leatherman has tons of fascinating deeper details involved in this technique on his blog, and I urge you to check it out if you're curious.
