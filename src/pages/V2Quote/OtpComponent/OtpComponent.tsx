import React from 'react';
import timerIcon from '../../../assets/images/timer-icon.svg';

function OtpComponent() {
    return (
        <section>
            <div className="otp-widget">
                <h6>Let’s make sure it’s you</h6>
                <div className="otp-input-items">
                    <label>Enter OTP*</label>
                    <div className="otp-input-container">
                        <div className="otp-inputs">
                            <input id="1" />
                            <input id="2" />
                            <input id="3" />
                            <input id="4" />
                            <input id="5" />
                            <input id="6" />
                        </div>
                        <h4>Verify By Email</h4>
                    </div>
                </div>
                <div className="otp-timer">
                    <img src={timerIcon} alt="" />
                    <div>20 seconds left </div>
                </div>
            </div>
        </section>
    );
}

export default OtpComponent;
