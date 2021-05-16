import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { validationConfig, profileConfig, popupConfig, apiConfig } from '../utils/constants.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js';

const nameField = document.querySelector('.popup__field_type_name');
const descriptionField = document.querySelector('.popup__field_type_description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar_button')

const api = new Api(apiConfig);
const editForm = document.querySelector(popupConfig.profilePopup);
const addCardForm = document.querySelector(popupConfig.addPhotoPopup);
const editProfileAvatarForm = document.querySelector(popupConfig.editProfileAvatarPopup);

const userInfo = new UserInfo({
  profileName: profileConfig.profileName,
  profileDescription: profileConfig.profileDescription,
  profileAvatar: profileConfig.profileAvatar
});



const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

const editProfileAvatarFormValidator = new FormValidator(validationConfig, editProfileAvatarForm);
editProfileAvatarFormValidator.enableValidation();

const fullScreenPopup = new PopupWithImage(popupConfig.fullPhotoPopup);
fullScreenPopup.setEventListeners();

const cardsList = new Section({
  renderer: (item) => {
    cardsList.appendItem(createCards(profileConfig.elementTemplate, item))
  }
},
  '.elements')



const addCardPopup = new PopupWithForm({
  popupSelector: popupConfig.addPhotoPopup,
  submit: (info) => {
    addCardPopup.isLoading(true);
    api.addCard({
      name: info.place,
      link: info.imageLink
    })
      .then((data) => {
        cardsList.prependItem(createCards(profileConfig.elementTemplate, data));
        addCardPopup.close();
      })
      .catch((err) => console.log(`addCard ` + err))
  }
});
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardFormValidator.resetValidation();
})


const editProfilePopup = new PopupWithForm({
  popupSelector: popupConfig.profilePopup,
  submit: (info) => {
    editProfilePopup.isLoading(true);
    api.setUserInfo({
      name: info.name,
      about: info.description
    })
      .then((data) => {
        userInfo.setUserInfo({
          userName: data.name,
          userDescription: data.about,
        });
        editProfilePopup.close();
      })
      .catch((err) => console.log(`editProfile` + err))
  }
});
editProfilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  nameField.value = getUserInfo.userName;
  descriptionField.value = getUserInfo.userDescription;
  editProfilePopup.open();
  editFormValidator.resetValidation();
})



const editProfileAvatarPopup = new PopupWithForm({
  popupSelector: popupConfig.editProfileAvatarPopup,
  submit: (info) => {
    editProfileAvatarPopup.isLoading(true)
    api.setUserAvatar({
      avatar: info.imageLink
    })
      .then((data) => {
        userInfo.setUserInfo({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar
        });
        editProfileAvatarPopup.close()
      })
      .catch((err) => console.log(`editProfileAvatar` + err));
  }
})
editProfileAvatarPopup.setEventListeners();

avatarButton.addEventListener('click', () => {
  editProfileAvatarPopup.open()
  editProfileAvatarFormValidator.resetValidation();
})



const confirmDeletePopup = new PopupWithSubmit({
  popupSelector: popupConfig.confirmationPopup,
  submit: () => { }
})
confirmDeletePopup.setEventListeners();



function createCards(cardSelector, data) {
  const card = new Card(cardSelector,
    {
      data: data,
      handleCardClick: () => {
        fullScreenPopup.open(data.link, data.name);
      },
      handleDeleteSubmit: () => {
        confirmDeletePopup.setSubmit(() => {
          confirmDeletePopup.isLoading(true)
          api.deleteCard(data._id)
            .then(() => {
              card.removeCard()
              confirmDeletePopup.close()
            })
            .catch((err) => console.log(`handleDelete ` + err))
        })
        confirmDeletePopup.open()
      },
      handleAddLike: () => {
        api.addLike(data._id)
          .then(data => {
            card._isLiked = true;
            card._likesCounter.textContent = data.likes.length;
            card._likeBtn.classList.toggle('element__likes_button_active')
          })
          .catch((err) => console.log(`handleAddLike ` + err))
      },
      handleRemoveLike: () => {
        api.removeLike(data._id)
          .then(data => {
            card._isLiked = false;
            card._likesCounter.textContent = data.likes.length;
            card._likeBtn.classList.toggle('element__likes_button_active')
          })
          .catch((err) => console.log(`handleRemoveLike ` + err))
      },
      currentUserId: userID
    });

  return card.createCard();
}


const cardsData = api.getInitialCards();
const getUserData = api.getUserInfo();
let userID = null;

Promise.all([cardsData, getUserData])
  .then(([data, user]) => {
    userInfo.setUserInfo({
      userName: user.name,
      userDescription: user.about,
      userAvatar: user.avatar
    });
    userID = user._id;

    cardsList.renderItems(data);
  })
  .catch((err) => console.log(`Sorry couldn't keep the promises, blame the ` + err))