import { Fragment, useEffect, useState, useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';
import CoveredButton from '../../common/Buttons/CoveredButton';
import ChevronRight from '../../assets/images/chevron-right.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IReduxState } from '../../utils/types';
import CustomLoader from '../../common/Loader/CustomLoader';
import { NumberFormat } from '../../common/NumberFormat';
import { dateConverter } from '../../Helper/commonFunction';
import { GetSinglePurchasedPolicyAction } from '../../Redux/Actions/PurchasesAction';
import { policyIconMap, policyNameMap } from '../../utils/policyMap';
import { DownloadPurchasedPolicyAction } from '../../Redux/Actions/PoliciesActions';
import ThumbsUp from '../../assets/images/thumbs-up.svg';
import ThumbsDown from '../../assets/images/thumbs-down.svg';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import CoveredSidebar from '../Claims/CoveredSidebar';
import CovrGPTNavigation from '../../components/CovrgptNavigation';

const ViewPurchasedPolicy = () => {
    const { sendGAEvent } = useGAEvent(GACategories.SinglePurchasedPolicyPage);

    const [showCoverd, setShowCoverd] = useState(false);
    const [showNotCoverd, setShowNotCoverd] = useState(false);

    const { loading, policy } = useSelector(
        (state: IReduxState) => state.Purchases,
    );
    const {
        policyNumber,
        policyPDF,
        loading: pdfDownloading,
    } = useSelector((state: IReduxState) => state.Policies);
    const [downloadButtonClicked, setDownloadButtonClicked] = useState(false);
    const dispatch = useDispatch();
    const { policyId } = useParams();

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
        if (policyId) dispatch(GetSinglePurchasedPolicyAction(policyId));
    }, [dispatch, policyId]);

    useEffect(() => {
        if (downloadButtonClicked && policyPDF[policyNumber]) policyDownload();
    }, [downloadButtonClicked, policyDownload, policyNumber, policyPDF]);

    const handlePolicyDownload = () => {
        sendGAEvent(GAActions.DownloadPolicyClicked);
        setDownloadButtonClicked(true);
        if (policy.policyNumber && policyPDF[policy.policyNumber])
            policyDownload();
        else
            dispatch(
                DownloadPurchasedPolicyAction({
                    correlationId: policy.recommendationId!,
                    policyNumber: policy.policyNumber,
                    customerId: policy.customerId,
                }),
            );
    };

    const handleClose = () => {
        setShowNotCoverd(false);
        setShowCoverd(false);
    };
    const handleShowCovered = () => setShowCoverd(true);
    const handleShowNotCovered = () => setShowNotCoverd(true);

    return (
        <Fragment>
            <div className="claim-insurance">
                <div className="claim-top">
                    <span>
                        <img
                            src={
                                process.env.REACT_APP_IMAGE_BASE_URL +
                                policyIconMap.get(policy.coverName)!
                            }
                            alt=""
                            width="80%"
                        />
                    </span>
                    <div>
                        {loading ? (
                            <CustomLoader />
                        ) : (
                            <h2>{policyNameMap.get(policy.coverName)}</h2>
                        )}
                    </div>
                </div>
                <div className="db-line"></div>
                <div className="use-insurance">
                    <div className="use-insurance-box">
                        <Row>
                            <Col md={5}>
                                <Row className="use-insurance-first">
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Insurer Name</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>{policy.insurer}</span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Sum Insured</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {NumberFormat(
                                                        policy.sumInsured,
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Policy Holder</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {policy.policyHolder}
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Gross Premium</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {NumberFormat(
                                                        policy.grossPremium,
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Policy Start Date</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {dateConverter(
                                                        policy.startDate,
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Policy End Date</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {dateConverter(
                                                        policy.endDate,
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                {/* <Row>
                  <Col>
                    <CustomButton
                      disabled={downloadButtonClicked}
                      buttonTitle={
                        downloadButtonClicked
                          ? "Downloading..."
                          : "Download Policy"
                      }
                      onClick={handlePolicyDownload}
                    />
                  </Col>
                </Row> */}
                            </Col>
                            <Col md={7} className="m-auto">
                                <Row>
                                    <Col md={6}>
                                        <CoveredButton
                                            onClick={() => {
                                                sendGAEvent(
                                                    GAActions.WhatsCoveredClicked,
                                                );
                                                handleShowCovered();
                                            }}
                                            buttonTitle="What's Covered"
                                            ArrowImage={ChevronRight}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <CoveredButton
                                            onClick={() => {
                                                sendGAEvent(
                                                    GAActions.WhatsNotCoveredClicked,
                                                );
                                                handleShowNotCovered();
                                            }}
                                            buttonTitle="What's Not Covered"
                                            ArrowImage={ChevronRight}
                                        />
                                    </Col>
                                    <Col md={6} className="mt-4">
                                        <CoveredButton
                                            disabled={pdfDownloading}
                                            buttonTitle={
                                                pdfDownloading
                                                    ? 'Downloading...'
                                                    : 'Download Policy'
                                            }
                                            onClick={handlePolicyDownload}
                                            ArrowImage={ChevronRight}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {showCoverd && (
                <CoveredSidebar
                    title="What's Covered?"
                    image={ThumbsUp}
                    show={showCoverd}
                    onHide={handleClose}
                    content={policy.insuredPoints}
                />
            )}
            {showNotCoverd && (
                <CoveredSidebar
                    title="What's not Covered?"
                    image={ThumbsDown}
                    show={showNotCoverd}
                    onHide={handleClose}
                    content={policy.uninsuredPoints}
                />
            )}
            {/* <CovrGPTNavigation /> */}
        </Fragment>
    );
};

export default ViewPurchasedPolicy;
