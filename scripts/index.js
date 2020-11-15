let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__content');
let nameField = document.querySelector('.popup__field_name');
let descriptionField = document.querySelector('.popup__field_description');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');


function showPopup() {
  popup.classList.add('popup_opened');
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
}
editButton.addEventListener('click', showPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}
popupClose.addEventListener('click', closePopup);

function submitForm(event) {
  event.preventDefault();
  name.textContent = nameField.value;
  description.textContent = descriptionField.value;
  closePopup();
}
form.addEventListener('submit', submitForm);