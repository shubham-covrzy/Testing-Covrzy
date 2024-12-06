import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function FullPageSpinner() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
            }}
        >
            <Spinner
                animation="border"
                role="status"
                style={{ color: '#6f42c1' }}
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default FullPageSpinner;
