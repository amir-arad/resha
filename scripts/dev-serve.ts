import {Request, Response} from "express";
import {serve} from "../src/server";
import rootPath from '../src/pkg-root';

const tsify = require('tsify');
const bhmr = require('browserify-hmr');
const path = require("path");
const browserify = require('browserify-middleware');
const express = require('express');
const glob = require("glob");

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
    res.send(`<!DOCTYPE html>
<html>
  <body>  
       <script type="text/javascript" src="test.js"></script>
   </body>
</html>
`);
});
// code for test
app.use('/test.js', browserify([
    Object.assign({}, ...browserTestFiles.map((f) => ({[f]: {run: true}})))
]));

// code for client
app.get('/client.live.js', browserify(path.resolve(rootPath, "src", "client.ts")));


serve(app, 8080, 'client.live.js');
