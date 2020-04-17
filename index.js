/*
 * index.js
 * Copyright (C) 2020 butcherpete <magpie.picaraza@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

'use strict';

const nodepandoc = require('node-pandoc'),
	through = require('through2'),
	PluginError = require('plugin-error'),
	inherits = require('util').inherits,
	Transforms = require('stream'.Transform, 
	replaceExt = require('replace-ext');

const PluginName  = 'gulp-pandoc-cli';

/* Exports */

module.exports = function(opts) {
  let args = opts.args;
  let options = opts.options || [];

  if (!args) { throw new PluginError(PluginName, '"args" is not defined'); }

  return through.obj(function (file, enc, cb) {
    let input = file.contents.toString();
    if (file.isNull())  { 
      this.push(file);
      return cb();
    }
    
    if (file.isStream()) {
      this.emit('error', new PluginError(PluginName, 'Streaming not supported')); 
      return cb();
    }

    nodepandoc(input, args, options, function(err, output) {
      if (err) {
        this.emit('error', err.toString());
        return cb();
      }
      return cb();
    }.bind(this));
  });
};
