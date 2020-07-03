import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import WelcomeScreen from '../WelcomeScreen/welcome-screen.jsx';
import QuestionArtist from '../QuestionArtist/question-artist.jsx';
import QuestionGenre from '../QuestionGenre/question-genre.jsx';
import {GameType} from '../../consts/consts.js';
import GameScreen from '../GameScreen/game-screen.jsx';
import GameOverScreen from '../GameOverScreen/game-over-screen.jsx';
import WinScreen from '../WinScreen/win-screen.jsx';
import withAudioPlayer from '../../hocs/with-active-player/with-active-player.js';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answers.js';
import {ActionCreator} from '../../reducer.js';

const QuestionGenreWrapped = withAudioPlayer(withUserAnswer(QuestionGenre));
const QuestionArtistWrapped = withAudioPlayer(QuestionArtist);


class App extends React.PureComponent {

  _renderGameScreen() {
    const {
      questions,
      onWelcomeButtonClick,
      onUserAnswer,
      maxMistakes,
      mistakes,
      resetGame,
      step,
    } = this.props;

    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsValue={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <QuestionArtistWrapped
                onAnswer={onUserAnswer}
                question={question}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <QuestionGenreWrapped
                onAnswer={onUserAnswer}
                question={question}
              />
            </GameScreen>
          );
      }
    }
    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {this._renderGameScreen()}
            </Route>
            <Route exact path="/artist">
              <QuestionArtistWrapped
                onAnswer={() => {}}
                question={questions[1]}
              />
            </Route>
            <Route exact path="/genre">
              <QuestionGenreWrapped
                onAnswer={() => {}}
                question={questions[0]}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}


App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

