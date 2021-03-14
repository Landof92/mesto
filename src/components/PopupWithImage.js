import { Popup } from "./Popup";

export class PopupWithImage extends Popup {

  open(name, link) {
    super.open();
    this._element.querySelector(".popup__title").textContent = name;
    const popupImage = this._element.querySelector(".popup__image");
    popupImage.src = link;
    popupImage.alt = name;
  }
};
