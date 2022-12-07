export default class UserInfo {
  constructor({nameProfile, jobProfile}) {
    this._name = nameProfile;
    this._job = jobProfile;  
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}