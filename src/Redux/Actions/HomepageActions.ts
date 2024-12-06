export const GET_POLICIES_LIST_REQUEST: any = 'GET_POLICIES_LIST_REQUEST';
export const GET_POLICIES_LIST_SUCCESS: string = 'GET_POLICIES_LIST_SUCCESS';
export const GET_POLICIES_LIST_FAILED: string = 'GET_POLICIES_LIST_FAILED';

export const GET_POLICY_BY_ID_REQUEST: any = 'GET_POLICY_BY_ID_REQUEST';
export const GET_POLICY_BY_ID_SUCCESS: string = 'GET_POLICY_BY_ID_SUCCESS';
export const GET_POLICY_BY_ID_FAILED: string = 'GET_POLICY_BY_ID_FAILED';

export const GET_ALL_PACKAGES_REQUEST: any = 'GET_ALL_PACKAGES_REQUEST';
export const GET_ALL_PACKAGES_SUCCESS: string = 'GET_ALL_PACKAGES_SUCCESS';
export const GET_ALL_PACKAGES_FAILED: string = 'GET_ALL_PACKAGES_FAILED';

export const GET_PACKAGES_DETAILS_REQUEST: any = 'GET_PACKAGES_DETAILS_REQUEST';
export const GET_PACKAGES_DETAILS_SUCCESS: string =
    'GET_PACKAGES_DETAILS_SUCCESS';
export const GET_PACKAGES_DETAILS_FAILED: string =
    'GET_PACKAGES_DETAILS_FAILED';

export const GetPoliciesListAction = () => {
    return { type: GET_POLICIES_LIST_REQUEST };
};

export const GetPolicyByIdAction = (id: string) => {
    return { type: GET_POLICY_BY_ID_REQUEST, payload: id };
};

export const GetAllPackagesAction = () => {
    return { type: GET_ALL_PACKAGES_REQUEST };
};

export const GetPackageDetailsAction = (id: string) => {
    return { type: GET_PACKAGES_DETAILS_REQUEST, payload: id };
};
