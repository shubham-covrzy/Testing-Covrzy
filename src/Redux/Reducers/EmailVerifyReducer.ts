import {
    CLEAR_EMAIL_VERIFY_STATE,
    GET_OTP_REQ_FAILED,
    GET_OTP_REQ_REQUEST,
    GET_OTP_REQ_SUCCESS,
    VERIFY_OTP_FAILED,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
} from '../Actions/EmailVerifyAction';

const LoginInitialState = {
    getOtpLoading: false,
    getOtp: false,
    verifyOtpLoading: false,
    emailVerified: false,
};

export const EmailVerifyReducer = (state = LoginInitialState, action: any) => {
    switch (action.type) {
        case GET_OTP_REQ_REQUEST:
            return {
                ...state,
                getOtpLoading: true,
            };

        case GET_OTP_REQ_SUCCESS:
            return {
                ...state,
                getOtpLoading: false,
                getOtp: true,
            };

        case GET_OTP_REQ_FAILED:
            return {
                ...state,
                getOtpLoading: false,
                getOtp: false,
            };

        case VERIFY_OTP_REQUEST:
            return {
                ...state,
                verifyOtpLoading: true,
            };

        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                verifyOtpLoading: false,
                emailVerified: true,
            };

        case VERIFY_OTP_FAILED:
            return {
                ...state,
                verifyOtpLoading: false,
                emailVerified: false,
            };

        case CLEAR_EMAIL_VERIFY_STATE:
            return {
                ...state,
                getOtpLoading: false,
                getOtp: false,
                verifyOtpLoading: false,
                emailVerified: false,
            };

        default:
            return state;
    }
};
