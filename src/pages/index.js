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

const editForm = document.querySelector('.popup_profile');
const addCardForm = document.querySelector('.popup_photo');
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileDescription: '.profile__description'
});

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();


const fullScreenPopup = new PopupWithImage('.popup_full-photo');
fullScreenPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_photo',
  submit: () => {
    container.prepend(createCards(photo.value, place.value, '.element-template'))
    addCardPopup.close();
  }
});

addButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardPopup.setEventListeners();
})



const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_profile',
  submit: (event) => {
    event.preventDefault();
    userInfo.setUserInfo(nameField.value, descriptionField.value);
    editProfilePopup.close();
  }
});

editButton.addEventListener('click', () => {
  nameField.value = userInfo.getUserInfo().userName;
  descriptionField.value = userInfo.getUserInfo().userDescription;
  editProfilePopup.open();
})



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

const cardList = new Section({
  items: initialElements,
  renderer: (item) => {
    cardList.addItem(createCards(item.link, item.name, '.element-template'))
  }
}, '.elements'
)
cardList.renderItems();