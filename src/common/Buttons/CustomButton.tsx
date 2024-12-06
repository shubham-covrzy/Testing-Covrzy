import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomButton = (props: any) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (props?.onClick) {
            props.onClick();
        } else if (props?.navigateTo) {
            if (props?.external) {
                // If external prop is passed, redirect to an external URL
                window.location.href = props.navigateTo;
            } else {
                // Otherwise, navigate internally
                navigate(props.navigateTo);
            }
        }
    };

    return (
        <>
            <Button
                onClick={handleClick}
                className="started-btn"
                disabled={props?.disabled}
                type={props?.type}
            >
                {props?.buttonTitle}
            </Button>
        </>
    );
};

export default CustomButton;