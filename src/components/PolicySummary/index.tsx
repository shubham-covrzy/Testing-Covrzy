import React, { useState } from 'react';
import style from './style.module.scss';
interface PolicySummaryProps {
    icon: string;
    coverSI: string;
    title: string;
    desc: string;
    endDate: any;
    startDate: any;
}

function PolicySummaryCard(props: PolicySummaryProps) {
    const [showMore, setShowMore] = useState(false);

    const handleToggleReadMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className={`${style.main} ${style.policyCard}`}>
            <div className="d-flex flex-column gap-3">
                <div className={style.header}>
                    <img src={props.icon} alt="" />
                    <div className={style.cover}>
                        <span>Sum Insured</span>
                        <div>{props.coverSI}</div>
                    </div>
                </div>
                <h5>{props.title}</h5>
            </div>
            <div className={style.body}>
                <div>
                    {showMore ? (
                        <p>{props.desc}</p>
                    ) : (
                        `${props.desc.slice(0, 150)} `
                    )}
                    {props.desc.length > 3 && (
                        <span
                            onClick={handleToggleReadMore}
                            style={{
                                cursor: 'pointer',
                                color: '#774ad9',
                            }}
                        >
                            {showMore ? 'Read Less' : '...'}
                        </span>
                    )}
                </div>
                <div className={style.footer}>
                    <div className={style.date}>
                        <div>Start Date : </div>
                        <span>{props.startDate}</span>
                    </div>
                    <div className={style.verticalLine}></div>
                    <div className={style.date}>
                        <div>End Date : </div>
                        <span>{props.endDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicySummaryCard;
