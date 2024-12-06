import { Col, Offcanvas, Row } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import { NumberFormat } from '../../common/NumberFormat';

const CanvasSideBar = (props: any) => {
    const {
        title,
        description,
        buttonTitle,
        checkImage,
        claim_amount,
        startDate,
        policy_cons,
        policy_prons,
        coverage_amount,
        endDate,
        show,
        onHide,
        image,
        onClick,
    } = props;

    return (
        <>
            <Offcanvas show={show} onHide={onHide} placement={'end'}>
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="top-wrp">
                        <div className="pi-package-img">
                            <img src={image} alt="img" />
                        </div>
                        <Offcanvas.Title>{title}</Offcanvas.Title>
                        {/* <Offcanvas.Title>Startup Package</Offcanvas.Title> */}
                        <p>{description}</p>
                        {/* <p>The all-in-one package custom designed to protect Startups. From executive decisions, and product errors, to hackers stealing PII, workplace harassment, and discrimination lawsuits.</p> */}
                        <CustomButton
                            buttonTitle={buttonTitle}
                            onClick={onClick}
                        />
                    </div>
                    <div className="desc-mid">
                        <div className="covrzy-policies-card-desc">
                            <Row>
                                <Col xs={6}>
                                    <p>Start Date</p>
                                    {/* <span>₹ {props?.claimAmount ? props?.claimAmount : 0}</span> */}
                                    <span>{startDate}</span>
                                </Col>
                                <Col xs={6}>
                                    <p>End Date</p>
                                    <span>{endDate}</span>
                                </Col>
                                <Col xs={6}>
                                    <p>Claim Amount</p>
                                    <span>{NumberFormat(claim_amount)}</span>
                                </Col>
                                <Col xs={6}>
                                    <p>Coverage Amount</p>
                                    <span>{NumberFormat(coverage_amount)}</span>
                                </Col>
                            </Row>
                        </div>
                        {/* <h3>What is Startup Package Insurance?</h3>
                    <p>COVRZY's Startup Package combines Directors and Officers (D&O), Employment Practices Liability (EPL), Fiduciary, and Technology Errors and Omissions / Cyber Liability insurance in one package. The policy covers claims of breach of fiduciary duty, claims made by employees against the company, and damages arising from technology services provided.</p> */}
                        <br />
                        <strong>ADVANTAGES OF THIS POLICY:</strong>
                        <ul>
                            {Object.keys(policy_prons[0]).map((item) => (
                                <li>
                                    <img src={checkImage} alt="" />{' '}
                                    {policy_prons[0]?.[item]}
                                </li>
                            ))}
                        </ul>

                        <br />
                        <strong>DISADVANTAGES OF THIS POLICY:</strong>
                        <ul>
                            {Object.keys(policy_cons[0]).map((item) => (
                                <li>
                                    <img src={checkImage} alt="" />{' '}
                                    {policy_cons[0]?.[item]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <br />
                    <h3>Who Needs Startup Package Insurance?</h3>
                    <p>The Startup Package is for for companies that have raised venture funding. Without this type of protection, starting a company, or serving on its board, would entail significantly more personal financial risk than it already does.</p> */}
                    {/* </div> */}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CanvasSideBar;
