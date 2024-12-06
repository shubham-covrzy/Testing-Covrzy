import React from 'react'
import { XLg } from 'react-bootstrap-icons';
// msg = "Thanks for sharing your details. We'll reach out to you soo" color = "green" setCloseCustomMsg = { setCloseCustomMsg }
type CustomMsgProps = {
    msg: string;
    color: string;
    closeCustomMsgFun: () => void;
}
const CustomMsg = ({ msg, color, closeCustomMsgFun }: CustomMsgProps) => {
    return (
        <div className='custommsg' style={{ background: color }}>
            <div>{msg}</div>
            <div className='custommsgClose' onClick={closeCustomMsgFun}><XLg /></div>
        </div>
    )
}

export default CustomMsg