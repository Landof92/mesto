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


function togglePopupOpened(popup) {
  popup.classList.toggle("popup_opened");
}

function toggleImagePopup(event) {
  if (event.target === event.currentTarget) {
    togglePopupOpened(imagePopup);
    if (imagePopup.classList.contains("popup_opened")) {
      const card = event.currentTarget.closest(".card");
      const text = card.querySelector(".card__title");
      titleImagePopup.textContent = text.textContent;
      popupImage.setAttribute('src', event.currentTarget.getAttribute('src'));
      popupImage.setAttribute('alt', text.textContent);
    }
  }
}

function toggleAddPopup(event) {
  if (event.target === event.currentTarget) {
    togglePopupOpened(addPopup);
  }
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: addNameInput.value,
    link: addLinkInput.value
  };
  addCard(inputValues);
  addPopup.classList.remove("popup_opened");
}

function toggleEditPopup(event) {
  if (event.target === event.currentTarget) {
    togglePopupOpened(editPopup);
    if (editPopup.classList.contains("popup_opened")) {
      editNameInput.value = title.textContent.trim();
      editJobInput.value = subtitle.textContent.trim();
    }
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  title.textContent = editNameInput.value
  subtitle.textContent = editJobInput.value
  editPopup.classList.remove("popup_opened");
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

function addCard(item) {
  const card = templateCard.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const likeButton = card.querySelector(".card__like");
  const deleteButton = card.querySelector(".card__delete");
  cardTitle.textContent = item.name;
  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardImage.addEventListener('click', toggleImagePopup);
  deleteButton.addEventListener('click', deleteCard)
  likeButton.addEventListener('click', toggleLike)
  cards.prepend(card);
}

editButton.addEventListener('click', toggleEditPopup);
editPopupClose.addEventListener('click', toggleEditPopup);
editPopup.addEventListener('click', toggleEditPopup);
editFormElement.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', toggleAddPopup);
addPopupClose.addEventListener('click', toggleAddPopup);
addPopup.addEventListener('click', toggleAddPopup);
addFormElement.addEventListener('submit', handleAddFormSubmit);

imagePopupClose.addEventListener('click', toggleImagePopup);
imagePopup.addEventListener('click', toggleImagePopup);
