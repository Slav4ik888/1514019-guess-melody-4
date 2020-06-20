import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/1`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/2`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128/3`,
      artist: `Jim Beam`,
    }],
  },
];

const errorsValue = [1, 7];

describe(`index рендерит <App /> `, () => {
  it(`index рендерит <App /> errorsValue = ${errorsValue[0]}`, () => {
    const tree = renderer
      .create(<App errorsValue={errorsValue[0]} questions={questions}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`index рендерит <App /> errorsValue = ${errorsValue[1]}`, () => {
    const tree = renderer
      .create(<App errorsValue={errorsValue[1]} questions={questions}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
