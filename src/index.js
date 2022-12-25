import '../src/index.css';

import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js'
import Section from './scripts/components/Section.js';
import ModalWithImage from './scripts/components/ModalWithImage.js';
import ModalWithForm from './scripts/components/ModalWithForm.js';
import ModalWithConfirm from './scripts/components/ModalWithConfirm.js';
import UserInfo from './scripts/components/UserInfo';
import { 
  modalShowImage, 
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
  btnOpenModalAddFoto,
  modalConfirm,
  modalChangeAvatar,
  btnEditAvatar
} from './scripts/utils/const.js';
import API from './scripts/components/API.js'

const api = new API({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-56",
  headers: {
    Authorization: '9c9b38b2-7369-4326-aac4-9ce480f1f0cd',
    'Content-Type': 'application/json',
  },
})

let userId

Promise.all([api.getUserInfo(), api.getCards()])
.then(([user, card]) => {
  userId = user._id;
  profileInfo.setUserInfo({
    name: user.name,
    job: user.about
  });
  cardList.renderItems(card.reverse())
  profileInfo.setUserAvatar(user.avatar)
})
.catch((err) => {
  console.log(err)
})

// экземпляр модалки с подтверждением
const modalWithConfirm = new ModalWithConfirm(modalConfirm);
modalWithConfirm.setEventListeners();

// Берем данные из профиля
const profileInfo = new UserInfo ( {
  nameProfile: nameProfile,
  jobProfile: jobProfile,
  avatarSelector: '.profile__avatar'
});

// экземпляр формы для модалки Профиля
const dataModalProfile = new ModalWithForm (modalProfile, {
  handleSaveInfo: (formData) => {
    dataModalProfile.loadingMessege(true);
    api.editUserInfo(formData).then((userData) => {
      profileInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar
      })
      dataModalProfile.closeModal()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      dataModalProfile.loadingMessege(false)
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

// эземпляр формы для модалки смены Аватара
const modalAvatarProfile = new ModalWithForm(modalChangeAvatar, {
  handleSaveInfo: (data) => {
    modalAvatarProfile.loadingMessege(true);
    api.editAvatar(data)
    .then((userData) => {
      profileInfo.setUserAvatar(userData.avatar);
      modalAvatarProfile.closeModal();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      modalAvatarProfile.loadingMessege(false)
    })
  }
})
modalAvatarProfile.setEventListeners();

// экземпляр модалки modalShowImage (на весь экран)
const openModalWithImage = new ModalWithImage(modalShowImage)
openModalWithImage.setEventListeners();

const openPhotoModal = (name, link) => {
  openModalWithImage.openModal(name, link)
}

// экземпляр формы для модалки Добавления фото
const saveNewCard = new ModalWithForm(modalAddFoto, {
  handleSaveInfo: (formValues) => {
    saveNewCard.loadingMessege(true);
    api.createCard({
      name: formValues.foto,
      link: formValues.src
    })
    .then((card) => {
      cardList.addItem(createCard(card))
      saveNewCard.closeModal()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      saveNewCard.loadingMessege(false)
    })
}})
saveNewCard.setEventListeners()

// функция создания карточки
const createCard = (data) => {
  const newCard = new Card(data, '#template', openPhotoModal, userId, 
  {handleConfirmDelete: () => {
    modalWithConfirm.openModal();
    modalWithConfirm.handleSubmit(() => 
      api.deleteCard(data._id)
      .then(() => {
        newCard.handeDeleteCard();
        modalWithConfirm.closeModal();
      })
      .catch((err) => {
        console.log(err)
      })
  )}, 
  handleLikeClick: (likes) => {
    if(!likes) {
      api.pressLikeOnCard(data._id)
      .then((data) => {
        newCard.countLikes(data)
      })
      .catch((err) => {
        console.log(err)})
    } else {
      api.deleteLike(data._id)
      .then((data) => {
        newCard.countLikes(data)
      })
      .catch((err) => {
        console.log(err)})
    }
  }});
  const cardElement = newCard.generateCard();
  return cardElement;
}

// экземпляр для рендера готового массива
const cardList = new Section({renderer:(data) => {
  cardList.addItem(createCard(data))
}}, cardsList)

// экземпляры валидации форм
const formProfileValidation = new FormValidator(configValidation, formModalProfile);
const formAddFotoValidation = new FormValidator(configValidation, formAddFoto);
const formAvatarValidation = new FormValidator(configValidation, modalChangeAvatar)

formProfileValidation.enableValidation();
formAddFotoValidation.enableValidation();
formAvatarValidation.enableValidation();


btnOpenModalProfile.addEventListener('click', () => {
  handleOpenModalProfile(dataModalProfile)
});

btnOpenModalAddFoto.addEventListener('click', () => {
  saveNewCard.openModal();
  formAddFotoValidation.disableButton();
})

btnEditAvatar.addEventListener('click', () => {
  modalAvatarProfile.openModal();
  formAvatarValidation.disableButton();
})