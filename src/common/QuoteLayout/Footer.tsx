import React from 'react';
import Style from './style.module.scss';
import Logo from '../../assets/images/partner_logo/One-assure-logo.svg';
import CallIcon from '../../assets/images/call-grey.svg';
import MailIcon from '../../assets/images/mail-grey.svg';
import IrdaiLogo from '../../assets/images/partner_logo/IRDA_Logo.svg';
import PciDss from '../../assets/images/partner_logo/pci-dss-logo.svg';
import { Nav } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className={Style.main}>
            <div className={Style.topFooter}>
                <div className={Style.footerSection}>
                    <img className="" src={Logo} alt="" />
                    <p>Bizcovr Insurance Broking Private Limited</p>
                    <ul>
                        <li style={{ cursor: 'pointer' }}>
                            <a
                                style={{ color: '#774ad9' }}
                                href="https://www.oneassure.in/_files/ugd/0fd5af_ed22eae2311b40a09eb89c7d50d80523.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li style={{ cursor: 'pointer' }}>
                            <a
                                style={{ color: '#774ad9' }}
                                href="https://www.oneassure.in/_files/ugd/0fd5af_c9e8e54d0c924460b78016d73eabf654.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Terms & Conditions
                            </a>
                        </li>
                        <li style={{ cursor: 'pointer' }}>
                            <a
                                style={{ color: '#774ad9' }}
                                href="https://www.oneassure.in/_files/ugd/0fd5af_fa28656146d74e759122c8dc31124764.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Payment Terms
                            </a>
                        </li>
                    </ul>
                    <div className="social-media">
                        <Nav.Link
                            // href="https://www.linkedin.com/company/covrzy/?viewAsMember=true"
                            target={'_blank'}
                        >
                            <i
                                className="fa fa-linkedin"
                                aria-hidden="true"
                            ></i>
                        </Nav.Link>
                        <Nav.Link
                            // href="https://www.google.com/search?q=covrzy&oq=covrzy&aqs=chrome..69i57j0i10i512j69i59j69i60l2j69i61j69i65l2.3095j0j4&sourceid=chrome&ie=UTF-8"
                            target={'_blank'}
                        >
                            <i className="fa fa-google" aria-hidden="true"></i>
                        </Nav.Link>
                        <Nav.Link
                            // href="https://www.instagram.com/covrzy/"
                            target={'_blank'}
                        >
                            <i
                                className="fa fa-instagram instagram-icon"
                                aria-hidden="true"
                            ></i>
                        </Nav.Link>
                        <Nav.Link
                            // href="https://twitter.com/Covrzy_In"
                            target={'_blank'}
                        >
                            <i
                                className="fa fa-twitter twitter-icon"
                                aria-hidden="true"
                            ></i>
                        </Nav.Link>
                    </div>
                </div>
                <div className={Style.footerSection}>
                    <Nav.Link
                        href="https://www.oneassure.in/_files/ugd/0fd5af_e5c466bdb56d4da78c2b84d994207e55.pdf"
                        target={'_blank'}
                    >
                        Code Of Conduct
                    </Nav.Link>
                    <Nav.Link
                        href="https://www.oneassure.in/_files/ugd/0fd5af_4b980625d78c4e8ebe90977063db4c19.pdf"
                        target={'_blank'}
                    >
                        License Information
                    </Nav.Link>
                    <Nav.Link
                        href="https://covrzy-docs-storage.s3.ap-south-1.amazonaws.com/Grievance+Redressal.pdf"
                        target={'_blank'}
                    >
                        Grievance Redressal
                    </Nav.Link>
                </div>
                <div className={Style.footerSection}>
                    <div className={Style.title}>Secured With</div>
                    <img
                        style={{ height: '75px', width: '96px' }}
                        src={IrdaiLogo}
                        alt=""
                    />
                    <img
                        style={{ height: '75px', width: '96px' }}
                        src={PciDss}
                        alt=""
                    />
                </div>
                <div className={Style.footerSection}>
                    <div className={Style.footerIcon}>
                        <img src={MailIcon} alt="" />
                        <Nav.Link
                            className={Style.contact}
                            href="mailto:hello@covrzy.com"
                        >
                            hello@covrzy.com
                        </Nav.Link>
                    </div>
                    <div className={Style.footerIcon}>
                        <img src={CallIcon} alt="" />
                        <Nav.Link
                            className={Style.contact}
                            href="tel:9354963947"
                        >
                            +(91)-9354963947
                        </Nav.Link>
                    </div>
                </div>
            </div>
            <div className={Style.bottomFooter}>
                Prost Insurance Brokers Pvt. Ltd.(OneAssure), 3rd floor,
                91springboard, MG Road, Gopala Krishna Complex 45/3, Residency
                Road, Mahatma Gandhi Rd, Bengaluru, Karnataka 560025. License
                No. 756, Direct Broker (Life & General), Valid from: 22/07/2021
                to 21/07/2024
            </div>
        </div>
    );
};

export default Footer;
