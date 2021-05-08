export default class UserInfo {
    constructor({profileName, profileDescription, profileAvatar}) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            userName: this._profileName.textContent,
            userDescription: this._profileDescription.textContent,
            userAvatar: this._profileAvatar.src
        }
    }

    setUserInfo(userName, userDescription, userAvatar) {
        this._profileName.textContent = userName;
        this._profileDescription.textContent = userDescription;
        this._profileAvatar.src = userAvatar;
    }

}