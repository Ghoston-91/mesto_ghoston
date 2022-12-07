const modalActive = 'modal_active'; // переменная, чтобы активировать попап
const modalShowImage = document.querySelector('.modal_show-image');
const fullImg = modalShowImage.querySelector('.modal__image-full');
const fullText = modalShowImage.querySelector('.modal__text-full');

const btnCloseModal = document.querySelector('.modal__close')
const content = document.querySelector('.modal__container')
 
// Массив с готовыми карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// конфиг для валидатора
const configValidation = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  invalidInputClass: 'modal__input_type_error',
  submitButtonSelector: '.modal__save',
  disabledSubmitButtonClass: 'modal__save_disabled',
}; 

export { 
  modalActive, 
  initialCards, 
  configValidation, 
  modalShowImage, 
  fullImg, 
  fullText, 
  btnCloseModal,
  content
 };
