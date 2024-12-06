import React from 'react';
import certificate from '../../assets/images/policyCertificate.svg';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const ThanksComponent = () => {
    const navigate = useNavigate();

    const BETA_LINK = process.env.REACT_APP_BETA_URL

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }

    return (
        <div className={style.main}>
            <h4>Thanks for completing the purchase</h4>
            <div className={style.content}>
                <img alt="" src={certificate} />
                <p>
                    Your policy certificate will be ready to download within 2
                    business days, and we'll notify you once it's available. It
                    includes crucial coverage details.
                </p>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={() => handleNavigate('/user/policies/purchase')}>
                    Go to dashboard
                </button>
            </div>
        </div>
    );
};

export default ThanksComponent;
