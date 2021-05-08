export default class Card {

    constructor(image, text, cardSelector, {handleCardClick},{likes}) {
        this._image = image;
        this._text = text;
        this._isLiked = false;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likeHandler = this._likeHandler.bind(this);
        this._remove = this._remove.bind(this);
        this._likes = likes;
    }

    _getTemplate () {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardTemplate;
    }

    _likeHandler () {
        this._card.querySelector('.element__likes_button').classList.toggle('element__likes_button_active');
    }

    _remove () {
        this._card.remove();
    }

    _setEventListeners () {
        this._deleteBtn = this._card.querySelector('.element__delete-button');
        this._deleteBtn.addEventListener('click', this._remove);
        this._card.querySelector('.element__likes_button').addEventListener('click', this._likeHandler);
        this._card.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick(this._text, this._image)
        });
    }

    createCard () {
        this._card = this._getTemplate();
        this._cardPhoto = this._card.querySelector('.element__photo');
        this._cardPhoto.src = this._image;
        this._cardPhoto.alt = this._text
        this._card.querySelector('.element__name').textContent = this._text;
        this._card.querySelector('.element__likes_counter').textContent = this._likes.length
        this._setEventListeners();
        return this._card;
    }
}