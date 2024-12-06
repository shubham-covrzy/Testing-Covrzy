import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from "react-slick";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './companiesThrustUs.css';
import { CompanyTrustUs } from './data';

interface PropsCompaniesThrustUs {
    companiesthrustus: CompanyTrustUs[];
}

const CompaniesThrustUs = ({ companiesthrustus }: PropsCompaniesThrustUs) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="right" />,
        prevArrow: <CustomArrow direction="left" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="cobrand-companies">
            <Container>
                <h2 className="cobrand-title-wrp">Companies that trust Covrzy</h2>
                <div className="cobrand-companies-thrust-wrap">
                    <Slider {...settings}>
                        {companiesthrustus?.map((obj) => (
                            <div key={obj?.id} className="cobrand-official-img">
                                <img
                                    className="cobrand-logo"
                                    src={`${process.env.REACT_APP_BLOG_BASE_URL}${obj?.images.url}`}
                                    alt={obj?.images.alternativeText}
                                    height={"50px"}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

// Custom Arrow Component
const CustomArrow = ({ direction, onClick }: { direction: "left" | "right"; onClick?: () => void }) => {
    return (
        <button
            className={`slick-arrow slick-${direction}`}
            onClick={onClick}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                borderRadius: "50%",
                position: "absolute",
                zIndex: 2,
                top: "50%",
                [direction === "left" ? "left" : "right"]: "-35px",
                transform: "translateY(-50%)",
                cursor: "pointer",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 20 20"
                style={{
                    transform: direction === "left" ? "none" : "rotate(180deg)",
                    fill: "#7743DC",
                }}
            >
                <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zm1.289-15.7 1.422 1.4-4.3 4.344 4.289 4.245-1.4 1.422-5.714-5.648z" />
            </svg>
        </button>
    );
};

export default CompaniesThrustUs;
