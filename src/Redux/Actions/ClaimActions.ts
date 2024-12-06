export const GET_ACTIVE_PLANS_REQUEST: any = 'GET_ACTIVE_PLANS_REQUEST';
export const GET_ACTIVE_PLANS_SUCCESS: string = 'GET_ACTIVE_PLANS_SUCCESS';
export const GET_ACTIVE_PLANS_FAILED: string = 'GET_ACTIVE_PLANS_FAILED';

export const GET_IN_ACTIVE_PLANS_REQUEST: any = 'GET_IN_ACTIVE_PLANS_REQUEST';
export const GET_IN_ACTIVE_PLANS_SUCCESS: string =
    'GET_IN_ACTIVE_PLANS_SUCCESS';
export const GET_IN_ACTIVE_PLANS_FAILED: string = 'GET_IN_ACTIVE_PLANS_FAILED';

export const GET_SINGLE_ACTIVE_PLAN_REQUEST: any =
    'GET_SINGLE_ACTIVE_PLAN_REQUEST';
export const GET_SINGLE_ACTIVE_PLAN_SUCCESS: string =
    'GET_SINGLE_ACTIVE_PLAN_SUCCESS';
export const GET_SINGLE_ACTIVE_PLAN_FAILED: string =
    'GET_SINGLE_ACTIVE_PLAN_FAILED';

export const VIEW_ALL_CLAIM_REQUEST: any = 'VIEW_ALL_CLAIM_REQUEST';
export const VIEW_ALL_CLAIM_SUCCESS: string = 'VIEW_ALL_CLAIM_SUCCESS';
export const VIEW_ALL_CLAIM_FAILED: string = 'VIEW_ALL_CLAIM_FAILED';

export const UPLOAD_CLAIM_PROOF_REQUEST: any = 'UPLOAD_CLAIM_PROOF_REQUEST';
export const UPLOAD_CLAIM_PROOF_SUCCESS: string = 'UPLOAD_CLAIM_PROOF_SUCCESS';
export const UPLOAD_CLAIM_PROOF_FAILED: string = 'UPLOAD_CLAIM_PROOF_FAILED';

export const GET_PURCHASED_POLICY_REQUEST: any = 'GET_PURCHASED_POLICY_REQUEST';
export const GET_PURCHASED_POLICY_SUCCESS: string =
    'GET_PURCHASED_POLICY_SUCCESS';
export const GET_PURCHASED_POLICY_FAILED: string =
    'GET_PURCHASED_POLICY_FAILED';

export const CLEAR_CLAIM_STATE: string = 'CLEAR_CLAIM_STATE';

interface SingleActivePlan {
    activePlanId: string;
    activePlan: string;
    policyId: string;
}

export const GetActivePlansAction = () => {
    return { type: GET_ACTIVE_PLANS_REQUEST };
};

export const GetInActivePlansAction = () => {
    return { type: GET_IN_ACTIVE_PLANS_REQUEST };
};

export const GetSingleActivePlanAction = (data: SingleActivePlan) => {
    return {
        type: GET_SINGLE_ACTIVE_PLAN_REQUEST,
        payload: {
            id: data?.activePlanId,
            is_policy: data?.activePlan === 'activePolicy' ? true : false,
            policy_id: data?.policyId,
        },
    };
};

export const ViewAllClaimAction = () => {
    return { type: VIEW_ALL_CLAIM_REQUEST };
};

export const UploadClaimProofAction = (data: FormData) => {
    return { type: UPLOAD_CLAIM_PROOF_REQUEST, payload: data };
};

export const ClearClaimStateAction = () => {
    return { type: CLEAR_CLAIM_STATE };
};

export const GetPurchasedPolicyPoints = (id: string) => {
    return { type: GET_PURCHASED_POLICY_REQUEST, policy_id: id };
};
