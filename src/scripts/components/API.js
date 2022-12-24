export default class API {
  headers;

  constructor(config) {
    this._headers = config.headers;
    this._baseUrl = config.baseUrl;
  }
// проверка на ошибки
  _checkError(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`ERROR: ${res.status}`)
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me `, {
      method: "GET",
      headers: this._headers
    })
    .then(this._checkError)
  }

  editUserInfo(data){
    return fetch(`${this._baseUrl}/users/me `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
      
    })
    .then(this._checkError)
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.src
        })
    })
    .then(this._checkError)    
  }

  getCards(){
  return fetch(`${this._baseUrl}/cards`, {
    method: "GET",
    headers: this._headers
  })
  .then(this._checkError)
  }

  createCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkError)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkError)
  }

  pressLikeOnCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
    .then(this._checkError)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkError)
  }
}