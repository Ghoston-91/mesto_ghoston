import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    const modalShowImage = document.querySelector('.modal_show-image');
    const fullImg = modalShowImage.querySelector('.modal__image-full');
    const fullText = modalShowImage.querySelector('.modal__text-full');
    modalShowImage.classList.add('modal_active');
    fullImg.src = link;
    fullText.alt = name;
    fullText.textContent = name
  }
}