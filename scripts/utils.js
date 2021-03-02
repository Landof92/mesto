const ESCAPE = 'Escape';

function closeActivePopup(event) {
  if (event.key === ESCAPE) {
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

export function closePopup(popup, event) {
  if (!event || event.target === event.currentTarget) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeActivePopup);
  }
}
