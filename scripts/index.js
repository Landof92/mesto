let openPopup = document.querySelector(".profile__edit");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__form");
let likes = document.querySelectorAll(".card__button");
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
  event.currentTarget.classList.toggle("card__button_active");
}
for (let i = 0; i < likes.length; i += 1) {
  likes[i].addEventListener('click', toggleLike);
}

openPopup.addEventListener('click', toggleClass);
closePopup.addEventListener('click', toggleClass);
popup.addEventListener('click', toggleClass);
formElement.addEventListener('submit', handleFormSubmit);
