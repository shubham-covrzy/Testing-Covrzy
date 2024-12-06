import React, { useState, useEffect } from 'react';
import style from './style.module.scss';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SavePolicyStartDateAction } from '../../../Redux/Actions/RecommendationAction';
import PolicyCardComponent from '../../../components/PolicyCard';
import { IReduxState } from '../../../utils/types';
import {
    CLEAR_NAVIGATOR_ACTION,
    liabilityQuoteApiIntegrationAction,
} from '../../../Redux/Actions/QuoteAction';
import { selectedProductCardAction } from '../../../Redux/Actions/SaveProductAction';
import { TOAST_SHOW } from '../../../Redux/Actions/ToastAction';
import FullPageSpinner from '../../../common/FullPageSpinner';
import { isObjectEmpty } from '../../../Helper/commonFunction';
import { getCoverData } from '../Checkout';
import CustomButton from '../../../common/Buttons/CustomButton';
import { UpdateUserSessionAction } from '../../../Redux/Actions/SessionAction';

interface RecommendationComponentProps {
    buttonClicked: boolean;
    setIndex: any;
    setButtonClick: any;
    setSubmitButtonClicks: any;
    index: number;
    userSelectedData: UserSelectedData;
}

interface UserSelectedData {
    products: any;
    policyStartDate: string;
    policyEndDate: string;
}

export function convertDateToYearFormat(originalDateString: any) {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Windows')) {
        let originalDate = new Date(originalDateString);
        let convertedDateString =
            originalDate.getFullYear() +
            '-' +
            ('0' + (originalDate.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + originalDate.getDate()).slice(-2);
        return convertedDateString;
    } else {
        let originalDate = new Date(originalDateString);
        let convertedDateString =
            originalDate.getFullYear() +
            '/' +
            ('0' + (originalDate.getMonth() + 1)).slice(-2) +
            '/' +
            ('0' + originalDate.getDate()).slice(-2);
        return convertedDateString;
    }
}

