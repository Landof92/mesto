export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
  }
  getUserInfo() {
    const name = this.nameElement.textContent.trim();
    const job = this.jobElement.textContent.trim();
    return { name, job };
  }
  setUserInfo({ name, job }) {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }
};
