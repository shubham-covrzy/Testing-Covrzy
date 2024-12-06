import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { VerifyPhoneLogin } from '../../Redux/Actions/AuthActions';

const useMSG90OTPWidget = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const AuthState = useSelector((state: IReduxState) => state.Auth);

    const handleSubmit = (isNavigationAllowed: boolean = true) => {
        const configuration = {
            widgetId: '3367646b4542343631393537',
            tokenAuth: '387426TcL9CYdl63c7862bP1',
            success: (data: any) => {
                dispatch(
                    VerifyPhoneLogin({
                        token: data.message,
                        navigate,
                        shouldNavigate: isNavigationAllowed,
                    }),
                );
            },
            failure: (error: any) => {
                console.log('failure reason', error);
            },
        };
        if (!AuthState.isLogin) {
            (window as any).initSendOTP(configuration);
        }
    };

    return { handleSubmit };
};

export default useMSG90OTPWidget;
