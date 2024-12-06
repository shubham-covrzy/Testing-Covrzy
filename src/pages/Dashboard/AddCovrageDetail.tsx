import { Fragment } from 'react';
import { Form, Tab } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../common/Buttons/CustomButton';
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomCheckBox from '../../common/CustomCheckBox';
import CustomInput from '../../common/CustomInput';
import CustomRadio from '../../common/CustomRadio';
import DashboardStepWizard from '../../common/DashboardStepWizard';
const AddCovrageDetail = () => {
    const BETA_LINK = process.env.REACT_APP_BETA_URL

    const navigate = useNavigate();

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }

    return (
        <Fragment>
            <DashboardStepWizard />
            <div className="add-covrage-detail">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col lg={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">
                                        Your Business
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">
                                        Prior Coverage Information
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">
                                        Past claims
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <h2 className="add-covrage-info-title">
                                        Revenue
                                    </h2>
                                    <div className="add-covrage-info">
                                        <p>
                                            Does the company always use written
                                            contracts, engagement letters,
                                            service agreements or some other
                                            written documentation of the
                                            services which are to be provided to
                                            the customer/ client?
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="one"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="one"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            How frequently does the company
                                            securely back-up all data and store
                                            it separately from the the remainder
                                            of the computer network?
                                        </p>
                                        <Form.Group
                                            className="form-group"
                                            controlId="formBasicEmail"
                                        >
                                            <CustomInput
                                                type="text"
                                                name="name"
                                                placeholder="Enter State Name"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            Do you store sensitive or personally
                                            identifiable records, such as
                                            confidential customer information,
                                            social security numbers, or credit
                                            card numbers?
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="two"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="two"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            Do you outsource any work performed
                                            for clients to subcontractors?
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="three"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="three"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            Are you contractually obligated to
                                            buy D&O or E&O insurance?
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="four"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="four"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            Do you have a remote desktop
                                            connection?
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="five"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="five"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            Does the Company have any
                                            cryptocurrency, blockchain or
                                            distributed ledger operations or
                                            exposure?
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="six"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="six"
                                            />
                                        </div>
                                    </div>
                                    <div className="pi-step-btn">
                                        <CustomButton buttonTitle="Preview" />
                                        <OrangeButton buttonName="Save and Continue" />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h2 className="add-covrage-info-title">
                                        Prior Coverage Information
                                    </h2>
                                    <div className="add-covrage-info">
                                        <p>Directors and Officers</p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="I have existing coverage"
                                                name="one1"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="I don't currently have this coverage"
                                                name="one1"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>Employment Practices Liability</p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="I have existing coverage"
                                                name="one2"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="I don't currently have this coverage"
                                                name="one2"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>Fiduciary</p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="I have existing coverage"
                                                name="one3"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="I don't currently have this coverage"
                                                name="one3"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>Cyber / Data Breach</p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="I have existing coverage"
                                                name="one4"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="I don't currently have this coverage"
                                                name="one4"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            Professional Liability / Errors and
                                            Omissions
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="I have existing coverage"
                                                name="one5"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="I don't currently have this coverage"
                                                name="one5"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            With regard to the coverage that you
                                            are applying for, in the last 12
                                            months has your policy been
                                            cancelled or non-renewed?
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="six1"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="six1"
                                            />
                                        </div>
                                    </div>
                                    <div className="pi-step-btn">
                                        <CustomButton buttonTitle="Preview" />
                                        <OrangeButton buttonName="Save and Continue" />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <h2 className="add-covrage-info-title">
                                        Past Claims
                                    </h2>
                                    <div className="add-covrage-info">
                                        <p>
                                            To your knowledge, are any of the
                                            following true:
                                        </p>
                                        <ul>
                                            <li>
                                                Over the past three years, the
                                                company was required to notify a
                                                customer, client, or employee
                                                that their confidential or
                                                personal information was subject
                                                to a breach of privacy.
                                            </li>
                                            <li>
                                                Over the past three years, the
                                                company was required to notify a
                                                customer, client, or employee
                                                that their confidential or
                                                personal information was subject
                                                to a breach of privacy.
                                            </li>
                                        </ul>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="one01"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="one01"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            To your knowledge, has your company
                                            or any person proposed for coverage
                                            been the subject of or been involved
                                            in any of the following during the
                                            past 3 years?
                                        </p>
                                        <ul>
                                            <li>Anti-trust litigation.</li>
                                            <li>
                                                Deceptive trade practices or
                                                consumer fraud.
                                            </li>
                                            <li>
                                                Civil, criminal or
                                                administrative proceeding
                                                alleging violation of any
                                                federal or state securities
                                                laws.
                                            </li>
                                            <li>
                                                Initiated a bankruptcy or
                                                anticipates going bankrupt in
                                                the next year.
                                            </li>
                                        </ul>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="one02"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="one02"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            I am already aware of a specific
                                            circumstance that is likely to
                                            result in a claim under the
                                            following coverages: D&O, EPL, Fid &
                                            Tech E&O/Cyber Liability
                                        </p>
                                        <div className="pi-check-wrp">
                                            <CustomCheckBox
                                                type="checkbox"
                                                label="Yes"
                                                name="check01"
                                                checked
                                            />
                                            <CustomCheckBox
                                                type="checkbox"
                                                label="No"
                                                name="check01"
                                            />
                                            <CustomCheckBox
                                                type="checkbox"
                                                label="No"
                                                name="check01"
                                            />
                                            <CustomCheckBox
                                                type="checkbox"
                                                label="No"
                                                name="check01"
                                            />
                                        </div>
                                    </div>
                                    <div className="add-covrage-info">
                                        <p>
                                            Over the past three years, has the
                                            company filed a claim for any of the
                                            following coverages: Directors &
                                            Officers, Employment Practices
                                            Liability, Fiduciary Liability,
                                            Technology E&O/Cyber Liability?
                                        </p>
                                        <div className="pi-radio-wrp">
                                            <CustomRadio
                                                type="radio"
                                                label="Yes"
                                                name="one04"
                                                checked
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="one04"
                                            />
                                        </div>
                                    </div>

                                    <div className="pi-step-btn">
                                        <CustomButton buttonTitle="Preview" />
                                        <OrangeButton
                                            onClick={() =>
                                                handleNavigate(
                                                    '/user/dashboard/complate-payment/:planType/:id',
                                                )
                                            }
                                            buttonName="Submit"
                                        />
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </Fragment>
    );
};
export default AddCovrageDetail;
