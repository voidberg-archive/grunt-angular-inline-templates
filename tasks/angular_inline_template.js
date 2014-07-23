/*
 * grunt-angular-inline-templates
 *
 *
 * Copyright (c) 2014 Alexandru Badiu
 * Licensed under the MIT license.
 */

'use strict';

var minify  = require('html-minifier').minify;
var path = require('path');
var jsesc = require('jsesc');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('nginlinetemplates', 'Inline template generator for AngularJS directives.', function () {
    var options = this.options({
      replaceString: '/* grunt-angular-inline-templates */',
      htmlmin: {
        collapseBooleanAttributes:      true,
        collapseWhitespace:             true,
        removeAttributeQuotes:          true,
        removeComments:                 false,
        removeEmptyAttributes:          false,
        removeRedundantAttributes:      false,
        removeScriptTypeAttributes:     true,
        removeStyleLinkTypeAttributes:  true
      }
    });

    this.files.forEach(function (file) {
      var src = file.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        var filename = path.basename(filepath);
        var contents = grunt.file.read(filepath);

        try {
          contents = minify(contents, options.htmlmin);
          contents = jsesc(contents);
          return '$templateCache.put(\'' + filename + '\', \'' + contents + '\');'
        }
        catch (err) {
          grunt.warn(err);
          return null;
        }
      }).join('\n');

      var output = '.run([\'$templateCache\', function($templateCache) {';
      output += '\n';
      output += '\t';
      output += src;
      output += '\n';
      output += '}])';
      output += '\n';

      var dcontents = grunt.file.read(file.dest);

      dcontents = dcontents.replace(options.replaceString, output);

      // Write the destination file.
      grunt.file.write(file.dest, dcontents);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
