
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

    resetValidation() {
        this._fieldsList = Array.from(this._element.querySelectorAll(this._fieldSelector));
        this._fieldsList.forEach((field) => {
            this._hideError(field);
            this._saveButtonHandler();
        })
    }
}