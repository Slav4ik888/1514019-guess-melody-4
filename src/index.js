import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/app.jsx';
import {Settings} from "./consts/consts";
import questions from "./mocks/questions.js";


ReactDOM.render(
    <App errorsValue={Settings.ERRORS_ALL} questions={questions}/>
    , document.getElementById(`root`));
