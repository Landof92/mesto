import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit, getValues, toggleButtonState) {
    super(popupSelector);
    this.formSubmit = formSubmit;
    this._inputList = Array.from(this._element.querySelectorAll('.popup__form-input'));
    this.getValues = getValues;
    this.toggleButtonState = toggleButtonState;
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }
  _setInputValues() {
    if (typeof this.getValues === 'function') {
      const values = this.getValues();
      Object.keys(values).forEach((key) => {
        const inputIndex = this._inputList.findIndex((input) => {
          return input.name === key;
        })
        if (inputIndex !== -1) {
          this._inputList[inputIndex].value = values[key];
        }
      })
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form = this._element.querySelector('.popup__form');
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.formSubmit(this._getInputValues());
    })
  }
  close() {
    super.close();
    this._form.reset();
    if (typeof this.toggleButtonState === 'function') {
      this.toggleButtonState();
    }
  }
  open() {
    super.open();
    this._setInputValues();
  }
  setLoading(isLoading) {
    const button = this._element.querySelector(".popup__form-button")
    isLoading ?
      button.value = "Сохранение..."
      : button.value = "Cохранить"
  }
};
