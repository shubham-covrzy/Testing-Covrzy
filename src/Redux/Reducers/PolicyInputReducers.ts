import {
    CLEAR_CITY_NAMES,
    CLEAR_PURCHASED_POLICY_INPUT,
    GET_CITY_OF_SELECTED_STATE,
    GET_CITY_SUCCESS_RESPONSE,
    INITIATE_PURCHASE_POLICY_FAILED,
    INITIATE_PURCHASE_POLICY_REQUEST,
    INITIATE_PURCHASE_POLICY_SUCCESS,
    UPDATE_ADDRESS_DETAIL,
    UPDATE_CONTACT_DETAIL,
    UPDATE_CUSTOMER_TYPE,
    UPDATE_INSURED_DETAIL,
    UPDATE_PERSONAL_DETAIL,
} from '../Actions/PolicyInputAction';

const InitialState = {
    loading: false,
    success: false,
    purchasedPolicyData: {},
    state_name: '',
    city_names: [],
    customerType: '',
    personalDetail: {
        firstName: '',
        lastName: '',
        dob: '',
        pan: '',
    },
    contactDetail: { email: '', phone: '' },
    addressDetail: {
        address: '',
        pincode: '',
        country: 'India',
        state: '',
        city: '',
    },
    insuredDetail: {
        insuredFirstName: '',
        insuredLastName: '',
        insuredDOB: '',
        insuredAge: '',
        insuredGender: '',
        insuredRelation: '',
    },
    redirect: '',
};

export const PolicyHolderInputReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case INITIATE_PURCHASE_POLICY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case INITIATE_PURCHASE_POLICY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                purchasedPolicyData: action.payload,
            };

        case INITIATE_PURCHASE_POLICY_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
            };

        case UPDATE_PERSONAL_DETAIL:
            return {
                ...state,
                personalDetail: action.payload,
            };

        case UPDATE_CUSTOMER_TYPE:
            return {
                ...state,
                customerType: action.payload,
            };

        case UPDATE_ADDRESS_DETAIL:
            return {
                ...state,
                addressDetail: action.payload,
            };

        case UPDATE_CONTACT_DETAIL:
            return {
                ...state,
                contactDetail: action.payload,
            };

        case UPDATE_INSURED_DETAIL:
            return {
                ...state,
                insuredDetail: action.payload,
            };

        case GET_CITY_OF_SELECTED_STATE:
            return {
                ...state,
                state_name: action.payload.state_name,
            };

        case GET_CITY_SUCCESS_RESPONSE:
            return {
                ...state,
                city_names: action.payload,
            };

        case CLEAR_CITY_NAMES:
            return {
                ...state,
                city_names: [],
            };

        case CLEAR_PURCHASED_POLICY_INPUT:
            return {
                ...state,
                purchasedPolicyData: state.purchasedPolicyData,
            };

        default:
            return state;
    }
};
