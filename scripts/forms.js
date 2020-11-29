
//form=popup

function showError(form, field, config) {
  const error = form.querySelector(`#${field.id}-error`);
  error.textContent = field.validationMessage;
  field.classList.add(config.fieldInvalidClass);
}

function hideError(form, field, config) {
  const error = form.querySelector(`#${field.id}-error`);
  error.textContent = '';
  field.classList.remove(config.fieldInvalidClass);
}

function saveButtonDisabled(button, config) {
  button.classList.add(config.buttonInvalidClass)
  button.disabled = true;
}

function checkValidity(form, field, config) {
  if (!field.validity.valid) {
    showError(form, field, config);
  } else {
    hideError(form, field, config);
  }
}

function saveButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.buttonInvalidClass)
    button.disabled = false;
  } else {
    saveButtonDisabled(button, config)
  }
}

function setEventListeners(form, config) {
  const fieldsList = form.querySelectorAll(config.fieldSelector);
  const saveButton = form.querySelector(config.submitButtonSelector);

  fieldsList.forEach((field) => {
    field.addEventListener('input', () => {
      checkValidity(form, field, config);
      saveButtonState(saveButton, form.checkValidity(), config)
    })
  })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const saveButton = form.querySelector(config.submitButtonSelector);
      saveButtonDisabled(saveButton, config)
    });
  });
}

////
const validationConfig = {
  formSelector: '.popup__content',
  fieldSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  fieldInvalidClass: 'popup__field_invalid',
  buttonInvalidClass: 'popup__submit-button_inactive',
};

enableValidation(validationConfig);
