import { PaymentInfo } from '../Interfaces';
import InfoRowComponent from './InfoRowComponent';
import Style from './style.module.scss';

interface PaymentInfoCardProps {
    title: string;
    contents: PaymentInfo[];
}

export default function PaymentInfoCard({
    title,
    contents,
}: PaymentInfoCardProps) {
    return (
        <div className={Style.main}>
            <div className={Style.header}>
                <h5>{title}</h5>
            </div>
            <div className={Style.content}>
                {contents.map((info, index) => (
                    <InfoRowComponent
                        title={info.title}
                        value={info.value}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
