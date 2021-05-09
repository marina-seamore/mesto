export default class Card {

    constructor(cardSelector, {data, handleCardClick, handleDeleteSubmit}) {
        this._image = data.link;
        this._text = data.name;
        this._isLiked = false;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likeHandler = this._likeHandler.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this._likes = data.likes;
        this._handleDeleteSubmit = handleDeleteSubmit;
        this._cardId = data.id;
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

    removeCard() {
        this._card.remove();
    }


    _setEventListeners () {
        this._deleteBtn = this._card.querySelector('.element__delete-button');
        this._deleteBtn.addEventListener('click', (event) => {
            this._handleDeleteSubmit(this.cardId, event.target)
        });
        // this._card.querySelector('.element__likes_button').addEventListener('click', this._likeHandler);
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