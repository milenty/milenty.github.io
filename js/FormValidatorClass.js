class FormValidator {
    constructor (popupElement1){
       this.popupElement = popupElement1;
       this.popupElement.formValidator = this;
       this.submitButton = this.popupElement.querySelector(".button");
       this.setEventListeners();
    }


    checkInputValidity (element, errorElement) {

        const errorText = this.checkInputError(element);
        errorElement.textContent = errorText;

        //input_validation_requared
        if (errorText.length > 0)
            errorElement.classList.remove("error-message__hidden");
        else
            errorElement.classList.add("error-message__hidden");
    }

    setEventListeners() {
        this.popupElement.querySelectorAll("input").forEach(element =>
        {
            element.formValidator = this;
            element.addEventListener("input", this.handleEvent);
        });

        this.popupElement.addEventListener("handleButtonDefault", this.handleButtonDefault);
    }

    checkInputError(element) {
        //input_validation_requared
        if (element.classList.contains("input_validation_requared") && (element.value ===""))
        {
            return "Это обязательное поле";
        }
        else
        //input_validation_2_30
        if (element.classList.contains("input_validation_2_30") && (element.value.length<2 || element.value.length>30))
        {
            return "Должно быть от 2 до 30 символов";
        }
        else
        //input_validation_link
        if (element.classList.contains("input_validation_link") && (!element.validity.valid))
        {
            return "Здесь должна быть ссылка";
        }
        else
        {
            return "";
        }
    }

    checkErrorCount() {
        let errorCount = 0;
        this.popupElement.querySelectorAll("input").forEach(element =>
        {
                if (this.checkInputError(element).length > 0)
                    errorCount = errorCount  +1;
        });
        return errorCount;
    }


    handleEvent(event) {
        /** REVIEW: Можно лучше:
        *   Неявное обращение к dom-узлу через this
        **/
        const errorElement = this.formValidator.popupElement.querySelector(`#error-${event.target.id}`);
        this.formValidator.checkInputValidity(event.target, errorElement);
        this.formValidator.setSubmitButtonState();
    }

    handleButtonDefault(event)
    {
        event.target.formValidator.popupElement.querySelectorAll("input").forEach(element =>
        {
            let errorElement = event.target.formValidator.popupElement.querySelector(`#error-${element.id}`);
            event.target.formValidator.checkInputValidity(element, errorElement);
        });

        event.target.formValidator.setSubmitButtonState();
    }

    setSubmitButtonState () {
        let buttonState = this.checkErrorCount() == 0;

        if (this.submitButton.classList.contains("popup-edit__button"))
        {
           // let buttonState = this.popupElement.querySelectorAll(".error-message:not(.error-message__hidden)").length == 0;
            if (buttonState) {
                this.submitButton.removeAttribute("disabled");
                this.submitButton.classList.remove("popup-edit__button_disabled");
            } else {
                this.submitButton.setAttribute("disabled", true);
                this.submitButton.classList.add("popup-edit__button_disabled");
            }
        }

        if (this.submitButton.classList.contains("popup__button"))
        {
            if (buttonState) {
                this.submitButton.removeAttribute("disabled");
                this.submitButton.classList.remove("popup__button_disabled");
            } else {
                this.submitButton.setAttribute("disabled", true);
                this.submitButton.classList.add("popup__button_disabled");
            }
        }
    }
}
