import Validate from './validate';

export default class {
    constructor() {

    }

    init(options) {
        this.form = options.form;

        const validate = new Validate();

        const validateResult = validate.init({
            inputs: this.form.querySelectorAll('.js-input')
        });

        this._bindEvents(validateResult);
    }

    _bindEvents(validateResult) {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            for (const field in validateResult) {
                if (validateResult[field] === false) {
                    console.log(validateResult[field]);
                    
                    return;
                }
            }

            this._sendForm();
        })
    }

    _sendForm() {
        console.log("Отправляем!");
    }
}
