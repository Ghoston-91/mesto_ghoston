const modalOpen = 'modal_active';

const profileEdit = document.querySelector('.profile__edit');
const modal = document.querySelector('.modal');
const closeModalBtn = modal.querySelector('.modal__close');
const modalContent = modal.querySelector('.modal__content')


profileEdit.addEventListener('click',() => {
  modal.classList.add(modalOpen);
});

modal.addEventListener('click',(event) => {
  if(!modalContent.contains(event.target) || event.target === closeModalBtn)  {
    modal.classList.remove(modalOpen);
  }
});


function editName () {
  let editName = modal.querySelector('.modal__input_name');
  let editsub = modal.querySelector('.modal__input_subtitle');

}
