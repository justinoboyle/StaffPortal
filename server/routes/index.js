// Express
import express from 'express';

// React
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import routes from '../../../StaffPortal/web/src/js/Components/Routes';
import NotFound from '../../../StaffPortal/web/src/js/Components/Routes/404';

import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('*', (req, res) => {
    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        let markup;
        if (renderProps) {
            markup = ReactDOMServer.renderToString(<RouterContext {...renderProps}/>);
        } else {
            markup = ReactDOMServer.renderToString(<NotFound/>);
            res.status(404);
        }

        // render the index template with the embedded React markup
        return res.render('index', {
            markup,
            css: fs.readFileSync(path.join(__dirname, '..', '..', 'web', 'static', 'css', 'styles.css'))
        });
    });
});

module.exports = router;