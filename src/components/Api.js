export default class Api {
    constructor(config) {
        this._address = config.address;
        this._cohortId = config.cohortId;
        this._headers = config.headers;
    }


    returnResultStatus(res) {
        if (res.ok) {
            return res.json();
        } return Promise.reject(`Не получилось: ${res.status}${res.statusText}`);
    }

    getInitialCards() {
        return fetch(`${this._address}/${this._cohortId}/cards`, {
            headers: this._headers
        })
            .then(this.returnResultStatus)
    }

    getUserInfo() {
        return fetch(`${this._address}/${this._cohortId}/users/me`, {
            headers: this._headers
        })
            .then(this.returnResultStatus)
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._address}/${this._cohortId}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this.returnResultStatus)
    }

    setUserAvatar({ avatar }) {
        return fetch(`${this._address}/${this._cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this.returnResultStatus)
    }


    addCard({ name, link }) {
        return fetch(`${this._address}/${this._cohortId}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this.returnResultStatus)
    }

    deleteCard(cardId) {
        return fetch(`${this._address}/${this._cohortId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.returnResultStatus)
    }

    handleLike(cardId, like) {
        return fetch(`${this._address}/${this._cohortId}/cards/likes/${cardId}`, {
            method: like? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(this.returnResultStatus)
    }

    // addLike(cardId) {
    //     return fetch(`${this._address}/${this._cohortId}/cards/likes/${cardId}`, {
    //         method: 'PUT',
    //         headers: this._headers
    //     })
    //         .then(this.returnResultStatus)
    // }

    // removeLike(cardId) {
    //     return fetch(`${this._address}/${this._cohortId}/cards/likes/${cardId}`, {
    //         method: 'DELETE',
    //         headers: this._headers
    //     })
    //         .then(this.returnResultStatus)
    // }
}