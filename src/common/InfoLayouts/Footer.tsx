import { Nav } from 'react-bootstrap';
import ChatIcon from '../../assets/images/chatIcon.svg';

const Footer = () => {
    return (
        <>
            <div className="pi-footer">
                <Nav.Link className="pi-chat" href="#">
                    <img src={ChatIcon} alt="chat" />
                </Nav.Link>
            </div>
        </>
    );
};

export default Footer;
