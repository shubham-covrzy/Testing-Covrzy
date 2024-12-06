import React, { Fragment, useEffect, useState } from 'react';
import { Col, Form, Spinner, Table } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../common/Buttons/CustomButton';
import CustomLabel from '../../common/CustomLabel';
//import { setPageHeaderTitle } from '../../Redux/Actions/HeaderTitleAction';
import TrashSolid from '../../assets/images/trash-solid.svg';
import EditProfile from '../../assets/images/EditProfile.svg';

import CustomModal from '../../common/CustomModal';
import CustomInput from '../../common/CustomInput';
import CustomPhoneInput from '../../common/PhoneInput';
import * as yup from 'yup';
import {
    EMAIL,
    EMAIL_REG,
    ONLY_ALPHABET,
    PASSWORD,
    PASSWORD_REG,
    PHONE,
} from '../../constants/main';
import { useFormik } from 'formik';
import {
    AddUserDataAction,
    ClearResponseAction,
    DeleteUserDataAction,
    GetUserDataAction,
    UpdateUserDataAction,
} from '../../Redux/Actions/UserProfileAction';
import { IReduxState } from '../../utils/types';
import { DecryptData } from '../../common/CryptoJSToken';
import CustomLoader from '../../common/Loader/CustomLoader';
import { phonesRegx } from '../../Helper/commonFunction';
import CustomTabel from '../../common/CustomTable';

// const columns = [
//     { id: 1, title: 'First Name', fieldKey: 'first_name' },
//     { id: 2, title: 'Last Name', fieldKey: 'last_name' },
//     { id: 3, title: 'Email', fieldKey: 'email' },
//     { id: 4, title: 'Phone Number', fieldKey: 'phone_number' },
//     { id: 5, title: 'Designation', fieldKey: 'job_title' },
//     { id: 6, title: 'User Type', fieldKey: 'role' },
//     { id: 7, title: 'Actions', fieldKey: 'actions' },
// ]

interface EditUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    job_title: string;
    phone_number: string;
}

