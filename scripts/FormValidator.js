
export class FormValidator {
    constructor(config, formElement) {
        this._form = config.formSelector;
        this._fieldSelector = config.fieldSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._fieldInvalidClass = config.fieldInvalidClass;
        this._buttonInvalidClass = config.buttonInvalidClass;
        this._element = formElement;
    }

    _showError(field) {
        const error = this._element.querySelector(`#${field.id}-error`)
        error.textContent = field.validationMessage;
        field.classList.add(this._fieldInvalidClass);
    }

    _hideError(field) {
        const error = this._element.querySelector(`#${field.id}-error`);
        error.textContent = '';
        field.classList.remove(this._fieldInvalidClass);
    }

    _saveButtonHandler() {
        if (!this._getValidityInvalid()) {
            this._saveButton.classList.remove(this._buttonInvalidClass);
            this._saveButton.disabled = false;
        } else {
            this._saveButton.classList.add(this._buttonInvalidClass);
            this._saveButton.disabled = true;
        }
    }

    _checkValidity(field) {
        if (!field.validity.valid) {
            this._showError(field);
        } else {
            this._hideError(field);
        }
    }

    _getValidityInvalid() {
        return this._fieldsList.some((field) => {
            return !field.validity.valid;
        })
    }

    _setEventListeners() {
        this._fieldsList = Array.from(this._element.querySelectorAll(this._fieldSelector));
        this._saveButton = this._element.querySelector(this._submitButtonSelector);

        this._fieldsList.forEach((field) => {
            field.addEventListener('input', () => {
                this._checkValidity(field);
                this._saveButtonHandler();
            })
        })
    }

    enableValidation() {
        this._element.addEventListener('submit', (event) => {
            event.preventDefault();
          })
        this._setEventListeners();
    }
}



// EXAMPLE DONT USE AND DELETE FOR F'S SAKE!!!!!
/*
  Разбор проектных работ спринтов 4 - 9
  Внимание! Часть функционала проекта удалена
  Полное копирование кода этого проекта приравнивается к плагиату!
*/
// class FormValidator {
//     constructor(config, popupSelector) {
//       this._inputSelector = config.inputSelector;
//       this._submitButtonSelector = config.submitButtonSelector;
//       this._inactiveButtonClass = config.inactiveButtonClass;
//       this._inputErrorClass = config.inputErrorClass;
//       this._errorClass = config.errorClass;

//       this._element = document.querySelector(`.${popupSelector}`);
//     }

//     _checkInputValidity(inputElement) {
//       if (!inputElement.validity.valid) {
//         this._showInputError(inputElement, inputElement.validationMessage);
//       } else {
//         this._hideInputError(inputElement);
//       }
//     }

//     _showInputError(inputElement, errorMessage) {
//       /* Код удален */
//     }

//     _hideInputError(inputElement) {
//       /* Код удален */
//     }

//     _toggleButtonState() {
//       if (this._getInvalidInput()) {
//         this._buttonElement.classList.add(this._inactiveButtonClass);
//         this._buttonElement.disabled = true;
//       } else {
//         this._buttonElement.classList.remove(this._inactiveButtonClass);
//         this._buttonElement.disabled = false;
//       }
//     }

//     _getInvalidInput() {
//       return this._inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//       });
//     }

//     _setEventListeners() {
//       this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
//       this._buttonElement = this._element.querySelector(this._submitButtonSelector);

//       this._inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', () => {
//           this._checkInputValidity(inputElement);
//           this._toggleButtonState();
//         });
//       });
//     }

//     enableValidation() {
//       this._setEventListeners();
//     }
//   }

//   export default FormValidator;
