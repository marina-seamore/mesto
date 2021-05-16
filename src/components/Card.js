export default class Card {

    constructor(cardSelector, { data, handleCardClick, handleDeleteSubmit, handleAddLike, handleRemoveLike, currentUserId }) {
        this._image = data.link;
        this._text = data.name;
        this._isLiked = false;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this.removeCard = this.removeCard.bind(this);
        this._likes = data.likes;
        this._handleDeleteSubmit = handleDeleteSubmit;
        this._cardId = data._id;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._currentUserId = currentUserId;
        this._ownerId = data.owner._id;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardTemplate;
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }

    _setEventListeners() {
        this._deleteBtn = this._card.querySelector('.element__delete-button');
        this._deleteBtn.addEventListener('click', (event) => {
            this._handleDeleteSubmit(this._cardId, event.target)
        });
        if (this._currentUserId !== this._ownerId) {
            this._deleteBtn.remove()
        }
        this._card.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick(this._text, this._image)
        });
        this._likeBtn = this._card.querySelector('.element__likes_button')
        this._likeBtn.addEventListener('click', () => {
            if(this._isLiked) {
                this._handleRemoveLike(this._cardId)
            } else {
                this._handleAddLike(this._cardId)
            }
        })
    }

    createCard() {
        this._card = this._getTemplate();

        this._cardPhoto = this._card.querySelector('.element__photo');
        this._cardPhoto.src = this._image;
        this._cardPhoto.alt = this._text

        this._card.querySelector('.element__name').textContent = this._text;

        this._likesCounter = this._card.querySelector('.element__likes_counter')
        this._likesCounter.textContent = this._likes.length;
        
        this._likes.forEach(element => {
            if(element._id === this._currentUserId) {
                this._card.querySelector('.element__likes_button').classList.add('element__likes_button_active');
                this._isLiked = true
            }
        });

        this._setEventListeners();

        return this._card;
    }
}