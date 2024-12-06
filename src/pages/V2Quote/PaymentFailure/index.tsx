import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import PaymentFailureCard from '../../../components/PaymentFeature/PaymentCard';
import PaymentDetailsCard from '../../../components/PaymentFeature/PaymentDetailsCard';
import Style from './style.module.scss';
import FailureCheckmark from '../../../assets/images/close-circle.svg';
import Failed from '../../../assets/images/failed.svg';
import FullPageSpinner from '../../../common/FullPageSpinner';
import { IReduxState } from '../../../utils/types';
import { GetPaymentById } from '../../../Redux/Actions/PaymentActions';
import { isObjectEmpty } from '../../../Helper/commonFunction';

function PaymentFailurePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { receiptId } = useParams();

    const [state, setState] = useState<boolean | null>(null);

    const { paymentResponse, loading } = useSelector(
        (state: IReduxState) => state.Payment,
    );

    useEffect(() => {
        if (receiptId) {
            dispatch(GetPaymentById(receiptId));
        }
    }, [receiptId]);

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
                            <PaymentFailureCard
                                icon={Failed}
                                title="Payment Failed"
                                details={`There was an issue processing your payment. Please click 'Retry
          Payment' below to complete your purchase. If the issue persists,
          please contact our support team for assistance.`}
                                showRetry={true}
                            />
                        </div>
                        <div>
                            <PaymentDetailsCard
                                coverageLogo={FailureCheckmark}
                                success={false}
                            />
                        </div>
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

export default PaymentFailurePage;
