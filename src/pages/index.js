import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import initialElements from '../utils/initialElements.js'

const container = document.querySelector('.elements');
const nameField = document.querySelector('.popup__field_type_name');
const descriptionField = document.querySelector('.popup__field_type_description');
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

const profileConfig = {
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  elementTemplate: '.element-template'
}

const popupConfig = {
  fullPhotoPopup: '.popup_full-photo',
  addPhotoPopup: '.popup_photo',
  profilePopup: '.popup_profile'
}

const editForm = document.querySelector(popupConfig.profilePopup);
const addCardForm = document.querySelector(popupConfig.addPhotoPopup);
const userInfo = new UserInfo({
  profileName: profileConfig.profileName,
  profileDescription: profileConfig.profileDescription
});

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();


const fullScreenPopup = new PopupWithImage(popupConfig.fullPhotoPopup);
fullScreenPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: popupConfig.addPhotoPopup,
  submit: () => {
    cardList.prependItem(createCards(photo.value, place.value, profileConfig.elementTemplate))
    addCardPopup.close();
  }
});
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardFormValidator.resetValidation();
})



const editProfilePopup = new PopupWithForm({
  popupSelector: popupConfig.profilePopup,
  submit: () => {
    userInfo.setUserInfo(nameField.value, descriptionField.value);
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  nameField.value = userInfo.getUserInfo().userName;
  descriptionField.value = userInfo.getUserInfo().userDescription;
  editProfilePopup.open();
  editFormValidator.resetValidation();
})



function createCards(link, name, cardSelector) {
  const card = new Card(link, name, cardSelector,
    {
      handleCardClick: () => {
        fullScreenPopup.open(link, name)
      }
    });

  return card.createCard();
}

const cardList = new Section({
  items: initialElements,
  renderer: (item) => {
    cardList.appendItem(createCards(item.link, item.name, profileConfig.elementTemplate))
  }
}, '.elements'
)
cardList.renderItems();