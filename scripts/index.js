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

let openPopup = document.querySelector(".profile__edit");
let popup = document.querySelector(".popup_type_edit");
let closePopup = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__form");
let likes = document.querySelectorAll(".card__like");
let title = document.querySelector(".profile__title");
let subtitle = document.querySelector(".profile__subtitle");
let nameInput = formElement.querySelector(".popup__form-input_type_name");
let jobInput = formElement.querySelector(".popup__form-input_type_job");

const addButton = document.querySelector(".profile__add");
const addPopup = document.querySelector(".popup_type_add");
const addPopupClose = addPopup.querySelector(".popup__close");
const addFormElement = addPopup.querySelector(".popup__form");
const addNameInput = addPopup.querySelector(".popup__form-input_type_name");
const addLinkInput = addPopup.querySelector(".popup__form-input_type_link");

const imagePopup =  document.querySelector(".popup_type_image");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const picImagePopup = imagePopup.querySelector(".popup__image");
const titleImagePopup = imagePopup.querySelector(".popup__title");

addButton.addEventListener('click', toggleAddPopup);
addPopupClose.addEventListener('click', toggleAddPopup);
addPopup.addEventListener('click', toggleAddPopup);
addFormElement.addEventListener('submit', handleAddFormSubmit);
imagePopupClose.addEventListener('click', toggleImagePopup);
imagePopup.addEventListener('click', toggleImagePopup);

function toggleImagePopup(event) {
  if (event.target === event.currentTarget) {
    imagePopup.classList.toggle("popup_opened");
    if (imagePopup.classList.contains("popup_opened")) {
      const card = event.currentTarget.closest(".card");
      const text = card.querySelector(".card__title");
      titleImagePopup.textContent = text.textContent;
      picImagePopup.setAttribute('src', event.currentTarget.getAttribute('src'));
      picImagePopup.setAttribute('alt', text.textContent);
    }
  }
}


function toggleAddPopup(event) {
  if (event.target === event.currentTarget) {
    togglePopupOpened(addPopup);
  }
}

function togglePopupOpened(popup) {
  popup.classList.toggle("popup_opened");
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

function toggleClass(event) {
  if (event.target === event.currentTarget) {
    popup.classList.toggle("popup_opened");
    if (popup.classList.contains("popup_opened")) {
      nameInput.value = title.textContent.trim();
      jobInput.value = subtitle.textContent.trim();
    }
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value
  subtitle.textContent = jobInput.value
  popup.classList.remove("popup_opened");
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
  deleteButton.addEventListener('click', deleteCard)
  likeButton.addEventListener('click', toggleLike)
  cardTitle.textContent = item.name;
  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardImage.addEventListener('click', toggleImagePopup);
  cards.prepend(card);
}


openPopup.addEventListener('click', toggleClass);
closePopup.addEventListener('click', toggleClass);
popup.addEventListener('click', toggleClass);
formElement.addEventListener('submit', handleFormSubmit);
