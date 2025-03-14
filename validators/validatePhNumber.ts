export type tphoneNumber = string | number;

/**
 * Validates the phone number and returns a boolean 
 * indicating the validity of the phone number.
 *
 * If you want to include the country code sent it in a string with `+country_code number` format.
 * or else send it as a sequence of 10 digits.
 */
export const validatePhNumber = (number: tphoneNumber) => {
    let regex = /^\d{10}$/;

    if (typeof number === 'string')
        regex = /^\+\d{3} \d{10}$/;

    return regex.test(String(number));
}

