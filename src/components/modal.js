export { openModal, closeModal }


// Открытие карточки
const openModal = function(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
  popup.addEventListener('click', closeOverlay);
}


// Закрытие карточки
const closeModal = function(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
  popup.removeEventListener('click', closeOverlay);
}


// Закрытие карточки с помощью escape
const closeEsc = function(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
}


// Закртие карточки c помощью overlay
const closeOverlay = function(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget)
  }
}
