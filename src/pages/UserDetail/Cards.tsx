import { Spinner } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import LinkButton from '../../common/Buttons/LinkButton';

const Cards = (props: any) => {
    const {
        image,
        // hoverImage,
        title,
        loading,
        buttonTitle,
        onClick,
        onLinkClick,
        desc,
    } = props;

    return (
        <>
            <div className="pi-package-box">
                <div className="pi-package-img">
                    <img className="blue-img" src={image} alt="" width="80%" />
                    <img
                        className="orange-img"
                        src={image}
                        alt=""
                        width="80%"
                    />
                </div>
                <div className="pi-package-desc">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    {/* <p> */}
                    {/* {desc ? desc :
                            'The all-in-one package custom designed to protect Startups. From executive decisions, and product errors, to hackers stealing PII, workplace harassment, and discrimination lawsuits.'}</p> */}

                    <div className="pi-package-box-btn">
                        <CustomButton
                            buttonTitle={
                                loading ? (
                                    <div className="d-flex justify-content-center gap-2">
                                        <Spinner
                                            animation="border"
                                            style={{ width: 23, height: 23 }}
                                        />
                                        <span>Please wait...</span>
                                    </div>
                                ) : (
                                    buttonTitle
                                )
                            }
                            onClick={onClick}
                        />
                        <LinkButton
                            buttonTitle="Learn More"
                            onLinkClick={onLinkClick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Cards;
