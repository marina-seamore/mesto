export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        // this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('click', this._handleClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleClose(event) {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

}