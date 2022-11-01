// validation
const showInputError = (inputElement, errorElement, invalidInputClass) => {
  inputElement.classList.add(invalidInputClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (inputElement, errorElement, invalidInputClass) => {
  inputElement.classList.remove(invalidInputClass);
  errorElement.textContent = "";
}

const disableButton = (buttonElement, disableButtonClass) => {
  buttonElement.classList.add(disableButtonClass);
  buttonElement.disabled = true;
}

const enableButton = (buttonElement, disableButtonClass) => {
  buttonElement.classList.remove(disableButtonClass);
  buttonElement.disabled = false;
}

const toggleButtonState = (formSubmitButtonElement, disabledSubmitButtonClass, buttonState) => {
  if(buttonState){
    disableButton(formSubmitButtonElement, disabledSubmitButtonClass);
  } else {
    enableButton(formSubmitButtonElement, disabledSubmitButtonClass);
  }
}

const checkInputValidity = (inputElement, errorElement, invalidInputClass) => {
  if(inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, invalidInputClass);
    } else {
      showInputError(inputElement, errorElement, invalidInputClass);
    }
}
const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid)
}

const handleFormInput = (evt, form, invalidInputClass, formSubmitButtonElement, disabledSubmitButtonClass, inputs) => {
  const inputElement = evt.target;
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);
  checkInputValidity(inputElement, errorElement, invalidInputClass);
  const buttonState = hasInvalidInput(inputs);

  toggleButtonState(formSubmitButtonElement, disabledSubmitButtonClass, buttonState);
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
}

const enableValidation = ({
  formSelector, 
  inputSelector, 
  invalidInputClass, 
  submitButtonSelector, 
  disabledSubmitButtonClass}) => {
  const form = document.querySelector(formSelector);
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const formSubmitButtonElement = form.querySelector(submitButtonSelector);

  form.addEventListener('submit', handleFormSubmit);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => handleFormInput (
      evt, form, invalidInputClass, formSubmitButtonElement, disabledSubmitButtonClass, inputs))
  })

  // const forms = Array.from(document.querySelectorAll(formSelector));

  // forms.forEach((form) => {
  //   form.addEventListener('submit', handleFormSubmit);
  //   const inputs = Array.from(form.querySelectorAll(inputSelector));
    
  //   inputs.forEach((inputElement) => {
  //     inputElement.addEventListener('input', (evt) => handleFormInput (
  //       evt, form, invalidInputClass, formSubmitButtonElement, disabledSubmitButtonClass, inputs))
  //   })
  // })
 


}


enableValidation({
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  invalidInputClass: 'modal__input_type_error',
  submitButtonSelector: '.modal__save',
  disabledSubmitButtonClass: 'modal__save_disabled',

  errorClass: 'popup__error_visible'
}); 