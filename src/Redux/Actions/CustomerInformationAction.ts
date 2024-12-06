export const ADD_CUSTOMER_INFORMATION_ACTION: string =
    'ADD_CUSTOMER_INFORMATION_ACTION';
export const SAVE_CUSTOMER_SELECTED_PACKAGE_CATEGORY_AND_PRODUCTS: string =
    'SAVE_CUSTOMER_SELECTED_PACKAGE_CATEGORY_AND_PRODUCTS';
export const SAVE_BUSINESS_TYPE_ACTION: string = 'SAVE_BUSINESS_TYPE_ACTION';
export const GST_API_INTEGRATION_ACTION: any = 'GST_API_INTEGRATION_ACTION';
export const GST_API_SUCCESS_RESPONSE: string = 'GST_API_SUCCESS_RESPONSE';
export const GST_API_FAILURE_RESPONSE: string = 'GST_API_FAILURE_RESPONSE';
export const SAVE_ABOUT_BUSINESS_ACTION: string = 'SAVE_ABOUT_BUSINESS_ACTION';
export const SAVE_PURCHASED_PRODUCTS: string = 'SAVE_PURCHASED_PRODUCTS';
export const RESET_CUSTOMER_INFORMATION: string = 'RESET_CUSTOMER_INFORMATION';

interface IAboutUserDetails {
    firstName: string;
    lastName: string;
    email: string;
}

interface ISelectedPolicies {
    policies: any[];
    businessCategory: string | null;
}

interface IAboutBusiness {
    legalName: string;
    annualTurnover: string;
    fundingType: boolean | null;
    fundingAmount: string | null;
    noOfEmployee: number | null;
    businessCategory: string | null;
}

export const SaveAboutUserAction = (data: IAboutUserDetails) => {
    return { type: ADD_CUSTOMER_INFORMATION_ACTION, payload: data };
};

export const SaveSelectedProductsAction = (data: ISelectedPolicies) => {
    return {
        type: SAVE_CUSTOMER_SELECTED_PACKAGE_CATEGORY_AND_PRODUCTS,
        payload: data,
    };
};

export const SaveBusinessTypeAction = (data: any) => {
    return {
        type: SAVE_BUSINESS_TYPE_ACTION,
        payload: data,
    };
};

export const GstApiIntegrationAction = (data: any) => {
    return { type: GST_API_INTEGRATION_ACTION, payload: data };
};

export const SaveAboutBusinessAction = (data: IAboutBusiness) => {
    return { type: SAVE_ABOUT_BUSINESS_ACTION, payload: data };
};

export const SavePurchasedProductsAction = (data: any) => {
    return { type: SAVE_PURCHASED_PRODUCTS, payload: data };
};

export const ResetCustomerInformationAction = () => {
    return { type: RESET_CUSTOMER_INFORMATION };
};
