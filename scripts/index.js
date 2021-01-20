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
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__form");
let likes = document.querySelectorAll(".card__like");
let title = document.querySelector(".profile__title");
let subtitle = document.querySelector(".profile__subtitle");
let nameInput = formElement.querySelector(".popup__form-input_type_name");
let jobInput = formElement.querySelector(".popup__form-input_type_job");

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
  initialCards.forEach(function(item){
    const card = templateCard.cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const likeButton = card.querySelector(".card__like");
    const deleteButton = card.querySelector(".card__delete");
    deleteButton.addEventListener('click', deleteCard)
    likeButton.addEventListener('click', toggleLike)
    cardTitle.textContent = item.name;
    cardImage.setAttribute('src', item.link);
    cards.append(card);
  });
}
render();



openPopup.addEventListener('click', toggleClass);
closePopup.addEventListener('click', toggleClass);
popup.addEventListener('click', toggleClass);
formElement.addEventListener('submit', handleFormSubmit);
