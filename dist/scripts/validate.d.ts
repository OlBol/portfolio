interface formValidateOptions {
    inputs: NodeListOf<Element>;
}
/**
 * @description Feedback form validation.
 * @param options {object} – input elements data.
 * @returns {boolean} – if the input was validated successfully – true, if not - false.
 */
export default function formValidate(options: formValidateOptions): any;
export {};
