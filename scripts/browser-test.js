#!/usr/bin/env node

var browserify = require('browserify');
var glob = require("glob");
var path = require("path");
var tsify = require('tsify');

// options is optional
const files = glob.sync(path.resolve(__dirname, "..", "test", "*.spec.ts"));
const b = browserify();
for (var f of files) {
    b.add(f);
}
b
    .plugin(tsify)
    .bundle()
    .on('error', function (error) {
        console.error(error.toString());
    })
    .pipe(process.stdout);

