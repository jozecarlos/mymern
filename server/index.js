import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import App from '../client/App';
import template from '../client/template';
import routes from '../client/routes';
// Webpack Requirements
import webpack from 'webpack';
import serverConfig from './config';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const server = express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  server.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  server.use(webpackHotMiddleware(compiler));
}

// Apply body Parser and server public assets and routes
server.use(compression());
server.use(bodyParser.json({ limit: '20mb' }));
server.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
server.use(express.static(path.resolve(__dirname, '../dist')));

// Server Side Rendering based on routes matched by React-router.
server.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      //return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const appString = renderToString(<RouterContext {...renderProps} />);

    res.send(template({
      body: appString,
     title: 'Hello World from the server'
    }));
  });
});

// start app
server.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default server;
