export { createCard };


// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Cоздание карточки
function createCard (cardData, myId, openPopupDeleteCard, openImage, handleLikeCardSubmit) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const countLikes = cardElement.querySelector('.card__like-button-counter');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  countLikes.textContent = cardData.likes.length;

  cardLikeButton.addEventListener('click', (evt) => handleLikeCardSubmit(evt.target, cardData, countLikes));
  cardImage.addEventListener('click', () => openImage(cardImage.src, cardImage.alt));
  deleteButton.addEventListener('click', () => openPopupDeleteCard(cardElement));
  

  // Проверка ID пользователя для удаления его карточек
  if (cardData.owner._id === myId) {
    deleteButton.addEventListener('click', () => {
      openPopupDeleteCard(cardData, cardElement)
    })
  }
  else {
    deleteButton.remove()
  }
  

  // Проверка ID пользователя для отоброжения его лайков
  cardData.likes.forEach((cardData) => {
    if (cardData._id === myId) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });

  return cardElement;
}

