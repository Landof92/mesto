import { Card } from './Card.js';
import { initialCards } from './initial-сards.js';
import { FormValidator } from './FormValidator.js';

const cards = document.querySelector(".cards");

const editButton = document.querySelector(".profile__edit");
const editPopup = document.querySelector(".popup_type_edit");
const editPopupClose = editPopup.querySelector(".popup__close");
const editFormElement = editPopup.querySelector(".popup__form");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
const editNameInput = editFormElement.querySelector(".popup__form-input_type_name");
const editJobInput = editFormElement.querySelector(".popup__form-input_type_job");

const addButton = document.querySelector(".profile__add");
const addPopup = document.querySelector(".popup_type_add");
const addPopupClose = addPopup.querySelector(".popup__close");
const addFormElement = addPopup.querySelector(".popup__form");
const addNameInput = addPopup.querySelector(".popup__form-input_type_name");
const addLinkInput = addPopup.querySelector(".popup__form-input_type_link");
const addFormButton = addPopup.querySelector(".popup__form-button");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupClose = imagePopup.querySelector(".popup__close");

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


function closeActivePopup(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector(".popup_opened");
    if (popup) {
      closePopup(popup)
    }
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeActivePopup)
}

function closePopup(popup, event) {
  if (!event || event.target === event.currentTarget) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeActivePopup);
  }
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const inputValues = {
    name: addNameInput.value,
    link: addLinkInput.value
  };
  addCard(inputValues);
  closePopup(addPopup);
  addFormElement.reset();
  addFormValidator.enableValidation();
}

function openeEditPopup() {
  openPopup(editPopup);
  editNameInput.value = title.textContent.trim();
  editJobInput.value = subtitle.textContent.trim();
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  title.textContent = editNameInput.value;
  subtitle.textContent = editJobInput.value;
  closePopup(editPopup);
}

function render(cards) {
  cards.forEach(addCard);
}
render(initialCards);

function addCard(item) {
  const card = new Card(item, ".template-card");
  cards.prepend(card.generateCard());
}

editButton.addEventListener('click', openeEditPopup);
editPopupClose.addEventListener('click', (event) => closePopup(editPopup, event));
editPopup.addEventListener('click', (event) => closePopup(editPopup, event));
editFormElement.addEventListener('submit', handleEditFormSubmit);


addButton.addEventListener('click', () => openPopup(addPopup));
addPopupClose.addEventListener('click', (event) => closePopup(addPopup, event));
addPopup.addEventListener('click', (event) => closePopup(addPopup, event));
addFormElement.addEventListener('submit', handleAddFormSubmit);

imagePopupClose.addEventListener('click', (event) => closePopup(imagePopup, event));
imagePopup.addEventListener('click', (event) => closePopup(imagePopup, event));
