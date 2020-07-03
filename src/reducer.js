import {extend} from './utils.js';
import {GameType} from './consts/consts.js';
import questions from './mocks/questions.js';

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions,
};

const ActionType = {
  INC_MIST: `INCREMENT_MISTAKE`,
  INC_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INC_STEP,
    payload: 1,
  }),

  incrementMistake: (question, userAnswer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }
    return {
      type: ActionType.INC_MIST,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  resetGame: () => {
    return {
      type: ActionType.RESET,
      payload: null,
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INC_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INC_MIST:
      return extend(state, {
        mistakes: state.mistakes + action.payload
      });

    case ActionType.RESET:
      return extend(initialState, {
        step: 0,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
