import './pages/index.css'
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';


// Карточка
const cardListElement = document.querySelector('.places__list');


// Профиль
const profileEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput =  document.querySelector('.popup__input_type_description');


// Добавление карточки
const addCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url')


// Открытие карточки
const imagePopup = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__caption');
const popupTypeImage = document.querySelector('.popup_type_image')


// Вывод карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard, openImage, likeCard);
  cardListElement.append(cardElement);
});


// Редактирование профиля
profileEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent
  jobInput.value = profileDescription.textContent
  openModal(popupProfileEdit)
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupProfileEdit);
};

formEditProfile.addEventListener('submit', handleFormSubmit); 


// Добавление карточки
addCard.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openModal(popupNewCard)
});

function createNewCard(evt) {
  evt.preventDefault();
  const newCardElement = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  const newCard = createCard(newCardElement, deleteCard, openImage, likeCard);
  cardListElement.prepend(newCard);
  closeModal(popupNewCard);
};

formNewPlace.addEventListener('submit', createNewCard);


// Открытие карточки
function openImage(evt) {
  imagePopup.src = evt.target.src
  imagePopup.alt = evt.target.alt
  imageName.textContent = evt.target.alt
  openModal(popupTypeImage)
};