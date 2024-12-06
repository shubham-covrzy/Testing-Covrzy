import { Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NumberFormat } from '../../common/NumberFormat';

const NonCovrzyPoliciesCard = (props: any) => {
    return (
        <Fragment>
            <Link to={`/user/policies/non-covrzy/${props?.id}`}>
                <div
                    className="covrzy-policies-card"
                    style={{ cursor: 'pointer' }}
                >
                    <div className="covrzy-policies-card-img">
                        {props?.image}
                    </div>
                    <div className="covrzy-policies-card-desc">
                        <h3>{props?.title}</h3>
                        <Row>
                            {props?.insurerName && (
                                <Col xs={6}>
                                    <p>Insurer Name</p>
                                    <span>{props?.insurerName}</span>
                                </Col>
                            )}
                            <Col xs={6}>
                                <p>Coverage Amount</p>
                                <span>{NumberFormat(props?.amount)}</span>
                            </Col>
                            <Col xs={6}>
                                <p>Start Date</p>
                                <span>{props?.startDate}</span>
                            </Col>
                            <Col xs={6}>
                                <p>End Date</p>
                                <span>{props?.endDate}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Link>
        </Fragment>
    );
};

export default NonCovrzyPoliciesCard;
