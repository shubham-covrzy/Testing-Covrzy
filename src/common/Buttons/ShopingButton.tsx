import { Button } from 'react-bootstrap';
const ShopingButton = (props: any) => {
    return (
        <>
            <Button className="started-btn" onClick={props?.onClick}>
                {props?.buttonTitle}{' '}
                <img className="mx-2 me-0" src={props?.image} alt="img" />
            </Button>
        </>
    );
};

export default ShopingButton;
