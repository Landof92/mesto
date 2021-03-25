export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
    this.avatarElement = document.querySelector(avatarSelector);
    this._info = {};
  }
  getUserInfo() {
    const name = this._info.name
    const job = this._info.about
    return { name, job };
  }
  getUserId() {
    return this._info._id;
  }
  setAvatar(avatar) {
    this.avatarElement.src = avatar;
    this._info.avatar = avatar;
  }
  setUserInfo({ name, about, _id, avatar }) {
    this.nameElement.textContent = name;
    this.jobElement.textContent = about;
    this._info = { name, about, _id, avatar };
    this.setAvatar(avatar);
  }
};
