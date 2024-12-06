export const GET_OTP_REQ_REQUEST: any = 'GET_OTP_REQ_REQUEST';
export const GET_OTP_REQ_SUCCESS: string = 'GET_OTP_REQ_SUCCESS';
export const GET_OTP_REQ_FAILED: string = 'GET_OTP_REQ_FAILED';

export const VERIFY_OTP_REQUEST: any = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS: string = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILED: string = 'VERIFY_OTP_FAILED';

export const CLEAR_EMAIL_VERIFY_STATE: string = 'CLEAR_EMAIL_VERIFY_STATE';

export interface IGetOtpAction {
    email_address: string;
}

export interface IVerifyOtpAction {
    email_address: string;
    otp: string;
}

export const GetOtpReqAction = (data: IGetOtpAction) => {
    return { type: GET_OTP_REQ_REQUEST, payload: data };
};

export const VerifyOtpAction = (data: IVerifyOtpAction) => {
    return { type: VERIFY_OTP_REQUEST, payload: data };
};

export const ClearEmailVerifyStateAction = () => {
    return { type: CLEAR_EMAIL_VERIFY_STATE };
};
