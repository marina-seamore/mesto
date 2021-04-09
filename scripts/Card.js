export class Card {

    constructor(image, text, container) {
        this._image = image;
        this._text = text;
        this._isLiked = false;
        this.createCard(container);
    }

    _likeHandler = () => {
        this._isLiked = !this._isLiked
        if (this._isLiked) {
            this._card.querySelector('.element__like-button').classList.add('element__like-button_active');
        } else {
            this._card.querySelector('.element__like-button').classList.remove('element__like-button_active');
        }
    }

    _remove = () => {
        this._card.remove();
    }

    _openPopup = () => {
        this._card.classList.add('popup_opened');
    }

    _closePopup = () => {
        this._card.classList.remove('popup_opened');
    }

    _closePopupHandler = () => {
        document.querySelector('.popup').addEventListener('click', this._closePopup);
        this._card.querySelector('.popup__close-button-full-photo').addEventListener('click', this._closePopup);
    }

    _setEventListeners = () => {
        this._card.querySelector('.element__delete-button').addEventListener('click', this._remove);
        this._card.querySelector('.element__like-button').addEventListener('click', this._likeHandler);
        this._card.querySelector('.element__photo').addEventListener('click', this._fullScreenHandler);
    }

    static template = document.querySelector('.element-template').content;

    createCard = (container) => {
        this._card = Card.template.cloneNode(true).children[0];
        this._card.querySelector('.element__photo').src = this._image;
        this._card.querySelector('.element__name').textContent = this._text;
        this._setEventListeners();
        container.prepend(this._card);
    }
}
