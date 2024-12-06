import { Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { NumberFormat } from '../../common/NumberFormat';
// import TrashSolid from '../../assets/images/trash-solid.svg';
// import CustomButton from "../../common/Buttons/CustomButton";

const ClaimViewCard = (props: any) => {
    return (
        <Fragment>
            <div className="covrzy-policies-card">
                <div className="covrzy-policies-card-img">
                    <img src={props?.image} alt="" width="80%" />
                </div>
                <div className="covrzy-policies-card-desc">
                    <h3>{props?.title}</h3>
                    <Row>
                        {props?.package_name && (
                            <Col xs={6}>
                                <p>Package</p>
                                <span>{props?.package_name}</span>
                            </Col>
                        )}
                        <Col xs={6}>
                            <p>Applied At</p>
                            <span>{props?.createdAt}</span>
                        </Col>
                        {/* <Col xs={6}>
                            <p>End Date</p>
                            <span>{props?.endDate}</span>
                        </Col> */}
                        <Col xs={6}>
                            <p>Status</p>
                            <span
                                style={{
                                    color:
                                        props?.status === 'pending'
                                            ? 'orange'
                                            : props?.status === 'success'
                                            ? 'green'
                                            : 'red',
                                }}
                            >
                                {props?.status}
                            </span>
                        </Col>
                        {/* <Col xs={6}>
                            <p>Claim Amount</p>
                            <span>{NumberFormat(props?.claimAmount ? props?.claimAmount : 0)}</span>
                        </Col> */}
                        {/* <Col xs={12}>
                            <CustomButton
                                buttonTitle="Initiate a claim"
                                onClick={props?.onClick}
                            />
                            <span onClick={props?.onClick} className="delete-btn">
                                <img src={TrashSolid} alt='' />
                            </span>
                        </Col> */}
                    </Row>
                </div>
            </div>
        </Fragment>
    );
};

export default ClaimViewCard;
