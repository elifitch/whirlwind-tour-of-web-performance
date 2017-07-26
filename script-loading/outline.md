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

## Pitfalls
Mixing them, you can get into some weird behavior. If you have a defer script in the head, and some google analytics code inlined right before the end of the body, that GA code will execute before your deferred script.


## Resources
* HTML parsing: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
* script parsing: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_order_of_processing_scripts_and_style_sheets
* HTML parsing: http://arvindr21.github.io/howBrowserWorks/#/18
* async vs defer: http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html