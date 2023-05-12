let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.edit-form');
let nameInput = document.querySelector('.edit-form__form-item_profile_name');
let bioInput = document.querySelector('.edit-form__form-item_profile_bio');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');


function popupOpened() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}

function popupClosed() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  newName = nameInput.value;
  newBio = bioInput.value;
  profileName.textContent = newName;
  profileBio.textContent = newBio;
  popupClosed();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);