const EditTeamSettings = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [countryCode, setCountryCode] = useState<string>('91');
    // const [updateData, setUpdateData] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const { loading, success, team_users } = useSelector(
        (state: IReduxState) => state.UserProfile,
    );
    const { user } = useSelector((state: IReduxState) => state.Auth);
    const userData = DecryptData(user);
    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(setPageHeaderTitle(''))
        dispatch(GetUserDataAction());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(GetUserDataAction());
            closeModal();
            closeDeletePopup();
            userFormik.resetForm();
            dispatch(ClearResponseAction());
        }
    }, [success]);

    const closeModal = () => {
        setIsEdit(false);
        setShowModal(false);
        userFormik.resetForm();
    };

    const closeDeletePopup = () => setShowDeletePopup(false);

    const deleteUser = (id: string) => {
        setShowDeletePopup(true);
        userFormik.setFieldValue('id', id);
    };

    const editUserHandler = (row: EditUser) => {
        setIsEdit(true);
        userFormik.setValues({
            id: row?.id,
            first_name: row?.first_name,
            last_name: row?.last_name,
            email: row?.email,
            password: '',
            job_title: row?.job_title,
            phone_number: row?.phone_number,
        });
    };

    const signInValidationSchema = yup.object().shape({
        email: yup
            .string()
            .max(255)
            .required('Please Enter Email')
            .matches(EMAIL_REG, EMAIL),
        first_name: yup
            .string()
            .trim()
            .required('Please Enter First Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        last_name: yup
            .string()
            .trim()
            .required('Please Enter Last Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        password: isEdit
            ? yup.string().optional()
            : yup
                  .string()
                  .required('Please Enter Password')
                  .matches(PASSWORD_REG, PASSWORD),
        job_title: yup
            .string()
            .trim()
            .required('Please Enter Designation')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        phone_number: yup
            .string()
            .required('Please Enter Phone Number')
            .matches(phonesRegx[countryCode], PHONE),
    });

    const userFormik = useFormik({
        initialValues: {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            job_title: '',
            phone_number: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('phone_number', values.phone_number);
            formData.append('job_title', values.job_title);

            if (isEdit) {
                formData.append('id', values.id);
                dispatch(UpdateUserDataAction(formData));
            } else dispatch(AddUserDataAction(formData));
        },
    });

    const modalBody = (
        <Form onSubmit={(e: any) => userFormik.handleSubmit(e)}>
            <Row>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="First Name *" />
                        <CustomInput
                            type="text"
                            name="first_name"
                            maxLength={12}
                            placeholder="Enter First Name"
                            value={userFormik.values.first_name}
                            onChange={userFormik.handleChange}
                            onBlur={userFormik.handleBlur}
                        />
                        {userFormik.errors.first_name &&
                            userFormik.touched.first_name && (
                                <span className="text-error">
                                    {userFormik.errors.first_name}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Last Name *" />
                        <CustomInput
                            type="text"
                            name="last_name"
                            maxLength={12}
                            placeholder="Enter Last Name"
                            value={userFormik.values.last_name}
                            onChange={userFormik.handleChange}
                            onBlur={userFormik.handleBlur}
                        />
                        {userFormik.errors.last_name &&
                            userFormik.touched.last_name && (
                                <span className="text-error">
                                    {userFormik.errors.last_name}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Email *" />
                        <CustomInput
                            type="text"
                            name="email"
                            placeholder="Enter Email Address"
                            value={userFormik.values.email}
                            onChange={userFormik.handleChange}
                            onBlur={userFormik.handleBlur}
                        />
                        {userFormik.errors.email &&
                            userFormik.touched.email && (
                                <span className="text-error">
                                    {userFormik.errors.email}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Phone Number *" />
                        <CustomPhoneInput
                            country={'in'}
                            placeholder=""
                            value={userFormik.values.phone_number}
                            onChange={(phone: any, country: any) => {
                                setCountryCode(country?.dialCode);
                                userFormik.setFieldValue('phone_number', phone);
                            }}
                        />
                        {userFormik.errors.phone_number &&
                            userFormik.touched.phone_number && (
                                <span className="text-error">
                                    {userFormik.errors.phone_number}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Designation *" />
                        <CustomInput
                            type="text"
                            name="job_title"
                            placeholder="Enter Designation"
                            value={userFormik.values.job_title}
                            onChange={userFormik.handleChange}
                            onBlur={userFormik.handleBlur}
                        />
                        {userFormik.errors.job_title &&
                            userFormik.touched.job_title && (
                                <span className="text-error">
                                    {userFormik.errors.job_title}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                {!isEdit && (
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Password *" />
                            <CustomInput
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={userFormik.values.password}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                            />
                            {userFormik.errors.password &&
                                userFormik.touched.password && (
                                    <span className="text-error">
                                        {userFormik.errors.password}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                )}
            </Row>
        </Form>
    );
    const columns = [
        { id: 1, Header: 'First Name', accessor: 'first_name' },
        { id: 2, Header: 'Last Name', accessor: 'last_name' },
        { id: 3, Header: 'Email', accessor: 'email', width: 250 },
        {
            id: 4,
            Header: 'Phone Number',
            accessor: (originalRow: object | any) =>
                '+' + originalRow?.phone_number,
        },
        { id: 5, Header: 'Designation', accessor: 'job_title' },
        {
            id: 6,
            Header: 'User Type',
            accessor: (originalRow: object | any) =>
                originalRow?.is_owner ? 'Owner' : 'User',
        },
        {
            id: 7,
            Header: 'Actions',
            accessor: (originalRow: object | any) => (
                <>
                    {team_users.find(
                        (user: Object | any) => user.id === userData?.id,
                    )?.is_owner || userData?.id === originalRow?.id ? (
                        <div className="action-btn">
                            <span onClick={() => editUserHandler(originalRow)}>
                                <img src={EditProfile} alt="edit" />
                            </span>
                            {!originalRow?.is_owner &&
                                originalRow?.id !== userData?.id && (
                                    <span
                                        onClick={() =>
                                            deleteUser(originalRow?.id)
                                        }
                                    >
                                        <img src={TrashSolid} alt="delete" />
                                    </span>
                                )}
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            ),
        },
    ];

    return (
        <Fragment>
            {/* ADD and EDIT user modal */}
            <CustomModal
                show={showModal || isEdit}
                onHide={closeModal}
                size="lg"
                headerTitle={`${isEdit ? 'Update' : 'Add'} User`}
                body={modalBody}
                customButtonTitle="Cancel"
                onClickCustomButton={closeModal}
                onClickOrangeButton={userFormik.handleSubmit}
                orangeButtonTitle={
                    loading ? (
                        <div className="d-flex justify-content-center gap-2">
                            <Spinner
                                animation="border"
                                style={{ width: 23, height: 23 }}
                            />
                            <span>Please wait...</span>
                        </div>
                    ) : isEdit ? (
                        'Update'
                    ) : (
                        'Add'
                    )
                }
            />

            {/* DELETE conformation modal */}
            <CustomModal
                show={showDeletePopup}
                onHide={closeDeletePopup}
                headerTitle={'Delete User'}
                size="md"
                body={'Are you sure you want to delete this user?'}
                customButtonTitle="Cancel"
                onClickCustomButton={closeDeletePopup}
                onClickOrangeButton={() =>
                    dispatch(DeleteUserDataAction(userFormik.values.id))
                }
                orangeButtonTitle={
                    loading ? (
                        <div className="d-flex justify-content-center gap-2">
                            <Spinner
                                animation="border"
                                style={{ width: 23, height: 23 }}
                            />
                            <span>Please wait...</span>
                        </div>
                    ) : (
                        'Delete'
                    )
                }
            />

            <div className="db-main-title team-setting-title">
                <h2>Edit Team Settings</h2>
                {team_users.find(
                    (user: Object | any) => user.id === userData?.id,
                )?.is_owner && (
                    <CustomButton
                        buttonTitle={'Add User'}
                        onClick={() => setShowModal(true)}
                    />
                )}
            </div>
            {loading ? (
                <div className="mt-5">
                    <CustomLoader />
                </div>
            ) : (
                <div className="team-setting">
                    <div className="payment-table">
                        {/* <Table responsive>
                            <thead>
                                <tr>
                                    {columns?.map(item => (
                                        <th key={item?.id}>{item?.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {team_users.map((row: any) => (
                                    <tr key={row?.id}>
                                        {columns.map((item) => {
                                            let value;
                                            if (item.fieldKey === 'actions') {
                                                value = (team_users.find(
                                                    (user: Object | any) => user.id === userData?.id
                                                )?.is_owner || userData?.id === row?.id
                                                ) ?
                                                    <div className='action-btn'>
                                                        <span onClick={() => editUserHandler(row)} >
                                                            <img src={EditProfile} alt='edit' />
                                                        </span>
                                                        {(!row?.is_owner && row?.id !== userData?.id) &&
                                                            <span onClick={() => deleteUser(row?.id)}><img src={TrashSolid} alt='delete' /></span>}
                                                    </div> :
                                                    <></>
                                            } else if (item.fieldKey === 'role') {
                                                value = row?.is_owner ? 'Owner' : "User" // row[item.fieldKey]
                                            } else if (item.fieldKey === 'phone_number') {
                                                value = `+${row[item.fieldKey]}`
                                            } else value = row[item.fieldKey]

                                            return <td>{value}</td>
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </Table> */}

                        {/* CustomTabel */}
                        <CustomTabel
                            columns={columns}
                            data={team_users}
                            pagination
                        />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default EditTeamSettings;
