export class API {
  constructor (param) {    
    this.param = param;
  }
//Возврат промиса получения данных с сервера
 getUserInfoPromise() {
  return fetch(`${this.param.baseUrl}/users/me`, {
    headers: {
      authorization: this.param.headers.authorization
    }
  });
}
//Возврат промиса обновления данных на сервере
 updateUserInfoPromise(userName, userAbout) {
  return fetch(`${this.param.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: this.param.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  });
}

//Возврат промиса обновления данных на сервере
getInitialCardsPromise() {
  return fetch(`${this.param.baseUrl}/cards`, {
    headers: {
      authorization: this.param.headers.authorization,
    }
  });
}

 addCardPromise(cardName, cardLink) {
  return fetch(`${this.param.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: this.param.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  });
}
}
	