function convertDateFormat(originalDateString: any) {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Windows')) {
        let originalDate = new Date(originalDateString);
        let convertedDateString =
            ('0' + originalDate.getDate()).slice(-2) +
            '-' +
            ('0' + (originalDate.getMonth() + 1)).slice(-2) +
            '-' +
            originalDate.getFullYear();
        return convertedDateString;
    } else {
        let originalDate = new Date(originalDateString);
        let convertedDateString =
            ('0' + originalDate.getDate()).slice(-2) +
            '/' +
            ('0' + (originalDate.getMonth() + 1)).slice(-2) +
            '/' +
            originalDate.getFullYear();
        return convertedDateString;
    }
}
function RecommendationComponent({
    buttonClicked,
    setIndex,
    setButtonClick,
    setSubmitButtonClicks,
    index,
    userSelectedData,
}: RecommendationComponentProps) {
    const dispatch = useDispatch();

    const [products, setProducts] = useState<any[]>([]);
    const [minDate, setMinDate] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [covers, setCovers] = useState<any>([]);
    const [endDate, setEndDate] = useState<any>('');
    const [error, setError] = useState<string>('');
    const [childHeight, setChildHeight] = useState('auto');
    const [coverSI, setCoverSI] = useState<Map<string, string>>(new Map());

    const { recommendationResponse, policyEndDate, policyStartDate } =
        useSelector((state: IReduxState) => state.Recommendations);

    const { loading, navigator, quoteResponse } = useSelector(
        (state: IReduxState) => state.LiabilityQuote,
    );

    const { policies } = useSelector(
        (state: IReduxState) => state.CustomerInformation,
    );

    const userSession = useSelector((state: IReduxState) => state.UserSession);

    const { selectedCard } = useSelector(
        (state: IReduxState) => state.PurchaseQuote,
    );

    useEffect(() => {
        const tallestChildHeight = Math.max(
            ...Array.from(document.querySelectorAll('.dynamic-height')).map(
                (child) => child.clientHeight,
            ),
        );

        setChildHeight(tallestChildHeight + 'px');
    }, [childHeight]);
    //  related to resume part need to check some more bugs
    // useEffect(() => {
    //     if (userSelectedData) {
    //         setProducts(userSelectedData.products);
    //         if (userSelectedData.policyStartDate) {
    //             setDate(userSelectedData.policyStartDate);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        if (buttonClicked) {
            if (!endDate) {
                dispatch({
                    type: TOAST_SHOW,
                    payload: {
                        message: 'Please select a start date',
                        severity: 'danger',
                        show: true,
                    },
                });
            }
            if (products.length === 0) {
                dispatch({
                    type: TOAST_SHOW,
                    payload: {
                        message: 'Please select atleast one product.',
                        severity: 'danger',
                        show: true,
                    },
                });
            }
            if (endDate && products.length !== 0) {
                dispatch(liabilityQuoteApiIntegrationAction(coverSI));
            }
            dispatch(
                UpdateUserSessionAction({
                    id: userSession.id, // always add for params
                    correlationId: recommendationResponse.recommendationId,
                    userSessionData: {
                        recommendationResponse: recommendationResponse,
                        userSelectedData: {
                            products: products,
                            policyStartDate: policyStartDate,
                            policyEndDate: policyEndDate,
                        },
                    },
                }),
            );

            setButtonClick(false);
        }
    }, [buttonClicked]);

    useEffect(() => {
        if (navigator === true) {
            setIndex(3);
            dispatch({
                type: CLEAR_NAVIGATOR_ACTION,
                payload: {},
            });
        }
    }, [navigator]);

    useEffect(() => {
        if (
            !isObjectEmpty(policies) &&
            !isObjectEmpty(recommendationResponse)
        ) {
            const coverElements = recommendationResponse.risks.flatMap(
                (risk: any) => risk.covers,
            );
            const coverMap = coverElements.map((element: any) =>
                getCoverData(
                    element.coverName,
                    element.coverSI,
                    element.premium,
                ),
            );
            setProducts(coverMap);
        }
    }, [recommendationResponse, policies]);

    useEffect(() => {
        dispatch(
            UpdateUserSessionAction({
                id: userSession.id, // always add for params
                correlationId: recommendationResponse.recommendationId,
                userSessionData: {
                    recommendationResponse: recommendationResponse,
                },
            }),
        );
        if (
            !isObjectEmpty(recommendationResponse) &&
            isObjectEmpty(quoteResponse)
        ) {
            const coverElements = recommendationResponse.risks.flatMap(
                (risk: any) => risk.covers,
            );
            setCovers(coverElements);
        }
    }, [recommendationResponse, quoteResponse]);

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedTomorrow = tomorrow.toISOString().split('T')[0];
        setMinDate(formattedTomorrow);
    }, []);

    useEffect(() => {
        if (date) {
            const startDate = new Date(date);
            const calculatedEndDate = new Date(startDate);
            calculatedEndDate.setFullYear(calculatedEndDate.getFullYear() + 1);
            calculatedEndDate.setDate(calculatedEndDate.getDate() - 1);
            const end = convertDateFormat(calculatedEndDate);

            setEndDate(end);

            dispatch(
                UpdateUserSessionAction({
                    id: userSession.id, // always add for params
                    correlationId: recommendationResponse.recommendationId,
                    userSessionData: {
                        recommendationResponse: recommendationResponse,
                        userSelectedData: {
                            products: products,
                            policyStartDate: policyStartDate,
                            policyEndDate: policyEndDate,
                        },
                    },
                }),
            );

            dispatch(
                SavePolicyStartDateAction({
                    policyStartDate: startDate,
                    policyEndDate: end,
                }),
            );
        }
    }, [date]);

    useEffect(() => {
        dispatch(
            UpdateUserSessionAction({
                id: userSession.id, // always add for params
                correlationId: recommendationResponse.recommendationId,
                userSessionData: {
                    recommendationResponse: recommendationResponse,
                    userSelectedData: {
                        products: products,
                        policyStartDate: policyStartDate,
                        policyEndDate: policyEndDate,
                    },
                },
            }),
        );
        dispatch(
            selectedProductCardAction({
                selectedCards: products,
            }),
        );
    }, [products]);

    useEffect(() => {
        if (!isObjectEmpty(selectedCard) && !isObjectEmpty(quoteResponse)) {
            const allCovers = quoteResponse.risks.flatMap(
                (risk: any) => risk.covers,
            );
            setCovers(allCovers);
            setProducts(selectedCard);
            const date = convertDateToYearFormat(quoteResponse.policyStartDate);
            setDate(date);
            const end = convertDateFormat(quoteResponse.policyEndDate);
            setEndDate(end);
        }
    }, [selectedCard, quoteResponse]);

    const removeProducts = (coverName: string) => {
        const updatedProducts = products.filter(
            (product) => product.coverName !== coverName,
        );

        setProducts(updatedProducts);
    };

    const addProducts = (product: any) => {
        const updatedProducts = [...products, product];
        setProducts(updatedProducts);
    };

    function toggleCoverage(data: any) {
        const isPresent = products.find((el: any) => {
            return el.coverName === data.coverName;
        });
        if (!isPresent) {
            addProducts(data);
        } else {
            removeProducts(data.coverName);
        }
    }

    function isProductSelected(coverName: string): boolean {
        const isPresent = products.find((el: any) => {
            return el.coverName === coverName;
        });
        if (isPresent) {
            return true;
        }
        return false;
    }

    return (
        <div className={style.main}>
            <div className={style.header}>
                <h6>Select Your Insurance</h6>
                <p>Customize your coverage and checkout today.</p>
                <div className={style.dateContainer}>
                    <div className={style.dates}>
                        <Form.Label className={style.label}>
                            Start Date :
                        </Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            min={minDate}
                            value={date}
                            onChange={(e: any) => {
                                const selectedDate = e.target.value;

                                if (selectedDate < minDate) {
                                    setError(
                                        'Start date should be a future date ',
                                    );
                                    setDate(selectedDate);
                                } else {
                                    setError('');
                                    setDate(selectedDate);
                                }
                            }}
                        />
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div>
                    <div className={style.dates}>
                        <Form.Label className={style.label}>
                            End Date :
                        </Form.Label>
                        <Form.Control
                            className={style.control}
                            type="text"
                            name="endDate"
                            value={endDate}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <div className={style.recomCard}>
                <Row>
                    {covers.map((el: any, index: number) => (
                        <Col lg={6} style={{ marginTop: '1rem' }} key={index}>
                            <div className={`${style.card} dynamic-height`}>
                                <PolicyCardComponent
                                    toggleCoverage={toggleCoverage}
                                    data={getCoverData(
                                        el.coverName,
                                        el.coverSI,
                                        el.premium,
                                    )}
                                    isSelected={isProductSelected(el.coverName)}
                                    recommended={true}
                                    showCoverSI={true}
                                    UI={true}
                                    height={childHeight}
                                    setCoverSI={setCoverSI}
                                    coverSI={coverSI}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="d-flex align-align-items-center justify-content-end mb-3">
                {index === 2 && (
                    <CustomButton
                        disabled={false}
                        type="Submit"
                        buttonTitle="Next"
                        onClick={() => {
                            setButtonClick(true);
                            if (index === 2) {
                                setSubmitButtonClicks(true);
                            }
                        }}
                    />
                )}
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
}

export default RecommendationComponent;
