/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { Fragment } from 'react';
import { Nav, Table } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AccordionItem from '../../common/AccordionItem';
import CustomTabel from '../../common/CustomTable';
import CustomLoader from '../../common/Loader/CustomLoader';
import { NumberFormat } from '../../common/NumberFormat';
import { PAYMENTS } from '../../constants/main';
import { dateConverter } from '../../Helper/commonFunction';
//import { setPageHeaderTitle } from '../../Redux/Actions/HeaderTitleAction';
import { GetPaymentHistoryAction } from '../../Redux/Actions/PaymentActions';
import { IReduxState } from '../../utils/types';

const columns = [
    { id: 1, title: 'Policy Name', fieldKey: 'policy_name' },
    { id: 2, title: 'Invoice No.', fieldKey: 'invoice_id' },
    { id: 3, title: 'Unique Id.', fieldKey: 'unique_id' },
    { id: 4, title: 'Exp Date', fieldKey: 'end_date' },
    { id: 6, title: 'Amount', fieldKey: 'amount' },
    // { id: 7, title: '', fieldKey: 'actions' },
];

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { payment_history, loading } = useSelector(
        (state: IReduxState) => state.Payment,
    );

    useEffect(() => {
        //dispatch(setPageHeaderTitle(PAYMENTS))
        dispatch(GetPaymentHistoryAction());
    }, [dispatch]);

    const columns = [
        {
            id: 1,
            Header: 'Policy Name',
            accessor: (originalRow: object | any) => {
                return originalRow?.package
                    ? originalRow?.package?.package_name
                    : originalRow?.policy
                      ? originalRow?.policy?.policy_name
                      : '';
            },
        },
        {
            id: 2,
            Header: 'Invoice No.',
            accessor: (originalRow: object | any) => {
                return originalRow?.payment_id?.payment_id;
            },
        },
        {
            id: 3,
            Header: 'Unique Id.',
            accessor: (originalRow: object | any) => {
                return originalRow?.payment_id?.razorpay_payment_id;
            },
        },
        {
            id: 4,
            Header: 'Exp Date',
            accessor: (originalRow: object | any) => {
                return dateConverter(originalRow?.end_date);
            },
        },
        {
            id: 6,
            Header: 'Amount',
            accessor: (originalRow: object | any) => {
                return originalRow?.payment_id?.amount
                    ? NumberFormat(originalRow?.payment_id?.amount)
                    : '';
            },
        },
        {
            id: 7,
            Header: 'Actions',
            accessor: (originalRow: object | any) => {
                return (
                    <a
                        style={{ color: '#7743DC', cursor: 'pointer' }}
                        onClick={() =>
                            navigate(
                                `/user/payment/${originalRow?.purchased_policy_id}`,
                            )
                        }
                    >
                        View Details
                    </a>
                );
            },
        },
    ];

    return (
        <Fragment>
            <div className="db-main-title">
                <h2>Payments</h2>
            </div>
            <div className="payment-tabs">
                <Tab.Container id="left-tabs-example" defaultActiveKey="third">
                    <Row>
                        <Col lg={3}>
                            <Nav variant="pills" className="flex-column">
                                {/* <Nav.Item>
                                    <Nav.Link eventKey="first">Due to COVRZY</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Due to Carriers</Nav.Link>
                                </Nav.Item> */}
                                <Nav.Item>
                                    <Nav.Link eventKey="third">
                                        Payments History
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="four">FAQ</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="no-payment-box no-payment-wrp">
                                        <strong>
                                            You have no payments due at this
                                            time.
                                        </strong>
                                    </div>
                                    <div className="no-payment-box">
                                        <p>
                                            Don't see your invoice? If it was
                                            paid before 10/01/2018 we will not
                                            have a record of it here.{' '}
                                            <Link to="#">Contact us</Link> for
                                            the record or for more information.
                                        </p>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div className="payment-table">
                                        {/* <Table responsive>
                                            <thead>
                                                <tr>
                                                    {columns.map(item => (
                                                        <th key={item?.id}>{item.title}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Business Insurance</td>
                                                    <td>38469</td>
                                                    <td>AX01-5574-01</td>
                                                    <td>11/3/2022</td>
                                                    <td>₹ 2000</td>
                                                    <td><Link to="#">Make Payment</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Business Insurance</td>
                                                    <td>38469</td>
                                                    <td>AX01-5574-01</td>
                                                    <td>11/3/2022</td>
                                                    <td>₹ 2000</td>
                                                    <td><Link to="#">Make Payment</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Business Insurance</td>
                                                    <td>38469</td>
                                                    <td>AX01-5574-01</td>
                                                    <td>11/3/2022</td>
                                                    <td>₹ 2000</td>
                                                    <td><Link to="#">Make Payment</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Business Insurance</td>
                                                    <td>38469</td>
                                                    <td>AX01-5574-01</td>
                                                    <td>11/3/2022</td>
                                                    <td>₹ 2000</td>
                                                    <td><Link to="#">Make Payment</Link></td>
                                                </tr>
                                            </tbody>
                                        </Table> */}
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>Policy Name</th>
                                                    <th>Invoice No.</th>
                                                    <th>Unique Id.</th>
                                                    <th>Exp Date</th>
                                                    <th>Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Business Insurance</td>
                                                    <td>38469</td>
                                                    <td>AX01-5574-01</td>
                                                    <td>11/3/2022</td>
                                                    <td>₹ 2000</td>
                                                    <td>
                                                        <Link to="#">
                                                            Make Payment
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <div className="payment-table">
                                        {/* <Table responsive>
                                            <thead>
                                                <tr>
                                                    {columns.map(item => (
                                                        <th key={item?.id}>{item.title}</th>
                                                    ))}
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ?
                                                    <tr><CustomLoader /></tr> :
                                                    payment_history.length !== 0 ?
                                                        payment_history?.map((row: any) => (
                                                            <tr key={row?.purchased_policy_id}>
                                                                {columns.map(item => {
                                                                    let value;
                                                                    if (item.fieldKey === 'policy_name') {
                                                                        value = row?.package ?
                                                                            row?.package?.package_name :
                                                                            row?.policy ?
                                                                                row?.policy?.policy_name : ''
                                                                    } else if (item.fieldKey === 'unique_id') {
                                                                        value = row?.payment_id?.razorpay_payment_id
                                                                    } else if (item.fieldKey === 'end_date') {
                                                                        value = dateConverter(row[item.fieldKey]);
                                                                    } else if (item.fieldKey === 'invoice_id') {
                                                                        value = row?.payment_id?.payment_id;
                                                                    } else if (item.fieldKey === 'amount') {
                                                                        value = row?.payment_id?.amount ?
                                                                            // `₹ ${row?.payment_id?.amount}` : '';
                                                                            NumberFormat(row?.payment_id?.amount) : '';
                                                                    }

                                                                    return <td>{value}</td>
                                                                })}
                                                                <td>
                                                                    <a
                                                                        style={{ color: '#7743DC', cursor: 'pointer' }}
                                                                        onClick={() => navigate(`/user/payment/${row?.purchased_policy_id}`)}
                                                                    >
                                                                        View Details
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        )) :
                                                        <tr className='d-flex justify-content-center mt-4'> No Records Found</tr>
                                                }

                                            </tbody>
                                        </Table> */}

                                        <CustomTabel
                                            columns={columns}
                                            data={payment_history}
                                            pagination
                                        />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="four">
                                    <Accordion defaultActiveKey="0">
                                        <AccordionItem
                                            eventKey="0"
                                            AccordionHeader="Can I choose what invoices to pay?"
                                            AccordionContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum."
                                        />
                                        <AccordionItem
                                            eventKey="1"
                                            AccordionHeader="Why is there a charge associated with credit cards?"
                                            AccordionContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum."
                                        />
                                        <AccordionItem
                                            eventKey="2"
                                            AccordionHeader="When are my invoices due?"
                                            AccordionContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum."
                                        />
                                        <AccordionItem
                                            eventKey="3"
                                            AccordionHeader="I have a question about one of my invoices, how to reach out?"
                                            AccordionContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum."
                                        />
                                        <AccordionItem
                                            eventKey="4"
                                            AccordionHeader="Can I choose what invoices to pay?"
                                            AccordionContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum."
                                        />
                                        <AccordionItem
                                            eventKey="5"
                                            AccordionHeader="Why is there a charge associated with credit cards?"
                                            AccordionContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum."
                                        />
                                    </Accordion>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </Fragment>
    );
};

export default Payment;
