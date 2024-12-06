import { Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
// import TrashSolid from '../../assets/images/trash-solid.svg';
import CustomButton from '../../common/Buttons/CustomButton';

const ActivePoliciesCard = (props: any) => {
    return (
        <Fragment>
            <div className="covrzy-policies-card">
                <div className="covrzy-policies-card-img">
                    <img src={props?.images} alt="" width="100%" />
                </div>
                <div className="covrzy-policies-card-desc">
                    <h3>{props?.title}</h3>
                    <div className="active-policies-card-data">
                        <Row>
                            {/* <Col xs={6}>
                            <p>Claim Amount</p>
                            <span>{NumberFormat(props?.claimAmount ? props?.claimAmount : 0)}</span>
                        </Col> */}
                            <Col xs={6}>
                                <p>Insurer</p>
                                <span>{props?.insurerName}</span>
                            </Col>
                            <Col xs={6}>
                                <p>Sum Insured</p>
                                <span>
                                    {props?.sumAmount ? props?.sumAmount : '-'}
                                </span>
                            </Col>
                            <Col xs={6}>
                                <p>Start Date</p>
                                <span>{props?.createdAt}</span>
                            </Col>
                            <Col xs={6}>
                                <p>End Date</p>
                                <span>{props?.end_date}</span>
                            </Col>
                            {props?.package_name && (
                                <Col xs={6}>
                                    <p>Package</p>
                                    <span>{props?.package_name}</span>
                                </Col>
                            )}
                        </Row>
                    </div>
                    <Row>
                        {props?.buttonTitle && (
                            <Col xs={12}>
                                <CustomButton
                                    // buttonTitle="Initiate a claim"
                                    buttonTitle={props?.buttonTitle}
                                    onClick={props?.onClick}
                                />
                                {/* <span onClick={props?.onClick} className="delete-btn">
                                <img src={TrashSolid} alt='' />
                            </span> */}
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        </Fragment>
    );
};

export default ActivePoliciesCard;
