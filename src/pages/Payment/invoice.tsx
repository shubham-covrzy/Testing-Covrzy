import { useEffect } from 'react';
// import Table from 'react-bootstrap/Table';
// import print from '../../assets/images/printicon.png'
import { useDispatch, useSelector } from 'react-redux';
// import PreImageButton from '../../common/Buttons/PreImageButton';
import {
    ClearPaymentStateAction,
    GetParticularPaymentAction,
} from '../../Redux/Actions/PaymentActions';
import { IReduxState } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { dateConverter } from '../../Helper/commonFunction';
import { NumberFormat } from '../../common/NumberFormat';
//import { setPageHeaderTitle } from '../../Redux/Actions/HeaderTitleAction';
import CustomLoader from '../../common/Loader/CustomLoader';
import PdfComponent from '../../common/PDFComponent';

const Invoice = () => {
    const { payment_info, loading, is_getData } = useSelector(
        (state: IReduxState) => state.Payment,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { invoiceId }: any = useParams();

    useEffect(() => {
        //dispatch(setPageHeaderTitle("Payment Invoice"))
        dispatch(GetParticularPaymentAction(invoiceId));
    }, [dispatch, invoiceId]);

    useEffect(() => {
        if (is_getData === 'fail') {
            dispatch(ClearPaymentStateAction());
            navigate('/user/payment');
        }
    }, [dispatch, loading, is_getData, navigate]);

    return (
        <div>
            {loading ? (
                <div className="mt-5">
                    <CustomLoader />
                </div>
            ) : (
                <div>
                    <div className="print-icon">
                        <PdfComponent invoiceData={payment_info} />
                        {/* <PreImageButton buttonTitle="Print" PreImage={print} /> */}
                    </div>
                    <div className="invoice-box">
                        {/* <div className='d-flex flex-wrap align-items-center justify-content-between invoice-main'>
                            <div className='invoice-id'>
                                <h5>Invoice Id</h5>
                            </div>
                            <div className='inovice-date'>
                                <p>{payment_info?.purchased_policy_id}</p>
                            </div>
                        </div> */}
                        <div className="d-flex flex-wrap align-items-center justify-content-between invoice-main">
                            <div className="date-box">
                                <div className="invoice-id">
                                    <h5>Invoice Id</h5>
                                </div>
                                <div className="inovice-date">
                                    <p>{payment_info?.purchased_policy_id}</p>
                                </div>
                            </div>
                            <div className="date-box">
                                <div className="invoice-id">
                                    <h5>Payment Id</h5>
                                </div>
                                <div className="inovice-date">
                                    <p>
                                        {
                                            payment_info?.payment_id
                                                ?.razorpay_payment_id
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap align-items-center justify-content-between invoice-main">
                            <div className="invoice-id">
                                <h5>{`${payment_info?.package ? 'Package' : 'Policy'} Name`}</h5>
                            </div>
                            <div className="inovice-date">
                                <p>
                                    {payment_info?.package
                                        ? payment_info?.package?.package_name
                                        : payment_info?.policy
                                          ? payment_info?.policy?.policy_name
                                          : ''}
                                </p>
                            </div>
                        </div>
                        {payment_info?.package && (
                            <div className="d-flex flex-wrap align-items-center justify-content-between invoice-main">
                                <div className="invoice-id">
                                    <h5>Package Plan</h5>
                                </div>
                                <div className="inovice-date">
                                    <p>
                                        {payment_info?.plan_type.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="d-flex flex-wrap align-items-center justify-content-between invoice-main">
                            <div className="date-box">
                                <div className="invoice-id">
                                    <h5>Invoice Date</h5>
                                </div>
                                <div className="inovice-date">
                                    <p>
                                        {dateConverter(
                                            payment_info?.created_at,
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="date-box">
                                <div className="invoice-id">
                                    <h5>Expiry Date</h5>
                                </div>
                                <div className="inovice-date">
                                    <p>
                                        {dateConverter(payment_info?.end_date)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap align-items-center justify-content-between invoice-main">
                            <div className="invoice-id inovice-date d-flex flex-wrap align-items-baseline justify-content-between w-100">
                                <h5>Amount</h5>
                                <p>
                                    {NumberFormat(
                                        payment_info?.payment_id?.amount -
                                            payment_info?.payment_id?.taxes,
                                    )}
                                </p>
                            </div>
                            <div className="tax-detail inovice-date invoice-id d-flex flex-wrap align-items-baseline justify-content-between w-100">
                                <h5>Tax (18%)</h5>
                                <p>
                                    {NumberFormat(
                                        payment_info?.payment_id?.taxes,
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap align-items-baseline justify-content-end total-detail invoice-id  inovice-date">
                            <h5>Total Amount</h5>
                            <p>
                                {NumberFormat(payment_info?.payment_id?.amount)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoice;
