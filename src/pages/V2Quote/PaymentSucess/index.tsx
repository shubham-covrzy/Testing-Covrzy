import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import PaymentCard from '../../../components/PaymentFeature/PaymentCard';
import PaymentDetailsCard from '../../../components/PaymentFeature/PaymentDetailsCard';
import Style from './style.module.scss';
import SuccessCheckmark from '../../../assets/images/check.png';
import PolicyHolder from '../../../components/PolicyHolder';
import { isObjectEmpty } from '../../../Helper/commonFunction';
import { IReduxState } from '../../../utils/types';
import FullPageSpinner from '../../../common/FullPageSpinner';
import { GetPaymentById } from '../../../Redux/Actions/PaymentActions';
import ThanksComponent from '../../../components/ThanksComponent';
import { ManualPurchasePolicyAction } from '../../../Redux/Actions/PolicyInputAction';
import { ClearUserSession } from '../../../Redux/Actions/SessionAction';

function PaymentSuccessPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { receiptId } = useParams();

    const [state, setState] = useState<boolean | null>(null);

    const { paymentResponse, loading } = useSelector(
        (state: IReduxState) => state.Payment,
    );
    const { quoteResponse } = useSelector(
        (state: IReduxState) => state.LiabilityQuote,
    );

    const { correlationId, policyStartDate, quoteId } = quoteResponse;

    useEffect(() => {
        if (receiptId) {
            dispatch(GetPaymentById(receiptId));
        }
    }, [receiptId]);
    useEffect(() => {
        if (!isObjectEmpty(paymentResponse) && receiptId) {
            dispatch(
                ManualPurchasePolicyAction({
                    quoteId: quoteId,
                    correlationId: correlationId,
                    receiptId: receiptId,
                    policyStartDate: policyStartDate,
                }),
            );
        }
    }, [paymentResponse, receiptId]);

    useEffect(() => {
        const createResponseOrderId = localStorage.getItem('order');
        if (!isObjectEmpty(paymentResponse)) {
            if (paymentResponse.orderId !== createResponseOrderId) {
                navigate('/') // navigate('/quote/insurance-packages')
                setState(false);
            } else {
                setState(true);
            }
        }
    }, [paymentResponse]);

    if (state === false)
        return (
            <>
                {loading && <FullPageSpinner />}
                {loading && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0, 0, 0, 0.2)', // Adjust the opacity and color as needed
                            zIndex: 9999,
                        }}
                    />
                )}
            </>
        );

    return (
        <>
            {state === true && (
                <section className={Style.main}>
                    <div className={Style.container}>
                        <div>
                            <PaymentCard
                                title="Payment Successful"
                                details="Your policy has been successfully purchased. Below, you’ll find a summary of your policy details and payment confirmation."
                                icon={SuccessCheckmark}
                                showRetry={false}
                            />
                        </div>
                        <div>
                            <PaymentDetailsCard
                                coverageLogo={SuccessCheckmark}
                                success={true}
                            />
                        </div>
                    </div>
                    <div>
                        <PolicyHolder />{' '} 
                    </div>
                    {loading && <FullPageSpinner />}
                    {loading && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                background: 'rgba(0, 0, 0, 0.2)', // Adjust the opacity and color as needed
                                zIndex: 9999,
                            }}
                        />
                    )}
                </section>
            )}
        </>
    );
}

export default PaymentSuccessPage;
