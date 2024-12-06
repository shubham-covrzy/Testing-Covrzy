import { Button, Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import note from '../../assets/images/note.svg';
import watch from '../../assets/images/watch.png';
import insurance from '../../assets/images/insurance.png';
import GetTouch from '../../assets/images/GetTouch.svg';
import Meeting from '../../assets/images/Meeting.svg';
import document from '../../assets/images/Document.svg';
import Share from '../../assets/images/Share.svg';
import Check from '../../assets/images/CheckFill-PurpleBg.svg';
import Cards from './Cards';
import MainBanner from '../../common/MainBanner';
import SubBanner from '../../common/SubBanner';
import coverge from '../../assets/images/coverage.png';
import questionCoverge from '../../assets/images/coverage2.png';
import RightArrow from '../../assets/images/RightArrow.svg';
import { CustomSlider } from './Slider';
import Images from '../../common/Images';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import CustomLoader from '../../common/Loader/CustomLoader';

// import Partner1 from '../../assets/images/partner_logo/bharti.png'
// import Partner2 from '../../assets/images/partner_logo/cholaMS.png'
// import Partner3 from '../../assets/images/partner_logo/future.png'
// import Partner4 from '../../assets/images/partner_logo/bajaj.png'
// import Partner5 from '../../assets/images/partner_logo/hdfc.png'
import Partner6 from '../../assets/images/partner_logo/ICICI.png';
import Partner7 from '../../assets/images/partner_logo/iffico.png';
// import Partner8 from '../../assets/images/partner_logo/kotak.png'
// import Partner9 from '../../assets/images/partner_logo/liberty.png'
// import Partner10 from '../../assets/images/partner_logo/magma.png'
import Partner11 from '../../assets/images/partner_logo/digit.png';
import { lunchBotHandler } from '../../Helper/commonFunction';
import MetaTags from '../../common/MetaTag';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';
import { useState } from 'react';
import CustomQuoteModal from '../../components/CustomQuoteModal';
import RequestCallbackFormModal from '../../components/RequestCallbackFormModal';
import { TelephoneInbound } from 'react-bootstrap-icons';
import slugMapping from '../../utils/slug_mapping.json'; 



const PartnersLogo = [
    { id: 1, logo: Partner6, width: 220 },
    { id: 2, logo: Partner7, width: 120 },
    { id: 3, logo: Partner11, width: 150 },
];

const Home = () => {
    const { sendGAEvent } = useGAEvent(GACategories.HomePage);
    const [showRequestCallbackModal, setShowRequestCallbackModal] =
        useState(false);

    const { package_list, loading } = useSelector(
        (state: IReduxState) => state.Homepage,
    );
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // Function to handle modal close
    const handleClose = () => setShowModal(false);

    // Function to handle modal open
    const handleShow = () => setShowModal(true);

    const handleOpenRequestCallbackModal = () =>
        setShowRequestCallbackModal(true);

    const handleCloseRequestCallbackModal = () =>
        setShowRequestCallbackModal(false);

    return (
        <>
            <MetaTags
                title="Covrzy | Business Insurance Simplified"
                description="We are on a mission to simplify business insurance in India and help companies in comparing quotes from top insurers and complete the purchase online."
                url="https://covrzy.com/"
                canonical="https://covrzy.com/"

            />

            <MainBanner
                // starMessage="Lorem Ipsum is simply dummy text"
                mainTitle="Business Insurance"
                subTitle="Incredibly Simple"
                content={`<ul>
                            <li><img  alt="" src=${RightArrow}/> Best coverage for your business</li>
                            <li><img  alt="" src=${RightArrow}/> Affordable plans</li>
                            <li><img  alt="" src=${RightArrow}/> Tailored benefits for your business</li>
                            <li><img  alt="" src=${RightArrow}/> Expert consultation</li>
                        </ul>`}
                image={insurance}
                imgWidth={432}
                imgHeight={394}
            />
            <section className="trusted-companies">
                <Container>
                    {/* <h2 className="title-wrp"><span>Official Partners</span></h2> */}
                    {/* <h2 className="title-wrp">Trusted by the most <span>innovative companies</span> in the INDIA</h2> */}
                    <h2 className="title-wrp">Official Partners</h2>
                    <div>
                        <Row>
                            {PartnersLogo.map((obj) => (
                                <Col lg={4} md={4} sm={12} key={obj.id}>
                                    <div
                                        className="img-box official-img"
                                        style={{ width: obj.width }}
                                    >
                                        <Images image={obj.logo} />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        {/* <Images image={cllogo1} />
                        <Images image={cllogo2} />
                        <Images image={cllogo3} />
                        <Images image={cllogo5} /> */}
                    </div>
                </Container>
            </section>
            <section className="packages-section">
                <Container>
                    <h2 className="title-wrp">
                        Search recommended <span>packages for industries</span>
                    </h2>
                    {loading ? (
                        <CustomLoader />
                    ) : (
                        <Row>
                            {package_list.map((item: Object | any) => {
                                const packageId = String(item?.id);

                                const slug = slugMapping.packages[packageId as keyof typeof slugMapping.packages] || packageId;

                                return (
                                    <Cards
                                        key={item?.id}
                                        // image={startupPackage}
                                        image={
                                            `./assets/homepage/${item?.icon}`
                                        }
                                        title={item?.package_name}
                                        content={item?.package_defination}
                                        // content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been standard..."
                                        buttonTitle="Learn More"
                                        onClick={() =>
                                            navigate(`/package-details/${slug}`)
                                        }
                                    />
                                )
                            })}
                            {/* <Cards image={startupPackage} title="Startup Package" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been standard..." buttonTitle="Learn More" />
                        <Cards image={smallBusiness} title="Small Business" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been standard..." buttonTitle="Learn More" />
                        <Cards image={ECommerce} title="E-Commerce" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been standard..." buttonTitle="Learn More" />
                        <Cards image={Fintech} title="Fintech" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been standard..." buttonTitle="Learn More" /> */}
                        </Row>
                    )}
                </Container>
            </section>
            <SubBanner
                bgImage={coverge}
                whiteTitle="Find the Best Coverage "
                orangeTitle="for your business"
                content={`<p>Not sure which insurance you need?<br /> Let us help you.</p>`}
                buttonTitle="Get Quote"
                image={note}
                onClick={() => {
                    sendGAEvent(GAActions.GetQuoteClicked);
                    handleShow(); // Open the modal
                }}
            />
            <CustomQuoteModal
                show={showModal}
                setShowModal={setShowModal}
                source={'Home page'}
            />

            <section className="quotes-slider">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="p-0">
                            <div className="quotes-img">
                                <img alt="" src={watch} className="img-fluid" />
                            </div>
                        </Col>
                        <Col md={6} className="p-0">
                            <div className="quotes-slide">
                                <CustomSlider />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="how-do-section">
                <Container>
                    <div className="how-do-box">
                        <Row className="align-items-center">
                            <Col md={12}>
                                <div className="how-do-info">
                                    <h2>
                                        How We <span>Do It.</span>
                                    </h2>
                                    <strong>
                                        Through technology, our aim is to
                                        standardise various processes for
                                        stakeholders such as brokers and
                                        insurers. Our focus is on creating
                                        next-generation pricing models,
                                        automated onboarding flows, and a
                                        customer service layer that covers the
                                        entire product lifecycle.
                                    </strong>
                                    {/* <strong>From algorithmic underwriting to instant certificates, we use smart technology to make policies custom-tailored, more affordable, and easier to buy and use.</strong> */}
                                    {/* <p>"The technology powering our platform represents a major step forward for the industry."</p> */}
                                    <h3>Ankit Kamra</h3>
                                    <h4>Founder & CEO of COVRZY</h4>
                                </div>
                            </Col>
                            {/* <Col md={4}>
                                <img alt="" src={man} className='img-fluid' />
                            </Col> */}
                        </Row>
                    </div>
                </Container>
            </section>
            <section className="hows-work">
                <Container>
                    <div className="title">
                        <h2>How Claims Work.</h2>
                        <p>We are there for you when things go wrong.</p>
                    </div>
                    <div className="timeline-work">
                        <Row className="justify-content-center">
                            <Col lg={11}>
                                <div className="timeline">
                                    <div className="timeline-desc right-side">
                                        <span>
                                            <img alt="" src={GetTouch} />
                                        </span>
                                        <div className="content">
                                            <p>Get in Touch</p>
                                        </div>
                                    </div>
                                    <div className="timeline-desc left-side">
                                        <span>
                                            <img alt="" src={Meeting} />
                                        </span>
                                        <div className="content">
                                            <p>
                                                Schedule a meeting with <br />
                                                our claims expert
                                            </p>
                                        </div>
                                    </div>
                                    <div className="timeline-desc right-side">
                                        <span>
                                            <img alt="" src={Share} />
                                        </span>
                                        <div className="content">
                                            <p>
                                                Share the required <br />
                                                documents
                                            </p>
                                        </div>
                                    </div>
                                    <div className="timeline-desc left-side">
                                        <span>
                                            <img alt="" src={document} />
                                        </span>
                                        <div className="content">
                                            <p>Submit your Claim</p>
                                        </div>
                                    </div>
                                    <div className="timeline-desc right-side">
                                        <span>
                                            <img alt="" src={Check} />
                                        </span>
                                        <div className="content">
                                            <p>Track your claim</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline-btn-wrp">
                                    <Button
                                        className="timeline-btn"
                                        onClick={lunchBotHandler}
                                    >
                                        Learn More
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
            <SubBanner
                bgImage={questionCoverge}
                whiteTitle="Questions?"
                orangeTitle="We’re Ready."
                content={`<p>We’ll help out if you’re unsure which<br /> insurance you need</p>`}
                buttonTitle={
                    <>
                        <TelephoneInbound />  Request Callback
                    </>
                }
                onClick={handleOpenRequestCallbackModal}
            />
            <RequestCallbackFormModal
                show={showRequestCallbackModal}
                onHide={handleCloseRequestCallbackModal}
            />
        </>
    );
};

export default Home;
