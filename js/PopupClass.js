class Popup {
    constructor (popupElement1, cardList1, newCard1, api) {
      //Записываем узел с формой
      this.popupElement = popupElement1;
      this.cardList = cardList1;
      //Callback для создания карточки
      this.newCard = newCard1;
      this.api = api;
      //Находим крестик
      let popupClose = this.popupElement.querySelector(".popup__close");
      //Сохраняем в крестике ссылку на форму
      popupClose.popup = this;
      //Подписываем событие
      popupClose.addEventListener("click", function() {this.popup.close();});
      //Находим узел form
      let popupForm = this.popupElement.querySelector(".popup__form");
      popupForm.popup = this;
      //Подписываем submit
      popupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let nameForm = this.querySelector(".popup__input_type_name");
        let linkForm = this.querySelector(".popup__input_type_link-url");
        this.popup.close();
        //добавляем новую карточку 
        this.popup.api.addCardPromise(nameForm.value,linkForm.value).then(res => {
          if (res.ok) {
              return res.json();
          }
            // если ошибка, переходим в catch
              return Promise.reject(`Ошибка: ${res.status}`);
          })          
        .then((result) => {
          //Используем callback для создания экзеипляра класса Card          
          this.popup.cardList.add(this.popup.newCard(result.name, result.link, result._id));
        }).catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });                
      });

      //Поле с наименованием
      let nameForm = popupForm.querySelector(".popup__input_type_name");
      nameForm.popup = this;
      //Поле со ссылкой
      let linkForm = popupForm.querySelector(".popup__input_type_link-url");
      linkForm.popup = this;
 }

  open() {
    this.popupElement.querySelector(".popup__form").reset();
    //Делаем по умолчанию кнопку неактивной
    popupElement.dispatchEvent(new Event("handleButtonDefault"));


    //Отображаем форму
    this.popupElement.classList.toggle("popup_is-opened");
  }

  close() {
    //Скрываем форму
    this.popupElement.classList.toggle("popup_is-opened");
  }
}
