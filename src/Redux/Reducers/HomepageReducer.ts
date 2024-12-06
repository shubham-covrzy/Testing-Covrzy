import {
    GET_ALL_PACKAGES_FAILED,
    GET_ALL_PACKAGES_REQUEST,
    GET_ALL_PACKAGES_SUCCESS,
    GET_PACKAGES_DETAILS_FAILED,
    GET_PACKAGES_DETAILS_REQUEST,
    GET_PACKAGES_DETAILS_SUCCESS,
    GET_POLICIES_LIST_FAILED,
    GET_POLICIES_LIST_SUCCESS,
    GET_POLICY_BY_ID_FAILED,
    GET_POLICY_BY_ID_SUCCESS,
} from '../Actions/HomepageActions';

const InitialState = {
    loading: false,
    policies_list: [],
    package_list: [],
    view_single_policy: {},
    package_details: [],
    package_details_addOn: [],
};

export const HomepageReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case GET_POLICIES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                policies_list: action.payload,
            };

        case GET_POLICIES_LIST_FAILED:
            return {
                ...state,
                loading: false,
                policies_list: [],
            };

        case GET_ALL_PACKAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_ALL_PACKAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                package_list: action.payload,
            };

        case GET_ALL_PACKAGES_FAILED:
            return {
                ...state,
                loading: false,
                package_list: [],
            };

        case GET_PACKAGES_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_PACKAGES_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                package_details: action.payload?.core?.[0],
                package_details_addOn: action.payload?.addon?.[0],
            };

        case GET_PACKAGES_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                package_details: [],
            };

        case GET_POLICY_BY_ID_SUCCESS:
            return {
                ...state,
                view_single_policy: action.payload,
            };

        case GET_POLICY_BY_ID_FAILED:
            return {
                ...state,
                view_single_policy: {},
            };

        default:
            return state;
    }
};
