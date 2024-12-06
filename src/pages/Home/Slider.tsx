import Slider from 'react-slick';

export const CustomSlider = () => {
    const settings = {
        dots: false,
        nav: true,
        infinite: false,
        speed: 500,
    };

    return (
        <Slider {...settings}>
            <div>
                <h3>Discovery</h3>
                {/* <h3>Fast quotes. Quick purchase.</h3> */}
                <div className="slider-para">
                    <p>
                        The purpose of insurance is to provide safeguard to
                        businesses and promote economic growth. Despite being a
                        developing nation, India has a low rate of insurance
                        adoption and many companies are unaware of the insurance
                        products available to secure their operations against
                        various risks. Our platforms streamlines the process for
                        businesses to assess and obtain the essential insurance
                        products needed to secure their operations.
                    </p>
                </div>
            </div>
            <div>
                <h3>Simple and Affordable</h3>
                {/* <h3>Fast quotes. Quick purchase.</h3> */}
                <p>
                    Our priority in simplifying and increasing access to
                    insurance is to guarantee that our clients have a thorough
                    understanding of the coverage they are buying. This is done
                    by simplifying the products and highlighting the most
                    important coverage terms of a policy, as well as the
                    communicating the same to customers. Additionally, we use
                    terms that are easy to comprehend and educational in nature,
                    to ensure that clients can make informed decisions.
                </p>
            </div>
            <div>
                <h3>Tailor made Protection</h3>
                {/* <h3>Fast quotes. Quick purchase.</h3> */}
                <div className="slider-para">
                    <p>
                        Our company collaborates with insurance providers and
                        identify unique demands from markets to offer tailored
                        insurance solutions for small and medium-sized
                        enterprises (SMEs). Our direct access to these markets
                        enable us to swiftly provide customized insurance quotes
                        that are specifically designed to meet the needs of each
                        unique business.
                    </p>
                    <p>
                        Unlike large corporations who have dedicated teams of
                        lawyers to handle insurance coverage, SMEs often have
                        limited resources. However, it is crucial to acknowledge
                        that each business has its own risks and we work closely
                        with our clients to ensure that their insurance coverage
                        fully protects them from potential liabilities and
                        property hazards.
                    </p>
                </div>
            </div>
        </Slider>
    );
};
