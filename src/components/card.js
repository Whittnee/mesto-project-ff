export { createCard, deleteCard, likeCard };


// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Cоздание карточки
function createCard (data, deleteCallBack, openImage, clickLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLikeButton.addEventListener('click', clickLike)
  cardImage.addEventListener('click', openImage)
  deleteButton.addEventListener('click', deleteCallBack);
  return cardElement;
}

// Удаление карточки
function deleteCard (evt) {
  const cardToDelete = evt.target.closest('.card')
  cardToDelete.remove();
}

// Лайк карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}