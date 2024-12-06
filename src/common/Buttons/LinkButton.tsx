import { Button } from 'react-bootstrap';
const LinkButton = (props: any) => {
    return (
        <>
            <Button
                className={`links-btn ${props?.addClass}`}
                onClick={props?.onLinkClick}
            >
                {props?.buttonTitle}
            </Button>
        </>
    );
};

export default LinkButton;
