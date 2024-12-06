import { useDispatch, useSelector } from 'react-redux';
import Style from './style.module.scss';

interface PaymentInfoHeaderProps {
    header: string;
    success: boolean;
    downloadReceipt: any;
}

export default function PaymentInfoHeader({
    header,
    success,
    downloadReceipt,
}: PaymentInfoHeaderProps) {
    return (
        <div
            style={
                success ? { background: '#388E3C' } : { background: '#e35141' }
            }
            className={Style.main}
        >
            <h3>{header}</h3>
            {success ? (
                // <button onClick={downloadReceipt}>
                //   <img alt="" src={download} /> Save
                // </button>
                <>{downloadReceipt}</>
            ) : (
                ''
            )}
        </div>
    );
}
