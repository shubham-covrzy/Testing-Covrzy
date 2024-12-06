import { Fragment } from 'react';
import loader from '../../assets/images/loader.gif';

const CustomLoader = () => {
    return (
        <Fragment>
            <div className="d-flex justify-content-center">
                <img src={loader} alt="loader" style={{ width: '14%' }} />
            </div>
        </Fragment>
    );
};

export default CustomLoader;
