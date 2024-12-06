import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePaymentOrderAction } from '../../Redux/Actions/PaymentActions';
import { IReduxState } from '../../utils/types';
import FullPageSpinner from '../../common/FullPageSpinner';
import OrangeButton from '../../common/Buttons/OrangeButton';
import callIcon from '../../assets/images/call-icon.svg';
import { NumberFormat } from '../../common/NumberFormat';
import style from './style.module.scss';
import { getCoverData } from '../../pages/V2Quote/Checkout';
import { isObjectEmpty } from '../../Helper/commonFunction';
import CallbackModal from '../RequestCallbackl';

function EstimateSummaryCard() {
    const [total, setTotal] = useState(0);
    const [gst, setGst] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch();

    const Recommendations = useSelector(
        (state: IReduxState) => state.Recommendations,
    );

    const Payment = useSelector((state: IReduxState) => state.Payment);
    const { quoteResponse } = useSelector(
        (state: IReduxState) => state.LiabilityQuote,
    );

    const { recommendationResponse } = Recommendations;
    const { orderCreatedResponse, req_loading } = Payment;

    const { callback_success } = useSelector(
        (state: IReduxState) => state.Support,
    );

    const handleModalOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (callback_success) {
            setOpen(false);
        }
    }, [callback_success]);

    const paymentHandler = () => {
        dispatch(
            CreatePaymentOrderAction({
                amount: total,
                tax: gst,
                correlationId: recommendationResponse.recommendationId,
                description: ` Initiate Payment of ${grandTotal}`,
            }),
        );
    };

    useEffect(() => {
        const sum = cartProducts.reduce(function (total, coverageObj) {
            return total + coverageObj.premium;
        }, 0);

        const tax = sum * 0.18;
        setTotal(sum);
        setGst(tax);
        setGrandTotal(sum + tax);
    }, [cartProducts]);

    useEffect(() => {
        if (!isObjectEmpty(quoteResponse)) {
            const quote = quoteResponse.risks.flatMap(
                (risk: any) => risk.covers,
            );

            const quoteCards = quote.map((el: any) => {
                return getCoverData(el.coverName, el.coverSI, el.premium);
            });

            setCartProducts(quoteCards);
        }
    }, [quoteResponse]);

    useEffect(() => {
        if (Object.keys(orderCreatedResponse).length !== 0) {
            // displayPaymentGateway();
            const paymentURL = `${orderCreatedResponse.domainURL}/pay/${orderCreatedResponse.accessToken}`;
            window.location.href = paymentURL;
        }
    }, [orderCreatedResponse]);

    return (
        <section className={style.main}>
            <div className={style.heroHeader}>
                <h5>Estimate summary</h5>
            </div>
            <div className={style.container}>
                {cartProducts.map((el: any, index: number) => (
                    <div className={style.productDetails} key={index}>
                        <h4>{el.name}</h4>
                        <h6>{NumberFormat(el.premium)}</h6>
                    </div>
                ))}
            </div>
            <div className={style.priceContent}>
                <div className={style.total}>
                    <h5>Total</h5>
                    <h6>{NumberFormat(total)}</h6>
                </div>
                <div className={style.total}>
                    <h5>GST @ 18%</h5>
                    <h6>{NumberFormat(gst)}</h6>
                </div>
            </div>
            <div className={style.grandTotal}>
                <h6>Grand Total</h6>
                <p>
                    {NumberFormat(grandTotal)}
                    <span>/ Per year</span>
                </p>
            </div>
            <OrangeButton
                buttonName="Proceed to Pay"
                onClick={() => {
                    // dispatch(SavePurchasedProductsAction(cartProducts));
                    paymentHandler();
                }}
            />
            <button className={style.talkToMe} onClick={handleModalOpen}>
                Talk to an expert <img src={callIcon} alt="" />
            </button>
            {req_loading && <FullPageSpinner />}
            {req_loading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9999,
                    }}
                />
            )}
            {open && (
                <CallbackModal open={true} onClose={() => setOpen(false)} />
            )}
        </section>
    );
}

export default EstimateSummaryCard;
