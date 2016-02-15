import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './components/App.jsx';

window.React = React;

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route
            component={App}
            path="/" 
        />
    </Router>
  , document.getElementById('content')
);
