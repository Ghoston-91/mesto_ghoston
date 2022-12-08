import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modal, {handleSaveInfo}) {
    super(modal);
    this._handleSaveInfo = handleSaveInfo;
    this._modalForm = this._modal.querySelector('.modal__form');
    this._inputList = Array.from(this._modal.querySelectorAll('.modal__input'))
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value
    });
    
    return formValues
  }

  setEventListeners() {
    this._modal.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSaveInfo(this._getInputValues());
      this.closeModal()
    });
    super.setEventListeners();
  }

  closeModal() {
    super.closeModal()
    this._modalForm.reset()
  }
}