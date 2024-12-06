import React, { useState } from 'react';
import axios from 'axios';
import styles from './style.module.scss';
// import { notify } from '../common/Toast';
import { useDispatch } from 'react-redux';
import { TOAST_SHOW } from '../../Redux/Actions/ToastAction';
import Cookies from 'js-cookie';

interface LoginPageProps {
    onLogin: () => void;
}

const AdminLogin: React.FC<LoginPageProps> = ({ onLogin }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}user/login`,
                {
                    email,
                    password,
                },
            );

            const { data } = response;

            if (data.data.is_admin === true) {
                let result = {
                    adminAuth: data.data.token,
                    expireTime: Date.now() + 24 * 60 * 60 * 1000, // T + 1 Day
                };
                localStorage.setItem('EmployeeToken', JSON.stringify(result));
                Cookies.remove('userToken', { path: '', domain: '.covrzy.com' })
                dispatch({
                    type: TOAST_SHOW,
                    payload: {
                        message: 'Logged In!',
                        severity: 'success',
                        show: true,
                    },
                });
                onLogin();
            } else {
                dispatch({
                    type: TOAST_SHOW,
                    payload: {
                        message: 'UnAuthorized!',
                        severity: 'danger',
                        show: true,
                    },
                });
            }
        } catch (error) {
            console.error('Login failed', error);
            dispatch({
                type: TOAST_SHOW,
                payload: {
                    message: 'Incorrect credentials!',
                    severity: 'danger',
                    show: true,
                },
            });
        }
    };

    return (
        <div className={styles.app}>
            <form className={styles.login_form} onSubmit={handleSubmit}>
                <h1>Employee Login</h1>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
