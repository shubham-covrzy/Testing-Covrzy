import { Container } from 'react-bootstrap'
import { whyUs } from './data'

const CobrandWhyUs = () => {
    return (
        <div className='cobrandwhyuswrap'>
            <Container>
                <h2>Why Covrzy</h2>
                <p className="cobrandwhyusp">At Covrzy, we prioritise your experience above all else. With customised policies designed to meet your unique needs, we stand as your trusted partner in insuring your business.</p>
                <div className="cobrandWhyUsCont">
                    {whyUs.length > 0 ? (
                        <ul className="cobrandWhyUsList">
                            {whyUs.map((data, idx) => (
                                <li className="cobrandWhyUsItem" key={data?.id || idx}>
                                    <img
                                        src={data?.img}
                                        alt={data?.alt || 'Why us illustration'}
                                        className="cobrandWhyUsImage"
                                    />
                                    <p className="cobrandWhyUsText">{data?.text || 'Description not available'}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="cobrandNoRecord">We are there for you when things go wrong.</div>
                    )}
                </div>

            </Container>
        </div>
    )
}

export default CobrandWhyUs
