import Styles from './style.module.scss';

interface IndustryCardProps {
    name: string;
    icon: string | any;
    onClick: (name: string) => void;
    selected: boolean;
}

const IndustryCard = (props: IndustryCardProps) => {
    return (
        <div
            className={`${Styles.main}  ${
                props.selected ? Styles.selectedCard : ''
            } `}
            onClick={() => {
                props.onClick(props.name);
            }}
        >
            <img src={props.icon} alt="Investor Icon" className={Styles.icon} />
            <div className={Styles.text}>{props.name}</div>
        </div>
    );
};

export default IndustryCard;
