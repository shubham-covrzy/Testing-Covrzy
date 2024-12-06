import React from 'react';
import Style from './style.module.scss';

interface InsurerLogoComponentProps {
    image: string | any;
}

function InsurerLogoComponent(props: InsurerLogoComponentProps) {
    return (
        <div className={Style.main}>
            <div className={Style.header}>
                <h4>Your quotation is secured by our insurance partner.</h4>
                {/* <p>Read Our Policy</p> */}
            </div>
            <div className={Style.logo}>
                <img src={props.image} alt="Insurer Logo" />
            </div>
        </div>
    );
}

export default InsurerLogoComponent;
