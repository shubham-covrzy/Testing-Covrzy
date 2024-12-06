import { Fragment } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';

const BasicInfoStep = () => {
    return (
        <Fragment>
            <div className="db-step-info" id="db-step-one">
                <div className="db-step-title">
                    <h2>Basic Info</h2>
                </div>
                <Row>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Company legal name" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Company legal name"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Website" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Website"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div
                    className="pi-step-btn"
                    style={{ justifyContent: 'flex-end' }}
                >
                    <OrangeButton buttonName="Save and Continue" />
                </div>
            </div>
        </Fragment>
    );
};

export default BasicInfoStep;
