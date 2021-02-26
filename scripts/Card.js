import { openPopup } from './index.js';

export class Card {
  constructor (item, templateSelector) {
    this.name  = item.name;
    this.link = item.link;
    this.selector = templateSelector;
  }

  _getTemplate() {
    const templateCard = document.querySelector(this.selector).content.querySelector(".card").cloneNode(true);
    return templateCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this.name;
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this.link;
    cardImage.alt = this.name;
    return this._element;
  }

  _toggleLike() {
   this._element.querySelector(".card__like").classList.toggle("card__like_active");
  }

  _deleteCard() {
    this._element.remove();
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
    const imagePopup =  document.querySelector(".popup_type_image");
    openPopup(imagePopup);
    imagePopup.querySelector(".popup__title").textContent = this.name;
    const popupImage = imagePopup.querySelector(".popup__image");
    popupImage.src =  this.link;
    popupImage.alt =  this.name;
  }
}



