import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTabel from '../../common/CustomTable';
import { SUPPORT_TICKETS } from '../../constants/main';
import { dateConverter } from '../../Helper/commonFunction';
//import { setPageHeaderTitle } from "../../Redux/Actions/HeaderTitleAction";
import { GetSupportTicketsAction } from '../../Redux/Actions/SupportAction';
import { IReduxState } from '../../utils/types';

const SupportTicket = () => {
    const dispatch = useDispatch();
    const { support_tickets } = useSelector(
        (state: IReduxState) => state.Support,
    );

    const columns = [
        { id: 11, Header: 'Ticket Number', accessor: 'id' },
        { id: 1, Header: 'Name', accessor: 'name' },
        { id: 2, Header: 'Email', accessor: 'email' },
        {
            id: 4,
            Header: 'Phone Number',
            accessor: (originalRow: object | any) =>
                originalRow?.phone !== '' ? '+' + originalRow?.phone : '-',
        },
        { id: 5, Header: 'Question', accessor: 'question' },
        { id: 7, Header: 'Message', accessor: 'message' },
        { id: 8, Header: 'Status', accessor: 'status' },
        {
            id: 10,
            Header: 'Raised by',
            accessor: (originalRow: object | any) =>
                `${originalRow?.user?.first_name} ${originalRow?.user?.last_name} `,
        },
        {
            id: 6,
            Header: 'Created At',
            accessor: (originalRow: object | any) =>
                dateConverter(originalRow?.created_at),
        },
        // {
        //     id: 9,
        //     Header: 'Actions',
        //     accessor: 'dfsdf'
        //     // accessor: (originalRow: object | any) => <>
        //     //     {(team_users.find(
        //     //         (user: Object | any) => user.id === userData?.id
        //     //     )?.is_owner || userData?.id === originalRow?.id) ?
        //     //         <div className='action-btn'>
        //     //             <span onClick={() => editUserHandler(originalRow)} >
        //     //                 <img src={EditProfile} alt='edit' />
        //     //             </span>
        //     //             {(!originalRow?.is_owner && originalRow?.id !== userData?.id) &&
        //     //                 <span onClick={() => deleteUser(originalRow?.id)}>
        //     //                     <img src={TrashSolid} alt='delete' />
        //     //                 </span>}
        //     //         </div> :
        //     //         <></>}
        //     // </>
        // },
    ];

    useEffect(() => {
        //dispatch(setPageHeaderTitle(SUPPORT_TICKETS))
        dispatch(GetSupportTicketsAction());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="payment-table">
                <CustomTabel
                    columns={columns}
                    data={support_tickets || []}
                    pagination
                />
            </div>
        </Fragment>
    );
};

export default SupportTicket;
