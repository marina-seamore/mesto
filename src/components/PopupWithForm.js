import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__content');
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submit);
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__field');
        this._formValues = {};
        this._inputList.forEach((field) => {
            this._formValues[field.name] = field.value;
        })
        return this._formValues;
    }

}