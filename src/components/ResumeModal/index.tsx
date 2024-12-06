import React from 'react';
import { Modal } from 'react-bootstrap';
import icon from '../../assets/images/again-start.svg';
import CustomButton from '../../common/Buttons/CustomButton';
import OrangeButton from '../../common/Buttons/OrangeButton';
import style from './style.module.scss';

interface ResumeModalComponentProps {
    open?: boolean;
    onClose: () => void;
    resumeOnclick: () => void;
}

function ResumeModalComponent(props: ResumeModalComponentProps) {
    return (
        <Modal show={props.open} onHide={props.onClose}>
            <div className={style.main}>
                <div className={style.imageContainer}>
                    <img src={icon} alt="Icon" />
                </div>
                <div className={style.content}>
                    <h4>Hi, Glad to see you back!</h4>
                    <p>
                        Your data is saved and you can either{' '}
                        <span style={{ color: '#fd7350' }}>resume</span> from
                        the previous section , or you can{' '}
                        <span style={{ color: '#7743DC' }}> start over </span>
                        the new application.
                    </p>
                    <div className={style.button}>
                        <CustomButton
                            buttonTitle="Resume"
                            onClick={props.resumeOnclick}
                        />
                        <OrangeButton
                            buttonName="Start Over"
                            onClick={props.onClose}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ResumeModalComponent;
