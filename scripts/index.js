import { Card } from './CARD.js'; 
import { modalActive, initialCards, configValidation } from './const.js';
import { FormValidator } from './FormValidator.js'

const modals = document.querySelectorAll('.modal');
const cardsList = document.querySelector('.cards__list');

const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');

const modalProfile = document.querySelector('.modalProfile');
const formModalProfile = modalProfile.querySelector('.modalFormProfile');
const nameInput = modalProfile.querySelector('.modal__input_type_name');
const jobInput = modalProfile.querySelector('.modal__input_type_job');

const modalAddFoto = document.querySelector('.modalAddFoto');
const formAddFoto = modalAddFoto.querySelector('.modalFormAddFoto');
const imageName = modalAddFoto.querySelector('.modal__input_type_foto');
const imageSrc = modalAddFoto.querySelector('.modal__input_type_src');

const modalShowImage = document.querySelector('.modal_show-image');
const fullImg = modalShowImage.querySelector('.modal__image-full');
const fullText = modalShowImage.querySelector('.modal__text-full');

const btnOpenModalProfile = document.querySelector('.profile__edit');
const btnOpenModalAddFoto = document.querySelector('.add-foto');

const formProfileValidation = new FormValidator(configValidation, formModalProfile);
const formAddFotoValidation = new FormValidator(configValidation, formAddFoto);

// открытие модалки
const openModal = function(modal) {
  modal.classList.add(modalActive);
  document.addEventListener('keydown', handleCloseModalPressEsc);
};

// открытие модалки Профиля и присвоение в поля ввода - данных из профиля
function handleOpenModalProfile() {
  openModal(modalProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

// открытие модалки Фото, обнуление полей и изначальная блокировка кнопки "Создать"
function handleOpenModalFoto() {
  imageName.value = "";
  imageSrc.value = "";
  openModal(modalAddFoto);
  formAddFotoValidation.disableButton();
};

// закрытие модалки
const closeModal = function(modal) {
  modal.classList.remove(modalActive);
  document.removeEventListener('keydown', handleCloseModalPressEsc);
};

// закрытие модалки на Esc
function handleCloseModalPressEsc(evt) {
  if (evt.key === 'Escape') {
    const modalActive = document.querySelector('.modal_active');
    closeModal(modalActive);
  }
};

// закрытие модалок по крестику или оверлею
modals.forEach((modal) => {
  const btnCloseModal = modal.querySelector('.modal__close')
  const content = modal.querySelector('.modal__container')
  modal.addEventListener('mousedown', (evt) => {
    if (!content.contains(evt.target) || btnCloseModal === evt.target) {
      closeModal(modal);
  }})
});

// При нажатии на Сохранить - присвоить данные из инпута - в профиль; запрет на обновление страницы
function handleSaveInfoProfile (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(modalProfile);
};

// функция открытия картинки в отдельном окне
function openPhotoModal(link, name){
	fullImg.src = link;
	fullImg.alt = name;
  fullText.textContent = name;
	openModal(modalShowImage);
};

// функция сохранения новой карточки
const handleSaveNewCard = function(evt) {
  cardsList.prepend(createCard({name: imageName.value, link: imageSrc.value}));
  closeModal(modalAddFoto, evt);
  evt.target.reset();
  formAddFotoValidation.disableButton();
};

// функция создания карточки
function createCard(data) {
  const newCard = new Card(data, '#template', openPhotoModal);
  const cardElement = newCard.generateCard();
  return cardElement;
}

// загрузка карточек из массива
initialCards.forEach((data) => {
  cardsList.prepend(createCard(data));
});

formProfileValidation.enableValidation();
formAddFotoValidation.enableValidation();

btnOpenModalProfile.addEventListener('click', handleOpenModalProfile);
btnOpenModalAddFoto.addEventListener('click', handleOpenModalFoto);
formModalProfile.addEventListener('submit', handleSaveInfoProfile);
formAddFoto.addEventListener('submit', handleSaveNewCard); 