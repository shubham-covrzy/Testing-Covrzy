import { Fragment } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';

const ContactStep = () => {
    return (
        <Fragment>
            <div className="db-step-info" id="db-step-four">
                <div className="db-step-title">
                    <h2>Contact</h2>
                </div>
                <Row>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="First name" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter First Name"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Last Namee" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Last Name"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Job Title" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Job Title"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Phone Number" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Phone Number"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Email" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Email"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="pi-step-btn">
                    <CustomButton buttonTitle="Preview" />
                    <OrangeButton buttonName="Save and Continue" />
                </div>
            </div>
        </Fragment>
    );
};

export default ContactStep;
