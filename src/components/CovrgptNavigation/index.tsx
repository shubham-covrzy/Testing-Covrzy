import Shrug from '../../assets/images/Shrug-bro.svg';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import { DecryptData } from '../../common/CryptoJSToken';

const CovrGPTNavigation = () => {
    const { user } = useSelector((state: IReduxState) => state.Auth);
    const { policy } = useSelector((state: IReduxState) => state.Purchases);
    const navigatetoCovrGPT = () => {
        const User = DecryptData(user);
        const policyDetails = {
            phone: User.phone_number,
            createdAt: JSON.stringify(new Date()),
            name: User.first_name + ' ' + User.last_name,
            email: User.email,
            policyPDF: policy.policyFileName,
        };
        localStorage.setItem('policyDetails', JSON.stringify(policyDetails));
        window.open(window.origin + '/covrgpt');
    };
    return (
        <div className={styles.main}>
            <img src={Shrug} alt="Confused" />
            <div className={styles.text}>
                <p>Not able to understand the Policy</p>
                <p>
                    Ask{' '}
                    <span onClick={navigatetoCovrGPT} className={styles.link}>
                        CovrGPT
                    </span>
                </p>
            </div>
        </div>
    );
};

export default CovrGPTNavigation;
