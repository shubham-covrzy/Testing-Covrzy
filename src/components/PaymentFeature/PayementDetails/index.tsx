import React from 'react';
import Style from './style.module.scss';
//delete

interface DetailsCard {
    heroHeader: string;
    optionalHead: string | any;
    labelContent: string;
    labelContent2: string;
    labelContent3: string;
    labelContentValue: string;
    labelContent2Value: string;
    labelContent3Value: string;
}

function index(props: DetailsCard) {
    return (
        <div className={Style.main}>
            <div className={Style.card}>
                <div className={Style.headline}>
                    <h4>{props.heroHeader}</h4>
                    <p>{props.optionalHead}</p>
                </div>
                <div className={Style.textItems}>
                    <div className={Style.text}>
                        <p>{props.labelContent}</p>
                        <span>{props.labelContentValue}</span>
                    </div>
                    <div className={Style.text}>
                        <p>{props.labelContent2}</p>
                        <span>{props.labelContent2Value}</span>
                    </div>
                    <div className={Style.text}>
                        <p>{props.labelContent3}</p>
                        <span>{props.labelContent3Value}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default index;
