import {
    GET_PURCHASED_POLICIES_FAILED,
    GET_PURCHASED_POLICIES_REQUEST,
    GET_PURCHASED_POLICIES_SUCCESS,
    GET_SINGLE_PURCHASED_POLICY_FAILED,
    GET_SINGLE_PURCHASED_POLICY_REQEUST,
    GET_SINGLE_PURCHASED_POLICY_SUCCESS,
} from '../Actions/PurchasesAction';

const InitialState = {
    loading: false,
    purchasedPolicies: [],
    policy: {},
};

export const PurchasesReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case GET_PURCHASED_POLICIES_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_PURCHASED_POLICIES_SUCCESS:
            return {
                ...state,
                loading: false,
                purchasedPolicies: action.payload,
            };

        case GET_PURCHASED_POLICIES_FAILED:
            return {
                ...state,
                loading: false,
                purchasedPolicies: [],
            };

        case GET_SINGLE_PURCHASED_POLICY_REQEUST:
            return {
                ...state,
                loading: true,
            };

        case GET_SINGLE_PURCHASED_POLICY_SUCCESS:
            return {
                ...state,
                loading: false,
                policy: action.payload,
            };

        case GET_SINGLE_PURCHASED_POLICY_FAILED:
            return {
                ...state,
                loading: false,
                policy: {},
            };

        default:
            return state;
    }
};
