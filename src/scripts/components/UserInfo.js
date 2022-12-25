export default class UserInfo {
  constructor({nameProfile, jobProfile, avatarSelector}) {
    this._name = nameProfile;
    this._job = jobProfile;
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar(avatar) {
    this._avatar.style.backgroundImage = `url(${avatar})` ;
  }
}