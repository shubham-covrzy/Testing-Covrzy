import { Fragment, useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import { NumberFormat } from '../../common/NumberFormat';
import { dateConverter } from '../../Helper/commonFunction';
import CallbackModal from '../../components/RequestCallbackl';
import { IReduxState } from '../../utils/types';
import { useSelector } from 'react-redux';

interface IPurchasedPoliciesCardProps {
    image?: string;
    title: string;
    sumAmount: number;
    insurerName: string;
    startDate: string;
    endDate: string;
    buttonTitle?: string;
    paymentStatus?: string;
    policyStatus?: string;
    pending?: boolean;

    onClick: () => void;
}

const PurchasedPoliciesCard = (props: IPurchasedPoliciesCardProps) => {
    const [open, setOpen] = useState<boolean>(false);
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
    return (
        <Fragment>
            <div className="covrzy-purchased-policies-card">
                <div className="covrzy-policies-card-img">
                    <img src={props.image} alt="" width="100%" />
                </div>
                <div className="covrzy-policies-card-desc">
                    <h3>{props.title}</h3>
                    <div className="purchased-policies-card-data">
                        <Row>
                            <Col xs={6}>
                                <p>Insurer</p>
                                <span>{props.insurerName}</span>
                            </Col>
                            <Col xs={6}>
                                <p>Sum Insured</p>
                                <span>
                                    {props.sumAmount
                                        ? NumberFormat(props.sumAmount)
                                        : '-'}
                                </span>
                            </Col>
                            <Col xs={6}>
                                <p>Start Date</p>
                                <span>{dateConverter(props.startDate)}</span>
                            </Col>
                            <Col xs={6}>
                                <p>End Date</p>
                                <span>{dateConverter(props.endDate)}</span>
                            </Col>
                            {props.pending && (
                                <>
                                    <Col xs={6}>
                                        <p>Payment</p>
                                        <span>
                                            Completed
                                            {/* {dateConverter(props.startDate)} */}
                                        </span>
                                    </Col>
                                    <Col xs={6}>
                                        <p>Policy Issuance </p>
                                        <span>
                                            Pending
                                            {/* {dateConverter(props.endDate)} */}
                                        </span>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </div>
                    <Row>
                        {props.pending ? (
                            <Col
                                xs={12}
                                className="purchased-policies-card-button"
                            >
                                <CustomButton
                                    buttonTitle="Request a call back"
                                    onClick={handleModalOpen}
                                />
                            </Col>
                        ) : (
                            props.buttonTitle && (
                                <Col
                                    xs={12}
                                    className="purchased-policies-card-button"
                                >
                                    <CustomButton
                                        buttonTitle={props.buttonTitle}
                                        onClick={props.onClick}
                                    />
                                </Col>
                            )
                        )}
                    </Row>
                </div>
            </div>
            {open && (
                <CallbackModal open={true} onClose={() => setOpen(false)} />
            )}
        </Fragment>
    );
};

export default PurchasedPoliciesCard;
