import Modal from "./Modal.js";
import { modalActive, modalShowImage, fullImg, fullText} from "../utils/const.js"

export default class ModalWithImage extends Modal {
  constructor(modal){
    super(modal);
  }

  openModal (link, name) {
    fullImg.src = link;
    fullImg.alt = name;
    fullText.textContent = name;
    modalShowImage.classList.add(modalActive)
  }
}