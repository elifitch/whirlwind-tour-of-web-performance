# SVG Icons Outline

## Intro
* Icons were long brought in as individual images, and then we moved to icon fonts, which made for easy use and recoloring
* Icon fonts are still very popular [[[maybe find fontawesoe download stats]]]
* We're now seeing a shift from icon fonts to SVG icon systems

## Reasons SVG icons are good / better than iconfonts

* More flexibility (in styling and such)
* Easier to position; Usually icon font icons are injected in a pseudo element which can be a PITA to position, or require weird vertical-align tricks
* Generally much smaller
* Generally easier to use in a build system

## How to use SVG icons
* For small stuff, one-off projects and such, seriously just drop it inline
* You can also make an SVG icon system, or "sprite sheet"; if you've heard about a png sprite sheet, these are very different
* Show shit about the symbol tag, and xlink:href
* If you have an existing icon font to switch over, tools like icomoon and font-blast can make the transition easy; icomoon has a user friendly GUI, font-blast is a CLI that is easier to integrate with an automated build chain

## Build systems
* Recommended gulp system https://www.npmjs.com/package/gulp-svg-sprites
* Recommended webpack system https://github.com/kisenka/svg-sprite-loader

## Extra resources
* Fragment identifiers to allow use of svg icons as css background images an more
