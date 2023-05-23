const popupEditProfile = document.querySelector('.popup__form_edit');
const popupAddCard = document.querySelector('.popup__form_add');
const popupImage = document.querySelector('.popup__image');

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

const closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-button');
const closeAddCardPopupButton = popupAddCard.querySelector('.popup__close-button');
const closeImagePopupButton = popupImage.querySelector('.popup__close-button');

const editProfileForm = document.querySelector('.form__form_edit');
const addCardForm = document.querySelector('.form__form_add');
const profileNameInput = document.querySelector('.form__form-item_profile_name');
const profileBioInput = document.querySelector('.form__form-item_profile_bio');
const cardPlaceInput = document.querySelector('.form__form-item_place_name')
const cardLinkInput = document.querySelector('.form__form-item_place_link')

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const cardGrid = document.querySelector('.cards-grid')
const cardTemplate = document.querySelector('#card').content;

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__heading').textContent = name;
  return cardElement;
}


function addCardInitial(name, link) {
  cardGrid.append(createCard(name, link));
}

function addCard(name, link) {
  let card = createCard(name, link)
  cardGrid.prepend(card);
  return card;
}

initialCards.forEach(element => addCardInitial(element.name, element.link));
const likeButtons = document.querySelectorAll('.card__like-button');
const deleteButtons = document.querySelectorAll('.card__delete-button');
const cardImages = document.querySelectorAll('.card__image');

function popupEditProfileOpened() {
  popupEditProfile.classList.add('popup_opened');
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
  popupClosed(popupEditProfile);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const card = addCard(cardPlaceInput.value, cardLinkInput.value);
  addLikeCardListener(card.querySelector('.card__like-button'));
  addDeleteCardListener(card.querySelector('.card__delete-button'));
  addImageCardListener(card.querySelector('.card__image'))
  popupClosed(popupAddCard);
}

function addLikeCardListener (likeButton) {
  likeButton.addEventListener(
    'click', () => likeButton.classList.toggle('card__like-button_active')
  );
};

function addDeleteCardListener (deleteButton) {
  deleteButton.addEventListener(
    'click', () => {
      const listItem = deleteButton.closest('.card');
      listItem.remove();
    }
  );
};

function addImageCardListener (image) {
  image.addEventListener(
    'click', () => {
      popupImage.querySelector('.figure__image').src = image.src;
      popupImage.querySelector('.figure__figcaption').textContent = image.alt;
      popupImage.classList.add('popup_opened');
    }
  );
};

likeButtons.forEach((item) => addLikeCardListener(item));
deleteButtons.forEach((item) => addDeleteCardListener(item));
cardImages.forEach((item) => addImageCardListener(item));

addCardButton.addEventListener('click', () => popupAddCard.classList.add('popup_opened'));
editProfileButton.addEventListener('click', popupEditProfileOpened);
closeAddCardPopupButton.addEventListener('click', () => popupClosed(popupAddCard));
closeEditProfilePopupButton.addEventListener('click', () => popupClosed(popupEditProfile));
closeImagePopupButton.addEventListener('click', () => popupClosed(popupImage));
editProfileForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', handleAddFormSubmit);