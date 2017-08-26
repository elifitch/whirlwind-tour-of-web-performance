# Critical Rendering Outline

## WTF is
* Critical Rendering describes a process by which we architect our code to load the most important stuff first
* Code doesn't load all at once, so logically the stuff that should load first should be the most important stuff
* This is about optimizing time to first paint and time to interactivity.

## Critical Rendering Techniques
* Prioritizing content above an arbitrary fold < Prioritizing content you know your users interact with first
* Use async/deferred scripts

## Resources
* https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp