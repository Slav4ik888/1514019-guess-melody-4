import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import WelcomeScreen from '../WelcomeScreen/welcome-screen.jsx';
import QuestionArtist from '../QuestionArtist/question-artist.jsx';
import QuestionGenre from '../QuestionGenre/question-genre.jsx';
import {GameType} from '../../consts/consts.js';
import GameScreen from '../GameScreen/game-screen.jsx';
import withAudioPlayer from '../../hocs/with-audio-player.js';
import {ActionCreator} from '../../reducer.js';

const QuestionGenreWrapped = withAudioPlayer(QuestionGenre);
const QuestionArtistWrapped = withAudioPlayer(QuestionArtist);


class App extends React.PureComponent {

  _renderGameScreen() {
    const {errorsValue, questions,
      onWelcomeButtonClick,
      onUserAnswer,
      step,
    } = this.props;

    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsValue={errorsValue}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type} >
              <QuestionArtistWrapped
                onAnswer={onUserAnswer}
                question={question}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type} >
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
  errorsValue: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));

  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

