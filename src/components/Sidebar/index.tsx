import React, { useState, useEffect } from 'react';
import Ankit from '../../assets/images/ankit.jpeg';
import CallIcon from '../../assets/images/call-icon.svg';
import arrowIcon from '../../assets/images/curved-arrow-w.svg';
import EstimateSummaryCard from '../EstimateSummary';
import Style from './style.module.scss';
import CallbackModal from '../RequestCallbackl';
import { IReduxState } from '../../utils/types';
import { useSelector } from 'react-redux';

interface SidebarProps {
    sidebarHeader: string;
    sideBarDesc: string;
    bannerImg: string;
    showEstimate: boolean;
}

function Sidebar(props: SidebarProps) {
    const [open, setOpen] = useState<boolean>(false);
    const { callback_success } = useSelector(
        (state: IReduxState) => state.Support,
    );

    const handleModalOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (callback_success) {
            setOpen(false);
        }
    }, [callback_success]);
    return (
        <>
            <div className={Style.main}>
                {props.showEstimate ? (
                    <EstimateSummaryCard />
                ) : (
                    <div className={Style.container}>
                        <h5>{props.sidebarHeader}</h5>
                        <p>{props.sideBarDesc}</p>
                        <div className={Style.card}>
                            <img src={Ankit} alt="ankit-img" />
                            <div className={Style.content}>
                                <h4>Hey There ,</h4>
                                <p>
                                    " Still confused? Arrange a call with our
                                    insurance specialist to explore which
                                    products could be beneficial for your
                                    needs."
                                </p>
                            </div>
                        </div>
                        <div className={Style.button}>
                            <button onClick={handleModalOpen}>
                                Request a call back{' '}
                                <img src={CallIcon} alt="" />
                            </button>
                            <img src={arrowIcon} alt="arrow" />
                        </div>
                    </div>
                )}
                {!props.showEstimate && (
                    <div>
                        <img src={props.bannerImg} alt="sidebar" />
                    </div>
                )}
            </div>
            {open && (
                <CallbackModal open={true} onClose={() => setOpen(false)} />
            )}
        </>
    );
}

export default Sidebar;
