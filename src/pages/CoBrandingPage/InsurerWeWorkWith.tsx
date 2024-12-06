import React from "react";
import { Container } from "react-bootstrap";
import { Iinsurance } from "./data";
// import './AutoScrollCarousel.css';

interface PropsInsurerData {
    InsurerData: Iinsurance[];
}

const InsurerWeWorkWith = ({ InsurerData }: PropsInsurerData) => {
    return (
        <div className="cobrandInsurerWeWorkWithWrap">
            <Container>
                <h2>Insurers We Work With</h2>
                <div className="scrollingWrapper">
                    <div className="scrollingContent">
                        {InsurerData.map((data) => (
                            <div key={data.id} className="insurerWeWorkWithSlide">
                                <img
                                    src={data.logo}
                                    alt={data.alt || "Insurer Logo"}
                                    className="insurerWeWorkWithLogo"
                                    style={{ height: `${data.ht}px` }}
                                />
                            </div>
                        ))}
                        {/* Duplicate the slides for the infinite effect */}
                        {InsurerData.map((data) => (
                            <div key={`duplicate-${data.id}`} className="insurerWeWorkWithSlide">
                                <img
                                    src={data.logo}
                                    alt={data.alt || "Insurer Logo"}
                                    className="insurerWeWorkWithLogo"
                                    style={{ height: `${data.ht}px` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default InsurerWeWorkWith;
