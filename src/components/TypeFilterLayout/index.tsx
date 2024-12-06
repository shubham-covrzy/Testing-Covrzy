import React from 'react';
import Style from './style.module.scss';

interface TypeFilterLayoutProps {
    onClick: (packageName: string) => void;
    selectedPackage: any;
    productLength: number;
    updateProductItems: (newItems: any[]) => void;
}

const packageNames = [
    'Startup',
    'Edtech',
    'Fintech',
    'SaaS',
    'E-Commerce',
    'IT Companies',
];

function TypeFilterLayout(props: TypeFilterLayoutProps) {
    const handlePackageChange = (packageName: string) => {
        props.onClick(packageName);

        props.updateProductItems([]);
    };
    return (
        <div className={Style.main}>
            <div className={Style.bubble}>
                {packageNames.map((el: any, index) => (
                    <p
                        key={index}
                        className={`${Style.package} ${
                            props.selectedPackage === el ? Style.selected : ''
                        }`}
                        onClick={() => {
                            handlePackageChange(el);
                        }}
                    >
                        {el}
                        {props.productLength > 0 &&
                        props.selectedPackage === el ? (
                            <span>{props.productLength}</span>
                        ) : (
                            ''
                        )}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default TypeFilterLayout;
