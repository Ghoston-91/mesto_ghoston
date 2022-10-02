const modalOpen = 'modal_active'; // переменная, чтобы активировать попап

const modal = document.querySelector('.modal');
const profile = document.querySelector('.profile');
const profileEdit = document.querySelector('.profile__edit');

const modalForm = modal.querySelector('.modal__form');
const closeModalBtn = modal.querySelector('.modal__close');
const modalContent = modal.querySelector('.modal__content')

const nameInput = modal.querySelector('.modal__input_name');
const jobInput = modal.querySelector('.modal__input_job');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');


// слушатель с функцией, чтобы открыть попап и присвоить полям данные из профиля
profileEdit.addEventListener('click',() => {
  modal.classList.add(modalOpen);

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});


// слушатель с функцией, чтобы закрыть попап
modal.addEventListener('click',(event) => {
  if(!modalContent.contains(event.target) || event.target === closeModalBtn)  {
    modal.classList.remove(modalOpen);
  }
});


// функция для присвоения данных в профиле
function formSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  modal.classList.remove(modalOpen);
}

// слушатель для кнопки сохранить
modalForm.addEventListener('submit', formSubmitHandler);
