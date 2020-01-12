import Inputmask from 'inputmask';
import formValidate from './validate.ts';

interface FormOptions {
    form: HTMLElement;
}

/**
 * @description Work with form data and submit to server.
 * @param options {object} - an object with data points to a form element.
 */
export default function sendForm(options: FormOptions) {
    const phoneMask: string = '+7 999 99-99-99';
    const form = options.form as HTMLFormElement;
    const inputs = form.querySelectorAll('.js-input');
    const action = form.action;
    const method = form.method;

    inputs.forEach((input: HTMLInputElement) => {
        if (input.name === 'phone') putPhoneMask(input);

    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        let result = true;

        const valResult: any = formValidate({
            inputs: inputs
        });

        for (const field in valResult) {
            if (valResult[field] === false) result = false;
        }

        if (result === true) submitForm();
    });

    /**
     * @description Displays a mask in the field for entering a phone number.
     * @param input {HTMLElement} - phone number entry form field.
     */
    function putPhoneMask(input: HTMLInputElement) {
        const inputmask = new Inputmask({
            'mask': phoneMask,
            showMaskOnHover: false
        });

        inputmask.mask(input);
    }

    /**
     * @description Submit form data to server.
     */
    function submitForm() {
        const formData = new FormData(form);

        formData.append('name', 'fsdf');
        formData.append('phone', '84444444444');
        formData.append('comment', 'resfsdf');
        formData.append('to', 'olbolot@gmail.com');

        fetch(action, {
            method: method,
            headers: { 'X-Requested-With':'XMLHttpRequest' },
            body: formData
        })
            // .then(this._checkStatus)
            .then(response => {
                if (response.ok) response.json();
            })
            .then(() => clearForm())
            .catch(error => console.log(error));
    }

    /**
     * @description Clear input elements.
     */
    function clearForm() {
        inputs.forEach((input: HTMLInputElement) => input.value = '');
    }
}
