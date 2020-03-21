const popupElement = document.querySelector(".popup");
const popupImgElement = document.querySelector(".popup-img");
const placesList = document.querySelector(".places-list");
const popupEditElement = document.querySelector(".popup-edit");
const userEditButton = document.querySelector(".user-edit__button");
const userInfoButton = document.querySelector(".user-info__button");

//Слушатели
userEditButton.addEventListener("click", function () { popupEdit.open(); });
userInfoButton.addEventListener("click", function () { popup.open(); });

//API
let api = new API("https://praktikum.tk/cohort8",{authorization : '92ce07cc-19a0-4fcd-93cc-06bf1d6f27bf'});

//Переменные
let popupImg = new PopupImg(popupImgElement);

//Добавляем массив карточек
cardList = new CardList(placesList);

//Инициализируем карточки из массива
/*initialCards.forEach(element => {
    cardList.add(new Card(element.name, element.link));
});*/

//Инициализация объекта UserInfo
userInfo1 = new UserInfo(api);
//Создаем экземпляр класса popup и передаем в него узел popup
let popupEdit = new PopupEdit(popupEditElement, userInfo1); //Создали форму

//Валидатор для input полей элемента

//Создаем экземпляр класса popup и передаем в него узел popup
let popup = new Popup(popupElement, cardList, newCard, api); //Создали форму

//Для callback'а в Popup
function newCard(name, link, id) {
  return new Card(name, link, id)
}

//Берем промис и обрабатываем карточки с сервера
api.getInitialCardsPromise().then(res => {
  if (res.ok) {
      return res.json();
  }
    // если ошибка, переходим в catch
      return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((cards) => {
    cards.forEach((card) => {
      cardList.add(newCard(card.name, card.link, card._id));
    })
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен');
  });

new FormValidator(popupEditElement);
new FormValidator(popupElement);


