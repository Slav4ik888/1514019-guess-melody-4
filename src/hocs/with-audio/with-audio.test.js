import React from 'react';
import renderer from 'react-test-renderer';
import pt from 'prop-types';
import withAudio from './with-audio.js';

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: pt.oneOfType([
    pt.arrayOf(pt.node),
    pt.node
  ]).isRequired
};

const MockComponentWrapped = withAudio(MockComponent);


it(`withAudio is rendered correctly`, () => {

  const tree = renderer.create(
      <MockComponentWrapped
        isPlaying={false}
        onPlayButtonClick={() => {}}
        src={``}
      />
      , {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
