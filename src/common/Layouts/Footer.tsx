import {
    Col,
    Container,
    Dropdown,
    Nav,
    NavDropdown,
    Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomLoginModal from '../../components/CustomLoginModal';
import { IReduxState } from '../../utils/types';
import { useSelector } from 'react-redux';

const ResourcesMenu = [
    {
        id: 1,
        label: 'Q1. Which type of business insurance should I purchase?',
        path: '/resource/types-of-business-insurance-to-purchase',
    },
    {
        id: 2,
        label: 'Q2. How much does business insurance cost?',
        path: '/resource/business-insurance-cost',
    },
    {
        id: 3,
        label: "Q3. What's the difference between a broker and Covrzy?",
        path: '/resource/broker-vs-covrzy',
    },
];

const Footer = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)

    const AuthState = useSelector((state: IReduxState) => state.Auth);

    return (
        <>
            <footer className="footer">
                <Container>
                    <Row>
                        <Col md={3} sm={6}>
                            <h3 className="title-widget">Quick Access</h3>
                            <div className="quitck-link d-grid">
                                {/* <Link to='/'>Products</Link> */}
                                <Link to="/about-us">About Us</Link>
                                <Link to="/faqs">FAQs</Link>
                                <Link to="/user/user-detail">Get Started</Link>
                                <Link to="/partners">Partner with us</Link>
                                {/* <Link to='/'>Resources</Link> */}

                                <Dropdown className="resources-footer">
                                    <Dropdown.Toggle
                                        variant=""
                                        id="dropdown-basic"
                                    >
                                        Resources
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item href="/resource/q1">Q1. Which type of business insurance should I purchase?</Dropdown.Item> */}
                                        <Link
                                            className="dropdown-item"
                                            to="/resource/types-of-business-insurance-to-purchase"
                                        >
                                            Q1. Which type of business insurance
                                            should I purchase?
                                        </Link>
                                        <Link
                                            className="dropdown-item"
                                            to="/resource/business-insurance-cost"
                                        >
                                            Q2. How much does business insurance
                                            cost?
                                        </Link>
                                        <Link
                                            className="dropdown-item"
                                            to="/resource/broker-vs-covrzy"
                                        >
                                            Q3. What's the difference between a
                                            broker and Covrzy?
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/* <Nav.Link href="#">About Us</Nav.Link>
                                <Nav.Link href="#">Careers</Nav.Link>
                                <Nav.Link href="#">Media Center</Nav.Link>
                                <Nav.Link href="#">Partner Program</Nav.Link>
                                <Nav.Link href="#">Affiliate Program</Nav.Link>
                                <Nav.Link href="#">FAQs</Nav.Link>
                                <Nav.Link href="#">Sitemap</Nav.Link>
                                <Nav.Link href="#">Claims</Nav.Link> */}
                                {!AuthState.isLogin && <Link to="" onClick={() => {
                                    setShowLoginModal(true)
                                }}>Sign In</Link>
                                }
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <h3 className="title-widget">Contact Us</h3>
                            <div className="contact-info">
                                <div className="contact-list">
                                    <p>For support and other queries</p>
                                    <Nav.Link href="mailto:hello@covrzy.com">
                                        hello@covrzy.com
                                    </Nav.Link>
                                </div>
                                {/* <div className="contact-list">
                                    <p>Press Inquiries</p>
                                    <Nav.Link href="tel:98765 543210">98765 543210</Nav.Link>
                                </div> */}
                                <div className="contact-list mail-info">
                                    {/* <Nav.Link href="mailto:hello@covrzy.comlaims">hello@covrzy.comlaims</Nav.Link>
                                    <Nav.Link href="tel:1 844 436 2765">1 844 436 2765</Nav.Link> */}
                                    <p>Monday to Friday</p>
                                    <p>9 AM - 6 PM IST</p>
                                </div>
                                <div className="contact-list phone-number">
                                    <p>Talk to us</p>
                                    <Nav.Link href="tel:9354963947">
                                        9354963947
                                    </Nav.Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <h3 className="title-widget">Meet Us</h3>
                            <div className="address">
                                <p>
                                    13031, Sobha Dream Acres, Balagere Main
                                    Road, Off Panathur, Bengaluru, Karnataka
                                    560087
                                </p>
                                <div className="social-media">
                                    <Nav.Link
                                        href="https://www.linkedin.com/company/covrzy/?viewAsMember=true"
                                        target={'_blank'}
                                    >
                                        <i
                                            className="fa fa-linkedin"
                                            aria-hidden="true"
                                        ></i>
                                    </Nav.Link>
                                    <Nav.Link
                                        href="https://www.google.com/search?q=covrzy&oq=covrzy&aqs=chrome..69i57j0i10i512j69i59j69i60l2j69i61j69i65l2.3095j0j4&sourceid=chrome&ie=UTF-8"
                                        target={'_blank'}
                                    >
                                        <i
                                            className="fa fa-google"
                                            aria-hidden="true"
                                        ></i>
                                    </Nav.Link>
                                    <Nav.Link
                                        href="https://www.instagram.com/covrzy/"
                                        target={'_blank'}
                                    >
                                        <i
                                            className="fa fa-instagram instagram-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </Nav.Link>
                                    <Nav.Link
                                        href="https://twitter.com/Covrzy_In"
                                        target={'_blank'}
                                    >
                                        <i
                                            className="fa fa-twitter twitter-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </Nav.Link>
                                    {/* <Nav.Link href="#"><i className="fa fa-facebook" aria-hidden="true"></i></Nav.Link> */}
                                    {/* <Nav.Link href="https://mail.google.com" target={"_blank"}><i className="fa fa-envelope" aria-hidden="true"></i></Nav.Link> */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
            <div className="copyright-section">
                <Container>
                    <Row>
                        {/* <Col md={6}><p>© 2022 COVRZY Insurance Services, LLC. All rights reserved.</p></Col> */}
                        <Col md={6}>
                            <p>
                                ©{' '}
                                Copyright {new Date().getFullYear()} Bizcovr Insurance Broking Private Limited. All rights reserved.

                            </p>
                        </Col>
                        <Col md={6}>
                            <div className="copyright-link">
                                <Link to="company/terms">Terms</Link>
                                <Link to="/privacy-policy">Privacy</Link>
                                {/* <Nav.Link href="#">Licenses</Nav.Link>
                                <Nav.Link href="#">Disclosure</Nav.Link> */}
                            </div>
                        </Col>
                        <Col md={12}>
                            <p className="">
                                Bizcovr Insurance Broking Pvt. Ltd. | CIN - U66220KA2023PTC179675 | Registered Office - 3rd Floor, Al Mannar building bearing, 777/E, 100 Feet Rd, above Titan World, HAL 2nd Stage, Doopanahalli, Indiranagar, Bengaluru, Karnataka 560008 | Phone No. +91-9354963947 | Email - support@covrzy.com
                            </p>
                            <p className="">
                                Insurance products are offered and serviced by Bizcovr Insurance Broking Pvt Ltd |  Registration No. 981, Registration Code No. IRDAI / DB 1113 / 2024, Valid till 14/07/2027, License Category - Direct Broker (General).
                            </p>
                            <p className="">
                                Visitors are informed that the information submitted by them on the website can be shared with insurers. Product information is actual and is entirely based on information received from insurers.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <CustomLoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} navigationAllowed={false} />
        </>
    );
};

export default Footer;
