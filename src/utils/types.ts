import { IPersonalDetails } from '../Redux/Actions/AuthActions';

export interface IReduxState {
    Auth: IAuthReducer;
    Toast: IToastReducer;
    EmailVerify: IEmailVerifyReducer;
    HeaderTitle: IHeaderTitleReducer;
    AddCoverage: IAddCoverage;
    UserProfile: IUserProfileReducer;
    Support: ISupportReducer;
    Policies: IPoliciesReducer;
    Dashboard: IDashboardReducer;
    Homepage: IHomepageReducer;
    Claim: IClaimReducer;
    Payment: IPaymentReducer;
    Purchases: IPurchasesReducer;
    PurchaseQuote: IPurchaseQuoteReducer;
    PolicyHolderInput: IPolicyHolderInputReducer;
    CustomerInformation: ICustomerInformationReducer;
    Recommendations: IRecommendationsReducer;
    LiabilityQuote: ILiabilityQuoteReducer;
    UserSession: IUserSessionReducer;
    LoginDetails: ILoginReducer;
}

export interface IAuthReducer {
    user: string;
    isLogin: boolean;
    loading: boolean;
    list_loading: boolean;
    token: string;
    personalDetails: IPersonalDetails;
    signUp_step: number;
    company_type: any;
    funding_details: any;
    turnover_list: any;
    industry_list: any;
    sub_industry_list: any;
    company_details: any;
    additional_details: any;
    redirect: string;
}

export interface ILoginReducer {
    loading: boolean;
    mobile?: string;
    request_id?: string;
    resendOTP: {
        loading: boolean;
    };
    isNewUser?: boolean;
    editMobileNumber?: boolean;
}


export interface IToastReducer {
    show: boolean;
    severity: string | any;
    message: string;
    errorResponse: string;
    openModal: boolean;
}

export interface IEmailVerifyReducer {
    getOtpLoading: boolean;
    verifyOtpLoading: boolean;
    emailVerified: boolean;
    getOtp: boolean;
}
export interface IHeaderTitleReducer {
    title: string;
}

export interface IAddCoverage {
    coverage_step: number;
    company_details: Object | any;
    additional_details: Object | any;
}

export interface IUserProfileReducer {
    loading: boolean;
    userProfile: Object | any;
    success: boolean;
    companyData: Object | any;
    redirect: string;
    team_users: Array<object> | any;
}

export interface ISupportReducer {
    loading: boolean;
    success: boolean;
    support_tickets: Array<any>;
    callback_success: boolean;
}

export interface IDashboardReducer {
    loading: boolean;
    is_getData: string;
    is_profile_completed: string;
    package_list: Array<Object> | any;
    policies_list: Array<Object> | any;
    additional_policies_list: Array<Object> | any;
    view_package_plan: Object | any;
    isGetPackagePlan: boolean;
    orderCreatedData: Object | any;
    is_paymentSuccess: boolean;
    view_single_policy: Object | any;
    stage: string;
    customizeRequest: string;
    req_loading: boolean;
    is_purchaed: string;
}

export interface IPoliciesReducer {
    loading: boolean;
    success: boolean;
    non_covrzy_policies: Array<Object> | any;
    view_policy: Object | any;
    policyNumber: string;
    policyPDF: Object | any;
    redirect: string;
}
export interface IHomepageReducer {
    loading: boolean;
    policies_list: Array<Object> | any;
    package_list: Array<Object> | any;
    package_details: Array<Object> | any;
    package_details_addOn: Array<Object> | any;
    view_single_policy: Object | any;
}

export interface IClaimReducer {
    active_packages: Array<Object> | any;
    active_policies: Array<Object> | any;
    inActive_policies: Array<Object> | any;
    inActive_packages: Array<Object> | any;
    view_active_plan: Object | any;
    purchased_policy: Object | any;
    claim_policies: Array<Object> | any;
    claim_packages: Array<Object> | any;
    loading: boolean;
    redirect: boolean;
}

export interface IPaymentReducer {
    payment_history: Array<Object> | any;
    loading: boolean;
    payment_info: Object | any;
    is_getData: string;
    orderCreatedResponse: Object | any;
    req_loading: boolean;
    payment_success: boolean;
    receiptId: string;
    receiptPDF: Object | any;
    paymentResponse: Object | any;
    paymentRetry: boolean;
}

export interface IPolicy {
    id: number;
    insuredPoints: any[];
    uninsuredPoints: any[];
    startDate: string;
    policyHolder: string;
    endDate: string;
    basicPremium: number;
    tax: number;
    grossPremium: number;
    proposalNumber: string | null;
    customerId: string | null;
    policyNumber: string | null;
    recommendationId?: string;
    policies: IPolicyData[];
    isActive: true;
    policyFileName: string;
    status: string;
}

export type IPurchasedPolicy = Omit<IPolicy, 'risks'> & Omit<IPolicyData, 'id'>;

export interface IPolicyData {
    id: number;
    insurer: string;
    sumInsured: number;
    premium: number;
    riskName: string;
    coverName: string;
}

export interface IPurchasesReducer {
    purchasedPolicies: IPolicy[];
    policy: IPurchasedPolicy;
    loading: boolean;
    redirect: boolean;
}

export interface IPurchaseQuoteReducer {
    selectedCard: any[];
}

export interface IPolicyHolderInputReducer {
    loading: false;
    success: false;
    state_name: string;
    city_names: string[];
    purchasedPolicyData: {
        correlationId?: string | null;
        policyStartDate?: string | null;
        proposalNumber?: string | null;
        customerId?: string | null;
        policyNumber?: string | null;
    };
    customerType: string;
    personalDetail: {
        firstName: string;
        lastName: string;
        dob: string;
        pan: string;
    };
    contactDetail: { email: string; phone: string };
    addressDetail: {
        address: string;
        pincode: string;
        country: string;
        state: string;
        city: string;
    };
    insuredDetail: {
        insuredFirstName: string;
        insuredLastName: string;
        insuredDOB: string;
        insuredAge: string;
        insuredGender: string;
        insuredRelation: string;
    };
    redirect: string;
}

export interface ICustomerInformationReducer {
    aboutUser: object | any;
    businessCategory: string;
    policies: [];
    gstData: object | any;
    aboutBusiness: object | any;
    purchasedProducts: object | any;
}
export interface IRecommendationsReducer {
    loading: boolean;
    navigator: boolean;
    recommendationResponse: object | any;
    policyStartDate: string;
    policyEndDate: string;
}

export interface ILiabilityQuoteReducer {
    loading: boolean;
    navigator: boolean;
    quoteResponse: object | any;
}

export interface IUserSessionReducer {
    correlationId: string | null;
    createdAt: string;
    currentState: string;
    deletedAt: string;
    deviceInfo: string;
    id: number;
    isPaymentCompleted: boolean;
    isPolicyPurchased: boolean;
    updatedAt: string;
    user: number;
    userSessionData: Record<string, any>;
}
