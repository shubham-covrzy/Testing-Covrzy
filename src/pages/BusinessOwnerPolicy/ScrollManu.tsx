import whatlsbop from '../../assets/images/whatlsbop.png';
// import cpp from '../../assets/images/cpp.png';
import BopInsurance from '../../assets/images/Bop-Insurance.png';
import Owners from '../../assets/images/Owners.png';
import Covered from '../../assets/images/Covered.png';
// import easy from '../../assets/images/easy.svg';
// import affordable from '../../assets/images/affordable.svg';
// import complete from '../../assets/images/complete.svg';
import DueDiligence from '../../assets/images/Due-Diligence.svg';
// import human from '../../assets/images/human.svg';
import { Col, Container, Row } from 'react-bootstrap';
// import Cards from './Cards';
import { Link } from 'react-scroll';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';

const ScrollManu = () => {
    const { view_single_policy } = useSelector(
        (state: IReduxState) => state.Homepage,
    );

    const tableOfContent = [
        { tag: 'what-is-it', detail: 'What is it?' },
        { tag: 'who-is-it-for', detail: 'Who is it for?' },
        { tag: 'why-do-you-need-it', detail: 'Why do you need it?' },
        { tag: 'what-does-it-cover', detail: 'What does it cover?' },
        { tag: 'what-doesnt-it-cover', detail: "What doesn't it cover?" },
        { tag: 'what-does-it-cost', detail: 'What does it cost?' },
        // { tag: "why-get-it-with-coverzy", detail: "Why Get It With COVRZY?" },
        // { tag: "still-in-doubt", detail: "Still In Doubt?" },
    ];
    return (
        <>
            <section className="business-wrp">
                <Container>
                    <Row>
                        <Col lg={3} md={4}>
                            <div className="index-box">
                                <h3>Index</h3>
                                <ul>
                                    {tableOfContent.map((data: any, index) => (
                                        <>
                                            <li>
                                                <Link
                                                    activeClass={'active-manu'}
                                                    smooth={true}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    duration={100}
                                                    key={index}
                                                    offset={-100}
                                                    // className={style.trackRightBar}
                                                    spy
                                                    to={data.tag}
                                                >
                                                    {data.detail}
                                                </Link>
                                            </li>
                                        </>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                        <Col lg={9} md={8}>
                            <div className="business-content">
                                <div className="business-info" id="what-is-it">
                                    {/* <h2 className="title-wrp text-align-left">What Is <span>BOP</span> Insurance?</h2> */}
                                    <h2 className="title-wrp text-align-left">
                                        What is{' '}
                                        <span>
                                            {view_single_policy?.policy_name}?
                                        </span>
                                    </h2>
                                    {/* <p>A Business Owners Policy (BOP) is a package of insurance policies that the majority of business owners need to have—which is why insurance carriers bundle these coverages and sell them as one product.</p> */}
                                    <div className="info-img text-center">
                                        <img
                                            src={whatlsbop}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <p>{view_single_policy?.description}</p>
                                    {/* <p>More often than not, a BOP is sold to small and medium-sized businesses, since large corporations tend to have more complex risks that require customized policies.</p>
                                    <p>In a typical BOP, businesses buy the following policies as one bundle or insurance package:</p>
                                    <ul className='business-listing'>
                                        <li>Commercial Property Insurance</li>
                                        <li>General Liability Insurance</li>
                                        <li>Business Interruption Insurance</li>
                                    </ul>
                                    <strong>What’s The Difference Between a Business Owners Policy and a Commercial Package Policy (CPP)?</strong>
                                    <p>The main difference between a BOP and a CPP is that the CPP is much more flexible, which means that your business has greater options when it comes to putting together a coverage package that works best for your company’s specific needs.</p>
                                    <div className='info-img text-center'><img src={cpp} className="img-fluid" /></div>
                                    <p>In any case, whether or not you purchase a BOP or CPP is going to depend on two things; your coverage needs and your eligibility.</p>
                                    <p>For more, read our full guide on <Nav.Link href="#">business owners policy vs. commercial package policy.</Nav.Link></p>
                                    <strong>What’s the Difference Between a BOP and General Liability?</strong>
                                    <p>While this might seem like a concept that’s easy to understand, it’s still one of the most commonly
                                        asked questions by business owners who want to buy their first insurance policies.</p>
                                    <p>The difference between a BOP and general liability is that a BOP provides more coverage. A BOP will
                                        cover the liability losses that a general liability policy will cover, but it will also cover property losses
                                        and business interruption costs.</p>
                                    <p>A commercial general liability policy typically covers third-party property damage, bodily injury, and
                                        advertising injury, along with defense costs if you are being sued for a covered loss.</p>
                                    <p>A BOP covers all this as well since commercial general liability is an integral part of the policy package,
                                        but it also covers your business property. That means that it can cover everything a commercial property
                                        policy covers, including property damage, loss and restoration of paperwork and records, equipment
                                        breakdown, and more.</p> */}
                                </div>

                                <div
                                    className="business-info"
                                    id="who-is-it-for"
                                >
                                    <h2 className="title-wrp text-align-left">
                                        Who is{' '}
                                        <span>
                                            {view_single_policy?.policy_name}
                                        </span>{' '}
                                        for?
                                    </h2>
                                    {/* <h2 className="title-wrp text-align-left">Who Is <span>BOP</span> Insurance For?</h2> */}
                                    {/* <div dangerouslySetInnerHTML={{
                                        __html: policies_list[3]?.policy_need_for
                                    }}></div> */}
                                    {/* <p>A Business Owners Policy is a policy package that was created with small businesses in mind. It was
                                        designed to cover many of the business risks that a majority of small businesses share, regardless of
                                        industry.</p>
                                    <p>Large companies with more complex insurance needs usually don’t qualify for a BOP, meaning that the
                                        coverage they need can’t be provided by a Business Owners Policy. These large businesses would most
                                        likely be better off purchasing a variety of individual insurance policies that are all tailored to cover their
                                        specific needs based on their more complex risk profile.</p> */}
                                    <div className="info-img text-center">
                                        <img
                                            src={BopInsurance}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        className="doubt"
                                        dangerouslySetInnerHTML={{
                                            __html: view_single_policy?.policy_is_for,
                                        }}
                                    ></div>
                                    {/* <p>If you fit into the following profile, a Business Owners Policy could probably be the right solution for
                                        covering your basic business insurance needs:</p>
                                    <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p>
                                    <strong>Are There Requirements for Purchasing a BOP?</strong>
                                    <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p> */}
                                </div>

                                <div
                                    className="business-info"
                                    id="why-do-you-need-it"
                                >
                                    {/* <h2 className="title-wrp text-align-left">Why Do You Need a <span>Business Owners Policy?</span></h2> */}
                                    <h2 className="title-wrp text-align-left">
                                        Why do you need a{' '}
                                        <span>
                                            {view_single_policy?.policy_name}?
                                        </span>
                                    </h2>
                                    <div className="info-img text-center">
                                        <img
                                            src={Owners}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        className="doubt"
                                        dangerouslySetInnerHTML={{
                                            __html: view_single_policy?.policy_need_for,
                                        }}
                                    ></div>
                                    {/* <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p>
                                    <p>Commercial property insurance will protect you in the event that your business property is damaged or
                                        any equipment and other business contents you might own are damaged or stolen.</p>
                                    <p>If your property is damaged by severe weather or vandalized, this policy will kick in to cover the costs of
                                        dealing with such issues. If any work equipment or inventory is stolen or damaged, a proper commercial
                                        property policy should cover those losses as well.</p>
                                    <strong>General Liability Insurance</strong>
                                    <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p>
                                    <p>Commercial property insurance will protect you in the event that your business property is damaged or
                                        any equipment and other business contents you might own are damaged or stolen.</p>
                                    <p>If your property is damaged by severe weather or vandalized, this policy will kick in to cover the costs of
                                        dealing with such issues. If any work equipment or inventory is stolen or damaged, a proper commercial
                                        property policy should cover those losses as well.</p> */}
                                </div>

                                <div
                                    className="business-info"
                                    id="what-does-it-cover"
                                >
                                    <h2 className="title-wrp text-align-left">
                                        What’s <span>Covered?</span>
                                    </h2>
                                    <div className="info-img text-center">
                                        <img
                                            src={DueDiligence}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    {/* <ul className='doubt'> */}
                                    <ul className="doubt">
                                        {view_single_policy?.policy_prons &&
                                            Object.keys(
                                                JSON.parse(
                                                    view_single_policy?.policy_prons,
                                                )?.[0],
                                            ).map((key: any) => (
                                                <li>
                                                    {
                                                        JSON.parse(
                                                            view_single_policy?.policy_prons,
                                                        )?.[0]?.[key]
                                                    }
                                                </li>
                                            ))}
                                    </ul>
                                    {/* <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p>
                                    <p>Commercial property insurance will protect you in the event that your business property is damaged or
                                        any equipment and other business contents you might own are damaged or stolen.</p>
                                    <p>If your property is damaged by severe weather or vandalized, this policy will kick in to cover the costs of
                                        dealing with such issues. If any work equipment or inventory is stolen or damaged, a proper commercial
                                        property policy should cover those losses as well.</p> */}
                                </div>

                                <div
                                    className="business-info"
                                    id="what-doesnt-it-cover"
                                >
                                    <h2 className="title-wrp text-align-left">
                                        What’s not <span>Covered?</span>
                                    </h2>
                                    <div className="info-img text-center">
                                        <img
                                            src={Covered}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    {/* <ul className='doubt'> */}
                                    <ul className="doubt">
                                        {view_single_policy?.policy_cons &&
                                            Object.keys(
                                                JSON.parse(
                                                    view_single_policy?.policy_cons,
                                                )?.[0],
                                            ).map((key: any) => (
                                                <li>
                                                    {
                                                        JSON.parse(
                                                            view_single_policy?.policy_cons,
                                                        )?.[0]?.[key]
                                                    }
                                                </li>
                                            ))}
                                    </ul>
                                    {/* <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p>
                                    <p>Commercial property insurance will protect you in the event that your business property is damaged or
                                        any equipment and other business contents you might own are damaged or stolen.</p>
                                    <p>If your property is damaged by severe weather or vandalized, this policy will kick in to cover the costs of
                                        dealing with such issues. If any work equipment or inventory is stolen or damaged, a proper commercial
                                        property policy should cover those losses as well.</p>
                                    <strong>General Liability Insurance</strong>
                                    <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p>
                                    <p>Commercial property insurance will protect you in the event that your business property is damaged or
                                        any equipment and other business contents you might own are damaged or stolen.</p>
                                    <p>If your property is damaged by severe weather or vandalized, this policy will kick in to cover the costs of
                                        dealing with such issues. If any work equipment or inventory is stolen or damaged, a proper commercial
                                        property policy should cover those losses as well.</p> */}
                                </div>

                                <div
                                    className="business-info"
                                    id="what-does-it-cost"
                                >
                                    <h2 className="title-wrp text-align-left">
                                        What does a{' '}
                                        <span>
                                            {view_single_policy?.policy_name}
                                        </span>{' '}
                                        cost?
                                    </h2>
                                    <div
                                        className="doubt"
                                        dangerouslySetInnerHTML={{
                                            __html: view_single_policy?.policy_cost_desc,
                                        }}
                                    ></div>
                                    {/* <strong>Industry</strong>
                                    <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p>
                                    <strong>Location</strong>
                                    <p>Commercial property insurance will protect you in the event that your business property is damaged or
                                        any equipment and other business contents you might own are damaged or stolen.</p>
                                    <strong>Longevity</strong>
                                    <p>If your property is damaged by severe weather or vandalized, this policy will kick in to cover the costs of
                                        dealing with such issues. If any work equipment or inventory is stolen or damaged, a proper commercial
                                        property policy should cover those losses as well.</p>
                                    <strong>Number of Employees</strong>
                                    <p>Usually, insurers won’t offer a BOP to companies that handle their business off-premises. Insurers
                                        usually have property parameters that go into their profile for a BOP and will not offer the policy packge
                                        to businesses that have more or less property than they are willing to cover.</p>
                                    <strong>Value of Property</strong>
                                    <p>Commercial property insurance will protect you in the event that your business property is damaged or
                                        any equipment and other business contents you might own are damaged or stolen.</p>
                                    <strong>Claims History</strong>
                                    <p>If your property is damaged by severe weather or vandalized, this policy will kick in to cover the costs of
                                        dealing with such issues. If any work equipment or inventory is stolen or damaged, a proper commercial
                                        property policy should cover those losses as well.</p> */}
                                </div>

                                {/* <div className='business-info' id='why-get-it-with-coverzy'>
                                    <h2 className="title-wrp text-align-left">What Get It With<span> COVRZY?</span></h2>
                                    <div className='get-card-wrp'>
                                        <Row>
                                            <Cards image={easy} title="Easy" content="We know time is money. Without sifting through documents or taking the day off to visit" />
                                            <Cards image={affordable} title="Affordable" content="We know time is money. Without sifting through documents or taking the day off to visit" />
                                            <Cards image={complete} title="Complete" content="We know time is money. Without sifting through documents or taking the day off to visit" />
                                            <Cards image={human} title="Human" content="We know time is money. Without sifting through documents or taking the day off to visit" />

                                        </Row>
                                    </div>
                                </div>
                                <div className='business-info' id='still-in-doubt'>
                                    <h2 className="title-wrp text-align-left">Still In<span> Doubt??</span></h2>
                                    <ul className='doubt'>
                                        <li>The Superior Court of New Jersey ruled that defendants were not obligated to remove snow and ice between parked cars until the cars either moved, or the snow stopped falling.
                                            <span>view:<Nav.Link href="#">High Court Rules For Defendant In Slip and Fall</Nav.Link></span>
                                        </li>
                                        <li>The Superior Court of New Jersey ruled that defendants were not obligated to remove snow and ice between parked cars until the cars either moved, or the snow stopped falling.
                                            <span>view:<Nav.Link href="#">High Court Rules For Defendant In Slip and Fall</Nav.Link></span>
                                        </li>
                                        <li>The Superior Court of New Jersey ruled that defendants were not obligated to remove snow and ice between parked cars until the cars either moved, or the snow stopped falling.
                                            <span>view:<Nav.Link href="#">High Court Rules For Defendant In Slip and Fall</Nav.Link></span>
                                        </li>
                                        <li>The Superior Court of New Jersey ruled that defendants were not obligated to remove snow and ice between parked cars until the cars either moved, or the snow stopped falling.
                                            <span>view:<Nav.Link href="#">High Court Rules For Defendant In Slip and Fall</Nav.Link></span>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default ScrollManu;
