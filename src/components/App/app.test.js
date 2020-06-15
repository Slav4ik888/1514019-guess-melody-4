import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const errorsValue = [1, -7, 127];

describe(`index рендерит <App /> `, () => {
  it(`index рендерит <App /> errorsValue = ${errorsValue[0]}`, () => {
    const tree = renderer
      .create(<App errorsValue={errorsValue[0]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`index рендерит <App /> errorsValue = ${errorsValue[1]}`, () => {
    const tree = renderer
      .create(<App errorsValue={errorsValue[1]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
