import React from 'react';
import Style from './style.module.scss';

interface SecurityCardProps {
    image: any;
    description: string;
}

function SecurityCard(props: SecurityCardProps) {
    return (
        <div className={Style.main}>
            <img src={props.image} alt="" />
            <div>{props.description}</div>
        </div>
    );
}

export default SecurityCard;
