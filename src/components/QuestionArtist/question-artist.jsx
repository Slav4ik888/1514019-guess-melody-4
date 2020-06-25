import React from 'react';
import PropTypes from 'prop-types';
import {GameType} from '../../consts/consts.js';

class QuestionArtist extends React.PureComponent {

  render() {
    const {onAnswer, question, renderPlayer} = this.props;
    const {answers, song} = question;

    return (
      <>
        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            {renderPlayer(song.src, 0)}
          </div>
          <form className="game__artist">
            {answers.map((answer, i) => (
              <div key={`${i}-${answer.src}`} className="artist">
                <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i}`} id={`answer-${i}`}
                  onChange={ (event) => {
                    event.preventDefault();
                    onAnswer(question, answer);
                  }}
                />
                <label className="artist__name" htmlFor={`answer-${i}`}>
                  <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                  {answer.artist}
                </label>
              </div>
            ))}
          </form>
        </section>
      </>
    );
  }
}

QuestionArtist.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,

    answers: PropTypes.arrayOf(
        PropTypes.shape({
          artist: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
        })).isRequired,

    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default QuestionArtist;
