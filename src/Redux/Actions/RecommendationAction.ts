export const RECOMMENDATION_API_INTEGRATION_ACTION: any =
    'RECOMMENDATION_API_INTEGRATION_ACTION';
export const RECOMMENDATION_API_SUCCESS_RESPONSE: string =
    'RECOMMENDATION_API_SUCCESS_RESPONSE';
export const RECOMMENDATION_API_FAILURE_RESPONSE: string =
    'RECOMMENDATION_API_FAILURE_RESPONSE';
export const SAVE_POLICY_START_DATE_ACTION: string =
    'SAVE_POLICY_START_DATE_ACTION';

export const CLEAR_RECOMMENDATION_DATA = 'CLEAR_RECOMMENDATION_DATA';

export const RecommendationApiIntegrationAction = (data: any) => {
    return { type: RECOMMENDATION_API_INTEGRATION_ACTION, payload: data };
};

export const SavePolicyStartDateAction = (data: any) => {
    return {
        type: SAVE_POLICY_START_DATE_ACTION,
        payload: data,
    };
};

export const ClearRecommendationData = () => {
    return {
        type: CLEAR_RECOMMENDATION_DATA,
    };
};
