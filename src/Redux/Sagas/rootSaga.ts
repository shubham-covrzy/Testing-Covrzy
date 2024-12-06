import { all, takeEvery } from 'redux-saga/effects';
import {
    FORGOT_PASSWORD_REQUEST,
    GET_AUTH_USER_DATA_REQUEST,
    GET_COMPANY_TYPE_REQUEST,
    GET_FUNDING_DETAILS_REQUEST,
    GET_INDUSTRY_LIST_REQUEST,
    GET_SUB_INDUSTRY_LIST_REQUEST,
    GET_TURN_OVER_LIST_REQUEST,
    GET_USER_REQUEST,
    RESET_PASSWORD_REQUEST,
    SAVE_PERSONAL_DETAILS_REQUEST,
    SUBMIT_SIGN_UP_DETAILS_REQUEST,
    VERIFY_PHONE_LOGIN,
} from '../Actions/AuthActions';
import {
    GET_ACTIVE_PLANS_REQUEST,
    GET_IN_ACTIVE_PLANS_REQUEST,
    GET_PURCHASED_POLICY_REQUEST,
    GET_SINGLE_ACTIVE_PLAN_REQUEST,
    UPLOAD_CLAIM_PROOF_REQUEST,
    VIEW_ALL_CLAIM_REQUEST,
} from '../Actions/ClaimActions';
import {
    CREATE_ORDER_ID_REQUEST,
    GET_COMPANY_PROFILE_STATE_REQUEST,
    GET_PACKAGE_BY_SUB_INDUSTRY_REQUEST,
    GET_PACKAGE_WITH_PLAN_REQUEST,
    GET_POLICIES_BY_SUB_INDUSTRY_REQUEST,
    GET_POLICY_WITH_PLAN_REQUEST,
    PURCHASE_COVERAGE_REQUEST,
    SEND_CUSTOMIZE_COVERAZE_REQUEST,
    VERIFY_PAYMENT_REQUEST,
} from '../Actions/DashboardAction';
import {
    GET_OTP_REQ_REQUEST,
    VERIFY_OTP_REQUEST,
} from '../Actions/EmailVerifyAction';
import {
    GET_ALL_PACKAGES_REQUEST,
    GET_PACKAGES_DETAILS_REQUEST,
    GET_POLICIES_LIST_REQUEST,
    GET_POLICY_BY_ID_REQUEST,
} from '../Actions/HomepageActions';
import {
    GET_PARTICULAR_PAYMENT_REQUEST,
    GET_PAYMENT_HISTORY_REQUEST,
    CREATE_PAYMENT_ORDER,
    CREATE_VERIFY_PAYMENT_REQUEST,
    DOWNLOAD_PAYMENT_RECEIPT_REQUEST,
    GET_PAYMENT_BY_ID,
    SAVE_PAYMENT_RECEIPT,
} from '../Actions/PaymentActions';
import {
    ADD_NON_COVERZY_POLICIY_REQUEST,
    DELETE_NON_COVERZY_POLICIY_REQUEST,
    DOWNLOAD_NON_COVRZY_POLICY_REQUEST,
    DOWNLOAD_PURCHASED_POLICY_REQUEST,
    GET_NON_COVERZY_POLICIY_REQUEST,
    VIEW_NON_COVERZY_POLICIY_REQUEST,
} from '../Actions/PoliciesActions';
import {
    ADD_SUPPORT_MAIL_REQUEST,
    GET_SUPPORT_TICKET_REQUEST,
    REQUEST_A_CALL_BACK_REQUEST,
} from '../Actions/SupportAction';
import {
    ADD_USER_DATA_TEAM_REQUEST,
    CHANGE_PASSWORD_REQUEST,
    DELETE_USER_DATA_TEAM_REQUEST,
    GET_COMPANY_DATA_REQUEST,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_TEAM_REQUEST,
    UPDATE_COMPANY_DATA_REQUEST,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_TEAM_REQUEST,
} from '../Actions/UserProfileAction';

import { LIABILITY_QUOTE_API_REQUEST } from '../Actions/QuoteAction';
import {
    SAVE_USER_STATE_ACTIONS,
    UPDATE_USER_SESSION_ACTION,
    GET_USER_SESSION_BY_ID,
    GET_USER_SESSIONS,
} from '../Actions/SessionAction';

