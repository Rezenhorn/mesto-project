// элементы секции profile:
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// элементы editProfilePopup:
const editProfilePopup = document.querySelector('.popup__form_edit');
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');
const editProfileForm = editProfilePopup.querySelector('.form')
const profileNameInput = document.querySelector('.form__form-item_profile_name');
const profileBioInput = document.querySelector('.form__form-item_profile_bio');
// элементы addCardPopup:
const addCardPopup = document.querySelector('.popup__form_add');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');
const addCardForm = addCardPopup.querySelector('.form');
const cardPlaceInput = document.querySelector('.form__form-item_place_name')
const cardLinkInput = document.querySelector('.form__form-item_place_link')
// элементы imagePopup:
const imagePopup = document.querySelector('.popup__image');
const closeImagePopupButton = imagePopup.querySelector('.popup__close-button');
// другие элементы
const cardGrid = document.querySelector('.cards-grid')
const cardTemplate = document.querySelector('#card').content;

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__heading').textContent = name;
  addLikeCardListener(cardElement.querySelector('.card__like-button'));
  addDeleteCardListener(cardElement.querySelector('.card__delete-button'));
  addImageCardListener(cardElement.querySelector('.card__image'))
  return cardElement;
}

function addCard(name, link) {
  const card = createCard(name, link)
  cardGrid.prepend(card);
}

initialCards.forEach(element => cardGrid.append(createCard(element.name, element.link)));

function editProfilePopupOpened() {
  editProfilePopup.classList.add('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileBioInput.value = profileBio.textContent;
}

function popupClosed(popup) {
  popup.classList.remove('popup_opened');
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  popupClosed(editProfilePopup);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  addCard(cardPlaceInput.value, cardLinkInput.value);
  popupClosed(addCardPopup);
}

function addLikeCardListener (likeButton) {
  likeButton.addEventListener(
    'click', () => likeButton.classList.toggle('card__like-button_active')
  );
};

function addDeleteCardListener (deleteButton) {
  deleteButton.addEventListener(
    'click', () => {
      const closestCard = deleteButton.closest('.card');
      closestCard.remove();
    }
  );
};

function addImageCardListener (image) {
  image.addEventListener(
    'click', () => {
      imagePopup.querySelector('.figure__image').src = image.src;
      imagePopup.querySelector('.figure__figcaption').textContent = image.alt;
      imagePopup.classList.add('popup_opened');
    }
  );
};

addCardButton.addEventListener('click', () => addCardPopup.classList.add('popup_opened'));
editProfileButton.addEventListener('click', editProfilePopupOpened);
closeAddCardPopupButton.addEventListener('click', () => popupClosed(addCardPopup));
closeEditProfilePopupButton.addEventListener('click', () => popupClosed(editProfilePopup));
closeImagePopupButton.addEventListener('click', () => popupClosed(imagePopup));
editProfileForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', handleAddFormSubmit);