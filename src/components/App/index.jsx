import React, { Component } from 'react';
import WelcomeScreen from '../WelcomeScreen/index.jsx';


class App extends React.PureComponent {

    render() {
        const { errorValue } = this.props;
        return (
            <WelcomeScreen errorValue={errorValue} />
        )
    }

}

export default App;
