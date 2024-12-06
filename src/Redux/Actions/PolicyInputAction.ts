export const CLEAR_PURCHASED_POLICY_INPUT: string =
    'CLEAR_PURCHASED_POLICY_INPUT';

export const UPDATE_PERSONAL_DETAIL: any = 'UPDATE_PERSONAL_DETAIL';
export const UPDATE_CUSTOMER_TYPE: any = 'UPDATE_CUSTOMER_TYPE';
export const UPDATE_ADDRESS_DETAIL: any = 'UPDATE_ADDRESS_DETAIL';
export const UPDATE_CONTACT_DETAIL: any = 'UPDATE_CONTACT_DETAIL';
export const UPDATE_INSURED_DETAIL: any = 'UPDATE_INSURED_DETAIL';

export const GET_CITY_OF_SELECTED_STATE: any = 'GET_CITY_OF_SELECTED_STATE';
export const GET_CITY_SUCCESS_RESPONSE: string = 'GET_CITY_SUCCESS_RESPONSE';
export const GET_CITY_FAILURE_RESPONSE: string = 'GET_CITY_FAILURE_RESPONSE';
export const CLEAR_CITY_NAMES: string = 'CLEAR_CITY_NAMES';

export const INITIATE_PURCHASE_POLICY_REQUEST: any =
    'INITIATE_PURCHASE_POLICY_REQUEST';
export const INITIATE_PURCHASE_POLICY_SUCCESS: string =
    'INITIATE_PURCHASE_POLICY_SUCCESS';
export const INITIATE_PURCHASE_POLICY_FAILED: string =
    'INITIATE_PURCHASE_POLICY_FAILED';

export const MANUAL_INITIAL_POLICY_PURCHASE_REQUEST: any =
    'MANUAL_PURCHASE_POLICY_REQUEST';
export const MANUAL_PURCHASE_POLICY_SUCCESS_RESPONSE: string =
    'MANUAL_PURCHASE_POLICY_SUCCESS_RESPONSE';
export const MANUAL_PURCHASE_POLICY_FAILURE_RESPONSE: string =
    'MANUAL_PURCHASE_POLICY_FAILURE_RESPONSE';

interface IStateDetails {
    state_name: string;
}

interface IAddressDetailInput {
    address: string;
    pincode: string;
    country: string;
    state: string;
    city: string;
}

interface IContactDetailInput {
    phone: string;
    email: string;
}
type ICustomerTypeInput = 'Company' | 'Individual';

interface IInsuredDetailInput {
    insuredFirstName: string;
    insuredLastName: string;
    insuredDOB: string;
    insuredAge: string;
    insuredGender: string;
    insuredRelation: string;
}

interface IPersonalDetailInput {
    firstName: string;
    lastName: string;
    dob: string;
    pan: string;
}

interface IManualPurchase {
    quoteId: string;
    correlationId: string;
    receiptId: string;
    policyStartDate: string;
}

export const UpdatePersonalDetailAction = (data: IPersonalDetailInput) => {
    return { type: UPDATE_PERSONAL_DETAIL, payload: data };
};

export const UpdateCustomerTypeAction = (data: ICustomerTypeInput) => {
    return { type: UPDATE_CUSTOMER_TYPE, payload: data };
};

export const UpdateAddressDetailAction = (data: IAddressDetailInput) => {
    return { type: UPDATE_ADDRESS_DETAIL, payload: data };
};

export const UpdateContactDetailAction = (data: IContactDetailInput) => {
    return { type: UPDATE_CONTACT_DETAIL, payload: data };
};

export const UpdateInsuredDetailAction = (data: IInsuredDetailInput) => {
    return { type: UPDATE_INSURED_DETAIL, payload: data };
};

export const GetCityNamesActions = (data: IStateDetails) => {
    return { type: GET_CITY_OF_SELECTED_STATE, payload: data };
};

export const ClearCityNamesAction = () => {
    return { type: CLEAR_CITY_NAMES };
};

export const SaveInitiatePurchasePolicyAction = (data: any) => {
    return {
        type: INITIATE_PURCHASE_POLICY_REQUEST,
        navigate: data.navigate,
        payload: data.body,
    };
};

export const ManualPurchasePolicyAction = (data: IManualPurchase) => {
    return {
        type: MANUAL_INITIAL_POLICY_PURCHASE_REQUEST,
        payload: data,
    };
};
