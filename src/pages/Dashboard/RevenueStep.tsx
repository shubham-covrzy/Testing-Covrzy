import { Fragment, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
import CustomTextArea from '../../common/CustomTextArea';
import { useNavigate } from 'react-router-dom';
function MyVerticallyCenteredModal(props: any) {
    const nevigate = useNavigate();
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Revenue
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={12}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="Total number of employees" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter Total number of employees"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'space-between' }}>
                <CustomButton buttonTitle="Preview" />
                {/* <OrangeButton onClick={() => nevigate('/user/dashboard/add-covrage-detail')} buttonName='Save and Continue' /> */}
            </Modal.Footer>
        </Modal>
    );
}
const RevenueStep = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <Fragment>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className="db-step-info" id="db-step-four">
                <div className="db-step-title">
                    <h2>Revenue</h2>
                </div>
                <Row>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="2021 Annual Revenue" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter 2021 Annual Revenuee"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="2022 Annual Revenue (projected)" />
                            <CustomInput
                                type="text"
                                name="name"
                                placeholder="Enter 2022 Annual Revenue"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={12}>
                        <Form.Group
                            className="form-group"
                            controlId="formBasicEmail"
                        >
                            <CustomLabel label="How does your company generate revenue?" />
                            <CustomTextArea as="textarea" />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="pi-step-btn">
                    <CustomButton buttonTitle="Preview" />
                    <OrangeButton
                        onClick={() => setModalShow(true)}
                        buttonName="Save and Continue"
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default RevenueStep;
