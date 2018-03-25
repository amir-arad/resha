import {serve} from "../src/server";
import rootPath from '../src/pkg-root';
import {join} from 'path';
import express = require('express');

const app = express();

app.use(express.static(join(rootPath, "static")));

serve(app, 80, 'client.js');

