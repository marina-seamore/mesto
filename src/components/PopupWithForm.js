import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submit }) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__content');
        this._confirmBtnTextOriginal = this._form.querySelector('.popup__submit-button').textContent;
    }

    close() {
        super.close();
        this._form.reset();
        this.isLoading(false);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(this._getInputValues());
        });
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__field');
        this._formValues = {};
        this._inputList.forEach((field) => {
            this._formValues[field.name] = field.value;
        })
        return this._formValues;
    }

    isLoading(loading) {
        const confirmBtn = this._form.querySelector('.popup__submit-button')
        if (loading) {
            confirmBtn.textContent = 'Сохранение...'
        } else {
            confirmBtn.textContent = this._confirmBtnTextOriginal
        }
    }

}