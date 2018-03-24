import {serve} from "../src/server";
import rootPath from '../src/pkg-root';

const tsify = require('tsify');
const path = require("path");
const browserify = require('browserify-middleware');
const express = require('express');


const app = express();

//TODO: serve rootPath/static/client.js instead of browserify



browserify.settings.development('basedir', path.resolve(rootPath));
browserify.settings({
    plugins: [{
        plugin: tsify,
        options: {
            files: []
        }
    }]
});
app.get('/client.bundle.js', browserify(path.resolve(rootPath, "src", "client.ts")));


serve(app, Number(process.env.PORT || 8080), 'client.bundle.js');

