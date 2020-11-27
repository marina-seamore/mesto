const popupProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup__content');
const nameField = document.querySelector('.popup__field_type_name');
const descriptionField = document.querySelector('.popup__field_type_description');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const elements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const popupPhoto = document.querySelector('.popup_photo');
const closeButtonPhoto = document.querySelector('.popup__close-button-form');
const popupFullPhoto = document.querySelector('.popup_full-photo');


//popup for profile editing (open, close, submit = edit)

function showPopupProfile() {
  popupProfile.classList.add('popup_opened');
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
}
editButton.addEventListener('click', showPopupProfile);

function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopupProfile);

function submitForm(event) {
  event.preventDefault();
  name.textContent = nameField.value;
  description.textContent = descriptionField.value;
  closePopupProfile();
}
popup.addEventListener('submit', submitForm);

// //popup for Photos: (open, close, submit = add (beginning), delete, like ) 



//open popup
const photoPopupOpened = addButton.addEventListener('click', function () {
  popupPhoto.classList.add('popup_opened');
})

//close popup
function closePopupPhoto() {
  popupPhoto.classList.remove('popup_opened');
}
closeButtonPhoto.addEventListener('click', closePopupPhoto)

//delete Button
function deleteButton(event) {
  const element = event.target.closest('.element')
  if (element) {
    element.remove()
  }
}

//like button
function likeButton(event) {
  event.target.classList.toggle('element__like-button_active');
}

// add card element
const photo = document.querySelector('.popup__field_type_photo');
const place = document.querySelector('.popup__field_type_place');

function addElementNew() {
  let elementTemplate = document.querySelector('.element-template').content.cloneNode(true);
  elementTemplate.querySelector('.element__name').textContent = place.value;
  elementTemplate.querySelector('.element__photo').src = photo.value;

  elementTemplate.querySelector('.element__delete-button').addEventListener('click', deleteButton);

  elementTemplate.querySelector('.element__like-button').addEventListener('click', likeButton);

  elementTemplate.querySelector('.element__photo').addEventListener('click', FullScreen);

  return elementTemplate;
}

//submit function

popupPhoto.addEventListener('submit', function (event) {
  event.preventDefault();

  const addedCard = addElementNew(event)

  popupPhoto.classList.remove('popup_opened');

  elements.prepend(addedCard);
});


// FullScreen mode
function FullScreen(event) {
  popupFullPhoto.querySelector('.full-photo__image').src = event.target.closest('.element__photo').src
  popupFullPhoto.querySelector('.full-photo__place').textContent = event.target.closest('.element').textContent

  popupFullPhoto.classList.add('popup_opened');

  popupFullPhoto.querySelector('.popup__close-button-full-photo').addEventListener('click', closeFullScreen)
}

function closeFullScreen() {
  popupFullPhoto.classList.remove('popup_opened');
}


//close popup ANYWHERE


// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
// }

// function closeAllPopups(event) {
//   const popupOpened = event.target.querySelector('.popup_opened');
//   if(event.target.classList.contains('popup')){
//     closePopup(popupOpened)
//   }
// }

function closeAllPopups(event) {
  if (event.target.classList.contains('popup')) {
    closePopupProfile();
    closePopupPhoto();
    closeFullScreen();
  }
}

document.addEventListener('mouseup', closeAllPopups);

//close popup Escape

function closePopupEsc(event) {
  const popupOpened = event.target.querySelector('.popup_opened')
  if (event.key === 'Escape') {
    closePopupProfile();
    closePopupPhoto();
    closeFullScreen();
  }
}

document.addEventListener('keydown', closePopupEsc)

//FOOOOOORMS Validate!

//form=popup

function showError(form, field) {
  const error = form.querySelector(`#${field.id}-error`);
  error.textContent = field.validationMessage;
  field.classList.add('.popup__error');
}

function hideError(form, field) {
  const error = form.querySelector(`#${field.id}-error`);
  error.textContent = '';
  field.classList.remove('.popup__error');
}

function checkValidity(form, field) {
  if (!field.validity.valid) {
    showError(form, field);
  } else {
    hideError(form, field);
  }
}

function saveButtonState(button, isActive) {
  if (isActive) {
    button.classList.remove('popup__submit-button_inactive')
    button.disabled = false;
  } else {
    button.classList.add('popup__submit-button_inactive')
    button.disabled = true;
  }
}

function setEventListeners(form) {
  const fieldsList = form.querySelectorAll('.popup__field');
  const saveButton = form.querySelector('.popup__submit-button');

  fieldsList.forEach((field) => {
    field.addEventListener('input', () => {
      checkValidity(form, field);
      saveButtonState(saveButton, form.checkValidity())
    })
  })
}

function enableValidation() {
  const forms = document.querySelectorAll('.popup__content');
  forms.forEach((form) => {
    setEventListeners(form);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('please work')
    });
    const saveButton = form.querySelector('.popup__submit-button');
    saveButtonState(saveButton, form.checkValidity())
  });
}
enableValidation();


//initial set of cards

const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function addElement(card) {
  let elementTemplate = document.querySelector('.element-template').content.cloneNode(true);
  elementTemplate.querySelector('.element__name').textContent = card.name;
  elementTemplate.querySelector('.element__photo').src = card.link;

  elementTemplate.querySelector('.element__delete-button').addEventListener('click', deleteButton);

  elementTemplate.querySelector('.element__like-button').addEventListener('click', likeButton);

  elementTemplate.querySelector('.element__photo').addEventListener('click', FullScreen);

  return elementTemplate;

}

initialElements.forEach((card) => {
  const addedCard = addElement(card);
  elements.append(addedCard);
})