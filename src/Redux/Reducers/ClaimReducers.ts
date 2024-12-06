import {
    CLEAR_CLAIM_STATE,
    GET_ACTIVE_PLANS_FAILED,
    GET_ACTIVE_PLANS_REQUEST,
    GET_ACTIVE_PLANS_SUCCESS,
    GET_IN_ACTIVE_PLANS_FAILED,
    GET_IN_ACTIVE_PLANS_REQUEST,
    GET_IN_ACTIVE_PLANS_SUCCESS,
    GET_PURCHASED_POLICY_FAILED,
    GET_PURCHASED_POLICY_REQUEST,
    GET_PURCHASED_POLICY_SUCCESS,
    GET_SINGLE_ACTIVE_PLAN_FAILED,
    GET_SINGLE_ACTIVE_PLAN_REQUEST,
    GET_SINGLE_ACTIVE_PLAN_SUCCESS,
    UPLOAD_CLAIM_PROOF_FAILED,
    UPLOAD_CLAIM_PROOF_REQUEST,
    UPLOAD_CLAIM_PROOF_SUCCESS,
    VIEW_ALL_CLAIM_FAILED,
    VIEW_ALL_CLAIM_REQUEST,
    VIEW_ALL_CLAIM_SUCCESS,
} from '../Actions/ClaimActions';

const InitialState = {
    loading: false,
    active_policies: [],
    active_packages: [],
    inActive_policies: [],
    inActive_packages: [],
    view_active_plan: {},
    claim_policies: [],
    claim_packages: [],
    redirect: false,
    purchased_policy: {},
};

export const ClaimReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case GET_ACTIVE_PLANS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ACTIVE_PLANS_SUCCESS:
            return {
                ...state,
                loading: false,
                active_policies: action.payload?.policies,
                active_packages: action.payload?.packages,
            };

        case GET_ACTIVE_PLANS_FAILED:
            return {
                ...state,
                loading: false,
                active_policies: [],
                active_packages: [],
            };

        case GET_IN_ACTIVE_PLANS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_IN_ACTIVE_PLANS_SUCCESS:
            return {
                ...state,
                loading: false,
                inActive_policies: action.payload?.policies,
                inActive_packages: action.payload?.packages,
            };

        case GET_IN_ACTIVE_PLANS_FAILED:
            return {
                ...state,
                loading: false,
                inActive_policies: [],
                inActive_packages: [],
            };

        case GET_SINGLE_ACTIVE_PLAN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_SINGLE_ACTIVE_PLAN_SUCCESS:
            return {
                ...state,
                loading: false,
                view_active_plan: action.payload,
            };

        case GET_SINGLE_ACTIVE_PLAN_FAILED:
            return {
                ...state,
                loading: false,
                view_active_plan: {},
            };

        case VIEW_ALL_CLAIM_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case VIEW_ALL_CLAIM_SUCCESS:
            return {
                ...state,
                loading: false,
                claim_policies: action.payload?.policies,
                claim_packages: action.payload?.packages,
            };

        case VIEW_ALL_CLAIM_FAILED:
            return {
                ...state,
                loading: false,
                claim_policies: [],
                claim_packages: [],
            };

        case UPLOAD_CLAIM_PROOF_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPLOAD_CLAIM_PROOF_SUCCESS:
            return {
                ...state,
                loading: false,
                redirect: true,
            };

        case UPLOAD_CLAIM_PROOF_FAILED:
            return {
                ...state,
                loading: false,
                redirect: false,
            };

        case GET_PURCHASED_POLICY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_PURCHASED_POLICY_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased_policy: action?.payload,
            };

        case GET_PURCHASED_POLICY_FAILED:
            return {
                ...state,
                loading: false,
                purchased_policy: {},
            };

        case CLEAR_CLAIM_STATE:
            return {
                ...state,
                loading: false,
                redirect: false,
                view_active_plan: {},
            };

        default:
            return state;
    }
};
