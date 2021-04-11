export class Card {

    constructor(image, text, cardSelector, handleCardClick) {
        this._image = image;
        this._text = text;
        this._isLiked = false;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardTemplate;
    }

    _likeHandler = () => {
        this._card.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _remove = () => {
        this._card.remove();
    }

    _setEventListeners = () => {
        this._card.querySelector('.element__delete-button').addEventListener('click', this._remove);
        this._card.querySelector('.element__like-button').addEventListener('click', this._likeHandler);
        this._card.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick(this._text, this._image)
        });
    }

    createCard = () => {
        this._card = this._getTemplate();
        this._card.querySelector('.element__photo').src = this._image;
        this._card.querySelector('.element__photo').alt = this._text
        this._card.querySelector('.element__name').textContent = this._text;
        this._setEventListeners();
        return this._card;
    }
}