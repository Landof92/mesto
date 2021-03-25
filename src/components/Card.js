export class Card {
  constructor(item, templateSelector, handleCardClick, handleDeleteClick, getUserId, setLike) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this.id = item._id;
    this._ownerId = item.owner._id;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._setLike = setLike;
    this._getUserId = getUserId;

  }

  _getTemplate() {
    const templateCard = document.querySelector(this._selector).content.querySelector(".card").cloneNode(true);
    return templateCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeCounter = this._element.querySelector(".card__like-counter");
    if (this._isLiked()) {
      this._element.querySelector(".card__like").classList.add("card__like_active")
    }

    if (this._getUserId() !== this._ownerId) {
      this._element.querySelector(".card__delete").classList.add("card__delete_inactive");
    }
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;
    const cardImage = this._element.querySelector(".card__image");
    this._likeCounter.textContent = this._likes.length;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    return this._element;
  }
  _isLiked() {
    return this._likes.find((user) => this._getUserId() === user._id)
  }
  _toggleLike() {
    this._setLike(this.id, this._isLiked())
      .then((res) => {
        this._likeCounter.textContent = res.likes.length;
        this._likes = res.likes;
        this._element.querySelector(".card__like").classList.toggle("card__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like").addEventListener('click', () => {
      this._toggleLike()
    });
    this._element.querySelector(".card__delete").addEventListener('click', () => {
      this._handleDeleteClick(this.id, this.deleteCard.bind(this));
    });
    this._element.querySelector(".card__image").addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
}



