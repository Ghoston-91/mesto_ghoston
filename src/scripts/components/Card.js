export default class Card {
  constructor(data, templateSelector, openPhotoModal, userId, {handleConfirmDelete, handleLikeClick}){
    this._data = data
    this._name = data.name;
    this._link = data.link;
    this._id = data._id
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._openPhotoModal = openPhotoModal;
   
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleLikeClick = handleLikeClick;
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
    this._likeCounter = this._element.querySelector('.card__like-count')

    this._elementImage.src = this._link;
    this._elementName.alt = this._name;
    this._elementName.textContent = this._name;

    if(this._ownerId !== this._userId) {
      this._deleteCard.remove()
    }

    this.countLikes(this._data)
    this._setEventListeners();

    return this._element;
  }
  // удалить карточку из UI
  handeDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPhotoModal = () => {
    this._openPhotoModal(this._link, this._name);
  } 

  isLiked() {
    return this._likes.some( (like) => like._id === this._userId);
  }

  _countLikesView() {
    this._likeCounter.textContent = this._likes.length;
    this._isLikedCard()
  }
  // закрашивание лайка, если он еще не активен
  _isLikedCard() {
    if (this.isLiked()) {
      this._likeActive.classList.add('card__like_active')
    } else {
      this._likeActive.classList.remove('card__like_active')
    }
  }
  // счетчик лайков
  countLikes(data) {
    this._likes = data.likes;
    this._countLikesView()
  }

  _setEventListeners(){
    this._likeActive.addEventListener('click', () => {
      this._handleLikeClick(this.isLiked());
    })
    this._deleteCard.addEventListener('click', () => {
      this._handleConfirmDelete();
    })
    this._elementImage.addEventListener('click', () => {
      this._handleOpenPhotoModal()
    })
  }
}