# Script loading

There's more than one way to load a script.  There's "old faithful", just putting the script tag just before the closing tag of the body, and while that can still be fine in a variety of cases, there's a few new ways to load scripts that have become available in the last few years.  The async and defer attributes for the script tag give us new options in how to load our scripts, which can change the flow of how the browser parses our resources.

In this lesson we'll cover:
* How the browser parses the HTML
* How the async and defer attributes change this
* When it makes sense to use async or defer

## How the browser parses HTML
So what is parsing?  More broadly, parsing means turning a text document into a data structure that our code can put to use.  Specifically, parsing is the process by which browser turns your HTML, which is still just text at this point, into the DOM tree.  The DOM tree is eventually combined with CSS rules, turned into a render tree, which is then painted into pixels and delivered to your display.  As you can see then, just like how JavaScript is totally inert until it runs, HTML doesn't really become the medium that we know and love until it's parsed by the browser.

The browser starts the parsing process at the top of the HTML document, and begins with a process called tokenization.  Tokenization is a complex algorithm, but in broad strokes, it takes a string of characters, and turns them into nodes by recognizing tag opening and tag closing characters.  The tokenizer passes tokens into the tree constructor, which defines what DOM element is represented by that token, like `<div>` or `<h1>` and is added to the DOM tree.  Those elements are also added to a stack of open elements, which is used to fix problems with nesting and unclosed tags.

This barely scratches the surface of the complex processes & parser internals that transform bits from a network response into the DOM, and on into pixels you can consume. While these nitty gritty details are very interesting and illuminating, they aren't immediately essential. If you want to learn more about how the browser consumes data and transforms that into interactive experiences, check out the resources in the course notes.

## How scripts fit into parsing
Scripts can dramatically alter how the browser parses HTML, and thus how long it takes for content to reach your users' eyeballs.

When the HTML parser reaches a `<script>` tag without the `async` or `defer` attributes, it grinds to a screeching halt, makes a request for that script (if it's external), that Javascript is then parsed, and then executed.  It's only when that script finishes execution that the DOM resumes parsing.  Lets see what that looks like when fetching and executing a large piece of javascript.

[DEMO: traditional-request-large-js]
Here I've put a large script in the head, and we can see as I refresh the page, that it requests the script, and executes it, triggering this alert message, and no HTML content has rendered at all. Nothing in the body of the page has made it to the screen, because a `<script>` tag in the head with no attributes will block parsing.  Only when the script finishes running does the browser continue on, parsing the rest of the HTML, and rendering it on the display.

[DEMO: cut script from head and paste at end of body, and redo demo]
This is why we commonly see scripts at the end of the body tag, because this lets the content get rendered first before worrying about javascript.  Rerunning our demo from earlier, we can see that the content loads, then the script is executed.

[Go back to slide]
This isn't ideal, because all this time we're spending parsing HTML can be used to download our javascript, and get our page to a state where its interactive sooner. Thats what the `async` and `defer` attributes available with HTML5 let us do.  They give us the ability to parallelize downloading our javascript while the HTML is parsed, but they're not the same thing. Lets look at the differences between the two.

## Async vs defer
Both the Async and Defer attributes help us solve this problem by empowering the browser to parse HTML and download javascript at the same time. Where these two attributes differ is when the requested javascript is parsed and executed.

[async: http://www.growingwiththeweb.com/images/2014/02/26/script-async.svg]
Async scripts are downloaded while the browser is parsing HTML, but as soon as the script is downloaded, the script will execute, regardless of whether the HTML has finished parsing.

[defer: http://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg]
Deferred scripts are also downloaded while the browser is parsing HTML, but unlike async scripts, they'll execute when the rest of the HTML document is done parsing.  Deferred scripts also execute in the order they appear in the HTML, whereas Async scripts execute in the order of whatever finishes downloading first.

It's important to note that the location of the `<script>` tag in the DOM matters.  The key benefit of using async or defer is downloading your javascript earlier, while not blocking HTML parsing.  If the script is in the traditional place at the bottom of the document just before the body's closing tag, you won't get much benefit in parallelizing HTML parsing and script downloading, because the download starts when the parser reaches the script tag, so if the script is near the end, the download will start when the HTML is almost done parsing, minimizing the benefits of these attributes. Using async and defer, it's common to place your script tags in the `<head>`

So when does it make sense to use each one?  Let's answer that question with a quick demo.

[DEMO: Async to defer]
Here's a page where we want to add a party parrot to this page when we click this button.  This is a silly example, but it's really similar to situtaions where you have 3rd party javascript that is relied upon by your own javascript.
[[show the HTML]]
Here we have two scripts, both of them async, one is our "vendor JS" and this here is our custom JS.  This is a common use pattern for libraries like jQuery, Three.JS or the Greensock animation platform.
[[show PP.js]]
Our party parrot JS file just has some image data that gets assigned to the global variable `partyParrot`.
[[show script.js]]
Our custom JS uses that image data to make a party parrot image, and then attaches an event listener to show the parrot when the user clicks the main button on the page.
[[Show browser]]
So lets load the page.
[[click the button]]
Hmm, something is wrong here, that click *should* have started the party.  Lets look in the console to see if there are any errors.
[[open console]]
Looks like partyParrot isn't defined.
[[Show HTML]]
Async scripts are evaluated the moment they finish downloading, but they download in parallel.  That means that the two JS files started downloading one right after the other, but script.js, which is much smaller than party-parrot.js, finished downloading first. Script.js went to go get its image data from party-parrot, but it was undefined, because party-parrot.js hadn't finished downloading yet.
[[Change both scripts to defer]]
Now that both scripts are deferred, we're downloading them in parallel, but evaluating them in series.  So the party parrot data will be available to script.js and we can have some fun.
[[Show browser, click button]]
Just as expected, we get our parrot!

[[Back to presentation]]
Async is acceptable for modularized scripts that don't depend on any other scripts, but it has a number of drawbacks.  As we just saw, async can introduce bugs if the load order of your scripts is important.  Async, because scripts are evaluated as the page is loading, can lead to a more jagged.  As a rule of thumb, use async for small scripts that need to be executed as quickly as possible, and use defer for everything else.

## Resources
* HTML parsing: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
* script parsing: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_order_of_processing_scripts_and_style_sheets
* HTML parsing: http://arvindr21.github.io/howBrowserWorks/#/18
* Defer > async: https://calendar.perfplanet.com/2016/prefer-defer-over-async/
* async vs defer: http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html