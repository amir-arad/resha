import { Response, Request} from "express";
import {serve} from "../src/server";
import rootPath from '../src/pkg-root';

const tsify = require('tsify');
const bhmr = require('browserify-hmr');
const path = require("path");
const browserify = require('browserify-middleware');
const express = require('express');
const glob = require("glob");
const defaultIndex = require('simple-html-index');


const browserTestFiles = [path.resolve(rootPath, "test", "browser-env.ts"), ...glob.sync(path.resolve(rootPath, "test", "*.spec.ts"))];

const app = express();

browserify.settings.development('basedir', path.resolve(rootPath));
browserify.settings({
    plugins: [{
        plugin: tsify,
        options: {
       //     files: []
        }
    }/*, {plugin: bhmr, options: {}}*/]
});

// magic html for test:
app.get('/test', (req: Request, res: Response) => {
    // TODO: on HMR, tests needs to re-run and tapeworm should show it
    res.setHeader('content-type', 'text/html');
    // TODO: simply write HTML like src/server does
    defaultIndex({entry: 'test.js'}).pipe(res);
});
// code for test
app.use('/test.js', browserify([
    Object.assign({}, ...browserTestFiles.map((f) => ({[f]: {run: true}})))
]));

// code for client
app.get('/client.bundle.js', browserify(path.resolve(rootPath, "src", "client.ts")));


serve(app, 8080, 'client.bundle.js');
