import Modal from "./Modal.js";
import { fullImg, fullText} from "../utils/const.js"

export default class ModalWithImage extends Modal {
  constructor(modal){
    super(modal);
  }

  openModal (link, name) {
    fullImg.src = link;
    fullImg.alt = name;
    fullText.textContent = name;
    super.openModal();
  }
}