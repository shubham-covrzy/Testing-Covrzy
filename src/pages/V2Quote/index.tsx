import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import Sidebar from '../../components/Sidebar';
import QuoteCustomStepper from '../../common/QuoteCustomStepper';
import UserDetails from './AuthComponent/UserDetails';
import sidebarIcon2 from '../../assets/images/Team work-bro 1.svg';
import RecommendationComponent from './Recommendation';
import AboutBusiness from './AboutBusiness/AboutBusiness';
import CheckoutComponent from './Checkout';
import { UpdateUserProfileAction } from '../../Redux/Actions/UserProfileAction';
import {
    GST_API_SUCCESS_RESPONSE,
    SaveAboutBusinessAction,
    SaveSelectedProductsAction,
} from '../../Redux/Actions/CustomerInformationAction';
import { RECOMMENDATION_API_SUCCESS_RESPONSE } from '../../Redux/Actions/RecommendationAction';
import { isObjectEmpty } from '../../Helper/commonFunction';
import { LIABILITY_QUOTE_API_REQUEST_SUCCESS_RESPONSE } from '../../Redux/Actions/QuoteAction';
import { useNavigate } from 'react-router-dom';
import { INITIATE_PURCHASE_POLICY_SUCCESS } from '../../Redux/Actions/PolicyInputAction';

