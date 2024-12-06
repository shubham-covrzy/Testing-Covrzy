import Style from './style.module.scss';

interface InfoRowComponentProps {
    title: string;
    value: string;
}

export default function InfoRowComponent({
    title,
    value,
}: InfoRowComponentProps) {
    return (
        <div className={Style.main}>
            <div className={Style.key}>{title}</div>
            <div className={Style.value}> {value}</div>
        </div>
    );
}
