import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/app.jsx';
import {Settings} from "./consts/consts";


ReactDOM.render(
    <App errorsValue={Settings.ERRORS_ALL} />
    , document.getElementById(`root`));
