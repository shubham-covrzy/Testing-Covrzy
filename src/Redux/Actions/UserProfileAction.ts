export const UPDATE_USER_DATA_REQUEST: any = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS: string = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED: string = 'UPDATE_USER_DATA_FAILED';

export const GET_USER_DATA_REQUEST: any = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS: string = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: string = 'GET_USER_DATA_FAILED';

export const CHANGE_PASSWORD_REQUEST: any = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS: string = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILED: string = 'CHANGE_PASSWORD_FAILED';

export const CLEAR_RESPONSE_ACTION = 'CLEAR_RESPONSE_ACTION';

export const GET_COMPANY_DATA_REQUEST: any = 'GET_COMPANY_DATA_REQUEST';
export const GET_COMPANY_DATA_SUCCESS: string = 'GET_COMPANY_DATA_SUCCESS';
export const GET_COMPANY_DATA_FAILED: string = 'GET_COMPANY_DATA_FAILED';

export const UPDATE_COMPANY_DATA_REQUEST: any = 'UPDATE_COMPANY_DATA_REQUEST';
export const UPDATE_COMPANY_DATA_SUCCESS: string =
    'UPDATE_COMPANY_DATA_SUCCESS';
export const UPDATE_COMPANY_DATA_FAILED: string = 'UPDATE_COMPANY_DATA_FAILED';

export const ADD_USER_DATA_TEAM_REQUEST: any = 'ADD_USER_DATA_TEAM_REQUEST';
export const ADD_USER_DATA_TEAM_SUCCESS: string = 'ADD_USER_DATA_TEAM_SUCCESS';
export const ADD_USER_DATA_TEAM_FAILED: string = 'ADD_USER_DATA_TEAM_FAILED';

export const GET_USER_DATA_TEAM_REQUEST: any = 'GET_USER_DATA_TEAM_REQUEST';
export const GET_USER_DATA_TEAM_SUCCESS: string = 'GET_USER_DATA_TEAM_SUCCESS';
export const GET_USER_DATA_TEAM_FAILED: string = 'GET_USER_DATA_TEAM_FAILED';

export const UPDATE_USER_DATA_TEAM_REQUEST: any =
    'UPDATE_USER_DATA_TEAM_REQUEST';
export const UPDATE_USER_DATA_TEAM_SUCCESS: string =
    'UPDATE_USER_DATA_TEAM_SUCCESS';
export const UPDATE_USER_DATA_TEAM_FAILED: string =
    'UPDATE_USER_DATA_TEAM_FAILED';

export const DELETE_USER_DATA_TEAM_REQUEST: any =
    'DELETE_USER_DATA_TEAM_REQUEST';
export const DELETE_USER_DATA_TEAM_SUCCESS: string =
    'DELETE_USER_DATA_TEAM_SUCCESS';
export const DELETE_USER_DATA_TEAM_FAILED: string =
    'DELETE_USER_DATA_TEAM_FAILED';

interface ChangePass {
    current_pass: string;
    new_pass: string;
}

interface UpdateCompany {
    personalDetails: {
        id: number;
    };
    companyDetails: {
        id: number;
        company_type: number;
        industry: number;
        sub_industry: number;
        turnover: number;
        funding_detail: number;
    };
    additionalDetails: {
        number_of_employee: number;
        previous_policy: boolean;
        policy_name: string;
        policy_start_date: string;
        policy_end_date: string;
        policy_coverage_amount: number;
        policy_insurer: string;
    };
}

// Get user Profile
export const GetUserProfileAction = () => {
    return { type: GET_USER_DATA_REQUEST };
};

// Edit user Profile
export const UpdateUserProfileAction = (data: FormData) => {
    return { type: UPDATE_USER_DATA_REQUEST, payload: data };
};

// Change Password
export const ChangePasswordAction = (data: ChangePass) => {
    return { type: CHANGE_PASSWORD_REQUEST, payload: data };
};

// clear response
export const ClearResponseAction = () => {
    return { type: CLEAR_RESPONSE_ACTION };
};

// Get company details
export const GetCompanyDataAction = () => {
    return { type: GET_COMPANY_DATA_REQUEST };
};

// Update company Details
export const UpdateCompanyDataAction = (data: UpdateCompany) => {
    return { type: UPDATE_COMPANY_DATA_REQUEST, payload: data };
};

///// Edit Team Settings /////
// Add user
export const AddUserDataAction = (data: FormData) => {
    return { type: ADD_USER_DATA_TEAM_REQUEST, payload: data };
};

// Get user
export const GetUserDataAction = () => {
    return { type: GET_USER_DATA_TEAM_REQUEST };
};

// Edit user
export const UpdateUserDataAction = (data: FormData) => {
    return { type: UPDATE_USER_DATA_TEAM_REQUEST, payload: data };
};

// Delete user
export const DeleteUserDataAction = (id: string) => {
    return { type: DELETE_USER_DATA_TEAM_REQUEST, payload: id };
};
