/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useCallback } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTabel from '../../common/CustomTable';
import { NumberFormat } from '../../common/NumberFormat';
import { dateConverter } from '../../Helper/commonFunction';
import {
    DownloadPaymentReceiptAction,
    GetPaymentHistoryAction,
} from '../../Redux/Actions/PaymentActions';
import { IReduxState } from '../../utils/types';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import heroIcon from '../../assets/images/Shrug-man.svg';

enum PolicyStatus {
    Initiated = 'initiated',
    Active = 'active',
    Expired = 'expired',
    Renewed = 'renewed',
}

const Payment = () => {
    const dispatch = useDispatch();
    const { sendGAEvent } = useGAEvent(GACategories.PaymentPage);

    const { payment_history } = useSelector(
        (state: IReduxState) => state.Payment,
    );
    const { receiptId, receiptPDF } = useSelector(
        (state: IReduxState) => state.Payment,
    );
    const [downloadButtonClicked, setDownloadButtonClicked] = useState(false);

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
        dispatch(GetPaymentHistoryAction());
    }, [dispatch]);

    useEffect(() => {
        if (downloadButtonClicked && receiptPDF[receiptId]) receiptDownload();
    }, [downloadButtonClicked, receiptDownload, receiptId, receiptPDF]);

    const handleReceiptDownload = (receiptId: string) => {
        sendGAEvent(GAActions.DownloadReceiptClicked);
        setDownloadButtonClicked(true);
        if (receiptPDF[receiptId]) receiptDownload();
        else dispatch(DownloadPaymentReceiptAction({ receiptId }));
    };
    const policyStatusMap = {
        initiated: 'Pending',
        active: 'Active',
        expired: 'Expired',
        renewed: 'Renewed',
    };

    const columns = [
        {
            id: 'receipt-id',
            Header: 'Receipt ID',
            accessor: (originalRow: object | any) => {
                return originalRow?.receiptId;
            },
        },
        // {
        //   id: "start-date",
        //   Header: "Start Date",
        //   accessor: (originalRow: object | any) => {
        //     return dateConverter(originalRow?.startDate);
        //   },
        // },
        // {
        //   id: "end-date",
        //   Header: "End Date",
        //   accessor: (originalRow: object | any) => {
        //     return dateConverter(originalRow?.endDate);
        //   },
        // },
        {
            id: 'amount',
            Header: 'Amount',
            accessor: (originalRow: object | any) => {
                return originalRow?.grossAmount
                    ? NumberFormat(originalRow?.grossAmount)
                    : '';
            },
        },
        {
            id: 'paid-on',
            Header: 'Paid On',
            accessor: (originalRow: object | any) => {
                return originalRow?.paymentDate
                    ? dateConverter(originalRow?.paymentDate)
                    : '';
            },
        },
        {
            id: 'policy-status',
            Header: 'Policy Status',
            accessor: (originalRow: object | any) => {
                const policyStatus: PolicyStatus = originalRow?.policyStatus;
                return policyStatus
                    ? policyStatusMap[policyStatus]
                    : 'not purchased';
            },
        },
        {
            id: 'mode',
            Header: 'Payment Mode',
            accessor: (originalRow: object | any) => {
                return originalRow?.cardType ?? 'NA';
            },
        },
        {
            id: 'receipt',
            Header: 'Receipt',
            accessor: (originalRow: object | any) => {
                return (
                    <a
                        style={{ color: '#7743DC', cursor: 'pointer' }}
                        onClick={() =>
                            handleReceiptDownload(originalRow?.receiptId)
                        }
                    >
                        Download
                    </a>
                );
            },
        },
    ];

    return (
        <Fragment>
            {Object.keys(payment_history).length === 0 ? (
                <>
                    <div className="payment-not-made-yet">
                        <h2>
                            Oops ! It appears that no payment has been made yet.
                        </h2>
                        <img alt="" src={heroIcon} />
                    </div>
                </>
            ) : (
                <>
                    <div className="db-main-title">
                        <h2>Payments</h2>
                    </div>

                    <div className="payment-table">
                        <CustomTabel
                            columns={columns}
                            data={payment_history}
                            pagination
                        />
                    </div>
                </>
            )}
        </Fragment>
    );
};

export default Payment;
