import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import ICICLogo from '../../../assets/images/IcicLogo.png';
import InsurerLogoComponent from '../../../components/InsurerLogo/index';
import SecurityCardComponent from '../../../common/SecurityCardComponent';
import PolicySummaryCard from '../../../components/PolicySummary';
import { IReduxState } from '../../../utils/types';
import { formatAmount } from '../../../common/FormatAmount';
import { dataMap } from '../../../utils/QuoteData/ProductsDetails';
import style from './style.module.scss';
import ArrowBack from '../../../assets/images/arrow-left.svg';

import { isObjectEmpty } from '../../../Helper/commonFunction';
import { UpdateUserSessionAction } from '../../../Redux/Actions/SessionAction';
import { useNavigate } from 'react-router-dom';
import EstimateSummaryCard from '../../../components/EstimateSummary';

export function getCoverData(
    coverName: string,
    coverSI: string,
    premium: string,
) {
    const coverData = dataMap[coverName];
    if (coverData) {
        coverData.coverSI = coverSI;
        coverData.coverName = coverName;
        coverData.premium = premium;
    } else {
        console.error(`Data not found for coverName: ${coverName}`);
    }
    return coverData;
}

export function formatDateString(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

interface CheckoutComponentProps {
    index: number;
    setIndex: any;
}

function CheckoutComponent(props: CheckoutComponentProps) {
    const dispatch = useDispatch();

    const [uniqueCoverElements, setUniqueCoverElements] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const CustomerInformation = useSelector(
        (state: IReduxState) => state.CustomerInformation,
    );

    const { quoteResponse } = useSelector(
        (state: IReduxState) => state.LiabilityQuote,
    );

    const { policyStartDate, policyEndDate, recommendationResponse } =
        useSelector((state: IReduxState) => state.Recommendations);

    const userSession = useSelector((state: IReduxState) => state.UserSession);

    const { policies } = CustomerInformation;

    useEffect(() => {
        const startDate = formatDateString(policyStartDate);
        setStartDate(startDate);
        setEndDate(policyEndDate);
    }, [policyEndDate, policyStartDate]);

    // useEffect(() => {
    //     if (userSession.userSessionData.paymentResponse) {
    //         console.log('console.log');
    //     }
    // }, []);

    useEffect(() => {
        if (endDate && startDate) {
            dispatch(
                UpdateUserSessionAction({
                    id: userSession.id, // always add for params
                    nextSessionState: 'quote_completed',
                    correlationId: quoteResponse.correlationId,
                    userSessionData: {
                        quoteResponse: quoteResponse,
                        startDate: startDate,
                        endDate: endDate,
                    },
                }),
            );
        }
    }, [endDate, startDate]);

    useEffect(() => {
        try {
            if (!isObjectEmpty(quoteResponse)) {
                const allCovers = quoteResponse.risks.flatMap(
                    (risk: any) => risk.covers,
                );

                const quoteCards = allCovers.map((el: any) => {
                    return getCoverData(el.coverName, el.coverSI, el.premium);
                });

                setUniqueCoverElements(quoteCards);
                // } else {
                //     const recommendCover = recommendationResponse.risks.flatMap(
                //         (risks: any) => risks.covers,
                //     );
                //     const recommendCards = recommendCover.map((el: any) => {
                //         return getCoverData(el.coverName, el.coverSI, el.premium);
                //     });
                //     setUniqueCoverElements(recommendCards);
            }
        } catch (error) {}
    }, [policies, quoteResponse, recommendationResponse]);

    return (
        <div className={style.main}>
            <div className={style.header}>
                <h6>Your Customized Quotation Package</h6>
                <p>
                    Your tailored quotation awaits you- Covrzy's unique
                    quotations, your shield in one click.
                </p>
            </div>
            <InsurerLogoComponent image={ICICLogo} />
            <div className={style.body}>
                <div className={style.productSec}>
                    <Row className={style.equalHeightRow}>
                        {uniqueCoverElements.map(
                            (policy: any, index: number) => (
                                <Col
                                    lg={6}
                                    className={style.equalHeightCol}
                                    key={index}
                                >
                                    {policy.icon && (
                                        <PolicySummaryCard
                                            key={index}
                                            icon={policy.icon}
                                            coverSI={formatAmount(
                                                policy.coverSI,
                                            )}
                                            title={policy.name}
                                            desc={policy.desc}
                                            startDate={startDate}
                                            endDate={endDate}
                                        />
                                    )}
                                </Col>
                            ),
                        )}
                    </Row>
                </div>
                <SecurityCardComponent />
                <div className={style.sidebar}>
                    <EstimateSummaryCard />
                </div>
                <div className={style.backButton}>
                    {props.index !== 0 && (
                        <div
                            onClick={() => {
                                props.setIndex(props.index - 1);
                            }}
                        >
                            <img
                                src={ArrowBack}
                                alt=""
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    )}{' '}
                </div>
            </div>
        </div>
    );
}

export default CheckoutComponent;
