import "./style.css";
import  './images/close.svg';
import  './images/logo.svg';
import  './images/avatar.jpg';
import  './images/like-active.svg';
import  './images/like-inactive.svg';
import {API} from './API';
import {Card} from './CardClass';
import {CardList} from './CardListClass';
import {PopupEdit} from './EditFormClass';
import {FormValidator} from './FormValidatorClass';
import {Popup} from './PopupClass';
import {PopupImg} from './PopupImgClass';
import {UserInfo} from './UserInfoClass';

//Переменные 
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
/*let api = new API("https://praktikum.tk/cohort8",{authorization : '92ce07cc-19a0-4fcd-93cc-06bf1d6f27bf'});*/

let api = new API({
  baseUrl: NODE_ENV==='development' ? 'http://praktikum.tk/cohort8':'https://praktikum.tk/cohort8',
  headers: {
    authorization: '92ce07cc-19a0-4fcd-93cc-06bf1d6f27bf',
    'Content-Type': 'application/json'
  }
});

//Переменные
let popupImg = new PopupImg(popupImgElement);

//Добавляем массив карточек
let cardList = new CardList(placesList);

//Инициализация объекта UserInfo
let userInfo1 = new UserInfo(api);
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


