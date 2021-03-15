import { ESCAPE } from "../utils/utils";

export class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(event) {
    if (event.key === ESCAPE) {
      this.close();
      console.log("привет");
    }
  }
  setEventListeners() {
    this._element.querySelector(".popup__close").addEventListener('click', () => {
      this.close();
    });
    this._element.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
};
