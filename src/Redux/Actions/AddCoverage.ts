export const ADD_COMPANY_DETAILS: string = 'ADD_COMPANY_DETAILS';
export const ADD_ADDITIONAL_DETAILS: string = 'ADD_ADDITIONAL_DETAILS';
export const BACK_SCREEN_ACTION: string = 'BACK_SCREEN_ACTION';
export const CLEAR_ADD_COVRAZY_STATE: string = 'CLEAR_ADD_COVRAZY_STATE';

export const SET_CURRENT_STEP: string = 'SET_CURRENT_STEP';

export interface ICompanyDetails {
    company_type: number;
    industry: number;
    sub_industry: number;
    turnover: number;
    funding_detail: number;
    is_companyfunded: boolean;
}

export interface IAdditionalDetails {
    number_of_employee: number;
    previous_policy: boolean;
    policy_name: string;
    policy_start_date: string;
    policy_end_date: string;
    policy_coverage_amount: number;
    policy_insurer: string;
}

export const AddCompanyDetailsAction = (data: ICompanyDetails | any) => {
    return { type: ADD_COMPANY_DETAILS, payload: data };
};

export const AddAdditionalDetailsAction = (data: IAdditionalDetails | any) => {
    return { type: ADD_ADDITIONAL_DETAILS, payload: data };
};

export const BackScreenAction = () => {
    return { type: BACK_SCREEN_ACTION };
};

export const SetCurrentStepAction = (step: number) => {
    return { type: SET_CURRENT_STEP, payload: step };
};

export const ClearAddCovrageAction = () => {
    return { type: CLEAR_ADD_COVRAZY_STATE };
};
