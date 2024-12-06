
export const SEND_OTP_PHONE_LOGIN_REQUEST: any = 'SEND_OTP_PHONE_LOGIN_REQUEST';
export const SEND_OTP_PHONE_LOGIN_SUCCESS: any = 'SEND_OTP_PHONE_LOGIN_SUCCESS';
export const SEND_OTP_PHONE_LOGIN_ERROR: any = 'SEND_OTP_PHONE_LOGIN_ERROR';

export const EDIT_OTP_PHONE_NUMBER: any = 'EDIT_OTP_PHONE_NUMBER';
export const EDIT_OTP_PHONE_NUMBER_CLEAR: any = 'EDIT_OTP_PHONE_NUMBER_CLEAR';

export const SEND_RESEND_OTP_PHONE_LOGIN_REQUEST: any =
    'SEND_RESEND_OTP_PHONE_LOGIN_REQUEST';
export const SEND_RESEND_OTP_PHONE_LOGIN_SUCCESS: any =
    'SEND_RESEND_OTP_PHONE_LOGIN_SUCCESS';
export const SEND_RESEND_OTP_PHONE_LOGIN_ERROR: any =
    'SEND_RESEND_OTP_PHONE_LOGIN_ERROR';

export const VERIFY_OTP_PHONE_LOGIN_REQUEST: any =
    'VERIFY_OTP_PHONE_LOGIN_REQUEST';
export const VERIFY_OTP_PHONE_LOGIN_ERROR: any = 'VERIFY_OTP_PHONE_LOGIN_ERROR';
export const VERIFY_OTP_PHONE_LOGIN_SUCCESS: any =
    'VERIFY_OTP_PHONE_LOGIN_SUCCESS';

/**
* Action creator for clearing the edit phone number state.
* This is used when the user navigates away from the edit phone number screen.
* @returns {Object} - An action object with the type EDIT_OTP_PHONE_NUMBER_CLEAR.
*/
export const clearEditPhoneNumber = () => {
    return {
        // The type of action being dispatched
        type: EDIT_OTP_PHONE_NUMBER_CLEAR,
    };
};

/**
 * Action creator for editing the phone number.
 * This is used when the user is editing the phone number on the login screen.
 * @returns {Object} - An action object with the type EDIT_OTP_PHONE_NUMBER.
 */
export const editPhoneNumber = () => {
    return {
        // The type of action being dispatched
        type: EDIT_OTP_PHONE_NUMBER,
    };
};

/**
 * Action creator for resending the OTP for phone login.
 * This is used when the user clicks the resend OTP button on the login screen.
 * @param {Object} data - The data object containing the phone number and navigate function.
 * @returns {Object} - An action object with the type SEND_RESEND_OTP_PHONE_LOGIN_REQUEST and the payload data.
 */
export const resendOtpPhoneLogin = (data: { [key: string]: any }) => {
    return {
        // The type of action being dispatched
        type: SEND_RESEND_OTP_PHONE_LOGIN_REQUEST,
        // The data to be sent with the action
        payload: data,
    };
};

/**
 * Action creator for sending the OTP for phone login.
 * This is used when the user clicks the send OTP button on the login screen.
 * @param {Object} data - The data object containing the phone number and navigate function.
 * @returns {Object} - An action object with the type SEND_OTP_PHONE_LOGIN_REQUEST and the payload data.
 */
export const sendOtpPhoneLogin = (data: { [key: string]: any }) => {
    return {
        // The type of action being dispatched
        type: SEND_OTP_PHONE_LOGIN_REQUEST,
        // The data to be sent with the action
        payload: data,
    };
};

/**
 * Action creator for verifying the OTP for phone login.
 * This is used when the user clicks the verify OTP button on the login screen.
 * @param {Object} data - The data object containing the OTP and navigate function.
 * @returns {Object} - An action object with the type VERIFY_OTP_PHONE_LOGIN_REQUEST and the payload data.
 */
export const verifyOtpPhoneLogin = (data: { [key: string]: any }) => {
    return {
        // The type of action being dispatched
        type: VERIFY_OTP_PHONE_LOGIN_REQUEST,
        // The data to be sent with the action
        payload: data,
    };
}