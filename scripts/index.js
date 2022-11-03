const modals = document.querySelectorAll('.modal');

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

const btnOpenModalProfile = document.querySelector('.profile__edit');
const btnOpenModalAddFoto = document.querySelector('.add-foto');
const btnSaveFoto = modalAddFoto.querySelector('.modal__save')

const template = document.querySelector('#template').content;
const cardsList = document.querySelector('.cards__list');

// открытие модалки
const openModal = function(modal) {
  modal.classList.add(modalActive);
  document.addEventListener('keydown', handleCloseModalPressEsc);
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
  disableButton(btnSaveFoto, btnSaveFotoDisable);
};

// закрытие модалок по крестику или оверлею
modals.forEach((modal) => {
  const btnCloseModal = modal.querySelector('.modal__close')
  const content = modal.querySelector('.modal_container')
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

// функция сохранения новой карточки
const handleSaveNewCard = function(evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(imageName.value, imageSrc.value));
  evt.target.reset();
  closeModal(modalAddFoto);
};

// функция создания карточки
const createCard = function(name, link) {
 
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardName = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__img');
  const cardLikeActive = 'card__like_active';

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const showImageFull = function () {
    const modalShowImage = document.querySelector('.modal_show-image');
    const fullImg = modalShowImage.querySelector('.modal__image-full');
    const fullText = modalShowImage.querySelector('.modal__text-full');
    fullImg.src = link;
    fullImg.alt = name;
    fullText.textContent = name;
    openModal(modalShowImage);
  };

  cardElement.querySelector('.card__like').addEventListener('click', function(evt){
    evt.target.classList.toggle(cardLikeActive);
  });

  cardElement.querySelector('.card__delete').addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });

  cardImage.addEventListener('click', showImageFull );

  return cardElement;
};

// загрузка карточек из массива
const loadCards = function () {
  initialCards.forEach(function (card) {
    cardsList.append(createCard(card.name, card.link));
  });
};

loadCards();

btnOpenModalProfile.addEventListener('click', handleOpenModalProfile);
btnOpenModalAddFoto.addEventListener('click', handleOpenModalFoto);
formModalProfile.addEventListener('submit', handleSaveInfoProfile);
formAddFoto.addEventListener('submit', handleSaveNewCard);