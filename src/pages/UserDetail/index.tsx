import { useState } from 'react';
import { useSelector } from 'react-redux';
// import Footer from "../../common/InfoLayouts/Footer";
import Header from '../../common/InfoLayouts/Header';
import Sidebar from '../../common/InfoLayouts/Sidebar';
import { IReduxState } from '../../utils/types';
import AdditionalDetail from './AdditionalDetail';
import CompanyDetail from './CompanyDetail';
import PersonalDetail from './PersonalDetail';
import Review from './Review';
import CustomButton from '../../common/Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ClearEmailVerifyStateAction } from '../../Redux/Actions/EmailVerifyAction';
import { ClearSignUpStateAction } from '../../Redux/Actions/AuthActions';
import CustomLoginModal from '../../components/CustomLoginModal';

export interface ProfileObject {
    firstName: string;
    lastName: string;
    profileImg: File;
}

const UserDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState<ProfileObject>({
        firstName: '',
        lastName: '',
        profileImg: {} as File,
    });
    const AuthState = useSelector((state: IReduxState) => state.Auth);
    const { signUp_step } = AuthState;

    const signUpStepHandler = () => {
        switch (signUp_step) {
            case 1:
                return (
                    <PersonalDetail profile={profile} setProfile={setProfile} />
                );
            case 2:
                return <CompanyDetail />;
            // case 3:
            //     return <AdditionalDetail />;
            case 3:
                return <Review />;
            default:
                return (
                    <PersonalDetail profile={profile} setProfile={setProfile} />
                );
        }
    };


    const [showLoginModal, setShowLoginModal] = useState(false)

    return (
        <>
            <Header
                customComponent={
                    <CustomButton
                        buttonTitle="LOGIN"
                        onClick={() => {
                            dispatch(ClearSignUpStateAction());
                            dispatch(ClearEmailVerifyStateAction());
                            setShowLoginModal(true)
                        }}
                    />
                }
            />
            <Sidebar profile={profile} setProfile={setProfile} />
            <div className="pi-content-wrp">{signUpStepHandler()}</div>
            {/* <Footer /> */}
            <CustomLoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} navigationAllowed={false} />
        </>
    );
};

export default UserDetail;
