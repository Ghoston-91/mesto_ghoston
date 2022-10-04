const modalOpen = 'modal_active'; // переменная, чтобы активировать попап

const modal = document.querySelector('.modal');
const profile = document.querySelector('.profile');
const profileEdit = document.querySelector('.profile__edit');

const modalForm = modal.querySelector('.modal__form');
const closeModalBtn = modal.querySelector('.modal__close');
const modalContent = modal.querySelector('.modal__content')

const nameInput = modal.querySelector('.modal__input_type_name');
const jobInput = modal.querySelector('.modal__input_type_job');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');


// слушатель с функцией, чтобы открыть попап и присвоить полям данные из профиля
function funModalOpen () {
  modal.classList.add(modalOpen);

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}
profileEdit.addEventListener('click',funModalOpen);

// слушатель с функцией, чтобы закрыть попап по крестику
closeModalBtn.addEventListener('click',() => {
    modal.classList.remove(modalOpen);
});
// слушатель с функцией, чтобы закрыть попап по нажатию оверлея
modal.addEventListener('mousedown',(event) => {
  if(!modalContent.contains(event.target))  {
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
