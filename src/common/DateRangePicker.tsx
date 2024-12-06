import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useEffect, useState } from 'react';

const CustomDateRangePicker = (props: any) => {
    const { start, end, handleCallback, minDate, maxDate } = props;

    const [label, setLabel] = useState('');

    useEffect(() => {
        setLabel(
            start.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        );
    }, [start]);

    return (
        <>
            <div className="date-range-wrp">
                <DateRangePicker
                    initialSettings={{
                        start,
                        end,
                        minDate,
                        maxDate,
                    }}
                    onCallback={handleCallback}
                >
                    {/* <input type="text" className="form-control col-4" /> */}
                    <div className="date-picker-range">
                        <i className="fa fa-calendar"></i>&nbsp;
                        <span>{label}</span>{' '}
                        <i className="fa fa-caret-down"></i>
                    </div>
                </DateRangePicker>
            </div>
        </>
    );
};

export default CustomDateRangePicker;
