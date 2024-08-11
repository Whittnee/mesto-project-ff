import './pages/index.css'
import { createCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { validationConfig, clearValidation, enableValidation } from './components/validation';
import { getUserInfo, getUserCards, sendUserCard, updateUserData, updateUserProfilePhoto, deleteUserCard, removeUserLike, setUserLike } from './components/api';


let myId
let cardInfoDelete
let cardElementDelete


// Профиль
const profileEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput =  document.querySelector('.popup__input_type_description');
const profileImage = document.querySelector('.profile__image');
const popupProfileImage = document.querySelector('.popup_type_edit_profile-image');
const profileImageInput = document.querySelector('.popup__input_type_url_profile-image');
const formEditProfileImage = document.forms['edit-profile-image']


// Добавление карточки
const cardListElement = document.querySelector('.places__list');
const popupCloseButton = document.querySelectorAll('.popup__close');
const addCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url')
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const deleteCardButton = popupDeleteCard.querySelector('.popup__button_delete-card')


// Открытие карточки
const imagePopup = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__caption');
const popupTypeImage = document.querySelector('.popup_type_image')

enableValidation(validationConfig)


// Вывод карточек на страницу
function renderCard(data) {
  data.forEach(cardData => {
    cardListElement.prepend(createCard(cardData, myId, openPopupDeleteCard, openImage, handleLikeCardSubmit));
  });
}


// Показывает состояние сохранения
function loading(isloading, form) {
  if(isloading) {
    form.querySelector('.popup__button').textContent = 'Сохранение...'
  }
  else {
    form.querySelector('.popup__button').textContent = 'Сохранить'
  }
}


// Заполняет профиль данными из сервера
function renderProfile(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`
}


// Имя и описание для изменения данных профиля
function renderNameAndDescription(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
}


// Аватар для изменения фото профиля
function renderProfileImage(data) {
  profileImage.style.backgroundImage = `url(${data.avatar})`
}


// Попап удаления карточки
function openPopupDeleteCard(data, cardElement) {
  cardInfoDelete = data
  cardElementDelete = cardElement
  openModal(popupDeleteCard)
}


// Удаление карточки
function handleCardDeleteSubmit(card, cardElement) {
  deleteCardButton.textContent = 'Сохранение...' 
  deleteCardButton.disabled = true;
  deleteUserCard(card)
    .then(() => {
      cardElement.remove()
      closeModal(popupDeleteCard)
    })
    .catch((err) => {
      console.log(`Произошла ${err}`)
    })
    .finally(() => {
      deleteCardButton.textContent = 'Да' 
      deleteCardButton.disabled = false;
    })
}

deleteCardButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  handleCardDeleteSubmit(cardInfoDelete, cardElementDelete)
})


// Функция лайка
function handleLikeCardSubmit (likeButton, cardData, cardLikes) {
  
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeUserLike(cardData)
      .then((res) => {
        likeButton.classList.remove('card__like-button_is-active');
        cardLikes.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Произошла ${err}`)
      })
  }
  else {
    setUserLike(cardData)
      .then((res) => {
        likeButton.classList.add('card__like-button_is-active');
        cardLikes.textContent = res.likes.length
      })
      .catch((err) => {
        console.log(`Произошла ${err}`)
      })
  }
}


// Редактирование аватара
profileImage.addEventListener('click', () => {
  openModal(popupProfileImage);
  formEditProfileImage.reset();
  clearValidation(formEditProfileImage, validationConfig);
})


function handleFormProfileImageSubmit(evt) {
  evt.preventDefault()
  loading(true, formEditProfileImage)
  updateUserProfilePhoto({ avatar: profileImageInput.value})
    .then((data) => {
      renderProfileImage(data)
      closeModal(popupProfileImage)
    })
    .catch((err) => {
      console.log(`Произошла ${err}`)
    })
    .finally(() => {
      loading(false, formEditProfileImage)
    })
}

formEditProfileImage.addEventListener('submit', handleFormProfileImageSubmit)


// Редактирование профиля данных
profileEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent
  jobInput.value = profileDescription.textContent
  openModal(popupProfileEdit)
  clearValidation(formEditProfile, validationConfig)
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileData = {
    name: nameInput.value,
    about: jobInput.value
  }
  loading(true, formEditProfile)
  updateUserData(profileData)
    .then((data) => {
      renderNameAndDescription(data)
      closeModal(popupProfileEdit);
    })
    .catch((err) => {
      console.log(`Произошла ${err}`)
    })
    .finally(() => {
      loading(false, formEditProfile)
    })
};

formEditProfile.addEventListener('submit', handleProfileFormSubmit); 


// Добавление карточки
addCard.addEventListener('click', () => {
  formNewPlace.reset()
  clearValidation(popupNewCard, validationConfig)
  openModal(popupNewCard)
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardElement = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  loading(true, formNewPlace)
  sendUserCard(newCardElement)
    .then((data) => {
      cardListElement.prepend(createCard(data, myId, openPopupDeleteCard, openImage, handleLikeCardSubmit)),
      closeModal(popupNewCard)
    })
    .catch((err) => {
      console.log(`Произошла ${err}`)
    })
    .finally(() => {
      loading(false, formNewPlace)
    })
};

formNewPlace.addEventListener('submit', handleCardFormSubmit);


// Открытие карточки
function openImage(src, title) {
  imagePopup.src = src
  imagePopup.alt = title
  imageName.textContent = title
  openModal(popupTypeImage)
};


// Закрытие карточки с помощью кнопки
popupCloseButton.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup))
})


Promise.all([getUserInfo(), getUserCards()])
  .then(([userInfo, userCards]) => {
    myId = userInfo._id
    renderProfile(userInfo)
    renderCard(userCards)
  })