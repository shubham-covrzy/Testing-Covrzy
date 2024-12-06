import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import Slider from "react-slick";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './companiesThrustUs.css';
// partners images
import CompanyLogo1 from "../../assets/images/partner-companies-logo10.png";
import CompanyLogo2 from "../../assets/images/partner-companies-logo8.png";
import CompanyLogo3 from "../../assets/images/partner-companies-logo3.png";
import CompanyLogo4 from "../../assets/images/partner-companies-logo4.png";
import CompanyLogo5 from "../../assets/images/partner-companies-logo5.png";
import CompanyLogo6 from "../../assets/images/partner-companies-logo6.png";
import CompanyLogo7 from "../../assets/images/partner-companies-logo7.png";

const PartnersLogo = [
    { id: 7, logo: CompanyLogo7, height: 75, alt: "Vanghee" },
    { id: 6, logo: CompanyLogo6, height: 75, alt: "YoloBus" },
    { id: 2, logo: CompanyLogo2, height: 75, alt: "Redcliffe Labs" },
    { id: 3, logo: CompanyLogo3, height: 75, alt: "Game Theory" },
    { id: 1, logo: CompanyLogo1, height: 75, alt: "Orange Health Labs" },
    { id: 4, logo: CompanyLogo4, height: 75, alt: "Volopay" },
    { id: 5, logo: CompanyLogo5, height: 75, alt: "Karbon Business" },
];

const CompaniesThrustUs = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: (
            <button className="slick-prev">
                <span>&#10094;</span>
            </button>
        ),
        nextArrow: (
            <button className="slick-next">
                <span>&#10095;</span>
            </button>
        ),
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
        <section className="partner-companies">
            <Container>
                <h2 className="partner-title-wrp">Companies that trust Covrzy</h2>
                <Slider {...settings} className="partner-companies-wrap" ref={sliderRef}>
                    {PartnersLogo.map((obj) => (
                        <div key={obj.id} className="partner-img-box partner-official-img">
                            <img
                                className="partner-logo"
                                src={obj.logo}
                                alt={obj.alt}
                                style={{ height: obj.height }}
                            />
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    );
};

export default CompaniesThrustUs;
