import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

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
const newCardPopupContent = popupPhoto.querySelector('.popup__content');
const fullPhotoImage = popupFullPhoto.querySelector('.full-photo__image');
const fullPhotoPlace = popupFullPhoto.querySelector('.full-photo__place');

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

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();


const fullScreenPopup = new PopupWithImage('.popup_full-photo');
fullScreenPopup.setEventListeners();

function createCards(link, name, cardSelector) {
  const card = new Card(link, name, cardSelector,
    {
      handleCardClick: () => {
        fullScreenPopup.open(link, name)
      }
    });
  const createdCard = card.createCard();
  return createdCard;
}


initialElements.forEach((item) => {
  container.append(createCards(item.link, item.name, '.element-template'));
})

const addCardPopup = new PopupWithForm('.popup_photo');
const editProfilePopup = new PopupWithForm('.popup_profile');


addButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardPopup.setEventListeners();
})

editButton.addEventListener('click', () => {
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
  editProfilePopup.open();
})

const cardList = new Section({
  items: initialElements,
  renderer: (item) => {
    cardList.addItem(createCards(item.link, item.name, '.element-template', handleCardClick))
  }
})

//submit photo form popup

// popupPhoto.addEventListener('submit', function (event) {
//   event.preventDefault();
//   container.prepend(createCards(photo.value, place.value, '.element-template', handleCardClick));
//   closePopup(popupPhoto);
// });




// //show popup functions and buttons
// function showPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEsc);
//   popup.addEventListener('click', closePopupOverlay);
//   popup.addEventListener('click', closeButtonHandler);
// }

// editButton.addEventListener('click', function () {
//   showPopup(popupProfile);
//   nameField.value = name.textContent;
//   descriptionField.value = description.textContent;
//   editFormValidator.resetValidation();
// });

// addButton.addEventListener('click', function () {
//   newCardPopupContent.reset();
//   showPopup(popupPhoto);
//   addCardFormValidator.resetValidation();
// });

// // //close popup function and buttons
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEsc);
//   document.removeEventListener('click', closePopupOverlay);
//   document.removeEventListener('click', closeButtonHandler);
// }

// function closeButtonHandler(event) {
//   if (event.target.classList.contains('popup__close-button')) {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }

// //close popup by clicking on overlay
// function closePopupOverlay(event) {
//   if (event.target.classList.contains('popup')) {
//     closePopup(event.target)
//   }
// }

// //close popup Escape

// function closePopupEsc(event) {
//   if (event.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened)
//   }
// }

// //submit profile form popup

// popupProfile.addEventListener('submit', function (event) {
//   event.preventDefault();
//   name.textContent = nameField.value;
//   description.textContent = descriptionField.value;
//   closePopup(popupProfile);
// });

// //submit photo form popup

// popupPhoto.addEventListener('submit', function (event) {
//   event.preventDefault();
//   container.prepend(createCards(photo.value, place.value, cardSelector, handleCardClick));
//   closePopup(popupPhoto);
// });

//
