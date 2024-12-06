const CoveredCard = (props: any) => {
    return (
        <>
            <div className="covered-card-box">
                <span className="d-flex justify-content-center align-items-center">
                    <img src={props?.image} alt="up" style={{ width: 28 }} />
                </span>
                <div className="covered-card-desc">
                    <h3>{props?.coveredTitle}</h3>
                    <p>{props?.coveredDesc}</p>
                </div>
            </div>
        </>
    );
};

export default CoveredCard;
