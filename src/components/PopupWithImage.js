import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullScreenImg = this._popup.querySelector('.full-photo__image');
        this._fullScreenPlace = this._popup.querySelector('.full-photo__place');
    }

    open(image, place) {
        super.open();
        this._fullScreenImg.src = image;
        this._fullScreenPlace.textContent = place;
        this._fullScreenImg.alt = place
    }

}