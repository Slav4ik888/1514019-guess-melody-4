import React from 'react';
import PropTypes from 'prop-types';

class WelcomeScreen extends React.PureComponent {

  render() {
    const {errorValue} = this.props;

    return (
        <>
            <div>Добро пожаловать!!!</div>
            <div>Сейчас у вас { errorValue } ошибки</div>
        </>
    );
  }
}

WelcomeScreen.propTypes = {
  errorValue: PropTypes.number.isRequired
};

export default WelcomeScreen;
