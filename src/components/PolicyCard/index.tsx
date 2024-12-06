import React, { useState, useEffect } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import vector from '../../assets/images/checkfill-o-whitebg.svg';
import DropDown from '../../assets/images/drop-down.svg';
import dropDownClose from '../../assets/images/drop-down-close.svg';
import checkmark from '../../assets/images/Checkmark-O-bg.svg';
import plus from '../../assets/images/plus-icon.svg';
import tickMark from '../../assets/images/tick-mark.svg';
import vectorPurple from '../../assets/images/check-mark-whiteBg.svg';
import dropDownP from '../../assets/images/drop-down(P).svg';
import closeIconPurple from '../../assets/images/close-icon-p.svg';
import CheckFill from '../../assets/images/CheckFill-PurpleBg.svg';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import { NumberFormat } from '../../common/NumberFormat';
import { coverSummary } from '../../utils/StaticDatas';
import { formatAmount } from '../../common/FormatAmount/index';
import UpwardArrowPurple from '../../assets/images/UpwardArrowPurple.svg';
import UpwardArrow from '../../assets/images/UpwardArrow.svg';

interface PolicyCardComponentProps {
    toggleCoverage: (id: number) => void;
    isSelected: boolean;
    data: any;
    recommended: boolean;
    showCoverSI: boolean;
    UI: boolean;
    height: string;
    setCoverSI: any;
    coverSI: any;
}

