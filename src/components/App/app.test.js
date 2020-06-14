import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const errorsValue = [1, 4, -7, 127];

describe(`index рендерит <App /> `, () => {
  it(`index рендерит <App /> `, () => {
    const tree = renderer
      .create(<App errorsValue={errorsValue} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`index рендерит <App /> errorsValue = null`, () => {
    const tree = renderer
      .create(<App errorsValue={null} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
