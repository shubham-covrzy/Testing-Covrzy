import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import EditProfile from '../../assets/images/EditProfile.svg';
import ChangePassword from '../../assets/images/ChangePassword.svg';
import EditCompanyProfile from '../../assets/images/EditCompanyProfile.svg';
import EditTeamSettings from '../../assets/images/EditTeamSettings.svg';
import profileIcon from '../../assets/images/profile.svg';
import LogoutIcon from '../../assets/images/logout.png';
import Logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import { LogoutAction } from '../../Redux/Actions/AuthActions';
import { DecryptData } from '../CryptoJSToken';
import CustomButton from '../Buttons/CustomButton';
import CustomLoginModal from '../../components/CustomLoginModal';
// import useMSG90OTPWidget from './MSG90widgetfunction';

const QuoteHeader = () => {

    const [userProfile, setUserProfile] = useState<string>('');
    const dispatch = useDispatch();
    // const { handleSubmit } = useMSG90OTPWidget();

    const [showLoginModal, setShowLoginModal] = useState(false);

    const AuthState = useSelector((state: IReduxState) => state.Auth);
    const userDetails = useSelector((state: IReduxState) => state.UserProfile);

    const userData = userDetails.userProfile || DecryptData(AuthState.user);

    let user: any;

    try {
        if (AuthState && typeof AuthState.user === 'string')
            user = AuthState?.user;
    } catch (e: any) {
        console.log('error', e.message);
    }

    useEffect(() => {
        if (user?.profile) {
            const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
            const url = baseUrl + user?.profile;
            setUserProfile(url);
        } else setUserProfile('');
    }, [user, AuthState.isLogin]);

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
        <div className="db-header">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '12px',
                }}
            >
                <Link to="/">
                    <img src={Logo} alt="logo" />
                </Link>
                {/* <img src={BlueClose} alt="vs" />
        <a
          href="https://www.oneassure.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={OneAssureLogo} alt="partner logo" />
        </a> */}
                <p>&trade;</p>
            </div>
            {AuthState.isLogin ? (
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
                                {userData.first_name} {userData.last_name}
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
                                    </span>
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
                                    </span>
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
                                    </span>
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
                                    </span>
                                    Edit Team Settings
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link
                                    to="/"
                                    onClick={() => dispatch(LogoutAction())}
                                >
                                    <span>
                                        <img src={LogoutIcon} alt="logout" />
                                    </span>
                                    Logout
                                </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ) : (
                <CustomButton
                    buttonTitle="Login"
                    onClick={() => {
                        // const isNavigationAllowed = false;
                        // handleSubmit(isNavigationAllowed);
                        setShowLoginModal(true);
                    }}
                />
            )}
            <CustomLoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} navigationAllowed={false} />
        </div>
    );
};

export default QuoteHeader;
