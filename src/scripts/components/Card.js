export class Card {
  constructor(data, templateSelector, openPhotoModal){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPhotoModal = openPhotoModal;
  } 
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  } 

  generateCard() {
    this._element = this._getTemplate();
    this._deleteCard = this._element.querySelector('.card__delete');
    this._likeActive = this._element.querySelector('.card__like');
    this._elementImage = this._element.querySelector('.card__img');
    this._elementName = this._element.querySelector('.card__title');

    this._elementImage.src = this._link;
    this._elementName.alt = this._name;
    this._elementName.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners(){
    this._likeActive.addEventListener('click', () => {
      this._handeLikeActive();
    })
    this._deleteCard.addEventListener('click', () => {
      this._handeDeleteCard();
    })
    this._elementImage.addEventListener('click', this._handleOpenPhotoModal)
}

  _handeLikeActive() {
    this._likeActive.classList.toggle('card__like_active');
  }

  _handeDeleteCard() {
    this._element.remove();
  }

  _handleOpenPhotoModal = () => {
    this._openPhotoModal(this._link, this._name);
  } 
}
