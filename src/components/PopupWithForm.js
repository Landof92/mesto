import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit, values = {}, toggleButtonState) {
    super(popupSelector);
    this.formSubmit = formSubmit;
    this._inputList = Array.from(this._element.querySelectorAll('.popup__form-input'));
    this.values = values;
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
    Object.keys(this.values).forEach((key) => {
      const inputIndex = this._inputList.findIndex((input) => {
        return input.name === key;
      })
      if (inputIndex !== -1) {
        this._inputList[inputIndex].value = this.values[key];
      }
    })
  }
  setEventListeners() {
    super.setEventListeners();
    this._form = this._element.querySelector('.popup__form');
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.formSubmit(this._getInputValues());
      this.close();
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
};
