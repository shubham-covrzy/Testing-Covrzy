import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';

export const GET_USER_REQUEST: any = 'GET_USER_REQUEST';
export const GET_USER_FOUND: string = 'GET_USER_FOUND';
export const GET_USER_NOT_FOUND: string = 'GET_USER_NOT_FOUND';


export const GET_AUTH_USER_DATA_REQUEST: string = 'GET_AUTH_USER_DATA_REQUEST';
export const GET_AUTH_USER_DATA_SUCCESS: string = 'GET_AUTH_USER_DATA_SUCCESS';
export const GET_AUTH_USER_DATA_FAILED: string = 'GET_AUTH_USER_DATA_FAILED';

export const FORGOT_PASSWORD_REQUEST: any = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: string = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: string = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: any = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: string = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: string = 'RESET_PASSWORD_FAILED';

export const UPDATE_PERSONAL_DETAILS: string = 'UPDATE_PERSONAL_DETAILS';

export const SAVE_PERSONAL_DETAILS_REQUEST: any =
    'SAVE_PERSONAL_DETAILS_REQUEST';
export const SAVE_PERSONAL_DETAILS_SUCCESS: string =
    'SAVE_PERSONAL_DETAILS_SUCCESS';
export const SAVE_PERSONAL_DETAILS_FAILED: string =
    'SAVE_PERSONAL_DETAILS_FAILED';

export const GET_COMPANY_TYPE_REQUEST: any = 'GET_COMPANY_TYPE_REQUEST';
export const GET_COMPANY_TYPE_SUCCESS: string = 'GET_COMPANY_TYPE_SUCCESS';
export const GET_COMPANY_TYPE_FAILED: string = 'GET_COMPANY_TYPE_FAILED';

export const GET_FUNDING_DETAILS_REQUEST: any = 'GET_FUNDING_DETAILS_REQUEST';
export const GET_FUNDING_DETAILS_SUCCESS: string =
    'GET_FUNDING_DETAILS_SUCCESS';
export const GET_FUNDING_DETAILS_FAILED: string = 'GET_FUNDING_DETAILS_FAILED';

export const GET_TURN_OVER_LIST_REQUEST: any = 'GET_TURN_OVER_LIST_REQUEST';
export const GET_TURN_OVER_LIST_SUCCESS: string = 'GET_TURN_OVER_LIST_SUCCESS';
export const GET_TURN_OVER_LIST_FAILED: string = 'GET_TURN_OVER_LIST_FAILED';

export const GET_INDUSTRY_LIST_REQUEST: any = 'GET_INDUSTRY_LIST_REQUEST';
export const GET_INDUSTRY_LIST_SUCCESS: string = 'GET_INDUSTRY_LIST_SUCCESS';
export const GET_INDUSTRY_LIST_FAILED: string = 'GET_INDUSTRY_LIST_FAILED';

export const GET_SUB_INDUSTRY_LIST_REQUEST: any =
    'GET_SUB_INDUSTRY_LIST_REQUEST';
export const GET_SUB_INDUSTRY_LIST_SUCCESS: string =
    'GET_SUB_INDUSTRY_LIST_SUCCESS';
export const GET_SUB_INDUSTRY_LIST_FAILED: string =
    'GET_SUB_INDUSTRY_LIST_FAILED';

export const SAVE_COMPANY_DETAILS: string = 'SAVE_COMPANY_DETAILS';

export const UPDATE_SUB_INDUSTRY_LIST: string = 'UPDATE_SUB_INDUSTRY_LIST';

export const SAVE_ADDITIONAL_DETAILS: string = 'SAVE_ADDITIONAL_DETAILS';

export const SUBMIT_SIGN_UP_DETAILS_REQUEST: any =
    'SUBMIT_SIGN_UP_DETAILS_REQUEST';
export const SUBMIT_SIGN_UP_DETAILS_SUCCESS: string =
    'SUBMIT_SIGN_UP_DETAILS_SUCCESS';
export const SUBMIT_SIGN_UP_DETAILS_FAILED: string =
    'SUBMIT_SIGN_UP_DETAILS_FAILED';

export const CLEAR_SIGN_UP_STATE: string = 'CLEAR_SIGN_UP_STATE';

export const USER_LOGOUT: String = 'USER_LOGOUT';

export const SIGNUP_BACK_SCREEN: string = 'SIGNUP_BACK_SCREEN';

export const UPDATE_USER_STATE: string = 'UPDATE_USER_STATE';

export const VERIFY_PHONE_LOGIN: any = 'VERIFY_PHONE_LOGIN';

export const REDIRECT_TO_QUOTE_PAGE: any = 'REDIRECT_TO_QUOTE_PAGE';

export interface ILogin {
    email: string;
    password: string;
}

interface ForgotPassword {
    email: string;
}

interface ResetPassword {
    data: {
        new_password: string;
        confirm_password: string;
        is_validateToken: boolean;
    };
    token: string;
}

export interface IPersonalDetails {
    id: number;
    company_name: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    job_title: string;
    profile: string;
    company_id: number;
}

export interface ICompanyDetails {
    company_type: number;
    industry: number;
    sub_industry: number;
    turnover: number;
    funding_detail: number;
    is_companyfunded: boolean;
}

