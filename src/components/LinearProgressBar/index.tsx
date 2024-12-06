import styles from './style.module.scss';

interface LinearProgressBarProps {
    value: number;
    text?: string;
}

const LinearProgressBar = ({ value, text }: LinearProgressBarProps) => {
    return (
        <div className={styles.main}>
            {!!text && (
                <div className={styles.text} style={{ width: `${value}%` }}>
                    {text}
                </div>
            )}
            <div className={styles.progressBox}>
                <div
                    className={styles.progress}
                    style={{
                        width: `${value}%`,
                        borderBottomRightRadius: value === 100 ? 8 : 0,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default LinearProgressBar;
