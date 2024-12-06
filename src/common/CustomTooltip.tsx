import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import InfoBlue from '../../src/assets/images/InfoBlue.svg';

const CustomTooltip = (props: any) => {
    return (
        <>
            {['top'].map((placement) => (
                <OverlayTrigger
                    key={placement}
                    overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                            {props?.message}
                        </Tooltip>
                    }
                >
                    <img src={InfoBlue} className="tooltip-icon" alt="info" />
                </OverlayTrigger>
            ))}
        </>
    );
};

export default CustomTooltip;
