import { Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

const PoliciesCard = (props: any) => {
    return (
        <Fragment>
            <div className="covrzy-policies-card">
                <div className="covrzy-policies-card-img">
                    <img src={props?.image} alt="" />
                </div>
                <div className="covrzy-policies-card-desc">
                    <h3>{props?.title}</h3>
                    <Row>
                        <Col xs={6}>
                            <p>Start Date</p>
                            <span>{props?.startDate}</span>
                        </Col>
                        <Col xs={6}>
                            <p>End Date</p>
                            <span>{props?.endDate}</span>
                        </Col>
                        <Col xs={12}>
                            <p>Coverage Amount</p>
                            <span>₹ {props?.amount}</span>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    );
};

export default PoliciesCard;
