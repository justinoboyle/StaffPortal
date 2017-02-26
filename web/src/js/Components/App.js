import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './Routes/';

export default class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
        );
    }
}