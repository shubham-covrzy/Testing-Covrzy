export const ADD_NON_COVERZY_POLICIY_REQUEST: any =
    'ADD_NON_COVERZY_POLICIY_REQUEST';
export const ADD_NON_COVERZY_POLICIY_SUCCESS: string =
    'ADD_NON_COVERZY_POLICIY_SUCCESS';
export const ADD_NON_COVERZY_POLICIY_FAILED: string =
    'ADD_NON_COVERZY_POLICIY_FAILED';

export const GET_NON_COVERZY_POLICIY_REQUEST: any =
    'GET_NON_COVERZY_POLICIY_REQUEST';
export const GET_NON_COVERZY_POLICIY_SUCCESS: string =
    'GET_NON_COVERZY_POLICIY_SUCCESS';
export const GET_NON_COVERZY_POLICIY_FAILED: string =
    'GET_NON_COVERZY_POLICIY_FAILED';

export const VIEW_NON_COVERZY_POLICIY_REQUEST: any =
    'VIEW_NON_COVERZY_POLICIY_REQUEST';
export const VIEW_NON_COVERZY_POLICIY_SUCCESS: string =
    'VIEW_NON_COVERZY_POLICIY_SUCCESS';
export const VIEW_NON_COVERZY_POLICIY_FAILED: string =
    'VIEW_NON_COVERZY_POLICIY_FAILED';

export const DELETE_NON_COVERZY_POLICIY_REQUEST: any =
    'DELETE_NON_COVERZY_POLICIY_REQUEST';
export const DELETE_NON_COVERZY_POLICIY_SUCCESS: string =
    'DELETE_NON_COVERZY_POLICIY_SUCCESS';
export const DELETE_NON_COVERZY_POLICIY_FAILED: string =
    'DELETE_NON_COVERZY_POLICIY_FAILED';

export const DOWNLOAD_NON_COVRZY_POLICY_REQUEST: any =
    'DOWNLOAD_NON_COVRZY_POLICY_REQUEST';
export const DOWNLOAD_NON_COVRZY_POLICY_SUCCESS: string =
    'DOWNLOAD_NON_COVRZY_POLICY_SUCCESS';
export const DOWNLOAD_NON_COVRZY_POLICY_FAILURE: string =
    'DOWNLOAD_NON_COVRZY_POLICY_FAILURE';

export const CLEAR_POLICIES_STATE: string = 'CLEAR_POLICIES_STATE';

export const DOWNLOAD_PURCHASED_POLICY_REQUEST: any =
    'DOWNLOAD_PURCHASED_POLICY_REQUEST';
export const DOWNLOAD_PURCHASED_POLICY_SUCCESS: string =
    'DOWNLOAD_PURCHASED_POLICY_SUCCESS';
export const DOWNLOAD_PURCHASED_POLICY_FAILED: string =
    'DOWNLOAD_PURCHASED_POLICY_FAILED';

export interface PurchasedPolicyDownloadData {
    correlationId: string | any;
    policyNumber: string | any;
    customerId: string | any;
}

export const GetNonCoverzyPoliciesAction = () => {
    return { type: GET_NON_COVERZY_POLICIY_REQUEST };
};

export const AddNonCoverzyPoliciyAction = (data: FormData) => {
    return { type: ADD_NON_COVERZY_POLICIY_REQUEST, payload: data };
};

export const ClearPoliciesStateAction = () => {
    return { type: CLEAR_POLICIES_STATE };
};

export const ViewNonCoverzyPolicyDataAction = (id: string) => {
    return { type: VIEW_NON_COVERZY_POLICIY_REQUEST, payload: id };
};

export const DeleteNonCoverzyPolicyDataAction = (id: string) => {
    return { type: DELETE_NON_COVERZY_POLICIY_REQUEST, payload: id };
};

export const DownloadNonCovrzyAction = (id: string) => {
    return { type: DOWNLOAD_NON_COVRZY_POLICY_REQUEST, payload: id };
};

export const DownloadPurchasedPolicyAction = (
    data: PurchasedPolicyDownloadData,
) => {
    return { type: DOWNLOAD_PURCHASED_POLICY_REQUEST, payload: data };
};
