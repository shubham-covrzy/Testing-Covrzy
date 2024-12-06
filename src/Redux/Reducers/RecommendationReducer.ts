import {
    CLEAR_RECOMMENDATION_DATA,
    RECOMMENDATION_API_FAILURE_RESPONSE,
    RECOMMENDATION_API_INTEGRATION_ACTION,
    RECOMMENDATION_API_SUCCESS_RESPONSE,
    SAVE_POLICY_START_DATE_ACTION,
} from '../Actions/RecommendationAction';

const initialState = {
    loading: false,
    navigator: false,
    recommendationResponse: {},
    policyStartDate: '',
    policyEndDate: '',
};

export const RecommendationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case RECOMMENDATION_API_INTEGRATION_ACTION:
            return {
                ...state,
                loading: true,
            };
        case RECOMMENDATION_API_SUCCESS_RESPONSE:
            return {
                ...state,
                loading: false,
                navigator: true,
                recommendationResponse: action.payload,
            };
        case RECOMMENDATION_API_FAILURE_RESPONSE:
            return {
                ...state,
                loading: false,
                navigator: false,
            };

        case SAVE_POLICY_START_DATE_ACTION:
            return {
                ...state,
                policyStartDate: action.payload.policyStartDate,
                policyEndDate: action.payload.policyEndDate,
            };

        case CLEAR_RECOMMENDATION_DATA:
            return {
                ...state,
                loading: false,
                navigator: false,
                recommendationResponse: {},
            };

        default:
            return state;
    }
};
