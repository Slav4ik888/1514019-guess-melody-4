import React from 'react';
import PropTypes from 'prop-types';
import {GameType} from '../../consts/consts.js';
import GenreQuestionItem from '../GenreQuestionItem/genre-question-item.jsx';


class QuestionGenre extends React.PureComponent {

  render() {
    const {
      onAnswer,
      onChange,
      question,
      renderPlayer,
      userAnswers
    } = this.props;

    const {answers, genre} = question;

    return (
      <>
        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={ (event) => {
              event.preventDefault();
              onAnswer();
            }}
          >
            {answers.map((answer, i) => (
              <GenreQuestionItem
                id={i}
                answer={answer}
                key={`${i}-${answer.src}`}
                renderPlayer={renderPlayer}
                onChange={onChange}
                userAnswer={userAnswers[i]}
              />
            ))}

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </>
    );
  }
}

QuestionGenre.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,

    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default QuestionGenre;
