import { Popup } from "./Popup";
export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitAction) {
    super(popupSelector)
    this.handleSubmitAction = handleSubmitAction;
  }
  open(cardId, submitAction) {
    super.open();
    this.cardId = cardId;
    this.submitAction = submitAction;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form = this._element.querySelector('.popup__form');
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmitAction(this.cardId)
        .then(() => {
          this.submitAction();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }
}
