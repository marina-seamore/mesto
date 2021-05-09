import PopupWithForm from './PopupWithForm.js'
export default class PopupWithSubmit extends PopupWithForm {
    setSubmit(action) {
        this._submit = action
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleClose);
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit()
        })
    }
}