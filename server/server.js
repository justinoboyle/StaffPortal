#!/usr/bin/env node

// Express
import express from 'express';
import minifyHTML from 'express-minify-html';
import ejs from 'ejs';

// Configuration
import * as config from './config.json';

// Native Modules
import * as path from 'path';

const app = express();
const port = process.env.PORT || config.port;

// App config
app.set('json spaces', 2);
app.set('port', port);
app.set('views', path.join(__dirname, '..', 'web', 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));
app.use('/', express.static(path.join(__dirname, '..', 'web', 'static')));
app.use('/', require('./routes'));
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Magic');
    next()
});

// Start listening on defined port
app.listen(app.get('port'));