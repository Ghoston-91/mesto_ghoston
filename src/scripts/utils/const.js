// конфиг для валидатора
const configValidation = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  invalidInputClass: 'modal__input_type_error',
  submitButtonSelector: '.modal__save',
  disabledSubmitButtonClass: 'modal__save_disabled',
};

// переменные, которые используются в других файлах
const modalActive = 'modal_active'; // переменная, чтобы активировать попап
const content = document.querySelector('.modal__container')
const cardsList = document.querySelector('.cards__list');
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');

const modalProfile = document.querySelector('.modalProfile');
const formModalProfile = modalProfile.querySelector('.modalFormProfile');
const nameInput = modalProfile.querySelector('.modal__input_type_name');
const jobInput = modalProfile.querySelector('.modal__input_type_job');

const modalShowImage = document.querySelector('.modal_show-image');

const modalAddFoto = document.querySelector('.modalAddFoto');
const formAddFoto = modalAddFoto.querySelector('.modalFormAddFoto');

const btnOpenModalProfile = document.querySelector('.profile__edit');
const btnOpenModalAddFoto = document.querySelector('.add-foto');
const btnCloseModal = document.querySelector('.modal__close');

const modalConfirm = document.querySelector('.modal_confirm-delete')
const modalChangeAvatar = document.querySelector('.modalChangeAvatar')
const btnEditAvatar = document.querySelector('.profile__avatar')

export { 
  configValidation, 
  modalActive,
  content,
  cardsList,

  modalShowImage, 
  nameProfile,
  jobProfile,

  modalProfile,
  formModalProfile,
  nameInput,
  jobInput,

  modalAddFoto,
  formAddFoto,

  btnOpenModalProfile,
  btnOpenModalAddFoto,
  btnCloseModal,

  modalConfirm,
  modalChangeAvatar,
  btnEditAvatar
 };
