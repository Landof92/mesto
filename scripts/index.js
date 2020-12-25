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

let likes = document.querySelectorAll(".button_type_like");
function toggleLike(event) {
  event.currentTarget.classList.toggle("button_active");
}
for (let i = 0; i < likes.length; i += 1) {
  likes[i].addEventListener('click', toggleLike);
}
