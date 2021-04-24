export default class UserInfo {
    constructor(profileName, profileDescription) {
        this._profileName = profileName;
        this._profileDescription = profileDescription;
    }

    getUserInfo() {
        return {
            userName: this._profileName.textContent,
            userDescription: this._profileDescription.textContent
        }
    }

    setUserInfo({userName, userDescription}) {
        if (userName) this._profileName.textContent = userName;
        if (userDescription) this._profileDescription.textContent = userDescription;
    }

}