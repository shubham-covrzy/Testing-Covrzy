import { Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { NumberFormat } from '../../common/NumberFormat';

const InActivePoliciesCard = (props: any) => {
    return (
        <Fragment>
            <div className="covrzy-policies-card">
                {/* <div className="covrzy-policies-card-img">
                    <img src={props?.image} alt='' />
                </div> */}
                <div className="covrzy-policies-card-desc">
                    <h3>{props?.title}</h3>
                    <Row className="card-content">
                        <Col xs={6}>
                            <p>Claim Amount</p>
                            <span>
                                {NumberFormat(
                                    props?.claimAmount ? props?.claimAmount : 0,
                                )}
                            </span>
                        </Col>
                        <Col xs={6}>
                            <p>Coverage Amount</p>
                            <span>
                                {NumberFormat(
                                    props?.coverageAmount
                                        ? props?.coverageAmount
                                        : 0,
                                )}
                            </span>
                        </Col>
                        <Col xs={6}>
                            <p>Start Date</p>
                            <span>{props?.startDate}</span>
                        </Col>
                        <Col xs={6}>
                            <p>Expired Date</p>
                            <span>{props?.endDate}</span>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    );
};

export default InActivePoliciesCard;
