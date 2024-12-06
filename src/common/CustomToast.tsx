import { Toast, ToastContainer } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { ToastAction } from '../Redux/Actions/ToastAction';

type ToastProps = {
    show: boolean;
    message: string;
    severity: string;
};

function CustomToast(props: ToastProps) {
    const { show, message, severity } = props;
    const dispatch = useDispatch();

    const onCloseToast = () => {
        dispatch(ToastAction({ show: false, message: '', severity: '' }));
    };

    return (
        <ToastContainer
            className="p-3 toast-container"
            position={'bottom-center'}
        >
            <Toast
                onClose={onCloseToast}
                show={show}
                bg={severity}
                delay={3000}
                autohide
            >
                <Toast.Body className={'text-white'}>{message}</Toast.Body>
                <div
                    style={{
                        position: 'absolute',
                        right: 30,
                        bottom: 30,
                        color: 'white',
                        fontSize: 15,
                        cursor: 'pointer',
                    }}
                >
                    <XLg onClick={onCloseToast} />
                </div>
            </Toast>
        </ToastContainer>
    );
}

export default CustomToast;
