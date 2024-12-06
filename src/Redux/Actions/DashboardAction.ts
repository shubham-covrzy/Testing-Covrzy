export const GET_COMPANY_PROFILE_STATE_REQUEST: any =
    'GET_COMPANY_PROFILE_STATE_REQUEST';
export const GET_COMPANY_PROFILE_STATE_SUCCESS: string =
    'GET_COMPANY_PROFILE_STATE_SUCCESS';
export const GET_COMPANY_PROFILE_STATE_FAILED: string =
    'GET_COMPANY_PROFILE_STATE_FAILED';

export const GET_PACKAGE_BY_SUB_INDUSTRY_REQUEST: any =
    'GET_PACKAGE_BY_SUB_INDUSTRY_REQUEST';
export const GET_PACKAGE_BY_SUB_INDUSTRY_SUCCESS: string =
    'GET_PACKAGE_BY_SUB_INDUSTRY_SUCCESS';
export const GET_PACKAGE_BY_SUB_INDUSTRY_FAILED: string =
    'GET_PACKAGE_BY_SUB_INDUSTRY_FAILED';

export const GET_POLICIES_BY_SUB_INDUSTRY_REQUEST: any =
    'GET_POLICIES_BY_SUB_INDUSTRY_REQUEST';
export const GET_POLICIES_BY_SUB_INDUSTRY_SUCCESS: string =
    'GET_POLICIES_BY_SUB_INDUSTRY_SUCCESS';
export const GET_POLICIES_BY_SUB_INDUSTRY_FAILED: string =
    'GET_POLICIES_BY_SUB_INDUSTRY_FAILED';

export const GET_PACKAGE_WITH_PLAN_REQUEST: any =
    'GET_PACKAGE_WITH_PLAN_REQUEST';
export const GET_PACKAGE_WITH_PLAN_SUCCESS: string =
    'GET_PACKAGE_WITH_PLAN_SUCCESS';
export const GET_PACKAGE_WITH_PLAN_FAILED: string =
    'GET_PACKAGE_WITH_PLAN_FAILED';

export const CREATE_ORDER_ID_REQUEST: any = 'CREATE_ORDER_ID_REQUEST';
export const CREATE_ORDER_ID_SUCCESS: string = 'CREATE_ORDER_ID_SUCCESS';
export const CREATE_ORDER_ID_FAILED: string = 'CREATE_ORDER_ID_FAILED';

export const VERIFY_PAYMENT_REQUEST: any = 'VERIFY_PAYMENT_REQUEST';
export const VERIFY_PAYMENT_SUCCESS: string = 'VERIFY_PAYMENT_SUCCESS';
export const VERIFY_PAYMENT_FAILED: string = 'VERIFY_PAYMENT_FAILED';

export const GET_POLICY_WITH_PLAN_REQUEST: any = 'GET_POLICY_WITH_PLAN_REQUEST';
export const GET_POLICY_WITH_PLAN_SUCCESS: string =
    'GET_POLICY_WITH_PLAN_SUCCESS';
export const GET_POLICY_WITH_PLAN_FAILED: string =
    'GET_POLICY_WITH_PLAN_FAILED';

export const SEND_CUSTOMIZE_COVERAZE_REQUEST: any =
    'SEND_CUSTOMIZE_COVERAZE_REQUEST';
export const SEND_CUSTOMIZE_COVERAZE_SUCCESS: string =
    'SEND_CUSTOMIZE_COVERAZE_SUCCESS';
export const SEND_CUSTOMIZE_COVERAZE_FAILED: string =
    'SEND_CUSTOMIZE_COVERAZE_FAILED';

export const PURCHASE_COVERAGE_REQUEST: any = 'PURCHASE_COVERAGE_REQUEST';
export const PURCHASE_COVERAGE_SUCCESS: string = 'PURCHASE_COVERAGE_SUCCESS';
export const PURCHASE_COVERAGE_FAILED: string = 'PURCHASE_COVERAGE_FAILED';

export const CLEAR_STATE_ACTION: string = 'CLEAR_STATE_ACTION';

interface CreateOrder {
    amount: number;
    currency: string;
    package_id: number;
    start_date: Date;
    end_date: Date;
    plan_type: string;
}

interface VerifyPayment {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export const GetCompanyProfileStateAction = () => {
    return { type: GET_COMPANY_PROFILE_STATE_REQUEST };
};

export const GetPackageBySubIndustryAction = () => {
    return { type: GET_PACKAGE_BY_SUB_INDUSTRY_REQUEST };
};

export const GetPoliciesBySubIndustryAction = () => {
    return { type: GET_POLICIES_BY_SUB_INDUSTRY_REQUEST };
};

export const GetPackageWithPlanAction = (id: string) => {
    return { type: GET_PACKAGE_WITH_PLAN_REQUEST, payload: id };
};

export const CrateOrderIdAction = (data: CreateOrder) => {
    return { type: CREATE_ORDER_ID_REQUEST, payload: data };
};

export const PurchaseCoverageAction = (data: CreateOrder) => {
    return { type: PURCHASE_COVERAGE_REQUEST, payload: data };
};

export const VerifyPaymentAction = (data: VerifyPayment) => {
    return { type: VERIFY_PAYMENT_REQUEST, payload: data };
};

export const GetSinglePolicyPlanAction = (id: String) => {
    return { type: GET_POLICY_WITH_PLAN_REQUEST, payload: id };
};

export const SendCustomizeCoverageAction = (id: String) => {
    return { type: SEND_CUSTOMIZE_COVERAZE_REQUEST, payload: id };
};

export const ClearStateAction = () => {
    return { type: CLEAR_STATE_ACTION };
};
