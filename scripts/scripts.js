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

// Находим форму в DOM
let modalForm = modal.querySelector('.modal__form');
// Находим поля формы в DOM
let profile = document.querySelector('.profile');
let nameInput = modal.querySelector('.modal__input_name');
let jobInput = modal.querySelector('.modal__input_subtitle');
let nameProfile = profile.querySelector('.profile__name');
let jobProfile = profile.querySelector('.profile__subtitle');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value


    nameProfile.textContent = nameInput.value;
    jobProfile.textContent= jobInput.value;




    // nameInput.value = nameProfile.textContent;
    // jobInput.value = jobProfile.textContent;







    modal.classList.remove(modalOpen);


    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
modalForm.addEventListener('submit', formSubmitHandler);
