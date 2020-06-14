import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../WelcomeScreen/welcome-screen.jsx';

const welcomeButtonHandler = () => console.log(`Кликнули на большую кнопку`);

const App = (props) => {

  const {errorsValue} = props;

  return (
    <WelcomeScreen
      errorsValue={errorsValue}
      onWelcomeButtonClick={welcomeButtonHandler}
    />
  );
};


App.propTypes = {
  errorsValue: PropTypes.number.isRequired
};

export default App;
