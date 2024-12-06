import { Col, Offcanvas, Row } from 'react-bootstrap';
import CustomButton from './Buttons/CustomButton';
import LinkButton from './Buttons/LinkButton';

const CanvasSideBar = (props: any) => {
    const {
        content,
        buttonTitle,
        checkImage,
        show,
        onHide,
        onClick,
        onClickLink,
    } = props;
    return (
        <>
            <Offcanvas
                show={show}
                onHide={onHide}
                placement={'end'}
                className="canvas-responsive"
            >
                <Offcanvas.Header
                    closeButton
                    className="offcanvasHeader"
                ></Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="top-wrp">
                        <div className="pi-package-img">
                            <img
                                src={
                                    process.env.REACT_APP_IMAGE_BASE_URL +
                                    content?.icon
                                }
                                alt="img"
                                width="80%"
                            />
                        </div>
                        <Offcanvas.Title>
                            {content?.policy_name
                                ? content?.policy_name
                                : content?.package_name}
                        </Offcanvas.Title>
                        {/* <p>The all-in-one package custom designed to protect Startups. From executive decisions, and product errors, to hackers stealing PII, workplace harassment, and discrimination lawsuits.</p> */}
                        <p>
                            {content?.package_defination
                                ? content?.package_defination
                                : content?.policy_defination}
                        </p>
                        {/* <p>{content?.description ? content?.description : content?.package_type}</p> */}
                        <CustomButton
                            buttonTitle={buttonTitle}
                            onClick={onClick}
                        />
                        <LinkButton
                            addClass={'m-3'}
                            buttonTitle={'View More'}
                            onLinkClick={onClickLink}
                        />
                    </div>
                    <div className="desc-mid">
                        {content?.policy_prons && (
                            <>
                                <strong>What's Included:</strong>
                                {Object.keys(
                                    JSON.parse(content?.policy_prons)?.[0],
                                ).map(
                                    (key: string) =>
                                        Number(key) < 3 && (
                                            <li key={key} className="mb-2">
                                                <Row>
                                                    <Col lg={1}>
                                                        <img
                                                            src={checkImage}
                                                            alt=""
                                                        />
                                                    </Col>
                                                    <Col
                                                        lg={11}
                                                        className="policy-pons"
                                                    >
                                                        {' '}
                                                        {
                                                            JSON.parse(
                                                                content?.policy_prons,
                                                            )?.[0]?.[key]
                                                        }
                                                    </Col>
                                                </Row>
                                            </li>
                                        ),
                                )}
                            </>
                        )}

                        {content?.packages_policy && (
                            <>
                                <b>
                                    <strong>INCLUDE POLICIES:</strong>
                                </b>

                                <b>Recommanded Policies:</b>
                                <ul className="mt-2 mb-3">
                                    {content?.packages_policy.map(
                                        (obj: object | any) =>
                                            obj?.is_core && (
                                                <li key={obj?.id}>
                                                    <img
                                                        src={checkImage}
                                                        alt=""
                                                    />{' '}
                                                    {
                                                        obj?.policy_id
                                                            ?.policy_name
                                                    }
                                                </li>
                                            ),
                                    )}
                                </ul>

                                <b className="mt-2">Additional Policies:</b>
                                <ul className="mt-2">
                                    {content?.packages_policy.map(
                                        (obj: object | any) =>
                                            !obj?.is_core && (
                                                <li key={obj?.id}>
                                                    <img
                                                        src={checkImage}
                                                        alt=""
                                                    />{' '}
                                                    {
                                                        obj?.policy_id
                                                            ?.policy_name
                                                    }
                                                </li>
                                            ),
                                    )}
                                </ul>
                            </>
                        )}

                        {/* <h3>{`What is ${content?.policy_name} Insurance?`}</h3>
                        <p>
                            {`COVRZY's ${content?.policy_name} combines Directors and Officers (D&O), Employment Practices
                             Liability (EPL), Fiduciary, and Technology Errors and Omissions / Cyber Liability insurance
                              in one package. The policy covers claims of breach of fiduciary duty, claims made by
                              employees against the company, and damages arising from technology services provided.`}
                        </p>
                        <br />
                        <strong>THIS INCLUDES COVERAGE FOR:</strong>
                        <ul>
                            <li><img src={checkImage} alt='' /> Breach of contract</li>
                            <li><img src={checkImage} alt='' /> Misuses of company funds</li>
                            <li><img src={checkImage} alt='' /> Harassment and discrimination</li>
                        </ul>
                        <br />
                        <h3>{`Who Needs ${content?.policy_name} Insurance?`}</h3>
                        <p>
                            {`The ${content?.policy_name} is for for companies that have raised venture funding.
                             Without this type of protection, starting a company, or serving on its board, would
                             entail significantly more personal financial risk than it already does.`}
                        </p> */}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CanvasSideBar;
