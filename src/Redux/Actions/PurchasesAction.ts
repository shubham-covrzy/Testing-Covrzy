export const GET_PURCHASED_POLICIES_REQUEST: any =
    'GET_PURCHASED_POLICIES_REQUEST';
export const GET_PURCHASED_POLICIES_SUCCESS: string =
    'GET_PURCHASED_POLICIES_SUCCESS';
export const GET_PURCHASED_POLICIES_FAILED: string =
    'GET_PURCHASED_POLICIES_FAILED';

export const GET_SINGLE_PURCHASED_POLICY_REQEUST: any =
    'GET_SINGLE_PURCHASED_POLICY_REQEUST';
export const GET_SINGLE_PURCHASED_POLICY_SUCCESS: string =
    'GET_SINGLE_PURCHASED_POLICY_SUCCESS';
export const GET_SINGLE_PURCHASED_POLICY_FAILED: string =
    'GET_SINGLE_PURCHASED_POLICY_FAILED';

interface IPolicyData {
    status: string[];
}

export const GetPurchasedPoliciesAction = (data: IPolicyData) => {
    return { type: GET_PURCHASED_POLICIES_REQUEST, payload: data };
};

export const GetSinglePurchasedPolicyAction = (policyId: string) => {
    return { type: GET_SINGLE_PURCHASED_POLICY_REQEUST, payload: policyId };
};
