import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../WelcomeScreen/welcome-screen.jsx';


class App extends React.PureComponent {

  render() {
    const {errorValue} = this.props;

    return (
      <WelcomeScreen errorValue={errorValue}/>
    );
  }
}


App.propTypes = {
  errorValue: PropTypes.number.isRequired
};

export default App;
