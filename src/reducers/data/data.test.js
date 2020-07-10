import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../api.js';
import {reducer, ActionType, Operation} from "./data.js";

const api = createAPI(() => {});

const questions = [
  {
    type: `genre`,
    genre: `rock`,

    answers: [{
      src: `http://d.zaix.ru/e6zR.mp3`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `http://d.zaix.ru/e6zR.mp3`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz  `,
    }],
  },
  {
    type: `artist`,
    song: {
      artist: `Slava Cesar`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/A`,
      artist: `Alla Petunya`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AB`,
      artist: `Сергей Митькин`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AC`,
      artist: `Розалинда Набельчик`,
    }]
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    questions: [],
  });
});

it(`Reducer should update questions by load questions`, () => {
  expect(reducer({
    questions: [],
  }, {
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  })).toEqual({
    questions,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /questions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`) // Чтобы мок на запрос `/questions`
      .reply(200, [{fake: true}]); // вернул ответ 200 и массив таких данных [{fake: true}]

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1); // Проверяем, что dispatch был вызван
        expect(dispatch).toHaveBeenNthCalledWith(1, { // Проверяем с какими данными этот вызов был произведён
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
      });
  });
});
