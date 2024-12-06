import Cookies from 'js-cookie';
import {
    CLEAR_SIGN_UP_STATE,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_AUTH_USER_DATA_FAILED,
    GET_AUTH_USER_DATA_REQUEST,
    GET_AUTH_USER_DATA_SUCCESS,
    GET_COMPANY_TYPE_FAILED,
    GET_COMPANY_TYPE_REQUEST,
    GET_COMPANY_TYPE_SUCCESS,
    GET_FUNDING_DETAILS_FAILED,
    GET_FUNDING_DETAILS_REQUEST,
    GET_FUNDING_DETAILS_SUCCESS,
    GET_INDUSTRY_LIST_FAILED,
    GET_INDUSTRY_LIST_REQUEST,
    GET_INDUSTRY_LIST_SUCCESS,
    GET_SUB_INDUSTRY_LIST_FAILED,
    GET_SUB_INDUSTRY_LIST_SUCCESS,
    GET_TURN_OVER_LIST_FAILED,
    GET_TURN_OVER_LIST_REQUEST,
    GET_TURN_OVER_LIST_SUCCESS,
    GET_USER_FOUND,
    GET_USER_NOT_FOUND,
    GET_USER_REQUEST,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    SAVE_ADDITIONAL_DETAILS,
    SAVE_COMPANY_DETAILS,
    SAVE_PERSONAL_DETAILS_FAILED,
    SAVE_PERSONAL_DETAILS_REQUEST,
    SAVE_PERSONAL_DETAILS_SUCCESS,
    SIGNUP_BACK_SCREEN,
    SUBMIT_SIGN_UP_DETAILS_FAILED,
    SUBMIT_SIGN_UP_DETAILS_REQUEST,
    SUBMIT_SIGN_UP_DETAILS_SUCCESS,
    UPDATE_SUB_INDUSTRY_LIST,
    UPDATE_USER_STATE,
    USER_LOGOUT,
    VERIFY_PHONE_LOGIN,
} from '../Actions/AuthActions';

const LoginInitialState = {
    loading: false,
    isLogin: false,
    user: '',
    list_loading: false,
    token: '',
    signUp_step: 1,
    company_type: [],
    funding_details: [],
    turnover_list: [],
    industry_list: [],
    sub_industry_list: [],
    personalDetails: {},
    company_details: {},
    additional_details: {},
    redirect: '',
};

export const AuthReducer = (state = LoginInitialState, action: any) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_USER_FOUND:
            return {
                ...state,
                user: action.payload,
                loading: false,
                // token: action.payload.token,
                isLogin: true,
            };

        case GET_USER_NOT_FOUND:
            return {
                ...state,
                user: '',
                loading: false,
                isLogin: false,
            };

        case GET_AUTH_USER_DATA_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case GET_AUTH_USER_DATA_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                loading: false,
                isLogin: true,
            }
        }

        case GET_AUTH_USER_DATA_FAILED: {
            Cookies.remove('userToken', { path: '', domain: '.covrzy.com' })
            return {
                user: '',
                loading: false,
                isLogin: false,
            }
        }

        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                redirect: 'success',
            };

        case FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                redirect: 'failed',
            };

        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                redirect: 'success',
            };

        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                redirect: 'failed',
            };

        case SAVE_PERSONAL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SAVE_PERSONAL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                personalDetails: action.payload,
                signUp_step: 2,
            };

        case SAVE_PERSONAL_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                personalDetails: {},
            };

        case GET_COMPANY_TYPE_REQUEST:
            return {
                ...state,
                list_loading: true,
            };

        case GET_COMPANY_TYPE_SUCCESS:
            return {
                ...state,
                list_loading: false,
                company_type: action.payload,
            };

        case GET_COMPANY_TYPE_FAILED:
            return {
                ...state,
                list_loading: false,
                company_type: [],
            };

        case GET_FUNDING_DETAILS_REQUEST:
            return {
                ...state,
                list_loading: true,
            };

        case GET_FUNDING_DETAILS_SUCCESS:
            return {
                ...state,
                list_loading: false,
                funding_details: action.payload,
            };

        case GET_FUNDING_DETAILS_FAILED:
            return {
                ...state,
                list_loading: false,
                funding_details: [],
            };

        case GET_TURN_OVER_LIST_REQUEST:
            return {
                ...state,
                list_loading: true,
            };

        case GET_TURN_OVER_LIST_SUCCESS:
            return {
                ...state,
                list_loading: false,
                turnover_list: action.payload,
            };

        case GET_TURN_OVER_LIST_FAILED:
            return {
                ...state,
                list_loading: false,
                turnover_list: [],
            };

        case GET_INDUSTRY_LIST_REQUEST:
            return {
                ...state,
                list_loading: true,
                // sub_industry_list: []
            };

        case GET_INDUSTRY_LIST_SUCCESS:
            return {
                ...state,
                list_loading: false,
                industry_list: action.payload,
                // sub_industry_list: []
            };

        case GET_INDUSTRY_LIST_FAILED:
            return {
                ...state,
                list_loading: false,
                industry_list: [],
                sub_industry_list: [],
            };

        case GET_SUB_INDUSTRY_LIST_SUCCESS:
            return {
                ...state,
                sub_industry_list: action.payload,
            };

        case GET_SUB_INDUSTRY_LIST_FAILED:
            return {
                ...state,
                sub_industry_list: [],
            };

        case UPDATE_SUB_INDUSTRY_LIST:
            return {
                ...state,
                sub_industry_list: action.payload,
            };

        case SAVE_COMPANY_DETAILS:
            return {
                ...state,
                signUp_step: 3,
                company_details: action.payload,
            };

        case SAVE_ADDITIONAL_DETAILS:
            return {
                ...state,
                signUp_step: 4,
                additional_details: action.payload,
            };

        case SUBMIT_SIGN_UP_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SUBMIT_SIGN_UP_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                redirect: action.payload,
            };

        case SUBMIT_SIGN_UP_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                redirect: 'failed',
            };

        case SIGNUP_BACK_SCREEN:
            return {
                ...state,
                signUp_step: state.signUp_step - 1,
            };

        case CLEAR_SIGN_UP_STATE:
            return {
                ...state,
                signUp_step: 1,
                company_type: [],
                funding_details: [],
                turnover_list: [],
                industry_list: [],
                sub_industry_list: [],
                personalDetails: {},
                company_details: {},
                additional_details: {},
                redirect: '',
            };

        case USER_LOGOUT:
            localStorage.clear();
            Cookies.remove('userToken',{ path: '', domain: '.covrzy.com'})
            Cookies.remove('userToken', { domain: '.covrzy.com' })
            return LoginInitialState;

        case UPDATE_USER_STATE:
            return {
                ...state,
                user: action.payload,
            };

        case VERIFY_PHONE_LOGIN:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
            };

        default:
            return state;
    }
};
