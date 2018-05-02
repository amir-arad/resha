import {serve} from "../src/server";
import rootPath from '../src/pkg-root';
import {join} from 'path';
import express = require('express');

// TODO: change to cluster, use forevernpm install uws
// http://colyseus.io/docs/concept-worker-processes/
// http://colyseus.io/docs/deployment/
const app = express();

app.use(express.static(join(rootPath, "static")));

serve(app, 80, 'client.js');

