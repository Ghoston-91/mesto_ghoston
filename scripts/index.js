const modalActive = 'modal_active'; // переменная, чтобы активировать попап

const btnOpenModal = document.querySelectorAll('[data-modal-button]');
const btnCloseModal = document.querySelectorAll('[data-modal-close]');


const modalForm = document.querySelector('.modal__form');

const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');
const nameInput = document.querySelector('.modal__input_type_name');
const jobInput = document.querySelector('.modal__input_type_job');

const modalAddFoto = document.querySelector('.modalAddFoto')
const formSaveNewFoto = modalAddFoto.querySelector('.modal__form');
const imageName = document.querySelector('.name_foto');
const imageSrc = document.querySelector('.type_src');

const modalFullFoto = document.querySelector('.modalFullFoto');


// Открыть модалку по кнопке
btnOpenModal.forEach(function (item) {
  item.addEventListener('click', function () {
    const modalId = this.dataset.modalButton;
    const modal = document.querySelector('#' + modalId)
    modal.classList.add(modalActive);

    // Присвоить полям данные из профиля
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    // Закрытие модалки по крестику
    btnCloseModal.forEach(function (item) {
      item.addEventListener('click', function() {
        const modal = this.closest('[data-modal]');
        modal.classList.remove(modalActive);
      })
    })
  })
})

// При нажатии на Сохранить - присвоить данные из инпута - в профиль; запрет на обновление страницы
modalForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  
  const modal = this.closest('[data-modal]');
  modal.classList.remove(modalActive);
});

// слушатель с функцией, чтобы закрыть попап по нажатию оверлея
// modal.addEventListener('mousedown',(event) => {
//   if(!modalContent.contains(event.target))  {
//     modal.classList.remove(modalOpen);
//   }
// });


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
  const template = document.querySelector('#template').content;
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
      cardImage.src = link;
      cardImage.alt = name;
      cardName.textContent = name;
      modalFullFoto.classList.add(modalActive);
    };

    cardImage.addEventListener('click',showImageFull )

  return cardElement;

};

const loadCards = function () {
  initialCards.forEach(function (card) {
    cardsList.append(createCard(card.name, card.link));
  });
}

loadCards();



// функция сохранения новой карточки
const saveNewCard = function(evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(imageName.value, imageSrc.value));
  evt.target.reset();
  modalAddFoto.classList.remove(modalActive);
}

formSaveNewFoto.addEventListener('submit', saveNewCard)


