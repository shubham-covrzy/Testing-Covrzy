import React from 'react';

const Header = (props: any) => {
    return (
        <>
            <div className="pi-top-bar">{props?.customComponent}</div>
        </>
    );
};

export default Header;
