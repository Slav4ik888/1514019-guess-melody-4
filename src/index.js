import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index.jsx';

let errorValue = 2;


ReactDOM.render(
    <App errorValue={errorValue} />
    , document.getElementById('root'));