# Loading Indicators

## Intro
Loading indicators are important because they give users confidence that their action was received and we're loading content.  They can also give you a way to get users into pixels quickly, while we work on asynchronously loading content and other assets for them.

We'll look at a couple different kinds of loading indicators:
* Skeleton screens
* Spinners
* Progress bars

## Skeleton screens
Skeleton screens show a wireframe of the site, revealing to users where content will go when it's loaded.  This serves two purposes:
1. A skeleton screen is much quicker to load than dynamic content.  A skeleton screen is just styled HTML.  You don't need to make any database queries or requests for media to show a skeleton screen.  This means you can paint pixels on the screen while you wait for content to be loaded, which makes your experience feel faster.
2. Without a skeleton screen, asynchronously loaded content just pops into existence. With a skeleton screen, we show users where the content will be before it arrives, more gradually and progressively transitioning the users point of attention, which makes the app feel smoother and more polished.

Skeleton screens are generally implemented in one of two ways:
1. They are made totally separate from the elements that hold the content, and are replaced when the content loads.  This is much simpler to initially build and reason about, but requires you to maintain two separate elements down the road.
[[[build a little skeleton screen, and a social media post with a side avatar and some content on the right; then change the avatar to be full width, and show that then the skeleton has to also be updated]]]
2. It is a special state applied to the content container, restyling it before it is filled with real content.  This can be more complex to initially build, but has the advantage of being much more maintainable.  This might look like the slam dunk choice, because the skeleton screen I'm using in my example is fairly simple, but with more complex layouts, designing and building it for two states can get pretty tricky.

I think you should go for option two if this is a living, breathing project that will be maintained for a while.  Option one is fine if you feel confident that the design won't be revised post launch

## Progress bars
The core benefit of progress bars are that they give the user a sense of how much longer they have to wait, in relative terms.  This is critical for longer load times, and "interstitial loads", or loads that happen after a page has already rendered.  Think fetching travel information, submitting a large form, parsing data from a map, and so on. Bars don't have to be horizontal.  As long as they provide a sense of relative duration, they can be stylized, like a beaker filling with liquid, round like a guage, or any other shape you can dream of.

You can also use an optical illusion that makes progress bars feel like they fill faster, and thus makes the loading appear to pass more quickly.  Add some bands into your progress bar and animate them in the opposite direction of the progress bars flow.  A team of grad students at Carnegie Melon University found that this increased perceived speed by 12 percent.  This illusion operates on the same principle of riding on a train, and seeing a train pass in the opposite direciton, and it feels like you're going twice as fast.

Progress bars can be "real" or "fake":
1. "real" progress bars continually update the client with information from a server, so represent real information about the progress of loading.  These are generally preferred, but have an order of magnitude more overhead associated with them than fake progress bars.
2. "fake" progress bars are just an animation timed to hopefully sync up with how long the load takes.  Most progress bars on the web are fake.  If the load takes longer than the animation was designed to account for, you can enter a very frustrating state where the progress bar just sits right before the end.

If real progress bars are too much of a headache and fake progress bars are too innacurate, the happy medium, goldilocks progress bar is the "Hybrid progress bar".
* A hybrid progress bar is a fake progress bar with a dynamic duration that is adjusted based on the user's connection speed and the request they're making.
* You can get a baseline sense of how long it will take to load assets of different sizes and make requests to various endpoints either manually or with an automated test runner.
* Make a "performance scalar" by dividing the actual time it took a user to request something into the baseline time. e.g. It took 1 second to download an image, but we anticipated two seconds. performanceScalar = 1/2 = 0.5
* Multiply this performance scalar into the anticipated duration to make a more accurate progress bar. e.g. baseline for this next request is 3 seconds, user's performance scalar is 0.5. 3 * 0.5 = 1.5 = progress bar duration

## Spinners
Spinners are attractive because they're easy to implement, and they're "always accurate" because they make no predictions about how long it will take to load something.  Generally prefer progress bars to spinners if the anticipated loading time is going to be two seconds or more, but spinners are perfectly adequate for quick loads.

It's best to build spinners with CSS to avoid making another request to go get a video or animated gif.

It can be tempting to overuse spinners, but resist that temptation.  Don't show any loading indicators at all if your anticipated loading time is less than 750ms or so.  The reason for this is it takes about one second for users to realize they're waiting for something to load, so showing them a loader prematurely acts as a cue that they're now waiting for something, which can have the effect of making the experience feel slower.


## Rules of thumb
* Use skeleton screens to get pixels on the screen quickly, mask loading of content, and gently guide user attention to the content's landing spot
* Prefer hybrid progress bars that predict a good duration based on the user's connection and the type of request they're making.
* Without good baselines, hybrid progress bars are no more accurate than fake progress bars. It's worth the effort to test and set them up.
* Spinners are a convenient alternative to progress bars, but they can increase frustration if the loading time is more than 2 seconds. Be careful.
* Don't overuse spinners and progress bars, only add them as anticipated loading times approach one second.