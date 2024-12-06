import React, { useEffect, useState } from 'react';
import {
    Col,
    Container,
    Dropdown,
    Nav,
    Navbar,
    NavDropdown,
    Row,
} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import logo from '../../assets/images/logo.svg';
import EditProfile from '../../assets/images/EditProfile.svg';
import ChangePassword from '../../assets/images/ChangePassword.svg';
import EditCompanyProfile from '../../assets/images/EditCompanyProfile.svg';
import EditTeamSettings from '../../assets/images/EditTeamSettings.svg';
import profileIcon from '../../assets/images/profile.svg';
import LogoutIcon from '../../assets/images/logout.png';

// import search from '../../assets/images/search.svg';
// import searchWhite from '../../assets/images/Search-white.svg';

import CustomButton from '../Buttons/CustomButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    GetAllPackagesAction,
    GetPoliciesListAction,
} from '../../Redux/Actions/HomepageActions';
import { IReduxState } from '../../utils/types';
import CustomLoader from '../Loader/CustomLoader';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import CustomLoginModal from '../../components/CustomLoginModal';
import { DecryptData } from '../CryptoJSToken';
import { LogoutAction } from '../../Redux/Actions/AuthActions';
import CustomQuoteModal from '../../components/CustomQuoteModal';
import slugMapping from '../../utils/slug_mapping.json';

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

