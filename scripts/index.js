const popupProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonProfile = document.querySelector('.popup__close-button');
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
const closeFullScreenButton = popupFullPhoto.querySelector('.popup__close-button-full-photo');
const photo = document.querySelector('.popup__field_type_photo');
const place = document.querySelector('.popup__field_type_place');

//show popup functions and buttons
function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closeAllPopups);
}

editButton.addEventListener('click', function () {
  showPopup(popupProfile);
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
});

addButton.addEventListener('click', function () {
  showPopup(popupPhoto);
});

//close popup function and buttons
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closeAllPopups);
  if (!popup.classList.contains('popup_full-photo')) {
    popup.querySelector('.popup__content').reset();
  }
}

closeButtonProfile.addEventListener('click', function () {
  closePopup(popupProfile);
  hideError(popupProfile, nameField, document);
  hideError(popupProfile, descriptionField, document);
});

closeButtonPhoto.addEventListener('click', function () {
  closePopup(popupPhoto);
  hideError(popupPhoto, photo, document);
  hideError(popupPhoto, place, document);
});

closeFullScreenButton.addEventListener('click', function () {
  closePopup(popupFullPhoto);
});


//close popup by clicking on overlay
function closeAllPopups(event) {
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

function submitForm(event) {
  event.preventDefault();
  name.textContent = nameField.value;
  description.textContent = descriptionField.value;
  closePopup(popupProfile);
}
popup.addEventListener('submit', submitForm);


//delete Button
function deleteButton(event) {
  event.target.closest('.element').remove()
}

//like button
function likeButton(event) {
  event.target.classList.toggle('element__like-button_active');
}

// creat card element

function createElement(card) {
  const elementTemplate = document.querySelector('.element-template').content.cloneNode(true);
  const elementPhoto = elementTemplate.querySelector('.element__photo');
  const elementName = elementTemplate.querySelector('.element__name');
  const deleteBtn = elementTemplate.querySelector('.element__delete-button');
  const likeBtn = elementTemplate.querySelector('.element__like-button');

  elementName.textContent = card.name;
  elementPhoto.src = card.link;
  deleteBtn.addEventListener('click', deleteButton);
  likeBtn.addEventListener('click', likeButton);
  elementPhoto.addEventListener('click', function (event) {
    showPopup(popupFullPhoto);
    popupFullPhoto.querySelector('.full-photo__image').src = event.target.closest('.element__photo').src;
    popupFullPhoto.querySelector('.full-photo__place').textContent = event.target.closest('.element').textContent;
  });

  return elementTemplate;
}

// add card element

function addElement(card) {
  const newElement = createElement(card);
  elements.prepend(newElement);
}

//submit photo form popup

popupPhoto.addEventListener('submit', function (event) {
  event.preventDefault();
  addElement({ name: place.value, link: photo.value });
  closePopup(popupPhoto);
});

// add initial cards

initialElements.forEach((card) => {
  const addedCard = createElement(card);
  elements.append(addedCard);
})






