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


let openPopup = document.querySelector(".button_type_edit");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close");
function toggleClass(event) {
  if (event.target === event.currentTarget) {
    popup.classList.toggle("popup_opened");
  }
}
openPopup.addEventListener('click', toggleClass);
closePopup.addEventListener('click', toggleClass);
popup.addEventListener('click', toggleClass);

let formElement = document.querySelector(".popup__form");
function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = formElement.querySelector(".popup__form-input_type_name");
  let jobInput = formElement.querySelector(".popup__form-input_type_job");
  let title = document.querySelector(".profile__title");
  let subtitle = document.querySelector(".profile__subtitle");
  title.textContent = nameInput.value
  subtitle.textContent = jobInput.value
  popup.classList.remove("popup_opened");
}
formElement.addEventListener('submit', handleFormSubmit);


function toggleLike(event) {
  event.currentTarget.classList.toggle("button_active");
}


function render() {
  initialCards.forEach(function(item){
    const card = templateCard.cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const likeButton = card.querySelector(".button_type_like");
    const deleteButton = card.querySelector(".button_type_delete");
    likeButton.addEventListener('click', toggleLike)
    cardTitle.textContent = item.name;
    cardImage.setAttribute('src', item.link);
    cards.append(card);
  });
}
render();


