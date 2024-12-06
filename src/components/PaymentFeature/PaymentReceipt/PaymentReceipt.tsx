import React, { useRef, useEffect, useState, useCallback } from 'react';
import logo from '../../../assets/images/logo.png';
import jsPDF from 'jspdf';
import { NumberFormat } from '../../../common/NumberFormat';
import { useDispatch, useSelector } from 'react-redux';
import {
    DownloadPaymentReceiptAction,
    SavePaymentReceipt,
} from '../../../Redux/Actions/PaymentActions';
import download from '../../../assets/images/download-icon-blue.svg';
import { IReduxState } from '../../../utils/types';
import { UpdateUserSessionAction } from '../../../Redux/Actions/SessionAction';

const formatNumberForPDF = (num: number) => {
    return `Rs. ${NumberFormat(num).slice(1)}`;
};

function PaymentReceipt(props: any) {
    const dispatch = useDispatch();
    const paymentpdfRef = useRef(null);
    const [downloadButtonClicked, setDownloadButtonClicked] = useState(false);

    const userSession = useSelector((state: IReduxState) => state.UserSession);

    const { receiptId, receiptPDF } = useSelector(
        (state: IReduxState) => state.Payment,
    );
    // const [currentDate, setCurrentDate] = useState('');

    // useEffect(() => {
    //   const getCurrentDate = () => {
    //     const now = new Date();
    //     const formattedDate = now.toLocaleDateString('en-US', {
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric',
    //     });
    //     setCurrentDate(formattedDate);
    //   };
    //   getCurrentDate();
    // }, []);

    useEffect(() => {
        const input = paymentpdfRef.current;

        if (!input || !props.receiptId) return;

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
            hotfixes: ['px_scaling'],
            compress: true,
        });

        pdf.html(input, {
            callback: function (_doc: any) {
                const blob = pdf.output('blob');
                // Create a FormData object and append the Blob
                const formData = new FormData();
                formData.append('receipt', blob, 'payment_receipt.pdf');
                formData.append('receiptId', props.receiptId);

                dispatch(SavePaymentReceipt({ formData }));
            },
        });
    }, [props.receiptId]);

    const receiptDownload = useCallback(() => {
        // Convert the ArrayBuffer to a Blob
        const blob = new Blob([receiptPDF[receiptId]], {
            type: 'application/pdf',
        });

        // Create a URL for the PDF blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = `${receiptId ?? 'receipt'}.pdf`;
        document.body.appendChild(link);

        // Trigger the click event on the link to start the download
        link.click();

        // Clean up by removing the link element and resetting the downloading state
        document.body.removeChild(link);
        setDownloadButtonClicked(false);
    }, [receiptId, receiptPDF]);

    useEffect(() => {
        if (downloadButtonClicked && receiptPDF[receiptId]) receiptDownload();
    }, [downloadButtonClicked, receiptDownload, receiptId, receiptPDF]);

    const downloadPdfDocument = () => {
        setDownloadButtonClicked(true);
        if (receiptPDF[receiptId]) receiptDownload();
        else {
            dispatch(
                DownloadPaymentReceiptAction({ receiptId: props.receiptId }),
            );
            dispatch(
                UpdateUserSessionAction({
                    id: userSession.id, // always add for params
                    nextSessionState: 'payment_downloaded',
                    userSessionData: {
                        paymentReceipt: props.receiptId,
                    },
                }),
            );
        }
    };

    const data = [
        {
            orderNumber: props.orderNumber,
            orderDate: props.orderDate,
            invoiceNumber: props.receiptId,
            invoiceDate: props.invoiceDate,
            invoiceDetails: 'Payment receipt',
            // props.currency,
            transactionType: props.transactionType,
        },
    ];

    return (
        <>
            {/* <p style={{ cursor: 'pointer' }}>Download Payment Receipt</p> */}
            <button onClick={downloadPdfDocument}>
                <img alt="" src={download} /> Save
            </button>
            <section className="payment-receipt-sec">
                <div className="payment-receipt-pdf" ref={paymentpdfRef}>
                    <div>
                        <img src={logo} alt="" />
                    </div>
                    <h2 className="payment-receipt-head">Payment Receipt</h2>
                    <div className="address-main">
                        <div>
                            <div>Sold By:</div>
                            <div>
                                BIZCOVR INSURANCE BROKING PRIVATE LIMITED
                                <br />
                                Sobha Dream Acres,
                                <br />
                                NO 77/10 TO 77/5,75/6, 13031,
                                <br />
                                BALAGERE VI, Bengaluru Urban
                                <br />
                                BENGALURU, KA, 560087
                                <br />
                                IN
                            </div>
                        </div>
                        <div className="billing-address">
                            <div>Billing Address:</div>
                            <p>{props.data.legalName}</p>
                            <div>{props.data.address}</div>
                        </div>
                    </div>
                    <div className="payment-receipt-gstM">
                        <div className="payment-receipt-gst">
                            <h6>GST Registration No:</h6>
                            <span>29AALCB5467G1Z9</span>
                        </div>
                        <div className="payment-receipt-gst">
                            <h6>GST Registration No:</h6>
                            <span>{props.gst}</span>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="custom-table">
                            {data.map((item: any, index: number) => (
                                <thead key={index}>
                                    <tr className="payment-receipt-table">
                                        <td>
                                            Order Number: {item.orderNumber}
                                        </td>
                                        <td className="payment-receipt-right">
                                            Invoice Number: {item.invoiceNumber}
                                        </td>
                                    </tr>
                                    <tr className="payment-receipt-table">
                                        <td>Order Date: {item.orderDate}</td>
                                        <td className="payment-receipt-right">
                                            Invoice Date: {item.invoiceDate}
                                        </td>
                                    </tr>
                                    <tr className="payment-receipt-table">
                                        <td>
                                            Transaction types:{' '}
                                            {item.transactionType}
                                        </td>

                                        <td className="payment-receipt-right">
                                            Invoice Detail:{' '}
                                            {item.invoiceDetails}
                                        </td>
                                    </tr>
                                </thead>
                            ))}
                        </table>
                        <div>
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>SI</th>
                                        <th>Description</th>
                                        <th>Premium</th>
                                        <th>Sum Insured</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.products.map(
                                        (el: any, index: number) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{el.coverName}</td>
                                                <td>
                                                    {formatNumberForPDF(
                                                        el.premium,
                                                    )}
                                                </td>
                                                <td>{el.coverSI}</td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <table className="custom-table">
                                <tbody>
                                    <tr>
                                        <td>Premium:</td>
                                        <td>
                                            {formatNumberForPDF(props.price)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tax:</td>
                                        <td>{formatNumberForPDF(props.tax)}</td>
                                    </tr>
                                    <tr>
                                        <td>Gross Premium:</td>
                                        <td>
                                            {formatNumberForPDF(props.total)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="payment-tab-2">
                            <h6>For BIZCOVR INSURANCE BROKING PRIVATE LIMITED:</h6>
                            <div>&&</div>
                            <div>Authorized Signatory</div>
                        </div>
                    </div>
                    <div className="payment-receipt-footer">
                        <span>BIZCOVR INSURANCE BROKING PRIVATE LIMITED</span>
                        <ul className="payment-receipt-ul">
                            <li>
                                <a href="mailto:hello@covrzy.com">
                                    hello@covrzy.com
                                </a>{' '}
                                |
                            </li>
                            <li>
                                <a href="https://www.covrzy.com">
                                    www.covrzy.com
                                </a>{' '}
                                |
                            </li>
                            <li>
                                <a href="tel:9354963947">+919354963947</a> |
                            </li>
                            <li>Bengaluru , India</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PaymentReceipt;
