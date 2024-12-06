import CobrandCollab from '../../assets/images/cobrandingpage/cobrandingcollab3.gif';
import featurecobrandPlaceholder from '../../assets/images/cobrandingpage/featurecobrand.png';
import tick from '../../assets/images/cobrandingpage/tick.png';
import { Offer } from './data';

interface PropsFeatureCobrand {
    handleOpenCustomQuoteModal: () => void;
    offers: Offer[];
    offerlistHead: string;
}



const FeatureCobrand = ({ handleOpenCustomQuoteModal, offers, offerlistHead }: PropsFeatureCobrand) => {

    return (
        <div className='featureCobrand'>
            {/* Computer component */}
            <div className="featureCobrandWrap">
                <div className="leftfeatureCobrand">
                    {/* Use lazy loading for the GIF */}
                    <img
                        src={CobrandCollab}
                        alt="Co-branding Collaboration GIF"
                        width={"300px"}
                        loading="lazy"
                        placeholder={featurecobrandPlaceholder}
                        style={{
                            opacity: 1,
                            transition: "opacity 0.5s ease",
                        }}
                    />
                    <div className="leftfeatureCobrandHead">
                        Simplified and digital Insurance management for HR managers and your employees
                    </div>
                </div>
                <div className="rightfeatureCobrand">
                    <div className="rightfeatureCobrandHead">
                        {offerlistHead || "Simple, Seamless and Completely Digital"}
                    </div>
                    <ul>
                        {offers.map((curr, idx) => {
                            return (
                                <li key={`featureCobrand-map-${curr.id}`}>
                                    <img src={tick} alt="tick icon" />
                                    {curr.list}
                                </li>
                            )
                        })}
                    </ul>
                    <div className="featurecobrandBtn">
                        <button onClick={handleOpenCustomQuoteModal}>Talk to Our Experts</button>
                    </div>
                </div>
            </div>

            {/* Mobile component */}
            <div className="featureCobrandWrapMob">
                <div className="rightfeatureCobrandHeadMob featureCobrandWrapHead">
                    {offerlistHead || "Simple, Seamless and Completely Digital"}
                </div>
                <div className="featureCobrandWrapCont">
                    <div className="rightfeatureCobrandMob">
                        <ul>
                            {offers.map((curr, idx) => {
                                return (
                                    <li key={`featureCobrand-map-${curr.id}`}>
                                        <img src={tick} alt="tick icon" />
                                        {curr.list}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="leftfeatureCobrandMob">
                        {/* Lazy load GIF for mobile */}
                        <img
                            src={CobrandCollab}
                            alt="Co-branding Collaboration GIF"
                            width={"300px"}
                            loading="lazy"
                            placeholder={featurecobrandPlaceholder}
                        />
                    </div>
                </div>
                <div className="featurecobrandBtnMob">
                    <button onClick={handleOpenCustomQuoteModal}>Talk to Our Experts</button>
                </div>
            </div>
        </div>
    )
}

export default FeatureCobrand;