const Header = () => {
    const { pathname } = useLocation();
    const staticpageflag = useLocation();
    const { sendGAEvent } = useGAEvent(GACategories.Header);
    // const [openSearch, setOpenSearch] = useState(false);
    // const [openModal, setOpenModal] = useState(false);
    const [isHoveredForProducts, setIsHoveredForProducts] = useState(false);
    const [isClickedForProducts, setIsClickedForProducts] = useState(false);
    const [isHoveredForResources, setIsHoveredForResources] = useState(false);
    const [isClickedForResources, setIsClickedForResources] = useState(false);
    // const [showPoliciesCount, setShowPoliciesCount] = useState(9);
    const [showPoliciesCount, setShowPoliciesCount] = useState(true);
    const [showPackageCount, setShowPackageCount] = useState(7);
    const { policies_list, package_list, loading } = useSelector(
        (state: IReduxState) => state.Homepage,
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [showCustomQuoteModal, setShowCustomQuoteModal] =
        useState<boolean>(false);

    const [userProfile, setUserProfile] = useState<string>('');

    const AuthState = useSelector((state: IReduxState) => state.Auth);

    const userDetails = useSelector((state: IReduxState) => state.UserProfile);

    const userData = userDetails.userProfile || DecryptData(AuthState.user);

    const handleOpenCustomQuoteModal = () => {
        setShowCustomQuoteModal(true);
    };

    const isMobile = useMediaQuery({ maxWidth: 500 });

    const handleCloseCustomQuoteModal = () => {
        setShowCustomQuoteModal(false);
    };
    useEffect(() => {
        if (userData?.profile) {
            const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
            const url = baseUrl + userData?.profile;
            setUserProfile(url);
        } else setUserProfile('');
    }, [userData, AuthState.isLogin]);

    // const handlePackagesClick = (item: any) => {
    //     item.slug = null
    //     if (item?.slug === null) {
    //         window.location.pathname = `/package-details/${item?.id}`;
    //     } else {
    //         window.location.href = item.slug;
    //     }
    // };

    // const handlePoliciesClick = (item: any) => {
    //     item.slug = null;
    //     if (item?.slug === null) {
    //         window.location.pathname = `/policy-details/${item?.id}`;
    //     } else {
    //         window.location.href = item.slug;
    //     }
    // };

    useEffect(() => {
        if (
            !(
                pathname?.includes('sign-in') ||
                pathname?.includes('reset-password')
            )
        ) {
            dispatch(GetPoliciesListAction());
            dispatch(GetAllPackagesAction());
        }
    }, [dispatch]);

    useEffect(() => {
        if (AuthState.isLogin) {
            localStorage.setItem("username", userProfile);
        }
        // console.log(pathname+"----------------------------------------")
        const queryParams = new URLSearchParams(staticpageflag.search);
        const shouldSignIn = queryParams.get('signin');
        const shouldGetQuote = queryParams.get('getQuote');
        const shouldLogout = queryParams.get('logout');

        if (shouldLogout === 'true') {
            // Dispatch the logout action
            dispatch(LogoutAction());
        }

        if (shouldGetQuote === 'true') {
            // Trigger the custom button logic
            handleOpenCustomQuoteModal();
        }
        if (shouldSignIn === 'true') {
            // // Trigger the sign-in logic
            setShowLoginModal(true);
            sendGAEvent(
                GAActions.SignInClicked,
            );
        }
        setIsHoveredForProducts(false);
        setIsClickedForProducts(false);
        setIsHoveredForResources(false);
        setIsClickedForResources(false);
    }, [pathname, staticpageflag]);

    const BETA_LINK = process.env.REACT_APP_BETA_URL;

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route;
        } else {
            navigate(route);
        }
    };

    return (
        <>
            {/* <header className={openModal ? 'menu-open' : ''}> */}
            <header>
                <Navbar collapseOnSelect expand="sm">
                    <Container>
                        <Link
                            to=""
                            onClick={() => handleNavigate('/user/dashboard')}
                        >
                            <img src={logo} alt="logo" />
                        </Link>
                        <p>&trade;</p>
                        {!(
                            pathname?.includes('sign-in') ||
                            pathname?.includes('reset-password')
                        ) && (
                                <>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse
                                        className="justify-content-end"
                                        id="responsive-navbar-nav"
                                    >
                                        <Nav className="ml-auto">
                                            <NavDropdown
                                                className="mega-menu-wrp"
                                                title="Products"
                                                id="collasible-nav-dropdown"
                                                onMouseEnter={() => !isMobile && setIsHoveredForProducts(true)}
                                                onMouseLeave={() => !isMobile && setIsHoveredForProducts(false)}
                                                onClick={() => {
                                                    if (isMobile) {
                                                        setIsClickedForProducts(!isClickedForProducts);
                                                        setIsClickedForResources(false);
                                                    }
                                                }}
                                                show={!isMobile ? isHoveredForProducts : isClickedForProducts}

                                            >
                                                <div className="mega-menu-box">
                                                    <Container>
                                                        <Row>
                                                            <Col
                                                                lg={6}
                                                                md={6}
                                                                sm={6}
                                                                xs={6}
                                                            >
                                                                <div className="mega-menu-title">
                                                                    Packages
                                                                </div>
                                                                <Row>
                                                                    <div className="mega-menu-list">
                                                                        <Row>
                                                                            {loading ? (
                                                                                <Col lg={12}>
                                                                                    <CustomLoader />
                                                                                </Col>
                                                                            ) : package_list.length !== 0 ? (
                                                                                <>
                                                                                    {package_list
                                                                                        ?.slice(0, showPackageCount)
                                                                                        .map((item: Object | any, i: number) => {
                                                                                            const packageId = String(item?.id);

                                                                                            const slug = slugMapping.packages[packageId as keyof typeof slugMapping.packages] || packageId;

                                                                                            return (
                                                                                                <Col
                                                                                                    lg={6}
                                                                                                    md={6}
                                                                                                    sm={12}
                                                                                                    key={item?.id}
                                                                                                    className="policies-menu-list"
                                                                                                >
                                                                                                    <Link to={`/package-details/${slug}`}>
                                                                                                        {item?.package_name}
                                                                                                    </Link>
                                                                                                </Col>
                                                                                            );
                                                                                        })}
                                                                                    {package_list.length > 7 && showPackageCount === 7 && (
                                                                                        <Col
                                                                                            lg={6}
                                                                                            md={6}
                                                                                            sm={12}
                                                                                            className="policies-menu-list"
                                                                                            onClick={() =>
                                                                                                setShowPackageCount(package_list?.length)
                                                                                            }
                                                                                        >
                                                                                            ALL PACKAGES{' '}
                                                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                                                        </Col>
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <Col lg={12}>
                                                                                    <Link to="/">No Records Found</Link>
                                                                                </Col>
                                                                            )}
                                                                        </Row>
                                                                    </div>
                                                                </Row>

                                                            </Col>
                                                            <Col
                                                                lg={6}
                                                                md={6}
                                                                sm={6}
                                                                xs={6}
                                                            >
                                                                <div className="mega-menu-title">Policies</div>
                                                                <Row>
                                                                    <div className="mega-menu-list">
                                                                        <Row>
                                                                            {/* Static HTML Links */}
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/employee-wellness-plan.html">Employee Wellness Plan</a>
                                                                            </Col>
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/fire-and-burglary-insurance.html">Fire & Other Perils</a>
                                                                            </Col>
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/cash-in-drawer-or-safe-policy.html">Cash in Drawer/Safe Policy</a>
                                                                            </Col>
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/commercial-crime-insurance.html">Commercial Crime Insurance</a>
                                                                            </Col>
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/commercial-general-liability-insurance.html">Commercial General Liability Insurance</a>
                                                                            </Col>
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/cyber-insurance.html">Cyber Risk Insurance</a>
                                                                            </Col>
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/directors-and-officers-liability-insurance.html">Directors and Officers Liability Insurance</a>
                                                                            </Col>
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/employee-dishonesty-or-crime-insurance.html">Employee Dishonesty or Crime Insurance</a>
                                                                            </Col>
                                                                            <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                <a href="/errors-and-omissions-insurance.html">Errors and Omission Insurance</a>
                                                                            </Col>
                                                                            {
                                                                                showPoliciesCount && (<Col lg={6} md={6} sm={6} className='policies-menu-list' onClick={() => setShowPoliciesCount(false)}> ALL POLICIES <i className="fa fa-angle-right" aria-hidden="true"></i> </Col>)
                                                                            }
                                                                            {
                                                                                !showPoliciesCount && (
                                                                                    <>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/keyman-insurance-policy.html">Keyman Insurance</a>
                                                                                        </Col>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/marine-transit-insurance.html">Marine/Transit</a>
                                                                                        </Col>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/personal-accident-cover.html">PA Cover</a>
                                                                                        </Col>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/product-liability-insurance.html">Product Liability</a>
                                                                                        </Col>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/professional-indemnity-insurance.html">Professional Indemnity Insurance</a>
                                                                                        </Col>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/property-insurance.html">Property Insurance</a>
                                                                                        </Col>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/sign-board-cover.html">Sign Board Cover</a>
                                                                                        </Col>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/burglary-and-theft-insurance.html">Theft/Burglary</a>
                                                                                        </Col>
                                                                                        <Col lg={6} md={6} sm={12} className="policies-menu-list">
                                                                                            <a href="/workmen-compensation-policy.html">Workmen Compensation Policy</a>
                                                                                        </Col>
                                                                                    </>
                                                                                )
                                                                            }

                                                                        </Row>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </div>
                                            </NavDropdown>
                                            <div className="header-link">
                                                <Link to="about-us">About Us</Link>
                                            </div>
                                            <div className="header-link">
                                                <Link to="partners">Partners</Link>
                                            </div>
                                            <NavDropdown
                                                className="mega-menu-wrp resources-menu-box"
                                                title="Resources"
                                                id="collasible-nav-dropdown"
                                                onMouseEnter={() => !isMobile && setIsHoveredForResources(true)}
                                                onMouseLeave={() => !isMobile && setIsHoveredForResources(false)}
                                                onClick={() => isMobile && setIsClickedForResources(!isClickedForResources)}
                                                show={!isMobile ? isHoveredForResources : isClickedForResources}
                                            >
                                                <div className="mega-menu-box ">
                                                    <Container>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <Row>
                                                                    <Col lg={12}>
                                                                        <div className="mega-menu-list">
                                                                            {ResourcesMenu.map(
                                                                                (
                                                                                    item,
                                                                                ) => (
                                                                                    <Col
                                                                                        lg={
                                                                                            12
                                                                                        }
                                                                                        className="policies-menu-list"
                                                                                        key={
                                                                                            item?.id
                                                                                        }
                                                                                    >
                                                                                        <Link
                                                                                            to={
                                                                                                item?.path
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                item?.label
                                                                                            }
                                                                                        </Link>
                                                                                    </Col>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                    {/* <Container>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className='mega-menu-title'>Insurance for</div>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <div className='mega-menu-list'>
                                                                        <NavDropdown.Item href="#">Startups <em>(VC Funded)</em></NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Tech Companies <em>(Not VC Funded)</em></NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Law Firms</NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">VC & Private Equity Firms</NavDropdown.Item>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className='mega-menu-list'>
                                                                        <NavDropdown.Item href="#">Cannabis Companies <span>NEW</span></NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Aviation & Aerospace <span>NEW</span></NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Small Businesses</NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">ALL INDUSTRIES  <i className="fa fa-angle-right" aria-hidden="true"></i></NavDropdown.Item>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className='mega-menu-title'>Policies</div>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <div className='mega-menu-list'>
                                                                        <NavDropdown.Item href="#">Business Owners Policy</NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Commercial Crime</NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Cyber incl. Data Breach</NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Directors & Officers</NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Employment Practices Liability</NavDropdown.Item>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className='mega-menu-list'>
                                                                        <NavDropdown.Item href="#">Key Person Insurance <span>NEW</span></NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Professional Liability</NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Tech Errors & Omissions <span>NEW</span></NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">Small Businesses</NavDropdown.Item>
                                                                        <NavDropdown.Item href="#">ALL POLICIES <i className="fa fa-angle-right" aria-hidden="true"></i></NavDropdown.Item>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Container> */}
                                                </div>
                                            </NavDropdown>
                                            <div className="header-link">
                                                <Link to="blog">Blogs</Link>
                                            </div>
                                            <div className="signin-wrp signin-wrp-mobile">
                                                <div className="get-quote-button">
                                                    <CustomButton
                                                        buttonTitle="GET QUOTE"
                                                        navigateTo={`${process.env.REACT_APP_SME_URL}`}
                                                        external={true}
                                                        onClick={
                                                            undefined
                                                            // navigate(
                                                            //     '/quote/insurance-packages',
                                                            // )
                                                        }
                                                    />
                                                </div>
                                                {!AuthState.isLogin ? (
                                                    <Link
                                                        to={''}
                                                        onClick={() =>
                                                            setShowLoginModal(true)
                                                        }
                                                        className="signin-btn"
                                                    >
                                                        Sign In
                                                        {/* not showing on navbar */}
                                                    </Link>
                                                ) : (
                                                    <div className="db-user-dropdown d-flex justify-content-center profile">
                                                        <Dropdown className="profile-user-mobile">
                                                            <Dropdown.Toggle id="dropdown-basic">
                                                                <div className="profile-user-info">
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                userProfile !==
                                                                                    ''
                                                                                    ? userProfile
                                                                                    : profileIcon
                                                                            }
                                                                            alt="user"
                                                                        />
                                                                    </span>
                                                                    <p className="d-block">
                                                                        {
                                                                            userData?.first_name
                                                                        }{' '}
                                                                        {
                                                                            userData?.last_name
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item>
                                                                    <Link to="https://beta-dev.covrzy.com/user/edit-profile">
                                                                        <span>
                                                                            <img
                                                                                src={
                                                                                    EditProfile
                                                                                }
                                                                                alt="edit profile"
                                                                            />
                                                                        </span>{' '}
                                                                        Edit Profile
                                                                    </Link>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <Link to="https://beta-dev.covrzy.com/user/change-password">
                                                                        <span>
                                                                            <img
                                                                                src={
                                                                                    ChangePassword
                                                                                }
                                                                                alt="change password"
                                                                            />
                                                                        </span>{' '}
                                                                        Change
                                                                        Password
                                                                    </Link>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <Link to="https://beta-dev.covrzy.com/user/edit-company-profile">
                                                                        <span>
                                                                            <img
                                                                                src={
                                                                                    EditCompanyProfile
                                                                                }
                                                                                alt="edit company profile"
                                                                            />
                                                                        </span>{' '}
                                                                        Edit Company
                                                                        Profile
                                                                    </Link>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <Link to="https://beta-dev.covrzy.com/user/edit-team-setting">
                                                                        <span>
                                                                            <img
                                                                                src={
                                                                                    EditTeamSettings
                                                                                }
                                                                                alt="edit team setting"
                                                                            />
                                                                        </span>{' '}
                                                                        Edit Team
                                                                        Settings
                                                                    </Link>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <Link
                                                                        to=""
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                LogoutAction(),
                                                                            )
                                                                        }
                                                                    >
                                                                        <span>
                                                                            <img
                                                                                src={
                                                                                    LogoutIcon
                                                                                }
                                                                                alt="logout"
                                                                            />
                                                                        </span>{' '}
                                                                        Logout
                                                                    </Link>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                )}
                                            </div>
                                        </Nav>
                                        <div className="signin-wrp signin-wrp-desktop">
                                            {/* <div className='search-bar'>
                                            <div className="search-icon" id="search" onClick={() => setOpenSearch(!openSearch)}><img src={search} alt='' /></div>
                                            <div className={openSearch ? "search_box active" : "search_box"} id="search_box">
                                                <Form.Control type="text" name="search_criteria" placeholder="Search by keyword" />
                                                <Button><img src={searchWhite} alt='' /></Button>
                                            </div>
                                        </div> */}
                                            {!AuthState.isLogin ? (
                                                <Link
                                                    to={''}
                                                    className="signin-btn"
                                                    onClick={() => {
                                                        setShowLoginModal(true);
                                                        sendGAEvent(
                                                            GAActions.SignInClicked,
                                                        );
                                                    }}
                                                >
                                                    Sign In
                                                    {/* showing on navbar */}
                                                </Link>
                                            ) : (
                                                <div className="db-user-dropdown d-flex justify-content-center profile">
                                                    <Dropdown className="profile-user">
                                                        <Dropdown.Toggle id="dropdown-basic">
                                                            <span>
                                                                <img
                                                                    src={
                                                                        userProfile !==
                                                                            ''
                                                                            ? userProfile
                                                                            : profileIcon
                                                                    }
                                                                    alt="user"
                                                                />
                                                            </span>
                                                            <p>
                                                                {
                                                                    userData?.first_name
                                                                }{' '}
                                                                {
                                                                    userData?.last_name
                                                                }
                                                            </p>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>
                                                                <Link
                                                                    to=""
                                                                    onClick={() =>
                                                                        handleNavigate(
                                                                            '/user/edit-profile',
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                EditProfile
                                                                            }
                                                                            alt="edit profile"
                                                                        />
                                                                    </span>{' '}
                                                                    Edit Profile
                                                                </Link>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>
                                                                <Link
                                                                    to=""
                                                                    onClick={() =>
                                                                        handleNavigate(
                                                                            '/user/change-password',
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                ChangePassword
                                                                            }
                                                                            alt="change password"
                                                                        />
                                                                    </span>{' '}
                                                                    Change Password
                                                                </Link>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>
                                                                <Link
                                                                    to=""
                                                                    onClick={() =>
                                                                        handleNavigate(
                                                                            '/user/edit-company-profile',
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                EditCompanyProfile
                                                                            }
                                                                            alt="edit company profile"
                                                                        />
                                                                    </span>{' '}
                                                                    Edit Company
                                                                    Profile
                                                                </Link>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>
                                                                <Link
                                                                    to=""
                                                                    onClick={() =>
                                                                        handleNavigate(
                                                                            '/user/edit-team-setting',
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                EditTeamSettings
                                                                            }
                                                                            alt="edit team setting"
                                                                        />
                                                                    </span>{' '}
                                                                    Edit Team
                                                                    Settings
                                                                </Link>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>
                                                                <Link
                                                                    to=""
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            LogoutAction(),
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                LogoutIcon
                                                                            }
                                                                            alt="logout"
                                                                        />
                                                                    </span>{' '}
                                                                    Logout
                                                                </Link>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            )}
                                            <CustomButton
                                                className="getButton"
                                                buttonTitle="GET QUOTE"
                                                external={true}
                                                onClick={handleOpenCustomQuoteModal}
                                            /**
                                    * Commenting the following lines till we finalize Get Quote Flow                                                     *
                                    *
                                    * sendGAEvent(
                                    GAActions.GetQuoteClicked,
                                    );
                                    navigate(
                                    '/quote/insurance-packages',
                                    );
                                    *
                                    */
                                            />
                                            {/* without signin it is showing on navbar */}
                                        </div >
                                    </Navbar.Collapse >
                                </>
                            )}
                    </Container >
                </Navbar >
            </header >
            <CustomLoginModal
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
                navigationAllowed={false}
            />
            <CustomQuoteModal
                show={showCustomQuoteModal}
                setShowModal={setShowCustomQuoteModal}
                source="Header"
            />
        </>
    );
};

export default Header;
