import React from 'react';
import renderer from 'react-test-renderer';
import QuestionArtist from './question-artist.jsx';

const question = {
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
};

const onAnswer = () => {};
const onRenderPlayer = () => {};


describe(`<App /> рендерит <QuestionArtist /> `, () => {
  it(`<App /> рендерит <QuestionArtist /> `, () => {
    const tree = renderer
      .create(<QuestionArtist
        onAnswer={onAnswer}
        question={question}
        renderPlayer={onRenderPlayer}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
