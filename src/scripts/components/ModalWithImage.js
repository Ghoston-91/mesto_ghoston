import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modal){
    super(modal);
    this._fullImg = this._modal.querySelector('.modal__image-full');
    this._fullText = this._modal.querySelector('.modal__text-full')
  }

  openModal (link, name) {
    this._fullImg.src = link;
    this._fullImg.alt = name;
    this._fullText.textContent = name;
    super.openModal();
  }
}