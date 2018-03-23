const tsify = require('tsify');
const bhmr = require('browserify-hmr');
const path = require("path");
const browserify = require('browserify-middleware');
const express = require('express');
const glob = require("glob");
const defaultIndex = require('simple-html-index');

const browserTestFiles = [path.resolve(__dirname, "..", "test", "setup.ts"), ...glob.sync(path.resolve(__dirname, "..", "test", "*.spec.ts"))];

const app = express();

browserify.settings.development('basedir', path.resolve(__dirname, ".."));
browserify.settings({plugins: [{plugin: tsify, options: {}}, {plugin: bhmr, options: {}}]});

// magic html for test:
app.use('/test.bundle', (req, res) => {
    res.setHeader('content-type', 'text/html');
    defaultIndex({entry: 'test.bundle.js'}).pipe(res);
});
// code for test
app.use('/test.bundle.js', browserify([
    Object.assign({}, ...browserTestFiles.map((f) => ({[f] :{run: true}})))
]));

// TODO: on HMR, tests needs to re-run

app.listen(8080);
