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
So our javascript grabs the post and hides them, and then after a few seconds, hides the spinner and shows the content.  We've got some logic down here in the skeleton screen function ready to go, which is going to take content from the postData collection down here and insert it into our skeleton components.  It's not rocket science, and is mostly here just so we can focus on the intricacies of making our skeleton screen component.  Lets comment out this loading logic, and head back to the HTML to get to work.
[[
  // standardSpinner();
  // skeletonScreen();
]]

[HTML]
First things first, if we're going to use a skeleton screen, we're not going to need this spinner, so lets remove it.
[[ DELETE .loader ]]
Next, we're going to need to modify our post component to be representable with abstract shapes where content would be.  This means we need to delete our profile image source, as well as all our content.
[[ DELETE 3 posts, leaving one ]]
[[ DELETE src, all content ]]
Lets head back to the browser and confirm that we're back to a blank slate.

[[ BROWSER ]]
Okay, cool, we've completely stripped away all the post styling, so we're free to start building our skeleton component.  Lets do that now.

[[ HTML ]]
Now, one way we *could* do this is by making a totally separate component and swapping them out, but it's more elegant if we can make everything work by toggling a class. So lets add a class now to signify that this is a skeleton component.  "post dash dash skeleton" should do just fine.
[[ ADD .post--skeleton ]]
Now lets head to our css file and start creating some differentiation between our skeleton post and our normal post.

[[ CSS ]]
Lets start out by styling the profile image, giving it a medium gray background
[[
  .post--skeleton .post__avatar {
    background-color: #ddd;
  }
]]

[[ BROWSER ]]
Okay, looks like we're off to a decent start. Now lets add some styling for our profile name and post date sections here next to the image.

[[ CSS ]]
[[ 
  .post--skeleton .post__author, .post--skeleton .post__date {
    background: #ddd;
    width: 100%;
  }
]]
Cool, lets head back to the browser and see how this looks.

[[ Browser ]]
Well heck, something's not right here. Lets use the inspector to see what's up.
[[ inspect ]]
Oh interesting, so because there's no content in these elements, and no set height, the browser collapses this element down, so we're not seeing our background.  So for elements with text, we're either going to have to set a height on them, or leave a non-breaking-space in the HTML.  Lets do the former.

[[ CSS ]]
[[ 
  .post--skeleton .post__author, .post--skeleton .post__date {
    height: 1em;
]]
A height of 1em will make each of these elements the height of their text, which is just what we're looking for.

[[ BROWSER ]]
Nice, that's much more like it.  We're still missing a placeholder for all that juicy, lorem-ipsum-y body content, so lets go back to the CSS where I'll show you a fancy trick with linear gradients to get a nice repeating pattern of horizontal bars, reminiscent of a text block.

[[ CSS ]]
[[
  .post--skeleton .post__body {
  }
]]
First we're going to need to set a height
[[
  height: 8em;
]]
About 8 ems seems about right.  Now lets get to the tricky gradient stuff. What we want is a pattern that goes from gray to the same gray, so there's no actual color gradiation happening, and then in the same background, we want to cut to a slightly smaller transparent-to-transparent section, so we have a solid block of gray, followed by a solid block of transparent.
[[
  background-image: linear-gradient(to bottom, #ddd 0%, #ddd 66%, transparent 66%, transparent 100%);
]]
Lets see what this looks like.

[[ BROWSER ]]
Progress! Still not totally there though.  We want this to be a repeating pattern, not a single chunk like this.  We can make this happen with the background-size property.  Lets hop into the inspector and find a background-size value that works for us.
[[ INSPECT add background size 1em, option+up until 6.2em ]]
Nice, this is looking great, and we've pretty much got our skeleton post!  Well, almost. Something is....off.  When we had that spinner, it was a clear indication that something was loading.  If a user came to our page now, and the response from the server took a little while, they might become confused as to why their social feed is all blocks now.  So we need some animation here to suggest that there's loading occuring.  I really like slack's left to right shimmer effect, so we're going to steal from the best, and do the same thing!

[[ CSS ]]
First thing, since this shimmer is just an animated effect, it doesn't need to be a whole new dom element, so lets make it a pseudo element child of post-skeleton.
[[
  .post--skeleton:after {
    content: '';
    display: block;
  }
]]
We're going to want to absolutely position it on top of everything else
[[
  .post--skeleton {
    position: relative;
  }
  .post--skeleton:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
]]
And lets make it the full height of the post and about half the width sounds about right.
[[
  .post--skeleton:after {
    width: 50%;
    height: 100%;
  }
]]
And now lets make a sweeping left to right animation
[[
  @keyframes sweep {
    0% {
      transform: translateX(-100%);
    }
  }
]]
We want the shimmer to start all the way off the left edge of the container, so we need to translate it left 100%, or negative 100%.  Next we want the animation to proceed all the way off the right edge of our post.  This means that we need to get the width of the post, 400 pixels, and use that as the translate value.
[[
  100% {
    transform: translateX(400px);
  }
]]
And lets apply this animation with a duration of one and a half seconds or so
[[
  animation: sweep 1.5s infinite;
]]
Now lets give the shimmer a bright background color so we can clearly see it, and then hop over to the browser to see if its working as intended.
[[
  background: fuchsia
]]

[[ BROWSER ]]
Okay! So some definite problems, but we're getting somewhere.  The first is that we need to use overflow hidden on the post so you don't see our shimmer when it leaves the bounds of its parent. And of course, we need to change our fuchsia background into something usable.

[[ CSS ]]
[[
  .post--skeleton {
    position: relative;
    overflow: hidden;
  }
]]
Now that's out of the way, lets make our shimmer, you know, *actually* seem to shimmer.  We can do this with a gradient background that goes from transparent, to a translucent silvery color, back to transparent.
[[
  .post--skeleton:after {
    background: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.4), transparent);
  }  
]]
Okay lets see how this looks.

[[ BROWSER ]]
Oooooh that's so much better!  Lets go back to our HTML and our demo javascript so we can see how this looks in practice, showing the skeleton screen and then popping in some content.

[[ HTML ]]
[[
  data-post-avatar
  data-post-author
  data-post-date
  data-post-body

  copy 3x
]]
[[ JS ]]
[[
  // standardSpinner();
  skeletonScreen();
]]

[[ BROWSER ]]
Okay, moment of truth time, lets refresh and see how it looks in a scenario that more closely mirrors the real world.
[[
  refresh
]]
Hey that looks really nice, and it took us only a few minutes!  More complex layouts will undoubtedly take more effort, but the CSS techniques I demoed should hopefully take you a long way even on the tricky stuff.


    


// animation

## Loading animations
## Spinners
## Progress bars

## don't abuse

## Progress bar demo