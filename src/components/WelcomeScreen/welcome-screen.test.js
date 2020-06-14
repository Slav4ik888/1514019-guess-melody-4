import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen';

const errorsValue = -7;
const welcomeButtonHandler = () => {};


describe(`<App /> рендерит WelcomeScreen`, () => {
  it(`<App /> рендерит WelcomeScreen`, () => {
    const tree = renderer
      .create(<WelcomeScreen
        errorsValue={errorsValue}
        onWelcomeButtonClick={welcomeButtonHandler}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
