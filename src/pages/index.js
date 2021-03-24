import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { Api } from '../components/Api.js';

const cards = ".cards";
const editButton = document.querySelector(".profile__edit");
const editFormElement = document.querySelector(".popup_type_edit .popup__form");
const addButton = document.querySelector(".profile__add");
const updateButton = document.querySelector(".profile__image");
const addFormElement = document.querySelector(".popup_type_add .popup__form");
const updateFormElement = document.querySelector(".popup_type_update .popup__form");

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_active'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'cf5cafc2-bffd-4895-b1e1-1cdead423512',
    'Content-Type': 'application/json'
  }
});

const editFormValidator = new FormValidator(settings, editFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addFormElement);
addFormValidator.enableValidation();

const updateFormValidator = new FormValidator(settings, updateFormElement);
updateFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const handleCardClick = popupWithImage.open.bind(popupWithImage);

const userInfo = new UserInfo({ nameSelector: ".profile__title", jobSelector: ".profile__subtitle", avatarSelector: ".profile__foto" });

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res)
  })
  .catch((err) => {
    console.log(err);
  });

const handleDeleteCard = (card) => {
  const confirmPopup = new PopupWithForm(".popup_type_confirm", () => {
    api.deleteCard(card.id)
      .then(() => {
        card.deleteCard();
        confirmPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }, {})
  confirmPopup.setEventListeners();
  confirmPopup.open();
};

const addCard = (item) => {
  const card = new Card(item, ".template-card", handleCardClick, handleDeleteCard, userInfo.getUserId.bind(userInfo), api.setLike.bind(api));

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

const createCard = ({ name, link }) => {
  addPopup.setLoading(true)
  api.createCard(name, link)
    .then((res) => {
      addCard(res)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPopup.setLoading(false);
      addPopup.close()
    });
};

const editAvatar = (img) => {
  document.querySelector(".profile__foto").src = img;
};

const addPopup = new PopupWithForm(".popup_type_add", createCard, {}, addFormValidator.toggleButtonState.bind(addFormValidator));
addPopup.setEventListeners();

const setUserInfo = ({ name, job }) => {
  editPopup.setLoading(true)
  api.setUserInfo(name, job)
    .then((res) => {
      userInfo.setUserInfo(res)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.setLoading(false);
      editPopup.close();
    });
};
const setAvatar = ({ img }) => {
  updatePopup.setLoading(true)
  api.setAvatar(img)
    .then((res) => {
      editAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updatePopup.setLoading(false);
      updatePopup.close();
    });
};

const editPopup = new PopupWithForm(".popup_type_edit", setUserInfo, userInfo.getUserInfo.bind(userInfo));
editPopup.setEventListeners();

const updatePopup = new PopupWithForm(".popup_type_update", setAvatar, {}, updateFormValidator.toggleButtonState.bind(updateFormValidator));
updatePopup.setEventListeners();

const cardList = new Section(
  {
    renderer: addCard,
  },
  cards
);

api.getInitialCards()
  .then((res) => {
    cardList.renderItems(res.reverse())
  }).catch((err) => {
    console.log(err);
  });

editButton.addEventListener('click', () => editPopup.open());

addButton.addEventListener('click', () => addPopup.open());

updateButton.addEventListener('click', () => updatePopup.open());
