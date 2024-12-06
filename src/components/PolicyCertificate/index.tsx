// PolicyCertificate.tsx
import React, { FC, useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';
import certificate from '../../assets/images/policyCertificate.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import { DownloadPurchasedPolicyAction } from '../../Redux/Actions/PoliciesActions';
import FullPageSpinner from '../../common/FullPageSpinner';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import { UpdateUserSessionAction } from '../../Redux/Actions/SessionAction';

const PolicyCertificate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sendGAEvent } = useGAEvent(GACategories.PurchasedPolicies);

    const userSession = useSelector((state: IReduxState) => state.UserSession);

    const { purchasedPolicyData } = useSelector(
        (state: IReduxState) => state.PolicyHolderInput,
    );

    const { policyNumber, policyPDF, loading } = useSelector(
        (state: IReduxState) => state.Policies,
    );

    const [downloadButtonClicked, setDownloadButtonClicked] = useState(false);

    const policyDownload = useCallback(() => {
        // Convert the ArrayBuffer to a Blob
        const blob = new Blob([policyPDF[policyNumber]], {
            type: 'application/pdf',
        });

        // Create a URL for the PDF blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = `policy_${policyNumber ?? 'certificate'}.pdf`;
        document.body.appendChild(link);

        // Trigger the click event on the link to start the download
        link.click();

        // Clean up by removing the link element and resetting the downloading state
        document.body.removeChild(link);
        setDownloadButtonClicked(false);
    }, [policyNumber, policyPDF]);

    useEffect(() => {
        dispatch(
            UpdateUserSessionAction({
                id: userSession.id, // always add for params
                nextSessionState: 'policy_purchase_completed',
                userSessionData: {
                    purchasedPolicyData: purchasedPolicyData,
                },
            }),
        );
    }, [purchasedPolicyData]);

    useEffect(() => {
        if (downloadButtonClicked && policyPDF[policyNumber]) policyDownload();
    }, [downloadButtonClicked, policyDownload, policyNumber, policyPDF]);

    const handlePolicyDownload = () => {
        // sendGAEvent(GAActions.DownloadPolicyClicked);
        setDownloadButtonClicked(true);
        if (policyPDF[policyNumber]) policyDownload();
        else
            dispatch(
                DownloadPurchasedPolicyAction({
                    correlationId: purchasedPolicyData.correlationId!,
                    policyNumber: purchasedPolicyData.policyNumber,
                    customerId: purchasedPolicyData.customerId,
                }),
            );
    };

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
            <div className={style.box}>
                <h1>Policy Certificate is Ready</h1>
                <div className={style.imageContainer}>
                    <img src={certificate} alt="My Icon" />
                </div>
                <p className={style.innerText}>
                    Your insurance policy certificate is now available for
                    download. This certificate contains important details about
                    the coverage.
                    {/* Your insurance certificate will be ready for download within
                    2 business days, and we'll notify you once it's available.
                    It includes crucial coverage details. */}
                </p>
                <div className={style.innerBox}>
                    <p
                        className={style.link}
                        onClick={() => handleNavigate('/user/dashboard')}
                    >
                        Go to Dashboard
                    </p>
                    <button onClick={handlePolicyDownload}>
                        Download Policy Certificate
                    </button>
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
        </div>
    );
};

export default PolicyCertificate;
