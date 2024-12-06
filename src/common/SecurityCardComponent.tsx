import React from 'react';
import SecurityCard from '../components/SecurityCard';
import checkMark from '../assets/images/Checkmark-O-bg.svg';

function SecurityCardComponent() {
    return (
        <div className="security-card-container">
            <h4>Your Data Security Matters</h4>
            <SecurityCard
                image={checkMark}
                description="Your personal and payment information is safeguarded with 
     state-of-the-art encryption technology."
            />
            <SecurityCard
                image={checkMark}
                description="We strictly comply with all data protection regulations."
            />
            <SecurityCard
                image={checkMark}
                description="Rest assured, your data is kept safe and secure."
            />
        </div>
    );
}

export default SecurityCardComponent;
