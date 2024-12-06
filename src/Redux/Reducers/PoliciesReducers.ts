import {
    ADD_NON_COVERZY_POLICIY_FAILED,
    ADD_NON_COVERZY_POLICIY_REQUEST,
    ADD_NON_COVERZY_POLICIY_SUCCESS,
    CLEAR_POLICIES_STATE,
    DELETE_NON_COVERZY_POLICIY_FAILED,
    DELETE_NON_COVERZY_POLICIY_REQUEST,
    DELETE_NON_COVERZY_POLICIY_SUCCESS,
    GET_NON_COVERZY_POLICIY_FAILED,
    GET_NON_COVERZY_POLICIY_REQUEST,
    GET_NON_COVERZY_POLICIY_SUCCESS,
    VIEW_NON_COVERZY_POLICIY_FAILED,
    VIEW_NON_COVERZY_POLICIY_REQUEST,
    VIEW_NON_COVERZY_POLICIY_SUCCESS,
    DOWNLOAD_PURCHASED_POLICY_REQUEST,
    DOWNLOAD_PURCHASED_POLICY_SUCCESS,
    DOWNLOAD_PURCHASED_POLICY_FAILED,
} from '../Actions/PoliciesActions';

const InitialState = {
    loading: false,
    success: false,
    non_covrzy_policies: [],
    view_policy: {},
    policyNumber: '',
    policyPDF: {},
    redirect: '',
};

export const PoliciesReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case ADD_NON_COVERZY_POLICIY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADD_NON_COVERZY_POLICIY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };

        case ADD_NON_COVERZY_POLICIY_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
            };

        case GET_NON_COVERZY_POLICIY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_NON_COVERZY_POLICIY_SUCCESS:
            return {
                ...state,
                loading: false,
                non_covrzy_policies: action.payload,
            };

        case GET_NON_COVERZY_POLICIY_FAILED:
            return {
                ...state,
                loading: false,
                non_covrzy_policies: [],
            };

        case VIEW_NON_COVERZY_POLICIY_REQUEST:
            return {
                ...state,
                loading: true,
                view_policy: {},
            };

        case VIEW_NON_COVERZY_POLICIY_SUCCESS:
            return {
                ...state,
                loading: false,
                view_policy: action.payload,
            };

        case VIEW_NON_COVERZY_POLICIY_FAILED:
            return {
                ...state,
                loading: false,
                view_policy: {},
            };

        case DELETE_NON_COVERZY_POLICIY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_NON_COVERZY_POLICIY_SUCCESS:
            return {
                ...state,
                loading: false,
                redirect: action.payload,
            };

        case DELETE_NON_COVERZY_POLICIY_FAILED:
            return {
                ...state,
                loading: false,
                redirect: action.payload,
            };

        case CLEAR_POLICIES_STATE:
            return {
                ...state,
                loading: false,
                success: false,
                redirect: '',
            };

        case DOWNLOAD_PURCHASED_POLICY_REQUEST:
            return {
                ...state,
                policyNumber: action.payload.policyNumber,
                loading: true,
            };

        case DOWNLOAD_PURCHASED_POLICY_SUCCESS:
            return {
                ...state,
                policyPDF: {
                    ...state.policyPDF,
                    [state.policyNumber]: action.payload,
                },
                loading: false,
            };

        case DOWNLOAD_PURCHASED_POLICY_FAILED:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
};
