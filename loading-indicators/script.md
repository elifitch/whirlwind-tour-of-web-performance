# Loading Indicators Script

## Intro
Loading isn't always done when the page arrives.  Especially in API driven applications, when we've already done a good job of optimizing the load speed of our html, css, javascript and other assets, loading our is sometimes no longer the performance bottleneck.  If we have to wait for a few API responses before having content to display, and assuming we've already optimized the requests we're making, our performance focus should turn to improving speed of the API, not our client side code.  Unfortunately, sometimes it's not possible for us to optimize the performance of that API; it might be operated by another organization, or it might be under the purview of another team.  All is not lost though!  We can use loading indicators to make our sites and apps feel like they load faster than they do in reality.

## Perceived Performance [brain icon]
I could talk for hours about granular perceived performance techniques, and in fact I have before, but we can gloss over the nitty gritty specifics and focus on this one general truth: time seems to pass more quickly for users when they are mentally engaged with the actions they're performing. There are innumerable solutions to the problems of keeping users engaged, but today we'll focus in on two: loading animations and skeleton screens.

## Loading anims
------------------------------------
------------------------------------
------------------------------------
------------------------------------
------------------------------------
------------------------------------

## Skeleton screens [image of facebook skeleton screen]
A skeleton screen is showing a rough outline of the final page layout before the content for that page has loaded.  This serves two purposes.  It gets the users into some content, something new for them to see and absorb, more quickly than waiting for the final content.  It also guides their attention into where the content will eventually populate.  Skeleton screens make the final loading state less jarring by providing some mental context for what the page will look like and where final content will end up.

## Skeleton screens [slack video]
Slack has a great example of a skeleton screen, filling out the list items on the sidebar with animated placeholders, before replacing them with actual content once you've loaded the data for all your channels and messages.

## Skeleton screens [TBD icon, maybe a browser, since it's a demo]
There are several ways to create skeleton screens, and what seems like the most common way to do this is to create a separate DOM element for the skeleton screen, and then replace it with a different DOM element once content is loaded.  We're going to use a slightly more efficient technique to manage our transition, instead of replacing DOM elements wholesale, we'll change a single CSS class to trigger the transition.  Lets hop over to the browser and see what we're dealing with.

## Skeleton screen demo
[BROWSER]
Here's our page, a little social network for goats, called Goatface.  We've got a loading spinner, and then when we've got our posts loaded from the server, we hide the loader and show the posts.  This isn't a total disaster, but a skeleton screen would help smooth out this loading experience.  Lets go ahead and check out the code.

[HTML]
So in our Head, we've got a css file, and a little javascript file just to simulate loading these posts from the server.  Now that that's out of the way, lets see what we have here in the body.  We've got a header, with a logo, not much to talk about there.  We've got a spinner here, and we've got our posts.  In the real world, these posts wouldn't be hard coded into the HTML.  We'd pull data down from a server, and then pipe that data into some template or component to to generate the posts.  In this demo just to keep things as simple as possible, we're going to keep them in the HTML and show or hide them to simulate the loading process.  Lets look at the JS file real quick just to clear up any potential confusion there.

[JS]

## Loading animations
## Spinners
## Progress bars

## don't abuse

## Progress bar demo