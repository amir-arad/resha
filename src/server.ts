import * as path from 'path';
import * as express from 'express';
import {Express} from 'express';
import {createServer} from 'http';
import {Server} from 'colyseus';
// Require BasicRoom handler
import {BasicRoom} from "./model";
import rootPath from './pkg-root';


export function serve(app: Express, port: number, clinetPath: string) {
// Create HTTP Server
    const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
    const gameServer = new Server({server: httpServer});

// Register BasicRoom as "basic"
    gameServer.register("basic", BasicRoom);

// Register BasicRoom with initial options, as "basic_with_options"
// onInit(options) will receive client join options + options registered here.
    gameServer.register("basic_with_options", BasicRoom, {
        custom_options: "you can use me on Room#onInit"
    });
//
    app.get('/', (req, res) => {
        res.send(`<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Tahoma, Geneva, sans-serif; text-align: center; }
    </style>

    <!-- dummy Symbol polyfill -->
    <script>if (typeof(Symbol)==="undefined") { window.Symbol = function(arg) { return arg; } }</script>

    <!-- client -->
    <script type="text/javascript" src="${clinetPath}"></script>

  </head>
  <body>
    <strong>Messages</strong><br>

    <form id="form">
      <input type="text" id="input" value="" />
      <input type="submit" value="send" />
    </form>

    <div id="messages"></div>
  </body>
</html>
`);
    });


    app.use(express.static(path.join(rootPath, "static")));
// app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

    gameServer.listen(port);

    console.log(`Listening on http://localhost:${ port }`);
}

