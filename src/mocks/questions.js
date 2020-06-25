const AVATAR_URL = `https://api.adorable.io/avatars/128`;

export default [
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
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
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
      picture: `${AVATAR_URL}/${Math.random()}`,
      artist: `Alla Petunya`,
    }, {
      picture: `${AVATAR_URL}/${Math.random()}`,
      artist: `Сергей Митькин`,
    }, {
      picture: `${AVATAR_URL}/${Math.random()}`,
      artist: `Розалинда Набельчик`,
    }]
  }
];
