import { modalActive, btnCloseModal, content } from "../utils/const.js";

export default class Modal {
  constructor(modal) {
    this._modal = modal;
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  openModal() {
    this._modal.classList.add(modalActive);
    document.addEventListener('keydown', this._handleEscClose.bind);
  }

  closeModal() {
    this._modal.classList.remove(modalActive);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closeModal();
  }
}
  setEventListeners() {
    this._modal.addEventListener('mousedown', (evt) => {
      if (!content.contains(evt.target) || btnCloseModal === evt.target) {
        this.closeModal();
    }})
  }


}