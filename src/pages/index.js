import './index.css';
import { Card } from '../components/Card.js';
import { initialCards } from '../components/initial-сards.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';

const cards = ".cards";

const editButton = document.querySelector(".profile__edit");

const editFormElement = document.querySelector(".popup_type_edit .popup__form");

const addButton = document.querySelector(".profile__add");

const addFormElement = document.querySelector(".popup_type_add .popup__form");

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_active'
};

const editFormValidator = new FormValidator(settings, editFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addFormElement);
addFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const handleCardClick = popupWithImage.open.bind(popupWithImage);

const addPopup = new PopupWithForm(".popup_type_add", (inputValues) => {
  const card = new Card(inputValues, ".template-card", handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
});
addPopup.setEventListeners();

const userInfo = new UserInfo({ nameSelector: ".profile__title", jobSelector: ".profile__subtitle" });

const editPopup = new PopupWithForm(".popup_type_edit", userInfo.setUserInfo.bind(userInfo), userInfo.getUserInfo());
editPopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".template-card", handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cards
);
cardList.renderItems();

editButton.addEventListener('click', () => editPopup.open());

addButton.addEventListener('click', () => addPopup.open());

