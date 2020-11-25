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
const elementTemplate = document.querySelector('.element-template').content.cloneNode(true);
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

// //popup for Cards: (open, close, submit = add (beginning), delete, like ) 



//open popup
addButton.addEventListener('click', function () {
  popupPhoto.classList.add('popup_opened');
})

//close popup
closeButtonPhoto.addEventListener('click', function () {
  popupPhoto.classList.remove('popup_opened');
})

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

function addElementNew(card) {
  let elementTemplate = document.querySelector('.element-template').content.cloneNode(true);
  elementTemplate.querySelector('.element__name').textContent = place.value;
  elementTemplate.querySelector('.element__photo').src = photo.value;

  elementTemplate.querySelector('.element__delete-button').addEventListener('click', deleteButton);

  elementTemplate.querySelector('.element__like-button').addEventListener('click',likeButton);

  elementTemplate.querySelector('.element__photo').addEventListener('click', FullScreen);

  return elementTemplate;
}

//submit function

  popupPhoto.addEventListener('submit', function (card) {
    card.preventDefault();
    
    const addedCard = addElementNew(card)

    popupPhoto.classList.remove('popup_opened');

    elements.prepend(addedCard);
  });

  
  // FullScreen mode
  function FullScreen(event) {
    popupFullPhoto.querySelector('.full-photo__image').src = event.target.closest('.element__photo').src
    popupFullPhoto.querySelector('.full-photo__place').textContent = event.target.closest('.element').textContent

    popupFullPhoto.classList.add('popup_opened');

    popupFullPhoto.querySelector('.popup__close-button-full-photo').addEventListener('click', function () {
      popupFullPhoto.classList.remove('popup_opened');
    })
  }


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

  elementTemplate.querySelector('.element__like-button').addEventListener('click',likeButton);

  elementTemplate.querySelector('.element__photo').addEventListener('click', FullScreen);

  return elementTemplate;

}

initialElements.forEach((card) => {
  const addedCard = addElement(card);
  elements.append(addedCard);
})