import React from 'react';
import { useNavigate } from 'react-router';
import Style from './style.module.scss';
import { useDispatch } from 'react-redux';
import { SAVE_RETRY_PAYMENT_STATE_TRUE } from '../../../Redux/Actions/PaymentActions';

interface PaymentCardProps {
    icon: any;
    title: string;
    details: string;
    showRetry: boolean;
}

const PaymentCard = ({ icon, title, details, showRetry }: PaymentCardProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className={Style.main}>
            <div className={Style.contentCard}>
                <div className={Style.heroHeader}>
                    <img src={icon} />
                    <h4
                        style={
                            showRetry
                                ? { color: '#e35141' }
                                : { color: '#388E3C' }
                        }
                    >
                        {title}
                    </h4>
                </div>
                <h4>{details}</h4>
            </div>
            {showRetry && (
                <div className={Style.footerButton}>
                    <button
                        onClick={() => {
                            dispatch({
                                type: SAVE_RETRY_PAYMENT_STATE_TRUE,
                                payload: true,
                            });
                            navigate('/quote/info');
                        }}
                    >
                        Retry Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentCard;