function QuoteContainer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0);
    const [buttonClick, setButtonClick] = useState(false);
    const [submitButtonClick, setSubmitButtonClick] = useState(false);
    const [formFilled, setFormFilled] = useState({
        gstin: false,
        legalName: false,
        annualTurnover: false,
        address: false,
        category: false,
        fundingAmount: false,
        employeesCount: false,
    });
    const [buttonDisable, setButtonDisable] = useState(false);
    const [businessData, setBusinessData] = useState(null);
    const [recommendationData, setRecommendationData] = useState<any>(null);

    const { paymentRetry } = useSelector((state: IReduxState) => state.Payment);
    const userSession = useSelector((state: IReduxState) => state.UserSession);
    const { quoteResponse } = useSelector(
        (state: IReduxState) => state.LiabilityQuote,
    );

    useEffect(() => {
        let savedIndex = 0;
        const data = userSession.userSessionData;
        let previousStepPresent = false;

        if (!data) {
            return;
        }

        if (!isObjectEmpty(data.userData)) {
            savedIndex = 1;
            if (data.policies && data.businessCategory) {
                dispatch(
                    SaveSelectedProductsAction({
                        policies: data.policies,
                        businessCategory: data.businessCategory,
                    }),
                );
            }
            previousStepPresent = true;
        }

        if (!previousStepPresent) {
            setIndex(savedIndex);
            return;
        }

        previousStepPresent = false;

        if (!isObjectEmpty(data.businessData) || !isObjectEmpty(data.gstData)) {
            //saving profile data
            const formData = new FormData();
            formData.append('first_name', data.userData.firstName);
            formData.append('last_name', data.userData.lastName);
            formData.append('email', data.userData.email);
            dispatch(UpdateUserProfileAction(formData));
            setBusinessData(data.businessData);

            savedIndex = 2;

            if (!isObjectEmpty(data.gstData)) {
                dispatch({
                    type: GST_API_SUCCESS_RESPONSE,
                    payload: data.gstData,
                });

                savedIndex = 1;
                savedIndex = 1;
                savedIndex = 1;
                savedIndex = 1;
                savedIndex = 1;
            }

            previousStepPresent = true;
        }

        if (!previousStepPresent) {
            setIndex(savedIndex);
            return;
        }

        previousStepPresent = false;

        if (!isObjectEmpty(data.recommendationResponse)) {
            //saving business data
            const formData = new FormData();
            formData.append('address', data.businessData.address);
            dispatch(SaveAboutBusinessAction(data.businessData));
            dispatch(UpdateUserProfileAction(formData));

            // saving recommendationResponse
            dispatch({
                type: RECOMMENDATION_API_SUCCESS_RESPONSE,
                payload: data.recommendationResponse,
            });

            if (data.userSelectedData) {
                setRecommendationData({
                    products: data.userSelectedData?.products,
                    policyEndDate: data.userSelectedData?.policyEndDate,
                    policyStartDate: data.userSelectedData?.policyStartDate,
                });
            }

            savedIndex = 2;
            previousStepPresent = true;
        }

        if (!previousStepPresent) {
            setIndex(savedIndex);
            return;
        }

        previousStepPresent = false;

        if (!isObjectEmpty(data.quoteResponse)) {
            dispatch({
                type: LIABILITY_QUOTE_API_REQUEST_SUCCESS_RESPONSE,
                payload: data.quoteResponse,
            });

            setIndex(3);
            previousStepPresent = true;
        }

        if (!previousStepPresent) {
            setIndex(savedIndex);
            return;
        }

        previousStepPresent = false;

        if (!isObjectEmpty(data.paymentResponse)) {
            localStorage.setItem('order', data.paymentResponse.orderId);
            navigate(
                '/quote/policy-purchase/payment-success/' +
                    data.paymentResponse.receiptId,
            );
            previousStepPresent = true;
        }

        if (!previousStepPresent) {
            setIndex(savedIndex);
            return;
        }

        previousStepPresent = false;

        if (!isObjectEmpty(data.purchasedPolicyData)) {
            dispatch({
                type: INITIATE_PURCHASE_POLICY_SUCCESS,
                payload: data.purchasedPolicyData,
            });
            navigate('/quote/policy-certificate');
            previousStepPresent = true;
        }

        if (!previousStepPresent) {
            setIndex(savedIndex);
            return;
        }

        previousStepPresent = false;

        setIndex(savedIndex);
    }, []);

    useEffect(() => {
        if (paymentRetry) {
            setIndex(3);
        }
    }, [paymentRetry]);

    function quoteSwitch() {
        switch (index) {
            case 0:
                return (
                    <UserDetails
                        indexCount={index}
                        setIndexCount={setIndex}
                        buttonClicks={buttonClick}
                        setButtonClicks={setButtonClick}
                        setSubmitButtonClicks={setSubmitButtonClick}
                    />
                );
            case 1:
                return (
                    <AboutBusiness
                        buttonClicks={submitButtonClick}
                        setSubmitButtonClick={setSubmitButtonClick}
                        formFilled={formFilled}
                        setFormFilled={setFormFilled}
                        buttonDisable={buttonDisable}
                        setButtonDisable={setButtonDisable}
                        setIndex={setIndex}
                        index={index}
                        setButtonClick={setButtonClick}
                        businessData={businessData}
                    />
                );

            case 2:
                return (
                    <RecommendationComponent
                        buttonClicked={buttonClick}
                        setIndex={setIndex}
                        setButtonClick={setButtonClick}
                        setSubmitButtonClicks={setSubmitButtonClick}
                        index={index}
                        userSelectedData={recommendationData}
                    />
                );

            case 3:
                return <CheckoutComponent index={index} setIndex={setIndex} />;

            default:
                break;
        }
    }

    return (
        <section className="otp-login-sec quote-bg ">
            <Sidebar
                sidebarHeader="Begin Your application."
                sideBarDesc="We will need few more details before we display the prices"
                bannerImg={sidebarIcon2}
                showEstimate={index === 3}
            />
            <div className="d-flex flex-column quote-container ">
                <div className="quote-login-container">
                    <div className="stepper-container">
                        <QuoteCustomStepper step={index} />
                    </div>
                    {quoteSwitch()}
                </div>
                {/* <div className="quote-footer-btn">
                    <div className="footer-buttons"></div>
                </div> */}
            </div>
        </section>
    );
}

export default QuoteContainer;
