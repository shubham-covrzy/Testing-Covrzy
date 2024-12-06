import Cookies from 'js-cookie';
import { USER_LOGOUT } from '../Actions/AuthActions';
import {
    ADD_USER_DATA_TEAM_FAILED,
    ADD_USER_DATA_TEAM_REQUEST,
    ADD_USER_DATA_TEAM_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CLEAR_RESPONSE_ACTION,
    DELETE_USER_DATA_TEAM_FAILED,
    DELETE_USER_DATA_TEAM_REQUEST,
    DELETE_USER_DATA_TEAM_SUCCESS,
    GET_COMPANY_DATA_FAILED,
    GET_COMPANY_DATA_REQUEST,
    GET_COMPANY_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_TEAM_FAILED,
    GET_USER_DATA_TEAM_REQUEST,
    // GET_USER_DATA_TEAM_REQUEST,
    GET_USER_DATA_TEAM_SUCCESS,
    UPDATE_COMPANY_DATA_FAILED,
    UPDATE_COMPANY_DATA_REQUEST,
    UPDATE_COMPANY_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_TEAM_FAILED,
    UPDATE_USER_DATA_TEAM_REQUEST,
    UPDATE_USER_DATA_TEAM_SUCCESS,
} from '../Actions/UserProfileAction';

const InitialState = {
    loading: false,
    userProfile: {},
    success: false,
    companyData: {},
    redirect: '',
    team_users: [],
};

export const UserProfileReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case UPDATE_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userProfile: action.payload,
            };

        case UPDATE_USER_DATA_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
            };

        case GET_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                userProfile: action.payload,
            };

        case GET_USER_DATA_FAILED:
            return {
                ...state,
                loading: false,
                userProfile: {},
            };

        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
            };

        case CLEAR_RESPONSE_ACTION:
            return {
                ...state,
                success: false,
                redirect: '',
            };

        case GET_COMPANY_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_COMPANY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                companyData: action.payload,
            };

        case GET_COMPANY_DATA_FAILED:
            return {
                ...state,
                loading: false,
                companyData: {},
            };

        case UPDATE_COMPANY_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_COMPANY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                redirect: action.payload,
            };

        case UPDATE_COMPANY_DATA_FAILED:
            return {
                ...state,
                loading: false,
                redirect: 'failed',
            };

        case ADD_USER_DATA_TEAM_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADD_USER_DATA_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };

        case ADD_USER_DATA_TEAM_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
            };

        case GET_USER_DATA_TEAM_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_USER_DATA_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                team_users: action.payload,
            };

        case GET_USER_DATA_TEAM_FAILED:
            return {
                ...state,
                loading: false,
                team_users: [],
            };

        case UPDATE_USER_DATA_TEAM_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_USER_DATA_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };

        case UPDATE_USER_DATA_TEAM_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
            };

        case DELETE_USER_DATA_TEAM_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_USER_DATA_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };

        case DELETE_USER_DATA_TEAM_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
            };

        case USER_LOGOUT:
            localStorage.clear();
            Cookies.remove('userToken', { path: '', domain: '.covrzy.com' })
            return InitialState;

        default:
            return state;
    }
};