export interface IAdditionalDetails {
    number_of_employee: number;
    previous_policy: boolean;
    policy_name: string;
    policy_start_date: string;
    policy_end_date: string;
    policy_coverage_amount: number;
    policy_insurer: string;
}

interface ISignUpDetails {
    personalDetails: {
        id: number;
    };
    companyDetails: {
        id: number;
        company_type: number;
        industry: number;
        sub_industry: number;
        turnover: number;
        funding_detail: number;
        is_profileCompleted: boolean;
    };
    additionalDetails: {
        number_of_employee: number;
        previous_policy: boolean;
        policy_name: string;
        policy_start_date: string;
        policy_end_date: string;
        policy_coverage_amount: number;
        policy_insurer: string;
    };
}


/**
 * Interface for verifying phone login.
 *
 * @interface IVerifyPhoneLogin
 */
interface IVerifyPhoneLogin {
    /**
     * The token for verifying phone login.
     *
     * @type {string}
     * @memberof IVerifyPhoneLogin
     */
    token: string;

    /**
     * The request ID for verifying phone login.
     *
     * @type {string}
     * @memberof IVerifyPhoneLogin
     */
    requestId?: string;

    /**
     * The navigation function for verifying phone login.
     *
     * @type {NavigateFunction}
     * @memberof IVerifyPhoneLogin
     */
    navigate: NavigateFunction;

    /**
     * Indicates if the navigation should occur after verifying phone login.
     *
     * @type {boolean}
     * @memberof IVerifyPhoneLogin
     */
    shouldNavigate?: boolean;

}
// Login
export const LoginAction = (data: ILogin) => {
    return { type: GET_USER_REQUEST, payload: data };
};

// Forgot Password
export const ForgotPasswordAction = (data: ForgotPassword) => {
    return { type: FORGOT_PASSWORD_REQUEST, payload: data };
};

// Reset Password
export const ResetPasswordAction = (data: ResetPassword) => {
    return { type: RESET_PASSWORD_REQUEST, payload: data };
};

// sign-up personal details
export const SavePersonalDetailsAction = (data: any) => {
    return {
        type: SAVE_PERSONAL_DETAILS_REQUEST,
        payload: data?.data,
        jsonPayload: data?.jsonData,
    };
};

// sign-up company details
export const GetCompanyTypeAction = () => {
    return { type: GET_COMPANY_TYPE_REQUEST };
};

export const GetFundingDetailsAction = () => {
    return { type: GET_FUNDING_DETAILS_REQUEST };
};

export const GetTurnOverListAction = () => {
    return { type: GET_TURN_OVER_LIST_REQUEST };
};

export const GetIndustryListAction = () => {
    return { type: GET_INDUSTRY_LIST_REQUEST };
};

export const GetSubIndustryListAction = (id: string) => {
    return { type: GET_SUB_INDUSTRY_LIST_REQUEST, payload: id };
};

// export const SaveCompanyDetailsAction = (data: ICompanyDetails | any) => {
//   return { type: SAVE_COMPANY_DETAILS, payload: data }
// }

export const UpdateSubIndustryListAction = (data: any) => {
    return { type: UPDATE_SUB_INDUSTRY_LIST, payload: data };
};

// Sign-up additional details
export const SaveAdditionalDetailsAction = (data: IAdditionalDetails | any) => {
    return { type: SAVE_ADDITIONAL_DETAILS, payload: data };
};

// submit signup details
export const SubmitSignUpDetailsAction = (data: ISignUpDetails) => {
    return { type: SUBMIT_SIGN_UP_DETAILS_REQUEST, payload: data };
};

export const ClearSignUpStateAction = () => {
    return { type: CLEAR_SIGN_UP_STATE };
};

// Update user state
export const UpdateUserStateAction = (token: string) => {
    return { type: UPDATE_USER_STATE, payload: token };
};

// screen back
export const SignUpBackScreenAction = () => {
    return { type: SIGNUP_BACK_SCREEN };
};

// Logout
export const LogoutAction = () => {
    const authData = localStorage.getItem('EmployeeToken') ?? 'null';
    localStorage.clear();
    localStorage.setItem('EmployeeToken', authData);
    Cookies.remove('userToken', { path: '', domain: '.covrzy.com' })
    return {
        type: USER_LOGOUT,
    };
};

// Verify Phone Login
/**
 * Action creator for verifying phone login.
 * 
 * @param {IVerifyPhoneLogin} data - Object containing the token, requestId, navigate function, and shouldNavigate flag.
 * @returns {Object} - Action object with type VERIFY_PHONE_LOGIN and payload data.
 */
export const VerifyPhoneLogin = (data: IVerifyPhoneLogin) => {
    // Create action object with type VERIFY_PHONE_LOGIN, navigate function from data, and payload data with token and requestId.
    return {
        type: VERIFY_PHONE_LOGIN,
        navigate: data.navigate,
        payload: {
            token: data.token,
            requestId: data.requestId
        },
        shouldNavigate: data.shouldNavigate,
    };
};


// Get user data in case the token is logged in on some other site.
export const GetUserAuthData = () => {
    return { type: GET_AUTH_USER_DATA_REQUEST }
}
