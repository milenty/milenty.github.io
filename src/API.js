export class API {
  constructor (apiUrl,param) {    
    this.apiUrl = apiUrl;
    this.param = param;
  }
//Возврат промиса получения данных с сервера
 getUserInfoPromise() {
  return fetch(`${this.apiUrl}/users/me`, {
    headers: {
      authorization: this.param.authorization
    }
  });
}
//Возврат промиса обновления данных на сервере
 updateUserInfoPromise(userName, userAbout) {
  return fetch(`${this.apiUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: this.param.authorization,
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
  return fetch(`${this.apiUrl}/cards`, {
    headers: {
      authorization: this.param.authorization
    }
  });
}

 addCardPromise(cardName, cardLink) {
  return fetch(`${this.apiUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: this.param.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  });
}
}
	