import {
    SaveUserSessionSaga,
    UpdateUserSessionSaga,
    GetUserSessionByIdSaga,
    GetUserSessionSaga,
} from './SessionSaga';

import {
    ForgotPasswordSaga,
    GetAuthUserProfileSaga,
    GetCompanyTypeSaga,
    GetFundingDetailSaga,
    GetIndustryListSaga,
    GetSubIndustryListSaga,
    GetTurnOverListSaga,
    LoginSaga,
    ResetPasswordSaga,
    SavePersonalDetailSaga,
    SaveSignUpDetailSaga,
    VerifyPhoneLoginSaga,
} from './AuthSagas';
import {
    GetActivePlansSaga,
    GetInActivePlansSaga,
    GetPurchasedPolicyPointsSaga,
    GetSingleActivePlanSaga,
    UploadClaimProofSaga,
    ViewAllClaimSaga,
} from './ClaimSaga';
import {
    CraeteOrderIdSaga,
    GetCompanyProfileStateSaga,
    GetPackageBySubIndustrySaga,
    GetPackageWithPlanSaga,
    GetPoliciesBySubIndustrySaga,
    GetPolicyWithPlanSaga,
    PurchaseCoverageSaga,
    SendCustomizeCoverageSaga,
    VerifyPaymentSaga,
} from './DashboardSaga';
import { GetOtpReqSaga, VerifyOtpSaga } from './EmailVerifySaga';
import {
    GetAllPackagesSaga,
    GetPackageDetalisSaga,
    GetPoliciesListSaga,
    GetPolicyByIdSaga,
} from './HomepageSaga';
import {
    CreatePaymentOrderSaga,
    DownloadPaymentReceiptSaga,
    GetParticularPaymentSaga,
    GetPaymentById,
    GetPaymentHistorySaga,
    PaymentVerificationSaga,
    GetPaymentReceiptSaveSaga,
} from './PaymentSaga';
import {
    AddNonCoverzyPoliciySaga,
    DeleteNonCoverzyPolicyDataSaga,
    DownloadNonCovrzyPolicySaga,
    DownloadPurchasedPolicySaga,
    GetNonCoverzyPoliciySaga,
    ViewNonCoverzyPolicyDataSaga,
} from './PoliciesSaga';
import {
    GetRequestCallBackSaga,
    GetSupportTicketsSaga,
    SupportMailSaga,
} from './SupportSaga';
import {
    AddUserDataSaga,
    ChangePasswordSaga,
    DeleteUserDataSaga,
    GetCompanyDataSaga,
    GetUserDataSaga,
    GetUserProfileSaga,
    UpdateCompanyDataSaga,
    UpdateUserDataSaga,
    UpdateUserProfileSaga,
} from './UserProfileSaga';
import {
    GetPurchasedPoliciesSaga,
    GetSinglePurchasedPolicySaga,
} from './PurchasesSaga';
import {
    GET_PURCHASED_POLICIES_REQUEST,
    GET_SINGLE_PURCHASED_POLICY_REQEUST,
} from '../Actions/PurchasesAction';
import { GST_API_INTEGRATION_ACTION } from '../Actions/CustomerInformationAction';
import { GetGstApiIntegrationSaga } from './CustomerInformationSaga';
import { RECOMMENDATION_API_INTEGRATION_ACTION } from '../Actions/RecommendationAction';
import { GetRecommendationsSaga } from './RecommendationSaga';
import {
    INITIATE_PURCHASE_POLICY_REQUEST,
    GET_CITY_OF_SELECTED_STATE,
    MANUAL_INITIAL_POLICY_PURCHASE_REQUEST,
} from '../Actions/PolicyInputAction';
import {
    GetInitiatePurchasePolicySaga,
    GetCityNamesSaga,
    ManualPurchasePolicySaga,
} from './PolicyInputSaga';

import { GetQuoteSaga } from '../Sagas/QuoteSaga';
import { SEND_OTP_PHONE_LOGIN_REQUEST, SEND_RESEND_OTP_PHONE_LOGIN_REQUEST, VERIFY_OTP_PHONE_LOGIN_REQUEST } from '../Actions/LoginActions';
import { resendOtpPhoneLoginSaga, sendOtpPhoneLoginSaga, verifyOtpPhoneLoginSaga } from './LoginSagas';

