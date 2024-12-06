import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { clarity } from 'clarity-js';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../common/Layouts/Header';
import Footer from '../common/Layouts/Footer';
import Main from './Main';
import CustomToast from '../common/CustomToast';
import { IReduxState } from '../utils/types';
import { DecryptData } from '../common/CryptoJSToken';
import { initializeGAUser } from '../utils/googleAnalytics';

import AdminLogin from './AdminLogin/AdminLogin';
import { GetUserAuthData, LogoutAction } from '../Redux/Actions/AuthActions';
// import useMSG90OTPWidget from '../common/QuoteLayout/MSG90widgetfunction';
import ErrorHandlerModal from './ErrorHandlerModal';
import Cookies from 'js-cookie';
import { SaveUserStateAction } from '../Redux/Actions/SessionAction';
import { useBotPenguin } from '../Helper/commonFunction';

function App() {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    // const { handleSubmit } = useMSG90OTPWidget();
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const ToastState = useSelector((state: IReduxState) => state.Toast);
    const AuthState = useSelector((state: IReduxState) => state.Auth);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const { loadBotPenguin } = useBotPenguin('6480277ee6a5d0074120b7b2,6440f7238610d0363b7b3e7d', 'messenger-widget-b');

    useEffect(() => {
        // console.log('reached load bot penguin');
        // window.onload = () => {
        setTimeout(() => {
            loadBotPenguin();
        }, 5000);
        // };
    }, [])

    useEffect(() => {
        try {
            if (!AuthState || typeof AuthState.user !== 'string') return;

            const user = DecryptData(AuthState.user);

            if (process.env.REACT_APP_CLARITY_ID) {
                clarity.consent();
                if (user?.id) clarity.set('userId', user.id?.toString());
                clarity.start({
                    projectId: process.env.REACT_APP_CLARITY_ID,
                    upload: 'https://z.clarity.ms/collect',
                    track: true,
                    content: true,
                    cookies: ['userId'],
                });
            }
            if (!user) return;

            initializeGAUser({
                userId: user.id,
            });

            if (process.env.REACT_APP_CLARITY_ID) {
                clarity.set('userId', user.id?.toString());
            }
        } catch (err) {
            console.log(err);
        } finally {
            return () => {
                if (process.env.REACT_APP_CLARITY_ID) {
                    clarity.stop();
                }
            };
        }
    }, [AuthState, AuthState?.user]);

    useLayoutEffect(() => {
        const userToken = Cookies.get('userToken')
        if (!userToken && AuthState.isLogin) {
            dispatch(LogoutAction())
            localStorage.clear()
        }
        if (!AuthState.isLogin && userToken && !AuthState.loading) {
            dispatch(SaveUserStateAction())
            dispatch(GetUserAuthData())
        }
    }, [AuthState]);

    return (
        <Fragment>
            <HelmetProvider>
                <div>
                    {isLoggedIn ? (
                        <div className="App">
                            {!(
                                pathname?.includes('/user/') ||
                                pathname?.includes('/quote/') ||
                                pathname?.includes('/company/') ||
                                window.location.host ===
                                process.env.REACT_APP_PARTNER_DOMAIN
                            ) ? (
                                <>
                                    <Header />
                                    <Main />
                                    {!(
                                        pathname?.includes('sign-in') ||
                                        pathname?.includes('reset-password')
                                    ) && <Footer />}
                                </>
                            ) : (
                                <Main />
                            )}
                        </div>
                    ) : (
                        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
                    )}
                </div>

                <CustomToast
                    show={ToastState.show}
                    message={ToastState.message}
                    severity={ToastState.severity}
                />
                <ErrorHandlerModal />
            </HelmetProvider>
        </Fragment>
    );
}

export default App;
