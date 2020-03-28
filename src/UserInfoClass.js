import {Api} from "./API"; 


export class UserInfo {
    constructor (api){
        //Хранит информацию о данных пользователя
        this.api = api;
        this.getUserInfoServer();
    }

    //Подписываемся на промис получения данных с сервера
    getUserInfoServer () {
        this.api.getUserInfoPromise().then(res => {
            if (res.ok) {
                return res.json();
            }
              // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
        .then((result) => {
          this.setAndUpdateUserInfo(result.name, result.about);
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    //Обновляем данные на сервере и в случае успеха обновляем объект
    updateUserInfoServer (userName1, userAbout1) {
        this.api.updateUserInfoPromise(userName1, userAbout1).then((result) => {
            this.setAndUpdateUserInfo(userName1, userAbout1);
        });
    }

    //Обновляем объект и разметку
    setAndUpdateUserInfo  (userName1, userAbout1) {
        this.setUserInfo(userName1, userAbout1);
        this.updateUserInfo();
    }

    //Устанавливает значение полей
    setUserInfo  (userName1, userAbout1) {
        this.userInfoName = userName1;
        this.userInfoJob = userAbout1;
    }

    //Обновляет данные в разметке
    updateUserInfo () {
        let userInfoName =  document.querySelector(".user-info__name");
        let userInfoJob =  document.querySelector(".user-info__job");
        userInfoJob.textContent = this.userInfoName;
        userInfoName.textContent = this.userInfoJob;
    }
}



