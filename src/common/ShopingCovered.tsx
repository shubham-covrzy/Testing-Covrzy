import { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import Shoping from '../assets/images/Shoping.svg';

const ShopingCovered = (props: any) => {
    return (
        <Fragment>
            <div className="db-shoping-box">
                <p>{props?.shopingTitle}</p>
                {props?.buttonTitle && (
                    <Button className="started-btn" onClick={props?.onClick}>
                        {props?.buttonTitle}{' '}
                        <img className="mx-2 me-0" src={Shoping} alt="" />
                    </Button>
                )}
            </div>
        </Fragment>
    );
};

export default ShopingCovered;
