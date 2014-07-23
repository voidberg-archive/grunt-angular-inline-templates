# grunt-angular-inline-templates

> Inline template generator for AngularJS directives.

## What's this?

This [Grunt](http://gruntjs.com/) plugin allows you to embed AngularJS templates inside directives in order to be able to share them easily (e.g. as [Bower](http://bower.io/) components). I am aware that there are plenty other similar plugins however none did exactly what I wanted.

I build my directives using a Grunt workflow. They are meant to be used across projects so they sit in a Bower repository. Because of this I ran into issues regarding template paths and while I would have been able to fix this by doing string replaces in the production build or other magic things I wanted something simple that simply embedded the needed templates in the final version of the directive.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-inline-templates --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-inline-templates');
```

## The "nginlinetemplates" task

### Overview
In your project's Gruntfile, add a section named `nginlinetemplates` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	nginlinetemplates: {
   		app: {
       		src: 'src/*.html',
        	dest: 'dist/your-directive.tpls.<%= pkg.version %>.js'
      	}
   },
})
```

### Usage Examples

The plugin expects two options:

* `src` - template file or files that will be minified, escaped and concatenated.
* `dest` - the file where the templates will be embedded.

The destination file requires a special comment, `/* grunt-angular-inline-templates */` inside which will be replaced with the actual templates.

```js
(function(window, angular, undefined) {
	angular.module('yourModule', ['Dep1', 'Dep2'])
   		/* grunt-angular-inline-templates */
    	.directive('yourDirective', function() {
      		return {
			...
```

### My preferred workflow

The production task generates four versions of the directive:
* standard version with separate templates
* minified standard version with separate templates
* a version with embedded templates
* a minified version with embedded templates

This way I cover all needed usage cases.


## TODO

* Add unit tests

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](http://gruntjs.com/).

If you're creating a pull request, also please add yourself to the `CONTRIBUTORS.txt` file (or create it if it's necessary).

## Release History
* 0.0.1 - Initial Release

## License
Copyright (c) 2014 Alexandru Badiu. Licensed under the MIT license.
