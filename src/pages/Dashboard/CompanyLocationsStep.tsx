import { Fragment } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
import CustomSelect from '../../common/CustomSelect';
import AddIcon from '../../assets/images/Add.svg';

const CompanyLocationsStep = () => {
    return (
        <Fragment>
            <div className="db-step-info" id="db-step-three">
                <div className="db-step-title">
                    <h2>Company Locations</h2>
                    <p>Corporate Headquarters Location</p>
                </div>
                <Row>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Address line 1" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Address"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Address line 2" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Address"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="City" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter City Name"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="State" />
                            <CustomSelect
                                data={['Enter State Name', 'Private', 'Public']}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Zip" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Zip"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <div className="db-step-title">
                    <h2>Business Locations</h2>
                </div>
                <Row>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Address line 1" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Address"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Address line 2" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Address"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="City" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter City Name"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="State" />
                            <CustomSelect
                                data={['Enter State Name', 'Private', 'Public']}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Zip" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Zip"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="db-add-address">
                    <img src={AddIcon} alt="" /> Add Address
                </div>
                <div className="pi-step-btn">
                    <CustomButton buttonTitle="Preview" />
                    <OrangeButton buttonName="Save and Continue" />
                </div>
            </div>
        </Fragment>
    );
};

export default CompanyLocationsStep;
