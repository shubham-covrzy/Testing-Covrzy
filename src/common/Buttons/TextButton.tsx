import { Button } from 'react-bootstrap';
const TextButton = (props: any) => {
    return (
        <>
            <Button className="text-btns outline-btn">
                {props?.buttonTitle}
            </Button>
        </>
    );
};

export default TextButton;
