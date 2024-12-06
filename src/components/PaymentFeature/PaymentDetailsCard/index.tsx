import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InsurerLogoComponent from '../../InsurerLogo';
import ICICLogo from '../../../assets/images/IcicLogo.png';
import PaymentInfoHeader from '../PaymentInfoHeader';
import Style from './style.module.scss';
import PaymentInfoCard from '../PaymentInfoCard';
import { IReduxState } from '../../../utils/types';
import { NumberFormat } from '../../../common/NumberFormat';
import { formatAmount } from '../../../common/FormatAmount';
import PaymentReceipt from '../PaymentReceipt/PaymentReceipt';
import { isObjectEmpty } from '../../../Helper/commonFunction';
import {
    formatDateString,
    getCoverData,
} from '../../../pages/V2Quote/Checkout';
import { UpdateUserSessionAction } from '../../../Redux/Actions/SessionAction';

interface PaymentDetailsCardProps {
    coverageLogo: any;
    success: boolean;
}
interface cover {
    coverName: string;
    coverSI: string;
    premium: string;
}

function PaymentDetailsCard({
    coverageLogo,
    success,
}: PaymentDetailsCardProps) {
    const dispatch = useDispatch();

    const [coverageCards, setCoverageCards] = useState<any[]>([]);

    const { selectedCard } = useSelector(
        (state: IReduxState) => state.PurchaseQuote,
    );

    const { policyStartDate, recommendationResponse } = useSelector(
        (state: IReduxState) => state.Recommendations,
    );

    const { paymentResponse } = useSelector(
        (state: IReduxState) => state.Payment,
    );

    const { quoteResponse } = useSelector(
        (state: IReduxState) => state.LiabilityQuote,
    );

    const { gstData, aboutBusiness } = useSelector(
        (state: IReduxState) => state.CustomerInformation,
    );

    const userSession = useSelector((state: IReduxState) => state.UserSession);

    useEffect(() => {
        if (!isObjectEmpty(quoteResponse)) {
            const mappedCoverageCards = quoteResponse.risks.flatMap(
                (risk: any) => risk.covers,
            );
            const updatedCoverageCards: cover[] = mappedCoverageCards.map(
                (cover: cover) => {
                    return getCoverData(
                        cover.coverName,
                        cover.coverSI,
                        cover.premium,
                    );
                },
            );

            setCoverageCards(updatedCoverageCards);
        }
    }, [selectedCard, quoteResponse]);

    useEffect(() => {
        if (!isObjectEmpty(paymentResponse) && success) {
            dispatch(
                UpdateUserSessionAction({
                    id: userSession.id, // always add for params
                    nextSessionState: 'payment_completed',
                    paymentId: paymentResponse.payment_id,
                    userSessionData: {
                        paymentResponse: paymentResponse,
                    },
                }),
            );
        }
    }, [paymentResponse]);

    return (
        <div className={Style.main}>
            <div className={Style.header}>
                <InsurerLogoComponent image={ICICLogo} />
                <PaymentInfoHeader
                    success={success}
                    header="Payment Information"
                    downloadReceipt={
                        <PaymentReceipt
                            receiptId={paymentResponse.receiptId}
                            orderDate={policyStartDate}
                            orderNumber={paymentResponse.orderId}
                            gst={gstData.gstin}
                            data={aboutBusiness}
                            invoiceDate={paymentResponse.paymentDate}
                            transactionType={paymentResponse.cardType}
                            currency={paymentResponse.currency}
                            products={coverageCards}
                            price={paymentResponse.basicAmount}
                            tax={paymentResponse.tax}
                            total={paymentResponse.grossAmount}
                            address={aboutBusiness.address}
                        />
                    }
                />
            </div>
            <div className={Style.content}>
                <PaymentInfoCard
                    title="Coverage plans & Sum Insured"
                    contents={coverageCards.map(({ name, coverSI }, index) => ({
                        key: index,
                        title: name,
                        value: formatAmount(coverSI),
                    }))}
                />

                <PaymentInfoCard
                    title="Coverage Summary"
                    contents={[
                        {
                            title: 'Effective Date',
                            value: formatDateString(policyStartDate),
                        },
                        { title: 'Coverage Term', value: '1 Year' },
                        {
                            title: 'Payment Method',
                            value: paymentResponse.cardType,
                        },
                    ]}
                />
                <PaymentInfoCard
                    title="Payment Confirmation"
                    contents={[
                        {
                            title: 'Transaction ID',
                            value: '#' + paymentResponse.receiptId,
                        },

                        {
                            title: 'Total Premium Amount',
                            value: NumberFormat(paymentResponse.basicAmount),
                        },
                        {
                            title: 'Tax',
                            value: NumberFormat(paymentResponse.tax),
                        },
                        {
                            title: 'Payment Amount',
                            value: NumberFormat(paymentResponse.grossAmount),
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default PaymentDetailsCard;
