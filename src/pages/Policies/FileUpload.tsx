import { Fragment } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useDispatch } from 'react-redux';
import CloudArrowUp from '../../assets/images/cloud-arrow-up.svg';
import CustomButton from '../../common/Buttons/CustomButton';
import { ToastAction } from '../../Redux/Actions/ToastAction';

const fileTypes = ['pdf', 'doc', 'docx', 'csv', 'xml', 'xlsx'];

const FileUpload = (props: any) => {
    const { file, onChange, multiple, fileTypeError } = props;
    const dispatch = useDispatch();

    return (
        <Fragment>
            <div className="drag-file-upload">
                <FileUploader
                    multiple={multiple}
                    fileOrFiles={file}
                    handleChange={onChange}
                    name="file"
                    types={fileTypes}
                    label="Drag & Drop to Upload File"
                    onTypeError={(err: string) =>
                        dispatch(
                            ToastAction({
                                show: true,
                                message: fileTypeError || err,
                                severity: 'danger',
                            }),
                        )
                    }
                />
                <div className="file-name-div mx-2 mt-1">
                    {file && multiple
                        ? `${file.length} file${file.length === 1 ? '' : 's'} seleted`
                        : file && !multiple
                          ? `File name: ${file.name}`
                          : ''}
                </div>
                <div className="drag-file-info">
                    <img src={CloudArrowUp} alt="" />
                    <h3>Drag & Drop to Upload File</h3>
                    <h5>OR</h5>
                    <CustomButton buttonTitle="Browse File" />
                </div>
            </div>
        </Fragment>
    );
};

export default FileUpload;
