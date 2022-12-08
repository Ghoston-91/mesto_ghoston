import '../src/index.css';

import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js'
import Section from './scripts/components/Section.js';
import Modal from './scripts/components/Modal.js';
import ModalWithImage from './scripts/components/ModalWithImage.js';
import ModalWithForm from './scripts/components/ModalWithForm.js';
import UserInfo from './scripts/components/UserInfo';
import { modalActive, initialCards, configValidation } from './scripts/utils/const.js';


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


// экземпляр модалки modalShowImage
const openPhotoModal = new ModalWithImage(modalShowImage)
openPhotoModal.setEventListeners();

// Берем данные из профиля
const profileInfo = new UserInfo ( {
  nameProfile: nameProfile,
  jobProfile: jobProfile
});
// экземпляр формы
const dataModalProfile = new ModalWithForm (modalProfile, {
  handleSaveInfo: (data) => {
    profileInfo.setUserInfo({
      name: data.name,
      job: data.job
    })
  }
})
dataModalProfile.setEventListeners();


// открытие модалки Профиля и присвоение в поля ввода - данных из профиля
const handleOpenModalProfile = (modal) => {
  const {name, job} = profileInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  formProfileValidation.disableButton();
  modal.openModal()
};

btnOpenModalProfile.addEventListener('click', () => {
  handleOpenModalProfile(dataModalProfile)
});

const saveNewCard = new ModalWithForm(modalAddFoto, 
  {handleSaveInfo: (dataInputs) => {
  cardList.addItem(createCard({name: dataInputs.name, link: dataInputs.link}))
}})
saveNewCard.setEventListeners()
// const saveNewCard = new ModalWithForm (modalAddFoto, {
//   handleSaveInfo: (value) => {
//     defaultCardList.addItem(createCard({
//       link: value.imageSrc,
//       name: value.imageName
//     }))
//   }
// })
// saveNewCard.setEventListeners();

btnOpenModalAddFoto.addEventListener('click', () => {
  saveNewCard.openModal();
  
  formAddFotoValidation.disableButton();
})



const cardList = new Section({items: initialCards, renderer:(data) => {
  cardList.addItem(createCard(data))}}, cardsList)

cardList.renderItems()

// // функция создания карточки
function createCard(data) {
  const newCard = new Card(data, '#template', openPhotoModal.openModal);
  const cardElement = newCard.generateCard();
  return cardElement;
}

formProfileValidation.enableValidation();
formAddFotoValidation.enableValidation();



// открытие модалки Фото, обнуление полей и изначальная блокировка кнопки "Создать"
// function handleOpenModalFoto() {
//   imageName.value = "";
//   imageSrc.value = "";
//   openModal(modalAddFoto);
//   formAddFotoValidation.disableButton();
// };

// // функция сохранения новой карточки
// const handleSaveNewCard = function(evt) {
//   cardsList.prepend(createCard({name: imageName.value, link: imageSrc.value}));
//   closeModal(modalAddFoto, evt);
//   evt.target.reset();
//   formAddFotoValidation.disableButton();
// };
