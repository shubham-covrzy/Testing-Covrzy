import React from 'react';
const Images = (props: any) => {
    return (
        <>
            <img src={props?.image} className="img-fluid" alt="" />
        </>
    );
};

export default Images;
