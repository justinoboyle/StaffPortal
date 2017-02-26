import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import NotFound from './404'
import Header from '../Header'
import Input from '../Input';

const Layout = (props) => (
    <div>
        <Header nav={[
            {name: 'Home', to: '/'},
            {name: 'About', to: '/about'},
            {name: 'Login', to: '/login'},
        ]}/>
        <main className="main">{props.children}</main>
    </div>
);

const Home = (props) => (
    <div className="heading">
        <span className="small">Welcome to</span>
        <h1 className="strike">StaffPortal</h1>
    </div>
);

const About = (props) => (
    <div className="heading">
        <span className="small-nonfix">About Us</span>
    </div>
);

const Login = (props) => (
    <div>
        <div className="heading">
            <span className="small-nonfix">Login</span>
        </div>
        <Input label="Username or Email"/>
        <Input label="Password" password={true}/>
        <button className="button">Login</button>
    </div>
);

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="login" component={Login}/>
        <Route path="*" component={NotFound}/>
    </Route>
);

export default routes;