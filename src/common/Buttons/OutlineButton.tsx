import { Button } from 'react-bootstrap';
const OutlineButton = (props: any) => {
    return (
        <>
            <Button className="outline-btn">{props?.buttonName}</Button>
        </>
    );
};

export default OutlineButton;
