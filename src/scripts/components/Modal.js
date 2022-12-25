export default class Modal {
  constructor(modal) {
    this._modal = modal;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.openModal = this.openModal.bind(this)
    this._btnSave = this._modal.querySelector('.modal__save')
  }

  openModal() {
    this._modal.classList.add('modal_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closeModal() {
    this._modal.classList.remove('modal_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closeModal();
  }
}
  setEventListeners() {
    this._modal.addEventListener('mousedown', (evt) => {
      if (!this._modal.querySelector('.modal__container').contains(evt.target) || this._modal.querySelector('.modal__close') === evt.target) {
        this.closeModal();
    }})
  }
}