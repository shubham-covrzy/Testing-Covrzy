import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { IReduxState } from '../../utils/types';
// import Footer from "./Footer";
import Header from './Header';
import Sidebar from './Sidebar';
import Cookies from 'js-cookie';

interface IDashboardLayout {
    component: JSX.Element;
}

function DashboardLayout({ component }: IDashboardLayout): JSX.Element {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();
    const { isLogin } = useSelector((state: IReduxState) => state.Auth);
    const userToken = Cookies.get('userToken')


    const paymentPage = location?.pathname?.includes(
        '/user/dashboard/complate-payment/',
    );

    return (
        <Fragment>
            {userToken ? (
                <div
                    className={
                        paymentPage
                            ? 'no-sidebar'
                            : toggle
                                ? 'db-collapse'
                                : 'full-sidebar'
                    }
                >
                    <Header />
                    {!paymentPage && <Sidebar setToggle={setToggle} />}
                    <div className="db-dashboard-wrp">{component}</div>
                    {/* <Footer /> */}
                </div>
            ) : (
                <Navigate to={'/'} />
            )}
        </Fragment>
    );
}

export default DashboardLayout;
