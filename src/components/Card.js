import { openPopup } from './utils.js';

export class Card {
  constructor(item, templateSelector, imagePopup) {
    this._name = item.name;
    this._link = item.link;
    this._selector = templateSelector;
    this._imagePopup = imagePopup
  }

  _getTemplate() {
    const templateCard = document.querySelector(this._selector).content.querySelector(".card").cloneNode(true);
    return templateCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    return this._element;
  }

  _toggleLike() {
    this._element.querySelector(".card__like").classList.toggle("card__like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like").addEventListener('click', () => {
      this._toggleLike()
    });
    this._element.querySelector(".card__delete").addEventListener('click', () => {
      this._deleteCard()
    });
    this._element.querySelector(".card__image").addEventListener('click', () => {
      this._openImage()
    });
  }

  _openImage() {
    openPopup(this._imagePopup);
    this._imagePopup.querySelector(".popup__title").textContent = this._name;
    const popupImage = this._imagePopup.querySelector(".popup__image");
    popupImage.src = this._link;
    popupImage.alt = this._name;
  }
}


