import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IReduxState } from '../../utils/types';
import Header from './Header';
import InsurancePackages from '../../pages/InsurancePackages';
import useMSG90OTPWidget from './MSG90widgetfunction';
import { LogoutAction } from '../../Redux/Actions/AuthActions';
import Cookies from 'js-cookie';

interface IQuoteLayout {
    component: JSX.Element;
}

function QuoteLayout({ component }: IQuoteLayout): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { handleSubmit } = useMSG90OTPWidget();
    const { isLogin } = useSelector((state: IReduxState) => state.Auth);

    const userToken = Cookies.get('userToken')

    const { payment_success } = useSelector(
        (state: IReduxState) => state.Payment,
    );

    useEffect(() => {
        if (payment_success) {
            navigate('/quote/payment-success');
        } else {
            // handleSubmit();
        }
    }, [isLogin, dispatch, payment_success, navigate]);

    return (
        <Fragment>
            {userToken ? (
                <div className="no-sidebar">
                    <Header />
                    <div className="db-dashboard-wrp db-quote-header">
                        {component}
                    </div>
                </div>
            ) : (
                <div className="no-sidebar">
                    <Header />
                    <div className="db-dashboard-wrp db-quote-header">
                        <InsurancePackages />
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default QuoteLayout;
