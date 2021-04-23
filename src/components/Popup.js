export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._closeButton.removeEventListener('click', this.close);
        this._popup.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('click', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.close);
        this._popup.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('click', this._handleEscClose);
    }

}