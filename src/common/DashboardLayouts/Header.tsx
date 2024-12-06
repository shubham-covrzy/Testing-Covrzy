import { Dropdown } from 'react-bootstrap';
// import userIcon from '../../assets/images/user.png';
import EditProfile from '../../assets/images/EditProfile.svg';
import ChangePassword from '../../assets/images/ChangePassword.svg';
import EditCompanyProfile from '../../assets/images/EditCompanyProfile.svg';
import EditTeamSettings from '../../assets/images/EditTeamSettings.svg';
import profileIcon from '../../assets/images/profile.svg';
import LogoutIcon from '../../assets/images/logout.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import { LogoutAction } from '../../Redux/Actions/AuthActions';
import { useEffect, useState } from 'react';
import { DecryptData } from '../CryptoJSToken';
import closeBtn from '../../assets/images/Vector.svg';
import Cookies from 'js-cookie';

const Header = () => {
    const [userProfile, setUserProfile] = useState<string>('');
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const AuthState = useSelector((state: IReduxState) => state.Auth);
    const { title } = useSelector((state: IReduxState) => state.HeaderTitle);
    const user = DecryptData(AuthState?.user);

    useEffect(() => {
        if (user?.profile) {
            const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
            const url = baseUrl + user?.profile;
            setUserProfile(url);
        } else setUserProfile('');
    }, [user]);

    const BETA_LINK = process.env.REACT_APP_BETA_URL


    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }

    return (
        <>
            <div className="db-header">
                <div className="db-page-title d-flex gap-2">
                    {pathname.includes('/user/dashboard/complate-payment/') && (
                        <>
                            <img
                                src={closeBtn}
                                alt="close"
                                onClick={() => handleNavigate('/user/dashboard')}
                            />
                            <h3>{title}</h3>
                        </>
                    )}
                </div>

                <div className="db-user-dropdown d-flex justify-content-center">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <span>
                                <img
                                    src={
                                        userProfile !== ''
                                            ? userProfile
                                            : profileIcon
                                    }
                                    alt="user"
                                />
                            </span>
                            <p>
                                {user?.first_name} {user?.last_name}
                            </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to="" onClick={() => handleNavigate("/user/edit-profile")}>
                                    <span>
                                        <img
                                            src={EditProfile}
                                            alt="edit profile"
                                        />
                                    </span>{' '}
                                    Edit Profile
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="" onClick={() => handleNavigate("/user/change-password")}>
                                    <span>
                                        <img
                                            src={ChangePassword}
                                            alt="change password"
                                        />
                                    </span>{' '}
                                    Change Password
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="" onClick={() => handleNavigate("/user/edit-company-profile")}>
                                    <span>
                                        <img
                                            src={EditCompanyProfile}
                                            alt="edit company profile"
                                        />
                                    </span>{' '}
                                    Edit Company Profile
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="" onClick={() => handleNavigate("/user/edit-team-setting")}>
                                    <span>
                                        <img
                                            src={EditTeamSettings}
                                            alt="edit team setting"
                                        />
                                    </span>{' '}
                                    Edit Team Settings
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link
                                    to=""
                                    onClick={() => {
                                        Cookies.remove('userToken',{ path: '', domain: '.covrzy.com'})
                                        Cookies.remove('userToken', { domain: '.covrzy.com' })
                                        dispatch(LogoutAction())
                                    }}
                                >
                                    <span>
                                        <img src={LogoutIcon} alt="logout" />
                                    </span>{' '}
                                    Logout
                                </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default Header;
