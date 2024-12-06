import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { IReduxState } from '../../utils/types';

interface IAuthLayout {
    component: JSX.Element;
}

function AuthLayout({ component }: IAuthLayout): JSX.Element {
    const { isLogin } = useSelector((state: IReduxState) => state.Auth);

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
        <Fragment>
            {isLogin ? <>{handleNavigate('/user/dashboard')}</> : <>{component}</>}
        </Fragment>
    );
}

export default AuthLayout;
