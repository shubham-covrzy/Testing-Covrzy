import React, { useEffect } from 'react';
import MainBanner from './MainBanner';
import startups from '../../assets/images/startups.png';
// import cllogo1 from '../../assets/images/cl_logo1.png';
// import cllogo2 from '../../assets/images/cl_logo2.png';
// import cllogo3 from '../../assets/images/cl_logo3.png';
// import cllogo5 from '../../assets/images/cl_logo5.png';
// import cllogo6 from '../../assets/images/cl_logo6.png';
import CutWeight from '../../assets/images/CutWeight.svg';
import OutputIcon from '../../assets/images/output.svg';
import article from '../../assets/images/article.png';
import businessesInsuranceImage from '../../assets/images/businesses-insurance.png';
import docFileImage from '../../assets/images/doc-file-check.png';
import ArrowBtn from '../../assets/images/ArrowBtn.png';
import cyberLinkImage from '../../assets/images/cyber-link.png';
import { Col, Container, Row } from 'react-bootstrap';
import Cards from './Cards';
// import Images from "../../common/Images";
import CustomCards from '../../common/CustomCards';
import { CustomSlider } from './Slider';
import { useDispatch, useSelector } from 'react-redux';
import { GetPackageDetailsAction } from '../../Redux/Actions/HomepageActions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IReduxState } from '../../utils/types';
import CustomLoader from '../../common/Loader/CustomLoader';
import Testimonial1 from '../../assets/images/Testimonial1.png';
import Quotes from '../../assets/images/Quotes.svg';
import MetaTags from '../../common/MetaTag';
import slugMapping from '../../utils/slug_mapping.json'

