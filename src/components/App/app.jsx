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
import {AuthorizationStatus} from '../../reducers/user/user.js';
import {getStep, getMistakes, getMaxMistakes} from '../../reducers/game/selectors.js';
import {ActionCreator} from '../../reducers/game/game.js';
import {getQuestions} from '../../reducers/data/selectors.js';
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {Operation as UserOperation} from '../../reducers/user/user.js';
import AuthScreen from "../auth-screen/auth-screen.jsx";

const QuestionGenreWrapped = withAudioPlayer(withUserAnswer(QuestionGenre));
const QuestionArtistWrapped = withAudioPlayer(QuestionArtist);


class App extends React.PureComponent {

  _renderGameScreen() {
    const {
      authorizationStatus,
      login,
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
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return (
          <WinScreen
            questionsCount={questions.length}
            mistakesCount={mistakes}
            onReplayButtonClick={resetGame}
          />
        );
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return (
          <AuthScreen
            onReplayButtonClick={resetGame}
            onSubmit={login}
          />
        );
      }

      return null;

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
            <Route exact path="/dev-auth">
              <AuthScreen
                onReplayButtonClick={() => {}}
                onSubmit={() => {}}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}


App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) { // authData - объект {login, password}
    dispatch(UserOperation.login(authData));
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