function* rootSagas() {
    yield all([
        takeEvery(GET_USER_REQUEST, LoginSaga),
        takeEvery(GET_AUTH_USER_DATA_REQUEST, GetAuthUserProfileSaga),
        takeEvery(FORGOT_PASSWORD_REQUEST, ForgotPasswordSaga),
        takeEvery(RESET_PASSWORD_REQUEST, ResetPasswordSaga),
        takeEvery(GET_OTP_REQ_REQUEST, GetOtpReqSaga),
        takeEvery(VERIFY_OTP_REQUEST, VerifyOtpSaga),
        takeEvery(SAVE_PERSONAL_DETAILS_REQUEST, SavePersonalDetailSaga),
        takeEvery(GET_COMPANY_TYPE_REQUEST, GetCompanyTypeSaga),
        takeEvery(GET_FUNDING_DETAILS_REQUEST, GetFundingDetailSaga),
        takeEvery(GET_TURN_OVER_LIST_REQUEST, GetTurnOverListSaga),
        takeEvery(GET_INDUSTRY_LIST_REQUEST, GetIndustryListSaga),
        takeEvery(GET_SUB_INDUSTRY_LIST_REQUEST, GetSubIndustryListSaga),
        takeEvery(SUBMIT_SIGN_UP_DETAILS_REQUEST, SaveSignUpDetailSaga),
        takeEvery(UPDATE_USER_DATA_REQUEST, UpdateUserProfileSaga),
        takeEvery(GET_USER_DATA_REQUEST, GetUserProfileSaga),
        takeEvery(CHANGE_PASSWORD_REQUEST, ChangePasswordSaga),
        takeEvery(ADD_SUPPORT_MAIL_REQUEST, SupportMailSaga),
        takeEvery(GET_COMPANY_DATA_REQUEST, GetCompanyDataSaga),
        takeEvery(UPDATE_COMPANY_DATA_REQUEST, UpdateCompanyDataSaga),
        takeEvery(ADD_NON_COVERZY_POLICIY_REQUEST, AddNonCoverzyPoliciySaga),
        takeEvery(GET_NON_COVERZY_POLICIY_REQUEST, GetNonCoverzyPoliciySaga),
        takeEvery(
            VIEW_NON_COVERZY_POLICIY_REQUEST,
            ViewNonCoverzyPolicyDataSaga,
        ),
        takeEvery(
            DELETE_NON_COVERZY_POLICIY_REQUEST,
            DeleteNonCoverzyPolicyDataSaga,
        ),
        takeEvery(ADD_USER_DATA_TEAM_REQUEST, AddUserDataSaga),
        takeEvery(GET_USER_DATA_TEAM_REQUEST, GetUserDataSaga),
        takeEvery(UPDATE_USER_DATA_TEAM_REQUEST, UpdateUserDataSaga),
        takeEvery(DELETE_USER_DATA_TEAM_REQUEST, DeleteUserDataSaga),
        takeEvery(
            GET_COMPANY_PROFILE_STATE_REQUEST,
            GetCompanyProfileStateSaga,
        ),
        takeEvery(GET_POLICIES_LIST_REQUEST, GetPoliciesListSaga),
        takeEvery(
            GET_PACKAGE_BY_SUB_INDUSTRY_REQUEST,
            GetPackageBySubIndustrySaga,
        ),
        takeEvery(CREATE_ORDER_ID_REQUEST, CraeteOrderIdSaga),
        takeEvery(GET_ALL_PACKAGES_REQUEST, GetAllPackagesSaga),
        takeEvery(VERIFY_PAYMENT_REQUEST, VerifyPaymentSaga),
        takeEvery(GET_PACKAGE_WITH_PLAN_REQUEST, GetPackageWithPlanSaga),
        takeEvery(GET_POLICY_BY_ID_REQUEST, GetPolicyByIdSaga),
        takeEvery(GET_ACTIVE_PLANS_REQUEST, GetActivePlansSaga),
        takeEvery(GET_POLICY_WITH_PLAN_REQUEST, GetPolicyWithPlanSaga),
        takeEvery(GET_SINGLE_ACTIVE_PLAN_REQUEST, GetSingleActivePlanSaga),
        takeEvery(GET_PAYMENT_HISTORY_REQUEST, GetPaymentHistorySaga),
        takeEvery(VIEW_ALL_CLAIM_REQUEST, ViewAllClaimSaga),
        takeEvery(UPLOAD_CLAIM_PROOF_REQUEST, UploadClaimProofSaga),
        takeEvery(
            GET_POLICIES_BY_SUB_INDUSTRY_REQUEST,
            GetPoliciesBySubIndustrySaga,
        ),
        takeEvery(GET_IN_ACTIVE_PLANS_REQUEST, GetInActivePlansSaga),
        takeEvery(GET_PARTICULAR_PAYMENT_REQUEST, GetParticularPaymentSaga),
        takeEvery(SEND_CUSTOMIZE_COVERAZE_REQUEST, SendCustomizeCoverageSaga),
        takeEvery(PURCHASE_COVERAGE_REQUEST, PurchaseCoverageSaga),
        takeEvery(GET_PACKAGES_DETAILS_REQUEST, GetPackageDetalisSaga),
        takeEvery(GET_SUPPORT_TICKET_REQUEST, GetSupportTicketsSaga),
        takeEvery(GET_PURCHASED_POLICY_REQUEST, GetPurchasedPolicyPointsSaga),
        takeEvery(CREATE_PAYMENT_ORDER, CreatePaymentOrderSaga),
        takeEvery(CREATE_VERIFY_PAYMENT_REQUEST, PaymentVerificationSaga),
        takeEvery(VERIFY_PHONE_LOGIN, VerifyPhoneLoginSaga),
        takeEvery(
            INITIATE_PURCHASE_POLICY_REQUEST,
            GetInitiatePurchasePolicySaga,
        ),
        takeEvery(GET_PAYMENT_BY_ID, GetPaymentById),
        takeEvery(GET_PURCHASED_POLICIES_REQUEST, GetPurchasedPoliciesSaga),
        takeEvery(
            DOWNLOAD_PURCHASED_POLICY_REQUEST,
            DownloadPurchasedPolicySaga,
        ),
        takeEvery(
            GET_SINGLE_PURCHASED_POLICY_REQEUST,
            GetSinglePurchasedPolicySaga,
        ),
        takeEvery(DOWNLOAD_PAYMENT_RECEIPT_REQUEST, DownloadPaymentReceiptSaga),
        takeEvery(GET_CITY_OF_SELECTED_STATE, GetCityNamesSaga),
        takeEvery(SAVE_PAYMENT_RECEIPT, GetPaymentReceiptSaveSaga),
        // //
        takeEvery(GST_API_INTEGRATION_ACTION, GetGstApiIntegrationSaga),
        takeEvery(
            RECOMMENDATION_API_INTEGRATION_ACTION,
            GetRecommendationsSaga,
        ),
        takeEvery(LIABILITY_QUOTE_API_REQUEST, GetQuoteSaga),
        takeEvery(SAVE_USER_STATE_ACTIONS, SaveUserSessionSaga),
        takeEvery(UPDATE_USER_SESSION_ACTION, UpdateUserSessionSaga),
        takeEvery(GET_USER_SESSION_BY_ID, GetUserSessionByIdSaga),
        takeEvery(GET_USER_SESSIONS, GetUserSessionSaga),
        takeEvery(
            MANUAL_INITIAL_POLICY_PURCHASE_REQUEST,
            ManualPurchasePolicySaga,
        ),
        takeEvery(REQUEST_A_CALL_BACK_REQUEST, GetRequestCallBackSaga),
        takeEvery(
            DOWNLOAD_NON_COVRZY_POLICY_REQUEST,
            DownloadNonCovrzyPolicySaga,
        ),
        takeEvery(SEND_OTP_PHONE_LOGIN_REQUEST, sendOtpPhoneLoginSaga),
        takeEvery(SEND_RESEND_OTP_PHONE_LOGIN_REQUEST, resendOtpPhoneLoginSaga),
        takeEvery(VERIFY_OTP_PHONE_LOGIN_REQUEST, verifyOtpPhoneLoginSaga),
    ]);
}

export default rootSagas;
