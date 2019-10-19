export default class {
    constructor() {
        this.regexp = {
            email  : '^[-._a-zA-Za-яA-я0-9]{2,}@(?:[a-zA-Za-яА-Я0-9][-a-z-A-Z-a-я-А-Я0-9]+\\.)+[a-za-я]{2,6}$',
            phone  : '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'
        };

        this.isFieldCorrect = {
            name    : false,
            email   : false,
            phone   : false,
            message : false
        };

        this.errorClass = 'is-error';

        this.errorMessageEmpty = 'Поле не может быть пустым';
        this.errorShortMessage = 'Текст в поле не может быть меньше 2 символов';
        this.errorLongNameMessage = 'Текст вqq поле не может быть превышать 40 символов';
        this.errorLongTextMessage = 'Текст в поле не может быть превышать 1000 символов';
        this.errorIncorrectEmailMessage = 'Адрес электронной почты введен некорректно';
        this.errorIncorrectPhoneMessage = 'Номер телефона введен некорректно';
    }

    init(options) {
        this.inputs = options.inputs;

        this.inputs.forEach(input => {
            this._setMode(input);
        });

        return this.isFieldCorrect;
    }

    _setMode(input) {
        switch (input.name) {
            case 'name':
                this._validateName(input);
                break;
            case 'email':
                this._validateEmail(input);
                break;
            case 'phone':
                this._validatePhone(input);
                break;
            case 'message':
                this._validateMessage(input);
                break;
            default:
                break;
        }
    }

    _validateName(input) {
        if (input.value.length < 2) {
            this._showErrorMessage(input, this.errorShortMessage);
        } else if (input.value.length > 40) {
            this._showErrorMessage(input, this.errorLongNameMessage);
        } else {
            this._removeErrorMessage(input);
        }
    }

    _validateEmail(input) {
        const isValidEmail = input.checkValidity();
        const regEmail = new RegExp(this.regexp.email, 'u');

        if (!input.value.length) {
            this._showErrorMessage(input, this.errorMessageEmpty);
        } else if (!(isValidEmail && regEmail.test(input.value))) {
            this._showErrorMessage(input, this.errorIncorrectEmailMessage);
        } else {
            this._removeErrorMessage(input);
        }
    }

    _validatePhone(input) {
        const regEmail = new RegExp(this.regexp.phone, 'u');

        if (!input.value.length) {
            this._showErrorMessage(input, this.errorMessageEmpty);
        } else if (!regEmail.test(input.value)) {
            this._showErrorMessage(input, this.errorIncorrectPhoneMessage);
        } else {
            this._removeErrorMessage(input);
        }
    }

    _validateMessage(input) {
        if (input.value.length < 2) {
            this._showErrorMessage(input, this.errorShortMessage);
        } else if (input.value.length > 1000) {
            this._showErrorMessage(input, this.errorLongTextMessage);
        } else {
            this._removeErrorMessage(input);
        }
    }

    _showErrorMessage(input, message) {
        const parent = input.parentNode;
        const errorField = parent.querySelector('.form__error');

        parent.classList.add(this.errorClass);
        errorField.textContent = message;

        this.isFieldCorrect[input.name] = false;
    }

    _removeErrorMessage(input) {
        const parent = input.parentNode;
        const errorField = parent.querySelector('.form__error');

        parent.classList.remove(this.errorClass);
        errorField.textContent = '';

        this.isFieldCorrect[input.name] = true;
    }
}
