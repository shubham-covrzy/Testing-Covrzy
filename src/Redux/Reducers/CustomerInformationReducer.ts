import {
    ADD_CUSTOMER_INFORMATION_ACTION,
    GST_API_FAILURE_RESPONSE,
    GST_API_SUCCESS_RESPONSE,
    RESET_CUSTOMER_INFORMATION,
    SAVE_ABOUT_BUSINESS_ACTION,
    SAVE_BUSINESS_TYPE_ACTION,
    SAVE_CUSTOMER_SELECTED_PACKAGE_CATEGORY_AND_PRODUCTS,
    SAVE_PURCHASED_PRODUCTS,
} from '../Actions/CustomerInformationAction';

const InitialStates = {
    aboutUser: {},
    businessCategory: '',
    policies: [],
    gstData: {},
    aboutBusiness: {},
    purchasedProducts: {},
};

export const CustomInformationReducer = (
    state = InitialStates,
    action: any,
) => {
    switch (action.type) {
        case ADD_CUSTOMER_INFORMATION_ACTION:
            return {
                ...state,
                aboutUser: action.payload,
            };
        case SAVE_CUSTOMER_SELECTED_PACKAGE_CATEGORY_AND_PRODUCTS:
            return {
                ...state,
                businessCategory: action.payload.businessCategory,
                policies: action.payload.policies,
            };
        case SAVE_BUSINESS_TYPE_ACTION:
            return {
                ...state,
                businessType: action.payload,
            };

        case GST_API_SUCCESS_RESPONSE:
            return {
                ...state,
                gstData: action.payload,
            };
        case GST_API_FAILURE_RESPONSE: {
            return {
                ...state,
                gstData: {},
            };
        }
        case SAVE_ABOUT_BUSINESS_ACTION: {
            return {
                ...state,
                aboutBusiness: action.payload,
            };
        }

        case SAVE_PURCHASED_PRODUCTS:
            return {
                ...state,
                purchasedProducts: action.payload,
            };

        case RESET_CUSTOMER_INFORMATION:
            return {
                ...state,
                aboutUser: {},
                businessCategory: '',
                policies: [],
                gstData: {},
                businessType: '',
                aboutBusiness: {},
                purchasedProducts: {},
            };

        default:
            return state;
    }
};
