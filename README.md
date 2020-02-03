# Pattern Lab

[Pattern Lab](https://patternlab.io/) is...

This is the Node version of Pattern Lab and uses Grunt as its task runner. Other versions and editions are [available here](https://patternlab.io/download.html).

## Prerequisites

The following must be installed to build and run the project locally:

* [Node](https://nodejs.org)
* [npm](https://www.npmjs.com/) 
* [grunt.js](http://gruntjs.com/)
* [Browsersync](https://www.browsersync.io/)

## Running the project locally

* From a command line, run `npm install` to install all ncessary dependencies
* Run `grunt` to build Pattern Lab
  * If you'd like to run Grunt tasks manually:
    * Open a separate terminal screen
    * Run `cd public` then `brower-sync`. The public directory includes Pattern Lab UI. Browsersync should open [http://localhost:3000](http://localhost:3000) in your default browser.
    * Go back to the initial terminal screen and run Grunt commands as needed. Page refreshes must be done manually.
  * If you'd like Grunt to watch for changes:
    * Run `grunt patternlab:serve`. Browsersync should open [http://localhost:3000](http://localhost:3000) in your browser. The browser should reload after changes to Mustache, Sass, CSS, JSON, images and JavaScript files. 

## Pattern Lab Commands

These are some Pattern Lab-specific commands you can use when working with Pattern Lab. To list all available commands, run `grunt patternlab:help`

## Custom Grunt Commands

The following tasks are used regularly when developing and maintaining the project. 

Run `grunt` to run the following tasks consecutively. These can be run individually as well (e.g., `grunt css`).

  - `pl` - Run the `patternlab` command, which builds the Pattern Lab UI and compiles all Mustache and JSON files. 
  - `css` - Run the following tasks consecutively:
    - `sass` - Compile Sass partials into a single CSS file.
    - `autoprefixer` - Regenerate compiled CSS file with browser-specific class prefixes. 
    - `cssmin` - Create minified version of CSS file. 
    - `copy:css` - Copy CSS files to 
  - `js` - Run the following tasks consecutively:
    - `concat` - Concatenate all files in _js/functions_ directory and place the file (scripts.js) into the _public_ directory.
    - `uglify` - Create minified version of scripts.js. 
    - `copy:js` - Copy all JavaScript files from the _source_ directory into the _public_ directory. 
  - `copy` - Copy all static files from _source_ to _public_ directory and from the from _public_ to _prod-ready-assets_ directory. 
  - `compress` - Generate a zip file that includes copy of all files from _prod-ready-assets_ directory.

See the [Gruntfile.js](Gruntfile.js) for more information. 

## Assets

The latest production-ready assets are in the `prod-ready-assets` directory. The directory also includes a zip of all the files. 

The assets include CSS, JavaScript, images, fonts, text and JSON files. 

## Codebase

### CSS

The CSS is developed using Sass, a CSS preprocessor and extension language. Sass allows us to write and manage the CSS in an efficient and consistent manner. 

The Sass architecture can be viewed at style.css. 

The BEM naming convention (block element modifier) is used for almost all class names (all except those authored by third-party components and plugins). Each of these class names are prefixed with "in" (Insight) then the type of class that it is ("c" for component, "l" for layout, etc.). 

We occasionally need to override SharePoint's default CSS. These overrides are han dled on a case-by-case basis in the Sass files. Some overrides are handled in a separate file on the SharePoint side (managed by the SharePoint developers). 

__Resources__

 - [Sass: Syntactically Awesome Style Sheets](https://sass-lang.com)
 - [CSS Guidelines (2.2.5) – High-level advice and guidelines for writing sane, manageable, scalable CSS](https://cssguidelin.es)
 - [MindBEMding – getting your head ’round BEM syntax](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
 - [More Transparent UI Code with Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

### HTML 

With Pattern Lab, the markup is written in Mustache files. Mustache allows us to include files in other files as well as iterate over JSON data for content. 

More on this can be found in the [Pattern Lab documentation](https://patternlab.io/docs/index.html). 

