class PopupEdit  {
    constructor (popupElement1, userInfo1) {
        this.popupEditElement = popupElement1;//Узел в html разметке
        this.userEditInfo = userInfo1;
        //Находим крестик
        let popupEditClose = this.popupEditElement.querySelector(".popup-edit__close");
        popupEditClose.popupEdit = this;
        popupEditClose.addEventListener("click", function() {this.popupEdit.close();});

        let popupEditForm = document.querySelector(".popup-edit__form");
        popupEditForm.popupEdit = this;
        popupEditForm.addEventListener("submit", function(event) {
            event.preventDefault();
            this.popupEdit.updateAndClose();
        });

    }

    open() {
        let popupEditInputName = document.querySelector(".popup-edit__input_type_name");
        let popupEditInputAbout = document.querySelector(".popup-edit__input_type_about");
        popupEditInputAbout.value = this.userEditInfo.userInfoName;
        popupEditInputName.value = this.userEditInfo.userInfoJob;
        this.popupEditElement.classList.toggle("popup-edit_is-opened");
        popupEditElement.dispatchEvent(new Event("handleButtonDefault"));
      }

    close() {
        //Скрываем форму
        this.popupEditElement.classList.toggle("popup-edit_is-opened");
    }

    updateAndClose() {
        let popupEditInputName = document.querySelector(".popup-edit__input_type_name");
        let popupEditInputAbout = document.querySelector(".popup-edit__input_type_about");
        this.userEditInfo.updateUserInfoServer (popupEditInputAbout.value,popupEditInputName.value);
        this.close();
    }
}


