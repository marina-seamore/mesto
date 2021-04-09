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

    _openPopupFullScreen = (event) => {
        const popupFullPhoto = document.querySelector('.popup_full-photo');
        popupFullPhoto.querySelector('.full-photo__image').src = event.target.closest('.element__photo').src;
        popupFullPhoto.querySelector('.full-photo__place').textContent = event.target.closest('.element').textContent;
        popupFullPhoto.classList.add('popup_opened');
    }

    _closePopupFullScreen = () => {
        const popupFullPhoto = document.querySelector('.popup_full-photo');
        popupFullPhoto.classList.remove('popup_opened');
    }

    _closeFullScreenPopupOverlay = (event) => {
        if (event.target.classList.contains('popup')) {
            this._closePopupFullScreen();
        }
      }
            
      _closeFullScreenPopupEsc = (event) => {
        if (event.key === 'Escape') {
            this._closePopupFullScreen();
        }
      }

    _setEventListeners = () => {
        this._card.querySelector('.element__delete-button').addEventListener('click', this._remove);
        this._card.querySelector('.element__like-button').addEventListener('click', this._likeHandler);
        this._card.querySelector('.element__photo').addEventListener('click', this._openPopupFullScreen);        
        document.querySelector('.popup__close-button-full-photo').addEventListener('click', this._closePopupFullScreen);
        document.addEventListener('click', this._closeFullScreenPopupOverlay);
        document.addEventListener('keydown', this._closeFullScreenPopupEsc)
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