import React, { useEffect, useState } from 'react';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import { useNavigate } from 'react-router-dom';
import { IReduxState } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { TOAST_SHOW } from '../../Redux/Actions/ToastAction';
import heroIcon from '../../assets/images/Shrug-bro.svg';
import useMSG90OTPWidget from '../../common/QuoteLayout/MSG90widgetfunction';
import Style from './style.module.scss';
import {
    ClearUserSession,
    SaveUserStateAction,
} from '../../Redux/Actions/SessionAction';
import CustomLoginModal from '../CustomLoginModal';

function GetRecommendationSection() {
    const navigate = useNavigate();

    // const { handleSubmit } = useMSG90OTPWidget();
    const [showLoginModal, setShowLoginModal] = useState(false)
    const dispatch = useDispatch();

    const { isLogin } = useSelector((state: IReduxState) => state.Auth);

    const handleButton = () => {
        dispatch(ClearUserSession());
        if (isLogin) {
            dispatch(SaveUserStateAction());
            navigate('/quote/info');
        } else {
            setShowLoginModal(true);
        }
    };

    const { sendGAEvent } = useGAEvent(GACategories.InsurancePackagesPage);
    return (
        <>
            <div className={Style.main}>
                <div className={Style.contentBanner}>
                    <div className={Style.imageBox}>
                        <img src={heroIcon} alt="heroIcon" />
                    </div>
                    <div className={Style.Content}>
                        <h3>
                            Not sure what's best for your business, Or not finding
                            what you need ?
                        </h3>
                        <p>
                            We can customize packages to suit your business
                            perfectly.
                        </p>
                        <button
                            onClick={() => {
                                sendGAEvent(GAActions.GetRecommendationClicked);
                                handleButton();
                            }}
                        >
                            Get Recommendation
                        </button>
                    </div>
                </div>
            </div>
            <CustomLoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} navigationAllowed={false} />
        </>
    );
}

export default GetRecommendationSection;
