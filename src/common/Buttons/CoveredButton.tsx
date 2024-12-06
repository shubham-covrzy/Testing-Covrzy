import { Button } from 'react-bootstrap';
const CoveredButton = (props: any) => {
    return (
        <>
            <Button
                disabled={props?.disabled}
                className="covered-btn started-btn"
                onClick={props?.onClick}
            >
                <span>
                    <img src={props?.PreImage} alt="" />
                    {props?.buttonTitle}
                </span>
                <img src={props?.ArrowImage} alt="" />
            </Button>
        </>
    );
};

export default CoveredButton;
