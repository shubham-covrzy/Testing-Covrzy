import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SubBanner = (props: any) => {
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
            <section className="coverage-section">
                <Container>
                    <div
                        className="coverage-img"
                        style={{ background: `url(${props?.bgImage})` }}
                    >
                        {(props?.whiteTitle || props?.orangeTitle) &&
                        props?.whiteTitle.includes('<br/>') ? (
                            <h2 className="title-wrp">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: props?.whiteTitle,
                                    }}
                                ></div>{' '}
                                <span>{props?.orangeTitle}</span>
                            </h2>
                        ) : (
                            <h2 className="title-wrp">
                                {props?.whiteTitle}{' '}
                                <span>{props?.orangeTitle}</span>
                            </h2>
                        )}
                        {props?.content && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: props?.content,
                                }}
                            />
                        )}
                        {props?.buttonTitle && (
                            <Button
                                className="started-btn"
                                onClick={handleClick}
                            >
                                {props?.buttonTitle}{' '}
                                {props?.image && (
                                    <img
                                        alt=""
                                        className="mx-2 me-0"
                                        src={props?.image}
                                    />
                                )}
                            </Button>
                        )}
                    </div>
                </Container>
            </section>
        </>
    );
};

export default SubBanner;
