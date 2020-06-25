import React from 'react';
import PropTypes from 'prop-types';
import {GameType} from "../../consts/consts.js";


class QuestionGenre extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: [false, false, false, false],
    };
  }

  render() {
    const {onAnswer, question, renderPlayer} = this.props;
    const {userAnswers} = this.state;
    const {answers} = question;
    return (
      <>
        <section className="game__screen">
          <h2 className="game__title">Выберите инди-рок треки</h2>
          <form
            className="game__tracks"
            onSubmit={ (event) => {
              event.preventDefault();
              onAnswer(question, this.state.userAnswers);
            }}
          >
            {answers.map((answer, i) => (
              <div key={`${i}-${answer.src}`} className="track">
                {renderPlayer(answer.src, i)}
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`}
                    checked={userAnswers[i]}
                    onChange={ (event) => {
                      const value = event.target.checked;
                      this.setState({
                        userAnswers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
                      });
                    }}
                  />
                  <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                </div>
              </div>
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
};

export default QuestionGenre;
