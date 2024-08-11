export { getUserInfo, getUserCards, sendUserCard, updateUserData, updateUserProfilePhoto, setUserLike, removeUserLike, deleteUserCard }

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/wff-cohort-19',
  headers: {
    authorization: '514d4c36-87fa-47f4-8bb5-087427f7f4e2',
    'Content-Type': 'application/json'
  }
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`ошибка: ${res.status}`);
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const getUserCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const updateUserData = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const sendUserCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
     body: JSON.stringify({
      name: data.name,
      link: data.link,
     }),
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const deleteUserCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    headers: config.headers,
    method: 'DELETE'
  })
  .then((res) => {
   return checkResponse(res)
  })
}

const setUserLike = (card) => {
  return fetch(`${config.baseUrl}/cards/like/${card._id}`, {
    headers: config.headers,
    method: 'PUT',
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const removeUserLike = (card) => {
  return fetch(`${config.baseUrl}/cards/like/${card._id}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then((res) => {
   return checkResponse(res)
  })
}

const updateUserProfilePhoto = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      })
  })
  .then((res) => {
    return checkResponse(res)
  })
}