import React, { Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MainBanner from '../../common/MainBanner';
import ProcessImg from '../../assets/images/process-img.png';
// import Testimonial1 from '../../assets/images/Testimonial1.png';
import ankit from '../../assets/images/ankit.jpeg';
import veera from '../../assets/images/veera.jpg';
import MetaTags from '../../common/MetaTag';

const AboutUs = () => {
    return (
        <Fragment>
            <MetaTags
                title="About Us"
                description=""
                url="https://covrzy.com/about-us"
                canonical="https://covrzy.com/about-us"
            />

            <div className="resource-top">
                <MainBanner mainTitle="About Us" col="12" />
            </div>
            <div className="about-us-page">
                <Container>
                    <h2 className="title-wrp">
                        “Business insurance is broken{' '}
                        <span>for Small Businesses and Startups”</span>
                    </h2>
                    <p className="text-center">
                        In this day and age of technology, insurance companies
                        still use legacy models and systems to create products
                        for business. They are struggling to adapt new models
                        and technologies through which they can innovate the
                        onboarding process or create new products for modern day
                        businesses.{' '}
                    </p>
                    <div className="what-we-wrp">
                        <Row className="align-items-center">
                            <Col md={7}>
                                <h3>
                                    What we <span>believe?</span>
                                </h3>
                                <em>
                                    Insurance products have to tailor made and
                                    create from scratch for different segments
                                    and categories of business. By following
                                    this approach, we are making insurance
                                    products
                                </em>
                                <ul className="doubt">
                                    <li>
                                        <span>Simple</span>
                                        <p>
                                            Making insurance simple so that you
                                            don’t need to be an expert to
                                            understand the jargons followed by
                                            the industry.
                                        </p>
                                    </li>
                                    <li>
                                        <span>Accessible</span>
                                        <p>
                                            Discovery of liability products for
                                            business is a challenge. We’re
                                            building a recommendation engine
                                            based on industry and sectors that
                                            solves for accessibility
                                        </p>
                                    </li>
                                    <li>
                                        <span>Affordable</span>
                                        <p>
                                            We have partnered with various
                                            payment companies to enable business
                                            pay in one go or pay in easy
                                            installment plans.{' '}
                                        </p>
                                    </li>
                                    <li>
                                        <span>Custom-made</span>
                                        <p>
                                            Each and every business is unique
                                            and hence the risk associated are
                                            different. We are creating custom
                                            made products for each and every
                                            business.{' '}
                                        </p>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={5}>
                                <div className="believe-img">
                                    <img
                                        className="img-fluid"
                                        src={ProcessImg}
                                        alt=""
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="team-section">
                        <h2 className="title-wrp" style={{ textAlign: 'left' }}>
                            Team that’s <span>making it possible</span>
                        </h2>
                        <div className="team-list-card">
                            <div className="team-list">
                                <Row className="align-items-center">
                                    <Col lg={2} md={3}>
                                        <div className="team-img">
                                            <span>
                                                <img
                                                    src={ankit}
                                                    alt="profile"
                                                />
                                            </span>
                                            <h4>Ankit Kamra</h4>
                                            <h5>All things Business</h5>
                                        </div>
                                        <div className="team-img">
                                            <span>
                                                <img
                                                    src={veera}
                                                    alt="profile"
                                                />
                                            </span>
                                            <h4>Veera thota</h4>
                                            <h5>All things tech and product</h5>
                                        </div>
                                    </Col>
                                    <Col
                                        lg={10}
                                        md={9}
                                        className="about-team-member"
                                    >
                                        <div className="team-desc">
                                            <p>
                                                <em>
                                                    “As a founder, I have
                                                    personally experienced how
                                                    painful the experience can
                                                    be if you covering your
                                                    business against the known
                                                    risks. It is taxing both
                                                    mentally and financially”.
                                                    Having worked previously at
                                                    a healthtech startup, I
                                                    understand how complex
                                                    liability insurance is for
                                                    startups and small business
                                                    - Ankit Kamra, founder & CEO
                                                    at Covrzy.
                                                </em>
                                            </p>
                                            <p>
                                                <em>
                                                    Covrzy ensures we take care
                                                    of the risk while you focus
                                                    on running and growing your
                                                    business. As a team, we have
                                                    combined experience of over
                                                    20 years in domains such as
                                                    payments, insurance and e
                                                    commerce. Our founding team
                                                    has built and scaled
                                                    companies such Paytm,
                                                    Paypal, Amazon, Karboncard
                                                    and Plum.
                                                </em>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {/* <div className='team-list'>
                                <Row className='align-items-center'>
                                    <Col lg={2} md={3}>
                                        <div className='team-img'>
                                            <span><img src={veera} alt='profile' /></span>
                                            <h4>Veera thota</h4>
                                            <h5>All things tech and product</h5>
                                        </div>
                                    </Col>

                                </Row>


                            </div> */}
                        </div>
                    </div>
                </Container>
            </div>
        </Fragment>
    );
};

export default AboutUs;
