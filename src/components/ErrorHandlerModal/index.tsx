import React, { useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import { CloseErrorHandlerModalAction } from '../../Redux/Actions/ToastAction';

function ErrorHandlerModal() {
    const dispatch = useDispatch();
    const [contact, setContact] = useState(false);
    const { openModal, errorResponse } = useSelector(
        (state: IReduxState) => state.Toast,
    );

    const handleClose = () => {
        setContact(false);
        dispatch(CloseErrorHandlerModalAction());
    };

    return (
        <Modal
            show={openModal}
            onHide={handleClose}
            // onHide={onClose}

            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header
                style={{ borderBottom: 'none', padding: '16px 28px' }}
            >
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{ fontSize: 28, width: '100%', color: '#FD7350' }}
                    className="d-flex align-items-center justify-content-center"
                >
                    An Error has occurred !
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p
                    style={{
                        fontSize: '20px',
                        fontWeight: 500,
                        lineHeight: '32px',
                        letterSpacing: '0em',
                    }}
                >
                    {errorResponse}

                    {contact ? (
                        <span className="d-flex" style={{ color: '#7743DC' }}>
                            Technical Support &nbsp;:&nbsp;
                            <Nav.Link href="tel:9354963947">
                                +(91)-9354963947
                            </Nav.Link>
                        </span>
                    ) : (
                        <span
                            style={{ color: '#7743DC', cursor: 'pointer' }}
                            onClick={() => {
                                setContact(true);
                            }}
                        >
                            &nbsp;Contact Support.
                        </span>
                    )}
                </p>
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-center justify-content-center gap-3">
                <button
                    style={{
                        borderRadius: '27px',
                        border: '  2px solid #FD7350',
                        padding: '7px 15px',
                        color: '#FD7350',
                    }}
                    onClick={handleClose}
                >
                    CANCEL
                </button>
                <button
                    onClick={handleClose}
                    style={{
                        borderRadius: '27px',
                        padding: '7px 15px',
                        background: '#fd7350',
                        color: '#ffff',
                        border: 'none',
                    }}
                >
                    TRY AGAIN
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ErrorHandlerModal;
