const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const URL_BASE = 'http://localhost:3001/';

export default class API {
  static get(url) {
    return fetch(URL_BASE + url, { headers })
      .then(res => res.json())
      .catch(err => {
        throw new Error(JSON.stringify(err));
      });
  }

  static post(url, payload) {
    return fetch(URL_BASE + url, {
      headers,
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .catch(err => {
        throw new Error(JSON.stringify(err));
      });
  }

  static delete(url) {
    return fetch(URL_BASE + url, { headers, method: 'DELETE' }).catch(err => {
      throw new Error(JSON.stringify(err));
    });
  }

  static put(url, payload) {
    return fetch(URL_BASE + url, {
      headers,
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .catch(err => {
        throw new Error(JSON.stringify(err));
      });
  }
}
