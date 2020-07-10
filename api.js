import axios from "axios";

const Error = {
  UNAUTHORIZED: 401
};

// Вызов createAPI будет возвращать новый инстас
// Принимает перехватчик onUnauthorized неавторизоованного состояния

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true, // чтобы читали куки
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized(); // Нужен, чтобы изменить данные в сторе

      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации - это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    }

    throw err;
  };

  // Перехватчик
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
