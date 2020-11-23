let popupProfile = document.querySelector('.popup_profile');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup__content');
let nameField = document.querySelector('.popup__field_type_name');
let descriptionField = document.querySelector('.popup__field_type_description');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

let elements = document.querySelector('.elements');
let addButton = document.querySelector('.profile__add-button');
let popupPhoto = document.querySelector('.popup_photo');
let closeButtonPhoto = document.querySelector('.popup__close-button-form');

let popupFullPhoto = document.querySelector('.popup_full-photo');

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

//popup for Cards: (open, close, submit = add (beginning), delete, like ) 

function formPhoto() {
  addButton.addEventListener('click', function () {
    popupPhoto.classList.add('popup_opened');
  })

  closeButtonPhoto.addEventListener('click', function () {
    popupPhoto.classList.remove('popup_opened');
  })

  popupPhoto.addEventListener('submit', function (card) {
    card.preventDefault();
    let elementTemplate = document.querySelector('.element-template').content.cloneNode(true);
    let photo = document.querySelector('.popup__field_type_photo');
    let place = document.querySelector('.popup__field_type_place');
    let photoEl = elementTemplate.querySelector('.element__photo');
    let placeEl = elementTemplate.querySelector('.element__name');
    photoEl.src = photo.value;
    placeEl.textContent = place.value;

    elementTemplate.querySelector('.element__delete-button').addEventListener('click', event => {
      let element = event.target.closest('.element')
      if (element) {
        element.remove()
      }
    })

    elementTemplate.querySelector('.element__like-button').addEventListener('click', event => {
      event.target.classList.toggle('element__like-button_active');
    })
    popupPhoto.classList.remove('popup_opened');

    elements.prepend(elementTemplate);

    //open kinda FullScreen mode
    photoEl.addEventListener('click', event => {

      popupFullPhoto.querySelector('.full-photo__image').src = photoEl.src
      popupFullPhoto.querySelector('.full-photo__place').textContent = placeEl.textContent

      popupFullPhoto.classList.add('popup_opened');

      popupFullPhoto.querySelector('.popup__close-button-full-photo').addEventListener('click', function () {
        popupFullPhoto.classList.remove('popup_opened');
      })
    })

  });

}
formPhoto();

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
  let place = elementTemplate.querySelector('.element__name');
  let photo = elementTemplate.querySelector('.element__photo');
  place.textContent = card.name;
  photo.src = card.link;

  // elementTemplate.querySelector('.element__name').textContent = card.name;
  // elementTemplate.querySelector('.element__photo').src = card.link;

  elementTemplate.querySelector('.element__delete-button').addEventListener('click', event => {
    let element = event.target.closest('.element')
    if (element) {
      element.remove()
    }
  })

  elementTemplate.querySelector('.element__like-button').addEventListener('click', event => {
    event.target.classList.toggle('element__like-button_active');
  })

  elements.append(elementTemplate);

  //open kinda FullScreen mode
  photo.addEventListener('click', event => {

    popupFullPhoto.querySelector('.full-photo__image').src = photo.src
    popupFullPhoto.querySelector('.full-photo__place').textContent = place.textContent

    popupFullPhoto.classList.add('popup_opened');

    popupFullPhoto.querySelector('.popup__close-button-full-photo').addEventListener('click', function () {
      popupFullPhoto.classList.remove('popup_opened');
    })
  })

}

initialElements.forEach((card) => {
  addElement(card);
})