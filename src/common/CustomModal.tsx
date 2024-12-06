import { Modal } from 'react-bootstrap';
import CustomButton from './Buttons/CustomButton';
import OrangeButton from './Buttons/OrangeButton';

const CustomModal = (props: any) => {
    const {
        show,
        size,
        onHide,
        headerTitle,
        body,
        customButtonTitle,
        onClickCustomButton,
        orangeButtonTitle,
        onClickOrangeButton,
        titleFontSize,
    } = props;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {headerTitle && (
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{ fontSize: titleFontSize, width: '100%' }}
                    >
                        {headerTitle}
                    </Modal.Title>
                </Modal.Header>
            )}
            <Modal.Body>{body}</Modal.Body>
            {(customButtonTitle || orangeButtonTitle) && (
                <Modal.Footer>
                    {customButtonTitle && (
                        <CustomButton
                            buttonTitle={customButtonTitle}
                            onClick={onClickCustomButton}
                        />
                    )}
                    {orangeButtonTitle && (
                        <OrangeButton
                            buttonName={orangeButtonTitle}
                            onClick={onClickOrangeButton}
                        />
                    )}
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default CustomModal;
