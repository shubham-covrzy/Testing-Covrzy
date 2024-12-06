import {
    CLEAR_STATE_ACTION,
    CREATE_ORDER_ID_FAILED,
    CREATE_ORDER_ID_REQUEST,
    CREATE_ORDER_ID_SUCCESS,
    GET_COMPANY_PROFILE_STATE_FAILED,
    GET_COMPANY_PROFILE_STATE_REQUEST,
    GET_COMPANY_PROFILE_STATE_SUCCESS,
    GET_PACKAGE_BY_SUB_INDUSTRY_FAILED,
    GET_PACKAGE_BY_SUB_INDUSTRY_REQUEST,
    GET_PACKAGE_BY_SUB_INDUSTRY_SUCCESS,
    GET_PACKAGE_WITH_PLAN_FAILED,
    GET_PACKAGE_WITH_PLAN_REQUEST,
    GET_PACKAGE_WITH_PLAN_SUCCESS,
    GET_POLICIES_BY_SUB_INDUSTRY_FAILED,
    GET_POLICIES_BY_SUB_INDUSTRY_REQUEST,
    GET_POLICIES_BY_SUB_INDUSTRY_SUCCESS,
    GET_POLICY_WITH_PLAN_FAILED,
    GET_POLICY_WITH_PLAN_REQUEST,
    GET_POLICY_WITH_PLAN_SUCCESS,
    PURCHASE_COVERAGE_FAILED,
    PURCHASE_COVERAGE_REQUEST,
    PURCHASE_COVERAGE_SUCCESS,
    SEND_CUSTOMIZE_COVERAZE_FAILED,
    SEND_CUSTOMIZE_COVERAZE_REQUEST,
    SEND_CUSTOMIZE_COVERAZE_SUCCESS,
    VERIFY_PAYMENT_FAILED,
    VERIFY_PAYMENT_REQUEST,
    VERIFY_PAYMENT_SUCCESS,
} from '../Actions/DashboardAction';

const InitialState = {
    loading: false,
    req_loading: false,
    is_profile_completed: '',
    package_list: [],
    policies_list: [],
    additional_policies_list: [],
    view_package_plan: {},
    is_getData: '',
    view_single_policy: {},
    isGetPackagePlan: false,
    orderCreatedData: {},
    is_paymentSuccess: false,
    is_purchaed: '',
    stage: '',
    // customizeRequest: '',
};

export const DashboardReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case GET_COMPANY_PROFILE_STATE_REQUEST:
            return {
                ...state,
                loading: true,
                stage: '',
            };

        case GET_COMPANY_PROFILE_STATE_SUCCESS:
            return {
                ...state,
                loading: false,
                is_profile_completed: action.payload?.is_companyProfileComplete
                    ? 'yes'
                    : 'no',
                stage: action.payload?.stage,
            };

        case GET_COMPANY_PROFILE_STATE_FAILED:
            return {
                ...state,
                loading: false,
                is_profile_completed: 'no',
                stage: '',
            };

        case GET_PACKAGE_BY_SUB_INDUSTRY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_PACKAGE_BY_SUB_INDUSTRY_SUCCESS:
            return {
                ...state,
                loading: false,
                package_list: action.payload,
            };

        case GET_PACKAGE_BY_SUB_INDUSTRY_FAILED:
            return {
                ...state,
                loading: false,
                package_list: [],
            };

        case GET_POLICIES_BY_SUB_INDUSTRY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_POLICIES_BY_SUB_INDUSTRY_SUCCESS:
            return {
                ...state,
                loading: false,
                policies_list: action.payload?.core,
                additional_policies_list: action.payload?.addon,
            };

        case GET_POLICIES_BY_SUB_INDUSTRY_FAILED:
            return {
                ...state,
                loading: false,
                policies_list: [],
                additional_policies_list: [],
            };

        case CREATE_ORDER_ID_REQUEST:
            return {
                ...state,
                req_loading: true,
            };

        case CREATE_ORDER_ID_SUCCESS:
            return {
                ...state,
                req_loading: false,
                orderCreatedData: action.payload,
            };

        case CREATE_ORDER_ID_FAILED:
            return {
                ...state,
                req_loading: false,
                orderCreatedData: {},
            };

        case PURCHASE_COVERAGE_REQUEST:
            return {
                ...state,
                req_loading: true,
            };

        case PURCHASE_COVERAGE_SUCCESS:
            return {
                ...state,
                req_loading: false,
                is_purchaed: action.payload,
            };

        case PURCHASE_COVERAGE_FAILED:
            return {
                ...state,
                req_loading: false,
                is_purchaed: '',
            };

        case VERIFY_PAYMENT_REQUEST:
            return {
                ...state,
                req_loading: true,
            };

        case VERIFY_PAYMENT_SUCCESS:
            return {
                ...state,
                req_loading: false,
                is_paymentSuccess: true,
            };

        case VERIFY_PAYMENT_FAILED:
            return {
                ...state,
                req_loading: false,
                orderCreatedData: {},
                is_paymentSuccess: false,
            };

        case GET_PACKAGE_WITH_PLAN_REQUEST:
            return {
                ...state,
                is_getData: '',
                loading: true,
            };

        case GET_PACKAGE_WITH_PLAN_SUCCESS:
            return {
                ...state,
                is_getData: 'success',
                loading: false,
                isGetPackagePlan: true,
                view_package_plan: action.payload,
            };

        case GET_PACKAGE_WITH_PLAN_FAILED:
            return {
                ...state,
                is_getData: 'failed',
                loading: false,
                view_package_plan: {},
                isGetPackagePlan: false,
            };

        case GET_POLICY_WITH_PLAN_REQUEST:
            return {
                ...state,
                is_getData: '',
                loading: true,
            };

        case GET_POLICY_WITH_PLAN_SUCCESS:
            return {
                ...state,
                is_getData: 'success',
                loading: false,
                view_single_policy: action.payload,
            };

        case GET_POLICY_WITH_PLAN_FAILED:
            return {
                ...state,
                is_getData: 'failed',
                loading: false,
                view_single_policy: {},
            };

        case SEND_CUSTOMIZE_COVERAZE_REQUEST:
            return {
                ...state,
                req_loading: true,
                // customizeRequest: '',
            };

        case SEND_CUSTOMIZE_COVERAZE_SUCCESS:
            return {
                ...state,
                req_loading: false,
                // customizeRequest: action.payload
                is_purchaed: action.payload,
            };

        case SEND_CUSTOMIZE_COVERAZE_FAILED:
            return {
                ...state,
                req_loading: false,
                is_purchaed: '',
                // customizeRequest: ''
            };

        case CLEAR_STATE_ACTION:
            return {
                ...state,
                req_loading: false,
                loading: false,
                orderCreatedData: {},
                isGetPackagePlan: false,
                is_paymentSuccess: false,
                // customizeRequest: '',
                is_purchaed: '',
            };

        default:
            return state;
    }
};
