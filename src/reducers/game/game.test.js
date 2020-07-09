import {reducer, ActionType, ActionCreator} from './game.js';


describe(`Тестим GAME Reducer`, () => {

  it(`Reducer WITHOUT additional parametres should return initional state`, () => {
    expect(reducer(void 0, {})).toEqual({
      mistakes: 0,
      step: -1,
      maxMistakes: 3,
    });
  });

  it(`Reducer should incremennt current STEP by a given value`, () => {
    expect(reducer({
      mistakes: 0,
      step: -1,
    }, {
      type: ActionType.INC_STEP,
      payload: 1,
    })).toEqual({
      mistakes: 0,
      step: 0,
    });

    expect(reducer({
      mistakes: 0,
      step: -1,
    }, {
      type: ActionType.INC_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      step: -1,
    });
  });

  it(`Reducer should incremennt current MIST 1 by a given value`, () => {
    expect(reducer({
      mistakes: 0,
      step: -1,
    }, {
      type: ActionType.INC_MIST,
      payload: 1,
    })).toEqual({
      mistakes: 1,
      step: -1,
    });
  });

  expect(reducer({
    mistakes: 0,
    step: -1,
  }, {
    type: ActionType.INC_MIST,
    payload: 0,
  })).toEqual({
    mistakes: 0,
    step: -1,
  });

  it(`Reducer should return default`, () => {
    expect(reducer({
      step: 5,
      mistakes: 1,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      step: 0,
      mistakes: 0,
      maxMistakes: 3,
    });

    expect(reducer({
      step: 0,
      mistakes: 0,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      step: 0,
      mistakes: 0,
      maxMistakes: 3,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      step: 0,
      mistakes: 0,
      maxMistakes: 3,
    });
  });
});

describe(`Тестим ActionCreator`, () => {

  it(`ActionCreator for incrementing STEP returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INC_STEP,
      payload: 1,
    });
  });

  it(`ActionCreator for ARTIST incrementing MIST returns correct action`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: ActionType.INC_MIST,
      payload: 0,
    });
  });

  it(`ActionCreator for ARTIST incrementing MIST returns INcorrect action`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `incorrect`,
      picture: ``,
    })).toEqual({
      type: ActionType.INC_MIST,
      payload: 1,
    });
  });

  it(`ActionCreator for GENRE incrementing MIST returns correct action`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: ``,
          genre: `rock`,
        }, {
          src: ``,
          genre: `blues`,
        }, {
          src: ``,
          genre: `rock`,
        }, {
          src: ``,
          genre: `blues`,
        },
      ]
    },
    [true, false, true, false]
    )).toEqual({
      type: ActionType.INC_MIST,
      payload: 0,
    });
  });

  it(`ActionCreator for GENRE incrementing MIST returns INcorrect action`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: ``,
          genre: `rock`,
        }, {
          src: ``,
          genre: `blues`,
        }, {
          src: ``,
          genre: `rock`,
        }, {
          src: ``,
          genre: `blues`,
        },
      ]
    },
    [true, false, false, false]
    )).toEqual({
      type: ActionType.INC_MIST,
      payload: 1,
    });
  });

  it(`Action creator for reset game returns action with null payload`, () => {
    expect(ActionCreator.resetGame())
      .toEqual({
        type: ActionType.RESET,
        payload: null,
      });
  });
});
