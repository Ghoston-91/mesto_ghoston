import '../src/index.css';

import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js'
import Section from './scripts/components/Section.js';
import ModalWithImage from './scripts/components/ModalWithImage.js';
import ModalWithForm from './scripts/components/ModalWithForm.js';
import UserInfo from './scripts/components/UserInfo';
import { 
  modalShowImage, 
  initialCards, 
  configValidation, 
  cardsList,
  nameProfile,
  jobProfile,
  modalProfile,
  formModalProfile,
  nameInput,
  jobInput,
  modalAddFoto,
  formAddFoto,
  btnOpenModalProfile,
  btnOpenModalAddFoto
} from './scripts/utils/const.js';

// экземпляры валидации форм
const formProfileValidation = new FormValidator(configValidation, formModalProfile);
const formAddFotoValidation = new FormValidator(configValidation, formAddFoto);

// Берем данные из профиля
const profileInfo = new UserInfo ( {
  nameProfile: nameProfile,
  jobProfile: jobProfile
});

// экземпляр формы для модалки Профиля
const dataModalProfile = new ModalWithForm (modalProfile, {
  handleSaveInfo: (data) => {
    profileInfo.setUserInfo({
      name: data.name,
      job: data.job
    })
  }
})
dataModalProfile.setEventListeners();

// функция открытия модалки Профиля и присвоение данных из полей ввода
const handleOpenModalProfile = (modal) => {
  const {name, job} = profileInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  formProfileValidation.disableButton();
  modal.openModal()
};

// экземпляр формы для модалки Добавления фото
const saveNewCard = new ModalWithForm(modalAddFoto, 
  {handleSaveInfo: (formValues) => {
  cardList.addItem(createCard({name: formValues.foto, link: formValues.src}))
}})
saveNewCard.setEventListeners()

// экземпляр модалки modalShowImage (на весь экран)
const openPhotoModal = new ModalWithImage(modalShowImage)
openPhotoModal.setEventListeners();

// функция создания карточки
function createCard(data) {
  const newCard = new Card(data, '#template', openPhotoModal.openModal);
  const cardElement = newCard.generateCard();
  return cardElement;
}
// экземпляр для рендера готового массива
const cardList = new Section({items: initialCards, renderer:(data) => {
  cardList.addItem(createCard(data))}}, cardsList)

cardList.renderItems()

formProfileValidation.enableValidation();
formAddFotoValidation.enableValidation();

btnOpenModalProfile.addEventListener('click', () => {
  handleOpenModalProfile(dataModalProfile)
});

btnOpenModalAddFoto.addEventListener('click', () => {
  saveNewCard.openModal();
  formAddFotoValidation.disableButton();
})