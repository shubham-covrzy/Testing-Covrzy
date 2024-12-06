import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../pages/Home';
import { StartUp } from '../pages/StartUp';
// import BusinessOwnerPolicy from '../pages/BusinessOwnerPolicy';//product page 
import SignIn from '../pages/Auth/SignIn';
// import SignUp from '../pages/Auth/SignUp';
import UserDetail from '../pages/UserDetail';
import DashboardLayout from '../common/DashboardLayouts';
import Dashboard from '../pages/Dashboard';
import AddCovrage from '../pages/Dashboard/AddCovrage';
import AddCovrageDetail from '../pages/Dashboard/AddCovrageDetail';
import ComplatePayment from '../pages/Dashboard/ComplatePayment';
import Policies from '../pages/Policies';
import Payment from '../pages/Payment';
import Claims from '../pages/Claims';
import Support from '../pages/Support';
import EditProfile from '../pages/UserProfile/EditProfile';
import ChangePassword from '../pages/UserProfile/ChangePassword';
import EditCompanyProfile from '../pages/UserProfile/EditCompanyProfile';
import EditTeamSettings from '../pages/UserProfile/EditTeamSettings';
import AuthLayout from '../common/AuthLayout';
import ViewNonCovrzyPolicies from '../pages/Policies/ViewNonCovrzyPoliciy';
import ViewActivePolicy from '../pages/Claims/ViewActivePolicy';
import UploadProof from '../pages/Claims/UploadProof';
import ResetPassword from '../pages/Auth/ResetPassword';
import Invoice from '../pages/Payment/invoice';
// import { Blog } from '../pages/Blog';
// import { BlogDetail } from '../pages/Blog/BlogDetail';
import ProductDetailView from '../pages/Dashboard/ProductDetailView';
import TermsConditions from '../pages/Terms';
import SupportTicket from '../pages/SupportTickets';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Resources from '../pages/Resources';
import FAQPage from '../pages/FAQ';
import Partners from '../pages/Partners';
import AboutUs from '../pages/AboutUs';
import QuoteLayout from '../common/QuoteLayout';
import PaymentReceipt from './PaymentFeature/PaymentReceipt/PaymentReceipt';
import ProposalPDF from '../pages/ProposalPdf/ProposalPDF';
import ViewPurchasedPolicy from '../pages/Policies/ViewPurchasedPolicy';
import QuoteContainer from '../pages/V2Quote';
import InsurancePackages from '../pages/InsurancePackages';
// import PaymentFailurePage from '../pages/PaymentFailure';
import PaymentFailurePage from '../pages/V2Quote/PaymentFailure';
import PaymentSuccessPage from '../pages/V2Quote/PaymentSucess';
import PolicyCertificate from './PolicyCertificate';
import Blogs from '../pages/Blogs';
import BlogDetails from '../pages/Blogs/BlogDetails';
import BlogDetailsStatic from '../pages/Blogs/BlogDetailsStatic';
import CoBranding from '../pages/CoBrandingPage';

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const BETA_LINK = process.env.REACT_APP_BETA_URL;

    const decodeBase64 = (encodedData: string) => {
        try {
            // Base64 decode the encoded data
            const decodedString = atob(encodedData);
            return JSON.parse(decodedString); // Parse it as JSON
        } catch (error) {
            console.error('Error decoding Base64 data:', error);
            return null;
        }
    };

    useEffect(() => {
        // Get the Base64-encoded payload from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');

        if (encodedData) {
            const decodedPayload = decodeBase64(encodedData);

            if (decodedPayload) {
                const { session_id, userToken } = decodedPayload;

                // Store session id in sessionStorage
                if (session_id) {
                    sessionStorage.setItem('sessionId', session_id);
                }

                // Store userToken in cookies
                if (userToken) {
                    document.cookie = `userToken=${userToken}; path=/; domain=covrzy.com; samesite=strict`;
                }
            }
        }
    }, []);

    return (
        <Routes>
            {/* <Route>
      {isLoggedIn ? (
        <Home />
      ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      )}
      </Route> */}
            <Route
                path="/"
                element={
                    window.location.host ===
                        process.env.REACT_APP_PARTNER_DOMAIN ? (
                        <QuoteLayout component={<InsurancePackages />} />
                    ) : (
                        <Home />
                    )
                }
            />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            {/* this routes /blogs/:slug are for accessing old blogs just in case we need */}
            <Route path="/blogs/:slug" element={<BlogDetailsStatic />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/partners/:slug" element={<CoBranding />} />

            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/resource/:questionNo" element={<Resources />} />
            <Route path="/package-details/:slug" element={<StartUp />} />
            <Route path="company/terms" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* <Route
                path="/policy-details/:slug"
                element={<BusinessOwnerPolicy />}
            /> */}
            <Route
                path="/sign-in"
                element={<AuthLayout component={<SignIn />} />}
            />
            <Route
                path="/reset-password/:token"
                element={<AuthLayout component={<ResetPassword />} />}
            />
            {/* <Route
        path="/sign-up"
        element={
          <AuthLayout component={<SignUp />} />
        }
      /> */}
            <Route
                path="/user/user-detail"
                element={<AuthLayout component={<UserDetail />} />}
            />
            {
                (BETA_LINK && window.location.origin === BETA_LINK) && <>
                    <Route
                        path="/user/dashboard"
                        element={<DashboardLayout component={<Dashboard />} />}
                    />
                    <Route
                        path="/user/dashboard/:planType/:id/add-covrage"
                        element={<DashboardLayout component={<AddCovrage />} />}
                    />
                    <Route
                        path="/user/dashboard/product-details/:planType/:id"
                        element={<DashboardLayout component={<ProductDetailView />} />}
                    />
                    <Route
                        path="/user/dashboard/add-covrage-detail"
                        element={<DashboardLayout component={<AddCovrageDetail />} />}
                    />
                    <Route
                        path="/user/dashboard/complate-payment/:planType/:id"
                        element={<DashboardLayout component={<ComplatePayment />} />}
                    />
                    <Route
                        path="/user/policies/:policyType"
                        element={<DashboardLayout component={<Policies />} />}
                    />
                    <Route
                        path="/user/policies/activePolicy/:activePlanId"
                        element={<DashboardLayout component={<ViewActivePolicy />} />}
                    />
                    <Route
                        path="/user/policies/activePackage/:activePlanId/policy/:policyId"
                        element={<DashboardLayout component={<ViewActivePolicy />} />}
                    />
                    <Route
                        path="/user/policies/non-covrzy/:policyId"
                        element={
                            <DashboardLayout component={<ViewNonCovrzyPolicies />} />
                        }
                    />
                    <Route
                        path="/user/payment"
                        element={<DashboardLayout component={<Payment />} />}
                    />
                    <Route
                        path="/user/payment/:invoiceId"
                        element={<DashboardLayout component={<Invoice />} />}
                    />
                    <Route
                        path="/user/claims"
                        element={<DashboardLayout component={<Claims />} />}
                    />
                    <Route
                        path="/user/claims/activePolicy/:activePlanId"
                        element={<DashboardLayout component={<ViewActivePolicy />} />}
                    />
                    <Route
                        path="/user/claims/activePackage/:activePlanId/policy/:policyId"
                        element={<DashboardLayout component={<ViewActivePolicy />} />}
                    />
                    <Route
                        path="/user/claims/activePolicy/:activePlanId/upload-proof/:id"
                        element={<DashboardLayout component={<UploadProof />} />}
                    />
                    <Route
                        path="/user/claims/activePackage/:activePlanId/policy/:policyId/upload-proof/:id"
                        element={<DashboardLayout component={<UploadProof />} />}
                    />
                    <Route
                        path="/user/purchases/policies/:policyId"
                        element={
                            <DashboardLayout component={<ViewPurchasedPolicy />} />
                        }
                    />
                    <Route
                        path="/user/support/concern"
                        element={<DashboardLayout component={<Support />} />}
                    />
                    <Route
                        path="/user/support/tickets"
                        element={<DashboardLayout component={<SupportTicket />} />}
                    />

                    <Route
                        path="/user/edit-profile"
                        element={<DashboardLayout component={<EditProfile />} />}
                    />
                    <Route
                        path="/user/change-password"
                        element={<DashboardLayout component={<ChangePassword />} />}
                    />
                    <Route
                        path="/user/edit-company-profile"
                        element={<DashboardLayout component={<EditCompanyProfile />} />}
                    />
                    <Route
                        path="/user/edit-team-setting"
                        element={<DashboardLayout component={<EditTeamSettings />} />}
                    />
                </>
            }

            <Route path="payment/receipt" element={<PaymentReceipt />} />
            <Route path="proposal-pdf" element={<ProposalPDF />} />

            <Route
                path="quote/info"
                element={<QuoteLayout component={<QuoteContainer />} />}
            />

            <Route
                path="/quote/policy-purchase/payment-failure/:receiptId"
                element={<QuoteLayout component={<PaymentFailurePage />} />}
            />
            <Route
                path="/quote/policy-purchase/payment-success/:receiptId"
                element={<QuoteLayout component={<PaymentSuccessPage />} />}
            />

            <Route
                path="/quote/insurance-packages"
                element={<QuoteLayout component={<InsurancePackages />} />}
            />

            <Route
                path="/quote/policy-certificate"
                element={<QuoteLayout component={<PolicyCertificate />} />}
            />

            <Route
                path="/user/product-details/:planType/:id"
                element={<ProductDetailView />}
            />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes >
    );
};

export default Main;
