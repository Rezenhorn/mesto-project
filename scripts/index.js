// элементы секции profile:
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// элементы editProfilePopup:
const editProfilePopup = document.querySelector('.popup__form_edit');
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');
const editProfileForm = editProfilePopup.querySelector('.form');
const profileNameInput = editProfileForm.elements.profileName;
const profileBioInput = editProfileForm.elements.profileBio;
// элементы addCardPopup:
const addCardPopup = document.querySelector('.popup__form_add');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');
const addCardForm = addCardPopup.querySelector('.form');
const cardPlaceInput = addCardForm.elements.placeName;
const cardLinkInput = addCardForm.elements.placeLink;
// элементы imagePopup:
const imagePopup = document.querySelector('.popup__image');
const closeImagePopupButton = imagePopup.querySelector('.popup__close-button');
// другие элементы:
const popupList = document.querySelectorAll('.popup');
const cardGrid = document.querySelector('.cards-grid');
const cardTemplate = document.querySelector('#card').content;


function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage =  cardElement.querySelector('.card__image');
  const cardHeading = cardElement.querySelector('.card__heading');
  cardImage.src = link;
  cardImage.alt = name;
  cardHeading.textContent = name;
  addLikeCardListener(cardElement.querySelector('.card__like-button'));
  addDeleteCardListener(cardElement.querySelector('.card__delete-button'));
  addImageCardListener(cardElement.querySelector('.card__image'));
  return cardElement;
}

function addCard(name, link) {
  const card = createCard(name, link);
  cardGrid.prepend(card);
}

// Заполняем грид стандартными карточками
initialCards.forEach(element => cardGrid.append(createCard(element.name, element.link)));

function resetValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const inputErrors = Array.from(formElement.querySelectorAll(".form__input-error"));
  inputList.forEach((input) => input.classList.remove("form__input_type_error"));
  inputErrors.forEach((error) => {
    error.classList.remove('form__input-error_active');
    error.textContent = '';
  })
}

function openEditProfilePopup() {
  editProfilePopup.classList.add('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileBioInput.value = profileBio.textContent;
  resetValidation(editProfileForm);
  disableFormButton(editProfileForm);
  document.addEventListener('keydown', closePopupWithEsc);
}

function openAddCardPopup() {
  resetValidation(addCardForm);
  addCardPopup.classList.add('popup_opened');
  addCardForm.reset();
  disableFormButton(addCardForm);
  document.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  closePopup(editProfilePopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(cardPlaceInput.value, cardLinkInput.value);
  closePopup(addCardPopup);
}

function addLikeCardListener(likeButton) {
  likeButton.addEventListener(
    'click', () => likeButton.classList.toggle('card__like-button_active')
  );
}

function addDeleteCardListener(deleteButton) {
  deleteButton.addEventListener(
    'click', () => {
      const closestCard = deleteButton.closest('.card');
      closestCard.remove();
    }
  );
}

function addImageCardListener(image) {
  image.addEventListener(
    'click', () => {
      imagePopup.querySelector('.figure__image').src = image.src;
      imagePopup.querySelector('.figure__figcaption').textContent = image.alt;
      imagePopup.classList.add('popup_opened');
      document.addEventListener('keydown', closePopupWithEsc);
    }
  );
}

// Закрытие попапов по клику на оверлее
popupList.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  });
});

// Закрытие попапов по нажатию Esc
function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

function disableFormButton(formElement) {
  const buttonElement = formElement.querySelector('.form__save-button');
  buttonElement.classList.add('form__save-button_inactive');
  buttonElement.disabled = true;
}

addCardButton.addEventListener('click', openAddCardPopup);
editProfileButton.addEventListener('click', openEditProfilePopup);
closeAddCardPopupButton.addEventListener('click', () => closePopup(addCardPopup));
closeEditProfilePopupButton.addEventListener('click', () => closePopup(editProfilePopup));
closeImagePopupButton.addEventListener('click', () => closePopup(imagePopup));
editProfileForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', handleAddFormSubmit);