function PolicyCardComponent(props: PolicyCardComponentProps) {
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [selectedValue, setSelectedValue] = useState<number>(
        formatAmount(props.data.coverSI),
    );

    const { sendGAEvent } = useGAEvent(GACategories.InsurancePackagesPage);

    const handleAddCoverageClick = () => {
        props.toggleCoverage(props.data);
    };

    useEffect(() => {}, [props.isSelected]);

    const handleToggleReadMore = () => {
        setShowMore(!showMore);
    };

    const matchingCoverSI = (coverName: string) => {
        const findObj = coverSummary.find((element: any) => {
            return element.coverName === coverName;
        });
        return findObj;
    };

    const handleSelect = (eventKeyIndex: any) => {
        props.setCoverSI((cover: any) => {
            const newCoverSI = new Map(cover);
            newCoverSI.set(props.data.name, +eventKeyIndex);
            return newCoverSI;
        });
        setSelectedValue(formatAmount(+eventKeyIndex));
    };

    if (!props.data) return <></>;
    return (
        <div className={style.main} style={{ minHeight: props.height }}>
            <div className={style.header}>
                <div className={style.headerContent}>
                    <div
                        className={
                            props.UI
                                ? `${style.titleUI} ${
                                      props.recommended
                                          ? style.titleUIRecommended
                                          : ''
                                  } ${style.dynamicTitle}`
                                : `${style.title} ${style.dynamicTitle}`
                        }
                    >
                        {props.isSelected ? (
                            <img src={props.data.selectedIcon} alt="" />
                        ) : (
                            <img src={props.data.icon} alt="" />
                        )}
                        {!props.UI && (
                            <h3 className={props.UI ? style.policyName : ''}>
                                {props.data.name}
                            </h3>
                        )}
                    </div>
                    {props.recommended && (
                        <div className={style.recommendCard}>RECOMMENDED</div>
                    )}
                </div>
                {props.UI && (
                    <div>
                        <h3 className={style.policyName}>{props.data.name}</h3>
                    </div>
                )}
                <div className={style.description}>
                    <p>
                        {showMore ? (
                            <>
                                {props.data.desc}
                                <Link
                                    className={`${style.link} ${
                                        props.isSelected
                                            ? style.selectedLink
                                            : ''
                                    }`}
                                    to={props.data.redirect}
                                    onClick={() =>
                                        sendGAEvent(GAActions.LearnMoreClicked)
                                    }
                                    target="_blank"
                                >
                                    Learn More
                                </Link>
                            </>
                        ) : (
                            `${props.data.desc.slice(0, 150)} `
                        )}
                        {props.data.desc.length > 3 && (
                            <span
                                className={style.readMoreLink}
                                onClick={handleToggleReadMore}
                            >
                                {showMore ? (
                                    props.isSelected ? (
                                        <img src={UpwardArrow} />
                                    ) : (
                                        <img src={UpwardArrowPurple} />
                                    )
                                ) : (
                                    '...'
                                )}
                            </span>
                        )}
                    </p>
                </div>
                {props.showCoverSI && (
                    <div className={style.coverSI}>
                        <Form.Label
                            className={`${style.label} ${
                                props.isSelected ? style.orangeLabel : ''
                            }`}
                        >
                            Cover SI :
                        </Form.Label>
                        <DropdownButton
                            title={selectedValue}
                            onSelect={handleSelect}
                            variant="#ffff"
                        >
                            {matchingCoverSI(props.data.name)?.coverSI.map(
                                (el: number, index: number) => {
                                    return (
                                        <Dropdown.Item
                                            eventKey={el}
                                            active={selectedValue === el}
                                            key={index}
                                        >
                                            {formatAmount(el)}
                                        </Dropdown.Item>
                                    );
                                },
                            )}
                        </DropdownButton>
                    </div>
                )}
            </div>
            <div className={style.body}>
                <div className={style.devider}>
                    <div
                        className={style.subHead}
                        aria-controls="collapse-text-covered"
                        aria-expanded={open}
                        onClick={() => {
                            setOpen(!open);
                            setIsOpen(false);
                        }}
                    >
                        <div className={style.coveredSec}>
                            {props.isSelected ? (
                                <img src={vector} alt="" />
                            ) : (
                                <img src={vectorPurple} alt="" />
                            )}

                            <div>What's Covered ?</div>
                        </div>
                        {props.isSelected ? (
                            <img
                                src={DropDown}
                                alt="close"
                                aria-controls="collapse-text-covered"
                                aria-expanded={open}
                                className={`${style.closeImage} ${
                                    open ? style.rotated : ''
                                }`}
                                onClick={() => {
                                    setOpen(!open);
                                    setIsOpen(false);
                                }}
                            />
                        ) : (
                            <img
                                src={dropDownP}
                                alt="close"
                                aria-controls="collapse-text-covered"
                                aria-expanded={open}
                                className={`${style.closeImage} ${
                                    open ? style.rotated : ''
                                }`}
                                onClick={() => {
                                    setOpen(!open);
                                    setIsOpen(false);
                                }}
                            />
                        )}
                    </div>

                    <Collapse in={open}>
                        <div
                            id="collapse-text-covered"
                            className={style.collapse}
                        >
                            <div className={style.desc}>
                                {props.data.covered[0] &&
                                    Object.keys(props.data.covered[0]).map(
                                        (key, index) => (
                                            <div
                                                className={style.coveredSec}
                                                key={index}
                                            >
                                                {props.isSelected ? (
                                                    <img
                                                        style={{
                                                            height: '16px',
                                                            width: '16px',
                                                        }}
                                                        src={checkmark}
                                                        alt="checkMark"
                                                    />
                                                ) : (
                                                    <img
                                                        style={{
                                                            height: '16px',
                                                            width: '16px',
                                                        }}
                                                        src={CheckFill}
                                                        alt="checkMark"
                                                    />
                                                )}
                                                <div key={key}>
                                                    {props.data.covered[0][key]}
                                                </div>
                                            </div>
                                        ),
                                    )}
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div className={style.devider}>
                    <div
                        className={style.subHead}
                        aria-controls="collapse-text-covered"
                        aria-expanded={isOpen}
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setOpen(false);
                        }}
                    >
                        <div className={style.coveredSec}>
                            {props.isSelected ? (
                                <img src={dropDownClose} alt="" />
                            ) : (
                                <img src={closeIconPurple} alt="" />
                            )}
                            <div>What's Not Covered ?</div>
                        </div>

                        {props.isSelected ? (
                            <img
                                src={DropDown}
                                alt="close"
                                aria-controls="collapse-text-covered"
                                aria-expanded={isOpen}
                                className={`${style.closeImage} ${
                                    isOpen ? style.rotated : ''
                                }`}
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    setOpen(false);
                                }}
                            />
                        ) : (
                            <img
                                src={dropDownP}
                                alt="close"
                                aria-controls="collapse-text-covered"
                                aria-expanded={isOpen}
                                className={`${style.closeImage} ${
                                    isOpen ? style.rotated : ''
                                }`}
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    setOpen(false);
                                }}
                            />
                        )}
                    </div>
                    <Collapse in={isOpen}>
                        <div
                            id="collapse-text-id-not-covered"
                            className={style.collapse}
                        >
                            <div className={style.desc}>
                                {props.data.notCovered[0] &&
                                    Object.keys(props.data.notCovered[0]).map(
                                        (key) => (
                                            <div
                                                key={key}
                                                className={style.coveredSec}
                                            >
                                                {props.isSelected ? (
                                                    <img
                                                        style={{
                                                            height: '16px',
                                                            width: '16px',
                                                        }}
                                                        src={checkmark}
                                                        alt="checkMark"
                                                    />
                                                ) : (
                                                    <img
                                                        style={{
                                                            height: '16px',
                                                            width: '16px',
                                                        }}
                                                        src={CheckFill}
                                                        alt="checkMark"
                                                    />
                                                )}{' '}
                                                <div>
                                                    {
                                                        props.data
                                                            .notCovered[0][key]
                                                    }
                                                </div>
                                            </div>
                                        ),
                                    )}
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
            <div className={style.footer}>
                <button
                    className={`${
                        props.isSelected ? style.selectedButton : ''
                    }`}
                    onClick={handleAddCoverageClick}
                >
                    {props.isSelected ? (
                        <img src={tickMark} alt="checkmark" />
                    ) : (
                        <img src={plus} alt="checkmark" />
                    )}
                    {NumberFormat(parseInt(props.data.premium) / 12)}/Month
                </button>
            </div>
            <div>
                <p className={style.disclaimer}>
                    Listed price is a base and subject to variations based on
                    customization and preferences, billed annually.
                </p>
                {/* <span className={style.span}></span> */}
            </div>
        </div>
    );
}

export default PolicyCardComponent;
