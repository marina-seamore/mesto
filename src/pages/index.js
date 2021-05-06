import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import initialElements from '../utils/initialElements.js';
import Api from '../components/Api.js';
import { validationConfig, profileConfig, popupConfig, apiConfig } from '../utils/constants.js'

const nameField = document.querySelector('.popup__field_type_name');
const descriptionField = document.querySelector('.popup__field_type_description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupPhoto = document.querySelector('.popup_photo');
const photo = popupPhoto.querySelector('.popup__field_type_photo');
const place = popupPhoto.querySelector('.popup__field_type_place');
const avatarButton = document.querySelector('.profile__avatar_type_button')

const api = new Api(apiConfig);
const editForm = document.querySelector(popupConfig.profilePopup);
const addCardForm = document.querySelector(popupConfig.addPhotoPopup);
const editProfileAvatarForm = document.querySelector(popupConfig.editProfileAvatarPopup);

const userInfo = new UserInfo({
  profileName: profileConfig.profileName,
  profileDescription: profileConfig.profileDescription
});

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

const editProfileAvatarFormValidator = new FormValidator(validationConfig, editProfileAvatarForm);
editProfileAvatarFormValidator.enableValidation();

const fullScreenPopup = new PopupWithImage(popupConfig.fullPhotoPopup);
fullScreenPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: popupConfig.addPhotoPopup,
  submit: () => {

    cardList.addItemPrepend(createCards(photo.value, place.value, profileConfig.elementTemplate))
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

const editProfileAvatarPopup = new PopupWithForm({
  popupSelector: popupConfig.editProfileAvatarPopup,
  submit: () => {
    editProfileAvatarPopup.close()
  }
})
editProfileAvatarPopup.setEventListeners();

avatarButton.addEventListener('click', () => {
  editProfileAvatarPopup.open()
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

// const cardList = new Section({
//   items: initialElements,
//   renderer: (item) => {
//     cardList.addItem(createCards(item.link, item.name, profileConfig.elementTemplate))
//   }
// }, '.elements'
// )
// cardList.renderItems();

Promise.all([api.getInitialCards()])
  .then((data) => {
    console.log(data)
  })