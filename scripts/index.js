const modalActive = 'modal_active'; // переменная, чтобы активировать попап

const modalProfile = document.querySelector('.modalProfile');
const formModalProfile = modalProfile.querySelector('.modalFormProfile');
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');
const nameInput = modalProfile.querySelector('.modal__input_type_name');
const jobInput = modalProfile.querySelector('.modal__input_type_job');

const modalAddFoto = document.querySelector('.modalAddFoto');
const formSaveNewFoto = modalAddFoto.querySelector('.modal__form');
const imageName = modalAddFoto.querySelector('.modal__input_type_foto');
const imageSrc = modalAddFoto.querySelector('.modal__input_type_src');

const modalShowImage = document.querySelector('.modal_show-image');
const fullImg = document.querySelector('.modal__image-full');
const fullText = document.querySelector('.modal__text-full');

const btnOpenModalProfile = document.querySelector('.profile__edit');
const btnOpenModalAddFoto = document.querySelector('.add-foto');
const btnSaveFoto = modalAddFoto.querySelector('.modal__save')
const btnSaveFotoDisable = 'modal__save_disabled'

const template = document.querySelector('#template').content;


// открытие модалки
const openModal = function(modal) {
  modal.classList.add(modalActive);
  disableButton(btnSaveFoto, btnSaveFotoDisable);

  document.addEventListener('keydown', closeModalPressEsc)
};

// закрытие модалки
const closeModal = function(modal) {
  modal.classList.remove(modalActive);

  document.removeEventListener('keydown', closeModalPressEsc)
};

// закрытие модалки на Esc
function closeModalPressEsc(evt) {
  if (evt.key === 'Escape') {
    const modalActive = document.querySelector('.modal_active');
    closeModal(modalActive)
  }
}

// открытие модалки Профиля и присвоение в поля ввода - данных из профиля
function openModalProfile() {
  openModal(modalProfile)
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

btnOpenModalProfile.addEventListener('click', openModalProfile);
btnOpenModalAddFoto.addEventListener('click', () => openModal(modalAddFoto));

// закрытие модалок по крестику или оверлею
modalProfile.addEventListener('mousedown', (evt) => {
  const btnCloseModal = modalProfile.querySelector('.modal__close')
  const content = modalProfile.querySelector('.modal__content')
  if (!content.contains(evt.target) || btnCloseModal === evt.target) {
    closeModal(modalProfile)
  }
})

modalAddFoto.addEventListener('mousedown', (evt) => {
  const btnCloseModal = modalAddFoto.querySelector('.modal__close')
  const content = modalAddFoto.querySelector('.modal__content')
  if (!content.contains(evt.target) || btnCloseModal === evt.target) {
    closeModal(modalAddFoto)
  }
})

modalShowImage.addEventListener('mousedown', (evt) => {
  const btnCloseModal = modalShowImage.querySelector('.modal__close')
  const content = modalShowImage.querySelector('.modal__content-image')
  if (!content.contains(evt.target) || btnCloseModal === evt.target) {
    closeModal(modalShowImage)
  }
})


// При нажатии на Сохранить - присвоить данные из инпута - в профиль; запрет на обновление страницы
function saveInfoProfile (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(modalProfile);
}

formModalProfile.addEventListener('submit', saveInfoProfile);

// функция сохранения новой карточки
const saveNewCard = function(evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(imageName.value, imageSrc.value));
  evt.target.reset();
  closeModal(modalAddFoto);
}

formSaveNewFoto.addEventListener('submit', saveNewCard)


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


const cardsList = document.querySelector('.cards__list');

const createCard = function(name, link) {
 
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardName = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__img');
  const cardLikeActive = 'card__like_active';

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector('.card__like')
    .addEventListener('click', function(evt){
      evt.target.classList.toggle(cardLikeActive);
    });

    cardElement.querySelector('.card__delete')
    .addEventListener('click', function(evt) {
      evt.target.closest('.card').remove()
    });

    const showImageFull = function () {
      fullImg.src = link;
      fullImg.alt = name;
      fullText.textContent = name;
      openModal(modalShowImage);
    };

    cardImage.addEventListener('click',showImageFull )

  return cardElement;

};

// загрузка карточек из массива
const loadCards = function () {
  initialCards.forEach(function (card) {
    cardsList.append(createCard(card.name, card.link));
  });
}
loadCards();