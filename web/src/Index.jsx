import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App.jsx';

window.React = React;

// <Route path="/about" component={About}/>

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
  , document.getElementById('content')
);
