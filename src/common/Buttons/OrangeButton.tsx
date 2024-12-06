import { Button } from 'react-bootstrap';
const OrangeButton = (props: any) => {
    return (
        <>
            <Button
                onClick={props?.onClick}
                className="orange-btn"
                type={props?.type}
            >
                {props?.buttonName}
            </Button>
        </>
    );
};

export default OrangeButton;
