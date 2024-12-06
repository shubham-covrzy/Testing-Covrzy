/**
 * Import all the action types for login related actions from '../Actions/LoginActions'.
 */
import {
    // Action types for resending OTP
    SEND_RESEND_OTP_PHONE_LOGIN_REQUEST,
    SEND_RESEND_OTP_PHONE_LOGIN_SUCCESS,
    SEND_RESEND_OTP_PHONE_LOGIN_ERROR,

    // Action types for verifying OTP
    VERIFY_OTP_PHONE_LOGIN_REQUEST,
    VERIFY_OTP_PHONE_LOGIN_SUCCESS,
    VERIFY_OTP_PHONE_LOGIN_ERROR,

    // Action types for editing phone number
    EDIT_OTP_PHONE_NUMBER,
    EDIT_OTP_PHONE_NUMBER_CLEAR,

    // Action types for sending OTP
    SEND_OTP_PHONE_LOGIN_ERROR,
    SEND_OTP_PHONE_LOGIN_SUCCESS,
    SEND_OTP_PHONE_LOGIN_REQUEST,
} from '../Actions/LoginActions';

/**
 * Interface for the login state in the Redux store.
 */
export interface ILoginState {
    /** Indicates if the login is in progress. */
    loading: boolean;
    /** The mobile number used for login. */
    mobile?: string;
    /** The request ID for the login request. */
    request_id?: string;
    /** The state for the resend OTP request. */
    resendOTP: {
        /** Indicates if the resend OTP request is in progress. */
        loading: boolean;
    };
    /** Indicates if the user is a new user. */
    isNewUser?: boolean;
    /** Indicates if the mobile number is being edited. */
    editMobileNumber?: boolean;
}

/**
 * Initial state for the login reducer.
 */
const initialState: ILoginState = {
    loading: false,
    resendOTP: { loading: false },
};

/**
 * Reducer for the login state.
 * @param state - The current state.
 * @param action - The action to be performed.
 * @returns The updated state.
 */
const LoginReducer = (state: ILoginState = initialState, action: any) => {
    /**
     * Reducer function for handling login state updates.
     * @param state - The current state.
     * @param action - The action to be performed.
     * @returns The updated state.
     */
    switch (action.type) {
        case VERIFY_OTP_PHONE_LOGIN_REQUEST:
            // Handle the start of the verify OTP request
            return {
                ...state,
                loading: true,
            };

        case VERIFY_OTP_PHONE_LOGIN_SUCCESS:
            // Handle the successful completion of the verify OTP request
            return {
                ...state,
                loading: false,
            };

        case VERIFY_OTP_PHONE_LOGIN_ERROR:
            // Handle the error during the verify OTP request
            return {
                ...state,
                loading: false,
            };

        case SEND_OTP_PHONE_LOGIN_REQUEST:
            // Handle the start of the send OTP request
            return {
                ...state,
                loading: true,
                mobile: action.payload.mobile,
            };

        case SEND_OTP_PHONE_LOGIN_SUCCESS:
            // Handle the successful completion of the send OTP request
            return {
                ...state,
                loading: false,
                request_id: action.payload.request_id,
                isNewUser: action.payload.isNewUser,
            };

        case EDIT_OTP_PHONE_NUMBER:
            /**
             * Handle the event of editing the mobile number.
             * @param action - The action object containing the mobile number.
             * @returns The updated state.
             */
            // Handle the event of editing the mobile number
            return {
                ...state,
                request_id: undefined,
                editMobileNumber: true,
            };

        case EDIT_OTP_PHONE_NUMBER_CLEAR:
            // Handle the event of clearing the edited mobile number
            return {
                ...state,
                editMobileNumber: false,
            };

        case SEND_OTP_PHONE_LOGIN_ERROR:
            // Handle the error during the send OTP request
            return {
                ...state,
                loading: false,
            };

        case SEND_RESEND_OTP_PHONE_LOGIN_REQUEST:
            // Handle the start of the resend OTP request
            return {
                ...state,
                resendOTP: { loading: true },
            };

        case SEND_RESEND_OTP_PHONE_LOGIN_SUCCESS:
            // Handle the successful completion of the resend OTP request
            return {
                ...state,
                resendOTP: { loading: false },
            };

        case SEND_RESEND_OTP_PHONE_LOGIN_ERROR:
            // Handle the error during the resend OTP request
            return {
                ...state,
                resendOTP: { loading: false },
            };

        default:
            return state;
    }
};

export default LoginReducer;

