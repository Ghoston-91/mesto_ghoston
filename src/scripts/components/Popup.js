import { modalActive } from "../utils/const.js";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('modal_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove(modalActive);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      console.log('hi');
      this.close(modalActive);
  }
}

  setEventListeners() {
    // const btnOpenModalProfile = document.querySelector('.profile__edit');
    const btnCloseModal = this._popupSelector.querySelector('.modal__close')
    const content = this._popupSelector.querySelector('.modal__container')

    // btnOpenModalProfile.addEventListener('click', () => {
    //   this.open()
    // })

    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (!content.contains(evt.target) || btnCloseModal === evt.target) {
        this.close();
    }})
  }

  enablePopup = () => {
    this.setEventListeners()
  }
}