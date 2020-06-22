import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import WelcomeScreen from '../WelcomeScreen/welcome-screen.jsx';
import QuestionArtist from '../QuestionArtist/question-artist.jsx';
import QuestionGenre from '../QuestionGenre/question-genre.jsx';
import {GameType} from "../../consts/consts.js";


class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this._welcomeButtonHandler = this._welcomeButtonHandler.bind(this);
    this._renderGameScreen = this._renderGameScreen.bind(this);

    this.state = {
      step: -1,
    };
  }

  _welcomeButtonHandler() {
    this.setState({
      step: 0,
    });
  }

  _renderGameScreen() {
    const {errorsValue, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsValue={errorsValue}
          onWelcomeButtonClick={this._welcomeButtonHandler}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <QuestionArtist onAnswer={() => {
              this.setState((prevState) => ({
                step: prevState.step + 1,
              }));
            }}
            question={question}
            />
          );
        case GameType.GENRE:
          return (
            <QuestionGenre onAnswer={() => {
              this.setState((prevState) => ({
                step: prevState.step + 1,
              }));
            }}
            question={question}
            />
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
              <QuestionArtist onAnswer={() => {}} question={questions[1]}/>
            </Route>
            <Route exact path="/genre">
              <QuestionGenre onAnswer={() => {}} question={questions[0]}/>
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
};

export default App;