export const StartUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { package_details, loading } = useSelector(
        (state: IReduxState) => state.Homepage,
    );
    
    // const { packageId }: any = useParams();
    // useEffect(() => {
    //     dispatch(GetPackageDetailsAction(packageId));
    // }, [packageId, dispatch]);

    // const { policyId }: any = useParams();
    const { slug }: any = useParams();  // Get slug from the URL
    // Convert slug to policy ID using the slug_mapping.json file
    const packageId = (Object.keys(slugMapping.packages) as Array<keyof typeof slugMapping.packages>).find(
        key => slugMapping.packages[key] === slug
    );

    useEffect(() => {
        if (packageId) {
            dispatch(GetPackageDetailsAction(packageId));
        } else {
            navigate('/404'); 
        }
    }, [dispatch, packageId, navigate]);

    const content = (
        <div className="testimonial-wrp">
            <div className="testimonial-box">
                <div className="client-img">
                    <img src={Testimonial1} alt="" />
                </div>
                <div className="desc">
                    <span>
                        <img src={Quotes} alt="" />
                    </span>
                    <p>
                        Aut nihil mollitia deserunt quia sed rem. Quibusdam amet
                        veniam rerum id rerum beatae. Quas rerum iste
                        necessitatibus. At voluptates ad magnam blanditiis
                        excepturi expedita aut. Aut repellat inventore qui
                        minima illum est.
                    </p>
                    <div className="client-widget">
                        <h3>Kyle Merwin</h3>
                        <p>CO-owner</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {loading ? (
                <div className="m-5">
                    <CustomLoader />
                </div>
            ) : (
                <div>
                    <MetaTags
                        title={package_details?.package_name || 'Insurance Package'}
                        description={`Learn more about ${package_details?.package_name} at Covrzy.`}
                        url={`https://covrzy.com/package-details/${slug}`}
                        canonical={`https://covrzy.com/package-details/${slug}`}
                    />
                    <MainBanner
                        mainTitle="We Protect"
                        subTitle={package_details?.package_name}
                        // content={`<ul>
                        //         <li>We created the first custom-built policies for venture-backed<br/>
                        //         startups. Get covered in under ten minutes.</li>
                        //     </ul>`}
                        content={`<ul>
                            <li>We created a custom-built bundle for ${package_details?.package_name}</li>
                        </ul>`}
                    />
                    <section className="startup-section text-center">
                        <Container>
                            <div className="startups-img">
                                <img
                                    src={startups}
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>
                        </Container>
                    </section>
                    {/* <section className="trusted-companies">
                    <Container>
                        <div className="trusted-logo">
                            <Images image={cllogo6} />
                            <Images image={cllogo1} />
                            <Images image={cllogo2} />
                            <Images image={cllogo3} />
                            <Images image={cllogo5} />
                        </div>
                    </Container>
                </section> */}

                    <section className="rocket-section">
                        <Container>
                            <div className="rocket-box">
                                <Row>
                                    <Col md={7}>
                                        <div className="rocket-info">
                                            <h2>
                                                {package_details?.package_name}
                                            </h2>
                                            {/* <p>{package_details?.package_defination}</p> */}
                                            <p>
                                                {package_details?.package_type}
                                            </p>
                                            {/* <Button className="link-btn-wrp" variant="link">Learn More</Button> */}
                                        </div>
                                    </Col>
                                    <Col md={5}>
                                        <div
                                            className="rocket-info"
                                            style={{ paddingRight: 10 }}
                                        >
                                            <h3>Includes Policies</h3>
                                            <ul>
                                                {package_details?.packages_policy &&
                                                    package_details?.packages_policy.map(
                                                        (
                                                            item: object | any,
                                                        ) => (
                                                            <Link
                                                                to={`/policy-details/${item?.policy_id?.id}`}
                                                            >
                                                                <li
                                                                    key={
                                                                        item?.packages_policy_id
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            ?.policy_id
                                                                            ?.policy_name
                                                                    }
                                                                </li>
                                                            </Link>
                                                        ),
                                                    )}
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                    {/* <section className="startup-card-section">
                    <Container>
                        <Row>
                            {package_details?.packages_policy && package_details?.packages_policy
                                .map((item: object | any, i: number) => (
                                    <Cards
                                        image={(i % 2) ? CutWeight : OutputIcon}
                                        title={item?.policy_id?.policy_name}
                                        description={item?.policy_id?.description}
                                        onClick={() => navigate(`/policy-details/${item?.policy_id?.id}`)}
                                    />
                                ))}
                        </Row>
                    </Container>
                </section> */}

                    <div className="container" style={{ marginTop: 20 }}>
                        <div className="business-content">
                            <div className="business-info" id="what-is-it">
                                <h2 className="title-wrp text-align-left">
                                    What does{' '}
                                    <span>{package_details?.package_name}</span>{' '}
                                    include?
                                </h2>
                                {/* <div className='info-img text-center'><img src={whatlsbop} className="img-fluid" alt='' /></div> */}
                                <div
                                    className="doubt companies-strong"
                                    dangerouslySetInnerHTML={{
                                        __html: package_details?.package_included,
                                    }}
                                ></div>
                            </div>
                            <div className="business-info " id="who-is-it-for">
                                <h2 className="title-wrp text-align-left">
                                    Type of companies{' '}
                                    <span>{package_details?.package_name}</span>{' '}
                                    package intended for?
                                </h2>
                                {/* <div className='info-img text-center'><img src={BopInsurance} className="img-fluid" alt='' /></div> */}
                                <div
                                    className="doubt companies-strong list-align"
                                    dangerouslySetInnerHTML={{
                                        __html: package_details?.package_is_for,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* <CustomSlider sliderContent={[content, content, content, content]} /> */}

                    {/* <section className="startup-card-section">
                <h2 className="policies-title">Additional Policies</h2>
                <Container>
                    <Row>
                        <Cards image={CutWeight} title="Lawyers Professional Liability" description="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners."></Cards>
                        <Cards image={OutputIcon} title="Lawyers Professional Liability" description="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners."></Cards>
                        <Cards image={CutWeight} title="Lawyers Professional Liability" description="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners."></Cards>
                        <Cards image={CutWeight} title="Lawyers Professional Liability" description="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners."></Cards>
                        <Cards image={CutWeight} title="Lawyers Professional Liability" description="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners."></Cards>
                        <Cards image={CutWeight} title="Lawyers Professional Liability" description="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners."></Cards>
                    </Row>
                </Container>
            </section> */}
                    {/* <section className="trusted-companies">
                    <Container>
                        <div className="trusted-logo">
                            <Images image={cllogo6} />
                            <Images image={cllogo1} />
                            <Images image={cllogo2} />
                            <Images image={cllogo3} />
                            <Images image={cllogo5} />
                        </div>
                    </Container>
                </section> */}
                    {/* <section className="article-section">
                    <Container>
                        <h2 className="title-wrp">Related <span>Articles</span></h2>
                        <Row>
                            <CustomCards image={article} content="How Much Does a Business Owners Policy (BOP) Cost?" buttonImage={ArrowBtn} />
                            <CustomCards image={article} content="How Much Does a Business Owners Policy (BOP) Cost?" buttonImage={ArrowBtn} />
                            <CustomCards image={article} content="How Much Does a Business Owners Policy (BOP) Cost?" buttonImage={ArrowBtn} />
                        </Row>
                    </Container>
                </section> */}
                    <section className="article-section mt-3">
                        <Container>
                            {/* <h2 className="title-wrp">Related <span>Articles</span></h2> */}
                            <h2 className="title-wrp">
                                <span>Articles</span> that can help
                            </h2>
                            <Row>
                                <CustomCards
                                    image={docFileImage}
                                    // content={`How Much Does a ${view_single_policy?.policy_name} Cost?`}
                                    content={
                                        'What is liability insurance and how it works?'
                                    }
                                    buttonImage={ArrowBtn}
                                    link="https://www.cnbctv18.com/personal-finance/what-is-liability-insurance-and-how-it-works-types-benefits-explained-15995941.htm"
                                />
                                <CustomCards
                                    image={businessesInsuranceImage}
                                    content={
                                        'The ignored need of insurance by small businesses.'
                                    }
                                    buttonImage={ArrowBtn}
                                    link="https://www.livemint.com/money/personal-finance/the-ignored-need-of-insurance-by-small-businesses-11670857104709.html"
                                />
                                <CustomCards
                                    image={cyberLinkImage}
                                    content={
                                        'Why cyber-security needs to be a strategy in the infinite corporate game?'
                                    }
                                    buttonImage={ArrowBtn}
                                    link="https://www.forbesindia.com/article/iim-calcutta/why-cybersecurity-needs-to-be-a-strategy-in-the-infinite-corpo-rate-game/80589/1"
                                />
                            </Row>
                        </Container>
                    </section>
                </div>
            )}
        </>
    );
};
