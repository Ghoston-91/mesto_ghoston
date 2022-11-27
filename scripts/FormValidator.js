export class formValidation {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._formSubmitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._disabledSubmitButtonClass = config.disabledSubmitButtonClass;
    this._invalidInputClass = config.invalidInputClass;
  }

_showInputError = (inputElement, errorElement, invalidInputClass) => {
    inputElement.classList.add(invalidInputClass);
    errorElement.textContent = inputElement.validationMessage;
  }

_hideInputError = (inputElement, errorElement, invalidInputClass) => {
    inputElement.classList.remove(invalidInputClass);
    errorElement.textContent = "";
  }

disableButton = () => {
    this._formSubmitButtonElement.classList.add(this._disabledSubmitButtonClass);
    this._formSubmitButtonElement.disabled = true;
  }

_enableButton = () => {
    this._formSubmitButtonElement.classList.remove(this._disabledSubmitButtonClass);
    this._formSubmitButtonElement.disabled = false;
  }

_checkInputValidity = (inputElement, errorElement, invalidInputClass) => {
    if(inputElement.validity.valid) {
        this._hideInputError(inputElement, errorElement, invalidInputClass);
      } else {
        this._showInputError(inputElement, errorElement, invalidInputClass);
      }
}

_hasInvalidInput = () => this._inputs.some((input) => !input.validity.valid)


_handleFormInput = (evt) => {
    const inputElement = evt.target;
    const errorElement = this._formElement.querySelector(`.input-error-${inputElement.name}`);
    this._checkInputValidity(inputElement, errorElement, this._invalidInputClass);
    this._toggleButtonState();
  }

_handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

_toggleButtonState = () => {
  if(this._hasInvalidInput()){
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

_setEventListeners = () => {
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => this._handleFormInput (evt))
    })
  }

enableValidation = () => {
    this._setEventListeners()
  }
}