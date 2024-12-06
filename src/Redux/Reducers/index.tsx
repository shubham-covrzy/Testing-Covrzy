import { combineReducers } from 'redux';
import { AddCoverageReducer } from './AddCoverage';
import { AuthReducer } from './AuthReducers';
import { ClaimReducer } from './ClaimReducers';
import { DashboardReducer } from './DashboardReducer';
import { EmailVerifyReducer } from './EmailVerifyReducer';
import { HeaderTitleReducer } from './HeaderTitleReducer';
import { HomepageReducer } from './HomepageReducer';
import { PaymentReducer } from './PaymentReducers';
import { PoliciesReducer } from './PoliciesReducers';
import { SupportReducer } from './SupportReducer';
import { ToastReducer } from './ToastReducer';
import { UserProfileReducer } from './UserProfileReducer';
import { PurchasesReducer } from './PurchasesReducers';
import { PurchaseQuoteReducer } from './SaveProductReducer';
import { PolicyHolderInputReducer } from './PolicyInputReducers';
import { CustomInformationReducer } from './CustomerInformationReducer';
import { RecommendationReducer } from './RecommendationReducer';
import { LiabilityQuoteReducer } from './QuoteReducer';
import { UserSessionReducer } from './SessionReducer';
import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
    Auth: AuthReducer,
    Toast: ToastReducer,
    EmailVerify: EmailVerifyReducer,
    HeaderTitle: HeaderTitleReducer,
    AddCoverage: AddCoverageReducer,
    UserProfile: UserProfileReducer,
    Support: SupportReducer,
    Policies: PoliciesReducer,
    Dashboard: DashboardReducer,
    Homepage: HomepageReducer,
    Claim: ClaimReducer,
    Payment: PaymentReducer,
    Purchases: PurchasesReducer,
    PurchaseQuote: PurchaseQuoteReducer,
    PolicyHolderInput: PolicyHolderInputReducer,
    CustomerInformation: CustomInformationReducer,
    Recommendations: RecommendationReducer,
    LiabilityQuote: LiabilityQuoteReducer,
    UserSession: UserSessionReducer,
    LoginDetails: LoginReducer,
});

export default rootReducer;
