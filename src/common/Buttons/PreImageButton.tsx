import { Button, Spinner } from 'react-bootstrap';
const PreImageButton = (props: any) => {
    return (
        <>
            <Button
                className="covered-btn started-btn pre-btn"
                onClick={props?.onClick}
            >
                <span>
                    {props?.loading ? (
                        <Spinner
                            animation="border"
                            style={{ width: 23, height: 23 }}
                        />
                    ) : (
                        <img src={props?.PreImage} alt="" />
                    )}
                    {props?.buttonTitle}
                </span>
            </Button>
        </>
    );
};

export default PreImageButton;
