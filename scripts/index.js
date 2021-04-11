import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const container = document.querySelector('.elements');
const popupProfile = document.querySelector('.popup_profile');
const nameField = document.querySelector('.popup__field_type_name');
const descriptionField = document.querySelector('.popup__field_type_description');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupPhoto = document.querySelector('.popup_photo');
const photo = popupPhoto.querySelector('.popup__field_type_photo');
const place = popupPhoto.querySelector('.popup__field_type_place');
const popupFullPhoto = document.querySelector('.popup_full-photo');

const validationConfig = {
  formSelector: '.popup__content',
  fieldSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  fieldInvalidClass: 'popup__field_invalid',
  buttonInvalidClass: 'popup__submit-button_inactive',
};

const editForm = document.querySelector('.popup_profile');
const addCardForm = document.querySelector('.popup_photo');


const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const AddCardFormValidator = new FormValidator(validationConfig, addCardForm);
AddCardFormValidator.enableValidation();

const cardSelector = '.element-template';


function createCards(link, name, cardSelector, handleCardClick) {
  const card = new Card(link, name, cardSelector, handleCardClick);
  const createdCard = card.createCard();
  return createdCard;
}

initialElements.forEach((item) => {
  container.append(createCards(item.link, item.name, cardSelector, handleCardClick));
})

//show popup functions and buttons
function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
  popup.addEventListener('click', closeButtonHandler);
}

editButton.addEventListener('click', function () {
  showPopup(popupProfile);
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
});

addButton.addEventListener('click', function () {
  popupPhoto.querySelector('.popup__content').reset();
  showPopup(popupPhoto);
  AddCardFormValidator.resetValidation();
});

// //close popup function and buttons
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('click', closeButtonHandler);
}

function closeButtonHandler(event) {
  if (event.target.classList.contains('popup__close-button')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//close popup by clicking on overlay
function closePopupOverlay(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target)
  }
}

//close popup Escape

function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)
  }
}

//submit profile form popup

popupProfile.addEventListener('submit', function (event) {
  event.preventDefault();
  name.textContent = nameField.value;
  description.textContent = descriptionField.value;
  closePopup(popupProfile);
});

//submit photo form popup

popupPhoto.addEventListener('submit', function (event) {
  event.preventDefault();
  container.prepend(createCards(photo.value, place.value, cardSelector, handleCardClick));
  closePopup(popupPhoto);
});

//
function handleCardClick(name, link) {
  popupFullPhoto.querySelector('.full-photo__image').src = link;
  popupFullPhoto.querySelector('.full-photo__place').textContent = name;
  showPopup(popupFullPhoto)
}

