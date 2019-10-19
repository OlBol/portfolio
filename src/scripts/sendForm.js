import Inputmask from 'inputmask';
import Validate from './validate';

export default class {
    constructor() {
        this.phoneMask = '+7 999 99-99-99';
    }

    init(options) {
        this.form = options.form;
        this.inputs = this.form.querySelectorAll('.js-input');
        this.action = this.form.action;
        this.method = this.form.method;

        this.inputs.forEach(input => {
            if (input.name === 'phone') {
                this._putPhoneMask(input)
            }
        });

        this._bindEvents(this.inputs);
    }

    _bindEvents(inputs) {
        const validate = new Validate();

        this.form.addEventListener('submit', e => {
            e.preventDefault();
            let result = true;

            const valResult = validate.init({
                inputs: inputs
            });

            for (const field in valResult) {
                if (valResult[field] === false) {
                    result = false;
                }
            }

            if (result === true) {
                this._sendForm();
            }
        })
    }

    _putPhoneMask(input) {
        const inputmask = new Inputmask({
            'mask': this.phoneMask,
            showMaskOnHover: false
        });

        inputmask.mask(input);
    }

    _sendForm() {
        const formData = new FormData(this.form);

        fetch(this.action, {
            method: this.method,
            headers: { 'X-Requested-With':'XMLHttpRequest' },
            body: formData
        })
            .then(this._checkStatus)
            .then(response => response.json())
            .then(message => {
            console.log(message);
            this._clearForm();
        })
            .catch(error => {
            console.log(error);
        });
    }

    _checkStatus(response) {
        if (response < 400) {
            return response;
        } else {
            throw new Error(response.status);
        }
    }

    _clearForm() {
        this.inputs.forEach(input => {
            input.value = '';
        })
    }
}
