import { ESCAPE } from "./utils";

export class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._element = document.querySelector(popupSelector);
  }
  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  close() {
    this._element.classList.remove("popup_opened");
  }
  _handleEscClose(event) {
    if (event.key === ESCAPE) {
      this.close();
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
