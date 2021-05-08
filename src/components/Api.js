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

}