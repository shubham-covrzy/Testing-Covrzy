import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';
// import email from '../../assets/images/email.svg';
// import comment from '../../assets/images/comment.svg';
// import calling from '../../assets/images/call-icon.svg';
import camera from '../../assets/images/camera.svg';
import profileIcon from '../../assets/images/profile.svg';
import CustomInput from '../CustomInput';
import { ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import { Link } from 'react-router-dom';
import { ProfileObject } from '../../pages/UserDetail';
import ImageCropPopup from '../ImageCropPopup';
import { ToastAction } from '../../Redux/Actions/ToastAction';
import close from '../../assets/images/CloseWhite.svg';
import { ClearSignUpStateAction } from '../../Redux/Actions/AuthActions';

interface SideBarProps {
    profile: ProfileObject;
    setProfile: Function;
}

const Sidebar = (props: SideBarProps) => {
    const { profile, setProfile } = props;
    const [completeStep, setCompleteStep] = useState<number>(0);
    const [profileUrl, setProfileUrl] = useState<string>('');
    const [croppedProfile, setCroppedProfile] = useState<any>({});
    const [removeProfileStatus, setRemoveProfileStatus] = useState(true);
    const [profileImg, setProfileImg] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const [croppedImage, setCroppedImage] = useState<any>(null);
    const {
        signUp_step,
        personalDetails,
        company_details,
        additional_details,
    } = useSelector((state: IReduxState) => state.Auth);
    const dispatch = useDispatch();

    const isFilledPD =
        personalDetails && Object?.keys(personalDetails)?.length !== 0;
    const isFilledCD =
        company_details && Object?.keys(company_details)?.length !== 0;
    // const isFilledAD =
    //     additional_details && Object?.keys(additional_details)?.length !== 0;
    const isFilledRS = isFilledPD && isFilledCD;

    const signUpSteps = [
        { id: 1, name: 'Personal Details', isFilled: isFilledPD },
        { id: 2, name: 'Company Details', isFilled: isFilledCD },
        // { id: 3, name: 'Additional Details', isFilled: isFilledAD },
        { id: 3, name: 'Review & Submit', isFilled: isFilledRS },
    ];

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

        let url = '';
        if (personalDetails && personalDetails?.profile) {
            url = baseUrl + personalDetails?.profile;
        } else if (profileImg && profileImg?.name) {
            // url = URL?.createObjectURL(profile?.profileImg)
            setShowModal(true);
        }
        setProfileUrl(url);
    }, [profileImg, personalDetails]);

    useEffect(() => {
        if (!showModal) setProfileImg({});
    }, [showModal]);

    useEffect(() => {
        const completedPage = signUpSteps.filter(
            (step) => step.id !== 3 && step.isFilled,
        );
        const percentage = Math.round((completedPage?.length * 100) / 3);
        setCompleteStep(percentage);
    }, [personalDetails, company_details]);

    useEffect(() => {
        async function blobImage() {
            if (croppedImage) {
                const blob = await fetch(croppedImage.getAttribute('src')).then(
                    (res) => res.blob(),
                );
                setCroppedProfile(blob);
                setRemoveProfileStatus(false);
                setProfile({ ...profile, profileImg: blob });
            }
        }
        blobImage();
    }, [croppedImage]);

    const profileChangeHandler = (e: any) => {
        const file = e.target.files[0];
        // image/png, image/jpeg
        if (file?.type === 'image/png' || file?.type === 'image/jpeg')
            setProfileImg(file);
        else
            dispatch(
                ToastAction({
                    show: true,
                    message: 'Only image file is supported',
                    severity: 'danger',
                }),
            );
    };

    const clearProfileHandler = () => {
        if (croppedProfile?.type || profileUrl !== '') {
            // setTimeout(() => {
            setCroppedProfile({});
            setProfile({ ...profile, profileImg: null });
            setProfileUrl(profileIcon);
            setProfileImg({});
            setRemoveProfileStatus(true);
            setCroppedImage(null);
            // }, 500);
        }
    };

    return (
        <>
            <div className="pi-sidebar">
                <ImageCropPopup
                    show={showModal}
                    image={profileImg?.name && URL?.createObjectURL(profileImg)}
                    setCroppedImage={setCroppedImage}
                    setPopupVisible={setShowModal}
                />

                <div className="pi-logo">
                    <Link
                        to="/"
                        onClick={() => dispatch(ClearSignUpStateAction())}
                    >
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="pi-profile">
                    <div className="pi-avtar-pic">
                        <img
                            src={
                                croppedProfile?.type
                                    ? URL?.createObjectURL(croppedProfile)
                                    : profileUrl !== ''
                                    ? profileUrl
                                    : profileIcon
                            }
                            alt="profile"
                        />
                        {signUp_step === 1 && (
                            <div>
                                <div className="pi-file-close">
                                    {!removeProfileStatus && (
                                        <Form.Label htmlFor="input-file">
                                            <img
                                                src={close}
                                                alt="upload profile"
                                                onClick={() =>
                                                    clearProfileHandler()
                                                }
                                            />
                                        </Form.Label>
                                    )}
                                </div>
                                <div className="pi-file-upload">
                                    <CustomInput
                                        type="file"
                                        id="input-file"
                                        name="profile"
                                        onChange={profileChangeHandler}
                                    />
                                    <Form.Label htmlFor="input-file">
                                        <img
                                            src={camera}
                                            alt="upload profile"
                                            onClick={clearProfileHandler}
                                        />
                                    </Form.Label>
                                </div>
                            </div>
                        )}
                    </div>
                    <h3 className="pi-profile-title">
                        {`${
                            personalDetails?.first_name
                                ? personalDetails?.first_name
                                : profile?.firstName || ''
                        }
                         ${
                             personalDetails?.last_name
                                 ? personalDetails?.last_name
                                 : profile?.lastName || ''
                         }`}
                    </h3>
                    {/* <div className='pi-call-btn'>
                        <Nav.Link href="#"><img src={email} /></Nav.Link>
                        <Nav.Link href="#"><img src={comment} /></Nav.Link>
                        <Nav.Link href="#"><img src={calling} /></Nav.Link>
                    </div> */}
                </div>
                <div className="pi-step-progress">
                    <h4>
                        Application <span>{completeStep}%</span> Completed
                    </h4>
                    <ProgressBar
                        now={completeStep}
                        style={{ background: '#ffefee', height: '8px' }}
                        variant="custom"
                    />
                </div>
                <div className="pi-step-list">
                    <ul>
                        {signUpSteps?.map((Obj) => (
                            <li
                                key={Obj?.id}
                                className={
                                    signUp_step === Obj?.id
                                        ? 'step-current'
                                        : Obj?.isFilled
                                        ? 'step-fill'
                                        : ''
                                }
                            >
                                <span></span>
                                <p>{Obj.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
