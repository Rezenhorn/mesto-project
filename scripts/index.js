const popupEdit = document.querySelector('.popup__form_edit');
const popupAdd = document.querySelector('.popup__form_add');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const closeAdd = document.querySelector('.popup__close-add');
const closeEdit = document.querySelector('.popup__close-edit');
const editFormElement = document.querySelector('.form__form_edit');
const addFormElement = document.querySelector('.form__form_add');
const nameInput = document.querySelector('.form__form-item_profile_name');
const bioInput = document.querySelector('.form__form-item_profile_bio');
const placeInput = document.querySelector('.form__form-item_place_name')
const linkInput = document.querySelector('.form__form-item_place_link')
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const cardGrid = document.querySelector('.cards-grid')
const cardTemplate = document.querySelector('#card').content;
const initialCards = [
  {
    name: 'Карелия',
    link: './images/karelia.jpg'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg'
  },
  {
    name: 'Плёс',
    link: './images/ples.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/spb.jpg'
  },
  {
    name: 'Калининград',
    link: './images/kaliningrad.jpg'
  },
  {
    name: 'Кольский полуостров',
    link: './images/kolsky.jpg'
  }
];

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

function popupEditOpened() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}

function popupClosed(popup) {
  popup.classList.remove('popup_opened');
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  popupClosed(popupEdit);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const card = addCard(placeInput.value, linkInput.value);
  addLikeCardListener(card.querySelector('.card__like-button'));
  addDeleteCardListener(card.querySelector('.card__delete-button'));
  popupClosed(popupAdd);
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

likeButtons.forEach((item) => addLikeCardListener(item));
deleteButtons.forEach((item) => addDeleteCardListener(item));

addButton.addEventListener('click', () => popupAdd.classList.add('popup_opened'));
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
editButton.addEventListener('click', popupEditOpened);
closeAdd.addEventListener('click', () => popupClosed(popupAdd));
closeEdit.addEventListener('click', () => popupClosed(popupEdit));
