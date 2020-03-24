 export class PopupImg {
    constructor (popupElement1){
       this.popupImgElement = popupElement1;
       let popupImgClose = this.popupImgElement.querySelector(".popup-img__close");
       popupImgClose.PopupImg = this;
       popupImgClose.addEventListener("click", function() {this.PopupImg.close();});

    }

    open(imgURL1) {
      this.imgURL = imgURL1;
      let popupImgImage = this.popupImgElement.querySelector(".popup-img__img");
      popupImgImage.setAttribute("src", this.imgURL);
      this.popupImgElement.classList.add("popup-img_is-opened");
    }

    close() {
      this.popupImgElement.classList.remove("popup-img_is-opened");
    }
}
