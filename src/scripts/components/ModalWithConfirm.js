import Modal from "./Modal.js";

export default class ModalWithConfirm extends Modal {
  constructor(modal) {
    super(modal);
    this._modalForm = this._modal.querySelector('.modal__form')
  }

  setEventListeners(){
    super.setEventListeners();
    this._modalForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit()
    })
  }

  handleSubmit(submit) {
    this._submit = submit;
  }
}