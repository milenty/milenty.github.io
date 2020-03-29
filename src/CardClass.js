export class Card {
  constructor (cardName, cardLink, cardId) {      
      this.cardLink = cardLink;
      this.cardName = cardName;
      this.cardId =  cardId;
      this.cardElement = this.createElement();      
  }

//Cоздаём DOM-элемент карточки.
createElement () {
    let placeCard = document.createElement("div");



    let placeCardImage = document.createElement("div");
    let placeCardDeleteIcon = document.createElement("button");
    let placeCardDescription = document.createElement("div");
    let placeCardName = document.createElement("h3");
    let placeCardLikeIcon = document.createElement("button");

    placeCard.className = "place-card";
    placeCardImage.className = "place-card__image";
    placeCardDeleteIcon.className = "place-card__delete-icon";
    placeCardDescription.className = "place-card__description";
    placeCardName.className = "place-card__name";
    placeCardLikeIcon.className = "place-card__like-icon";
    placeCardName.textContent = this.cardName;
    placeCardImage.setAttribute("style", "background-image: url(" + this.cardLink + ")");

    placeCard.appendChild(placeCardImage);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCard.appendChild(placeCardDescription);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);

    placeCard.id = this.cardId;

    return placeCard;
  }

  like() {
    this.cardElement.querySelector(".place-card__like-icon").classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    this.cardElement.parentNode.removeChild(this.cardElement);
  }

  open() {
      popupImg.open(this.cardLink);
  }
}






