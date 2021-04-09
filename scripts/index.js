import { Card } from './Card.js';
import {FormValidator} from './FormValidator.js';

const container = document.querySelector('.elements');

initialElements.forEach((item) => {
  const card = new Card(item.link, item.name, container);
  document.body.append(card);
})

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

//show popup functions and buttons
function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closePopupOverlay);
  document.addEventListener('click', closeButtonHandler);

}

editButton.addEventListener('click', function () {
  showPopup(popupProfile);
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
});

addButton.addEventListener('click', function () {
  showPopup(popupPhoto);
});

// //close popup function and buttons
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closePopupOverlay);
  if (!popup.classList.contains('popup_full-photo')) {
    popup.querySelector('.popup__content').reset();
  }
}

function closeButtonHandler(event) {
  const popupOpened = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup__close-button')) {
    closePopup(popupOpened);
  }
}

//close popup by clicking on overlay
function closePopupOverlay(event) {
  const popupOpened = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup')) {
    closePopup(popupOpened)
  }
}

//close popup Escape

function closePopupEsc(event) {
  const popupOpened = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
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
  const newCard = new Card(photo.value, place.value, container);
  document.body.prepend(newCard);
  closePopup(popupPhoto);
});

//fullscreen function
const popupFullPhoto = document.querySelector('.popup_full-photo');
const cardElements = document.querySelectorAll('.element');

cardElements.forEach((card) => {
  card.addEventListener('click', function(event) {
    showPopup(popupFullPhoto);
    popupFullPhoto.querySelector('.full-photo__image').src = event.target.closest('.element__photo').src;
    popupFullPhoto.querySelector('.full-photo__place').textContent = event.target.closest('.element').textContent;
  })
})

// document.addEventListener('click', function (event) {
//   if (event.target.classList.contains('element')) {
//     showPopup(popupFullPhoto);
//     popupFullPhoto.querySelector('.full-photo__image').src = event.target.closest('.element__photo').src;
//     popupFullPhoto.querySelector('.full-photo__place').textContent = event.target.closest('.element').textContent;
//   }
// })

// const photoElements = document.querySelectorAll('.element__photo')