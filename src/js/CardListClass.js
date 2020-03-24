export class CardList {
    constructor (cardListElement) {
        this.cardListElement = cardListElement;
        //Массив хранит ключ-значение
        this.cards = [];
        cardListElement.cardList = this;
        cardListElement.addEventListener('click', this.clickHandler);
    }

    //Добавляем карточку
    add (card) {
        //По умолчанию первая карточка с id
        this.cards.push(card);
        //Рисуем карточку
        this.render(card);
    }

    render (card) {
        this.cardListElement.appendChild(card.cardElement);
    }

    //Поиск карточки по id
    findById (cardId)
    {
        return this.cards.find(card => {return card.cardId == cardId});
    }

    //Поиск индекса карточки по id
    indexById (cardId)
    {
        return this.cards.findIndex(card => {return card.cardId == cardId});
    }

    //Удаление карточки
    remove (card)
    {
        const index = this.indexById(card.cardId);
        if (index >= 0)
        {
            //Удаляем карточку card
            this.cards[index].remove();
            //Удаляем из List'а
            this.cards.splice(index,1);
            return 0;
        }
        return -1;
    }

    //Щелчок на карточке
    clickHandler(event) {
        //Обрабатываем like
        if (event.target.classList.contains("place-card__like-icon"))
            this.cardList.findById(event.target.parentElement.parentElement.id).like();
        //Удаление карточки
        if (event.target.classList.contains("place-card__delete-icon"))
            this.cardList.remove(this.cardList.findById(event.target.parentElement.parentElement.id));

        //Открытие карточки
        if (event.target.classList.contains("place-card__image"))
            this.cardList.findById(event.target.parentElement.id).open();
    }
}


