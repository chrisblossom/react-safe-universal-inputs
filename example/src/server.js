import 'babel-polyfill';
import path from 'path';
import express from 'express';
import http from 'http';

import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';

const app = express();
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, 'public');
const staticPath = path.resolve(process.cwd(), 'example/static');

app.set('etag', false);

app.use(function nocache(req, res, next) {
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    next();
});

app.use('/dist/', express.static(publicPath), express.static(staticPath));
app.use('*', (request, response) => {
    const rendered = renderToString(<App />);
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>react-safe-universal-inputs demo</title>
        <link rel="stylesheet" href="/dist/bootstrap.min.css" />
      </head>
      
      <body class="container">
        <br/>
        <br/>
        <h2>
            Demo of <a href="https://github.com/chrisblossom/react-safe-universal-inputs" target="_blank">react-safe-universal-inputs</a>
        </h2>
        <br/>
        <br/>
        <button class="btn btn-warning" id="init-auto">automatically update</button>
        <button class="btn btn-warning" id="init-manual">manually update</button>
        <br/>
        <div id="root">${rendered}</div>
      </body>
      
      <script src="/dist/main.js"></script>
    </html>
  `;

    response.send(html);
});

server.listen(3000, error => {
    if (error) {
        console.error('express start error', error);
    }

    console.log('express server started');
});
