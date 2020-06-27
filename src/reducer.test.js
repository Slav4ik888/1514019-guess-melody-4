import {reducer, ActionType, ActionCreator} from './reducer.js';

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/1`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/2`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128/3`,
      artist: `Jim Beam`,
    }],
  }
];

describe(`Тестим Reducer`, () => {

  it(`Reducer WITHOUT additional parametres should return initional state`, () => {
    expect(reducer(void 0, {})).toEqual({
      mistakes: 0,
      step: -1,
      maxMistakes: 3,
      questions,
    });
  });

  it(`Reducer should incremennt current STEP by a given value`, () => {
    expect(reducer({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions,
    }, {
      type: ActionType.INC_STEP,
      payload: 1,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: 0,
      questions,
    });

    expect(reducer({
      mistakes: 0,
      maxMistakes: 3,
      step: 1,
      questions,
    }, {
      type: ActionType.INC_STEP,
      payload: 1,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions,
    });

    expect(reducer({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions,
    }, {
      type: ActionType.INC_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions,
    });
  });

  it(`Reducer should incremennt current MIST by a given value`, () => {
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

    expect(reducer({
      mistakes: 3,
      step: 5,
    }, {
      type: ActionType.INC_MIST,
      payload: 1,
    })).toEqual({
      mistakes: 0,
      step: -1,
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

});
