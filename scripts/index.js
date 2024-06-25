// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardListElement = document.querySelector('.places__list')

// @todo: Функция создания карточки
function createCard (data, deleteCallBack) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  deleteButton.addEventListener('click', deleteCallBack);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard (event) {
  const cardToDelete = event.target.closest('.card')
  cardToDelete.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard);
  cardListElement.append(cardElement);
})