import React from 'react';
import renderer from 'react-test-renderer';
import QuestionGenre from './question-genre.jsx';

const question = {
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
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz  `,
  }],
};

const onAnswer = () => {};
const onChange = () => {};
const onRenderPlayer = () => {};


describe(`<App /> рендерит <QuestionGenre /> `, () => {
  it(`<App /> рендерит <QuestionGenre /> `, () => {
    const tree = renderer
      .create(<QuestionGenre
        onAnswer={onAnswer}
        onChange={onChange}
        question={question}
        renderPlayer={onRenderPlayer}
        userAnswers={[false, false, false, false]}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
