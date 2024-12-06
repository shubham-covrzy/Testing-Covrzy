import React from 'react';
import Coverzy from '../../assets/images/Coverzy.svg';
import CoverzyIcon from '../../assets/images/Covrzy_Icon.svg';
import Home from '../../assets/images/Home.svg';
import Policies from '../../assets/images/Policies.svg';
import Payments from '../../assets/images/Payments.svg';
import Claims from '../../assets/images/Claims.svg';
import Support from '../../assets/images/Support.svg';
// import Bar from '../../assets/images/Bar.svg';
// import CloseBlue from '../../assets/images/CloseBlue.svg';
import CloseWhite from '../../assets/images/CloseWhite.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

interface ISideBar {
    setToggle: Function;
}

const Sidebar = ({ setToggle }: ISideBar) => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    const sidebarList = [
        {
            id: 1,
            label: 'Home',
            path: '/user/dashboard',
            icon: Home,
            active: pathname.includes('/user/dashboard'),
        },
        {
            id: 2,
            label: 'Policies',
            path: '/user/policies/purchase',
            icon: Policies,
            active: pathname.includes('/user/policies/'),
        },
        {
            id: 3,
            label: 'Payments',
            path: '/user/payment',
            icon: Payments,
            active: pathname.includes('/user/payment'),
        },
        {
            id: 4,
            label: 'Claims',
            path: '/user/claims',
            icon: Claims,
            active: pathname.includes('/user/claims'),
        },
        {
            id: 4,
            label: 'Support',
            path: '/user/support/concern',
            icon: Support,
            active: pathname.includes('/user/support'),
            sub_item: [
                {
                    id: 1,
                    label: 'Raise Concern',
                    path: '/user/support/concern',
                    active: pathname.includes('/user/support/concern'),
                },
                {
                    id: 2,
                    label: 'View Ticket',
                    path: '/user/support/tickets',
                    active: pathname.includes('/user/support/tickets'),
                },
            ],
        },
    ];

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
        <>
            <div className="db-sidebar">
                <div className="db-main-wrp">
                    <div className="db-top-wrp">
                        <div className="db-logo">
                            <Link to="" onClick={() => handleNavigate("/user/dashboard")}>
                                <img src={CoverzyIcon} alt="logo" />
                                <span className="db-logo-menu-text">
                                    <img src={Coverzy} alt="logo-name" />
                                </span>
                            </Link>
                        </div>
                        <ul className="db-menu-list">
                            {sidebarList?.map((obj, index) => (
                                <React.Fragment key={obj?.id}>
                                    <li
                                        key={obj?.id}
                                        // className={(obj?.active ?
                                        //     obj?.active :
                                        //     pathname.includes(obj?.path)) ?
                                        //     'active' :
                                        //     ''}
                                        className={obj?.active ? 'active' : ''}
                                    >
                                        <Link
                                            to=""
                                            onClick={() => {
                                                handleNavigate(obj?.path)
                                                obj?.sub_item && setOpen(!open)
                                            }
                                            }
                                        >
                                            <span>
                                                <img
                                                    src={obj?.icon}
                                                    alt={obj?.label}
                                                />
                                            </span>
                                            <p className="db-menu-text">
                                                {obj?.label}
                                            </p>
                                            {obj?.sub_item && (
                                                <span className="sub-menu-arrow">
                                                    {open ? (
                                                        <CaretUpFill />
                                                    ) : (
                                                        <CaretDownFill />
                                                    )}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                    {obj?.sub_item && (
                                        <Collapse in={open}>
                                            <div id="example-collapse-text">
                                                <ul>
                                                    {obj?.sub_item.map(
                                                        (sub, index) => (
                                                            <li
                                                                key={index}
                                                                style={{
                                                                    marginBottom:
                                                                        '0px',
                                                                    marginLeft:
                                                                        '25px',
                                                                }}
                                                                className={
                                                                    sub?.active
                                                                        ? 'active'
                                                                        : ''
                                                                }
                                                            >
                                                                <Link
                                                                    to={
                                                                        sub?.path
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                ''
                                                                            }
                                                                            alt={
                                                                                ''
                                                                            }
                                                                        />
                                                                    </span>
                                                                    <p className="db-menu-text">
                                                                        {
                                                                            sub?.label
                                                                        }
                                                                    </p>
                                                                </Link>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </Collapse>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                    <div className="db-bottom-wrp">
                        <div className="db-line-shape">
                            <span
                                onClick={() =>
                                    setToggle((prev: boolean) => !prev)
                                }
                            >
                                <img
                                    src={CloseWhite}
                                    className="db-large-menu"
                                    alt="close-button"
                                />
                                {/* <img src={Bar} className='db-mini-menu' alt='bar' /> */}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
