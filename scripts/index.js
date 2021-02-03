const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const templateCard = document.querySelector(".template-card").content;
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

const imagePopup =  document.querySelector(".popup_type_image");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const popupImage = imagePopup.querySelector(".popup__image");
const titleImagePopup = imagePopup.querySelector(".popup__title");


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_active'
});

function closeActivePopup(event) {
  if ( event.key === 'Escape') {
    const popup = document.querySelector(".popup_opened");
    if (popup){
      closePopup(popup)
    }
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown',closeActivePopup)
}

function closePopup(popup, event) {
  if(!event || event.target === event.currentTarget) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeActivePopup);
  }
}

function openImagePopup(event) {
  openPopup(imagePopup);
  const card = event.currentTarget.closest(".card");
  const text = card.querySelector(".card__title");
  titleImagePopup.textContent = text.textContent;
  popupImage.setAttribute('src', event.currentTarget.getAttribute('src'));
  popupImage.setAttribute('alt', text.textContent);
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const inputValues = {
    name: addNameInput.value,
    link: addLinkInput.value
  };
  addCard(inputValues);
  closePopup(addPopup);
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

function toggleLike(event) {
  event.currentTarget.classList.toggle("card__like_active");
}

function deleteCard(event) {
  event.currentTarget.closest(".card").remove();
}

function render() {
  initialCards.forEach(addCard);
}
render();

function createCard(item) {
  const card = templateCard.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const likeButton = card.querySelector(".card__like");
  const deleteButton = card.querySelector(".card__delete");
  cardTitle.textContent = item.name;
  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardImage.addEventListener('click', openImagePopup);
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', toggleLike);
  return card;
}

function addCard(item) {
  cards.prepend(createCard(item));
}

editButton.addEventListener('click', openeEditPopup);
editPopupClose.addEventListener('click', (event) => closePopup(editPopup, event));
editPopup.addEventListener('click', (event) => closePopup(editPopup, event));
editFormElement.addEventListener('submit', handleEditFormSubmit);


addButton.addEventListener('click', () => openPopup(addPopup));
addPopupClose.addEventListener('click', (event) => closePopup(addPopup, event));
addPopup.addEventListener('click',  (event) => closePopup(addPopup, event));
addFormElement.addEventListener('submit', handleAddFormSubmit);

imagePopupClose.addEventListener('click', (event) => closePopup(imagePopup, event));
imagePopup.addEventListener('click', (event) => closePopup(imagePopup, event));
