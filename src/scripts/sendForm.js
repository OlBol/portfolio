import Inputmask from 'inputmask';
import Validate from './validate';

export default class {
    /**
     * Валидация формы обратной связи.
     */
    constructor() {
        this.phoneMask = '+7 999 99-99-99';
    }

    /**
     * @param options {object} - объект с данными, указывающими на элемент с формой.
     */
    init(options) {
        this.form = options.form;
        this.inputs = this.form.querySelectorAll('.js-input');
        this.action = this.form.action;
        this.method = this.form.method;

        this.inputs.forEach(input => {
            if (input.name === 'phone') this._putPhoneMask(input);
        });

        this._bindEvents(this.inputs);
    }

    /**
     * Вызывает отправку формы, если все поля прошли валидацию успешно.
     * @param inputs {object} - NodeList из input-элементов формы.
     * @private
     */
    _bindEvents(inputs) {
        const validate = new Validate();

        this.form.addEventListener('submit', e => {
            e.preventDefault();
            let result = true;

            const valResult = validate.init({
                inputs: inputs
            });

            for (const field in valResult) {
                if (valResult[field] === false) result = false;
            }

            if (result === true) this._sendForm();
        });
    }

    /**
     * Выводит маску в поле для ввода номера телефона.
     * @param input {HTMLElement} - поле формы для ввода номера теелфона.
     * @private
     */
    _putPhoneMask(input) {
        const inputmask = new Inputmask({
            'mask': this.phoneMask,
            showMaskOnHover: false
        });

        inputmask.mask(input);
    }

    /**
     * Отправка формы.
     * @private
     */
    _sendForm() {
        const formData = new FormData(this.form);

        formData.append('name', 'fsdf');
        formData.append('phone', '84444444444');
        formData.append('comment', 'resfsdf');
        formData.append('to', 'olbolot@gmail.com');

        fetch(this.action, {
            method: this.method,
            headers: { 'X-Requested-With':'XMLHttpRequest' },
            body: formData
        })
            // .then(this._checkStatus)
            .then(response => {
                if (response.ok) response.json();
            })
            .then(() => this._clearForm())
            .catch(error => console.log(error));
    }

    /**
     * Делает поля формы пустыми.
     * @private
     */
    _clearForm() {
        this.inputs.forEach(input => input.value = '');
    }
}
