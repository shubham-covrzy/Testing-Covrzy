import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/ImageCropper';
import CustomButton from '../Buttons/CustomButton';
import OrangeButton from '../Buttons/OrangeButton';
import './ImageCropPopup.css';

let temp = () => {};

const ImageCropPopup = ({
    show,
    image,
    setCroppedImage,
    setPopupVisible,
    setFormErrors = temp,
    type = 'cover_img',
}: any) => {
    const [croppedArea, setCroppedArea] = useState<any>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = (
        croppedAreaPercentage: any,
        croppedAreaPixels: any,
    ) => {
        if (type === 'cover_img') {
            setCroppedArea(croppedAreaPixels);
        } else {
            setCroppedArea({ width: 800, height: 600, x: 350, y: 0 });
        }
    };

    const onImageCrop = async () => {
        let croppedImageCanvas = await getCroppedImg(image, croppedArea);
        let croppedImage = convertCanvasToImg(croppedImageCanvas);

        setCroppedImage(croppedImage);
        setFormErrors((prevState: any) => ({
            ...prevState,
            profile_pic: null,
        }));
        setPopupVisible(false);
    };

    const convertCanvasToImg = (canvas: any) => {
        let img = new Image();
        img.src = canvas.toDataURL();
        return img;
    };

    return (
        <Modal
            show={show}
            onHide={setPopupVisible}
            size={'lg'}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Crop Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="popup-container">
                    <div className="popup">
                        <div className="container-cropper">
                            <div className="cropper">
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <CustomButton
                    buttonTitle={'Cancel'}
                    onClick={() => setPopupVisible(false)}
                />
                <OrangeButton
                    buttonName={'Save Profile'}
                    onClick={onImageCrop}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default ImageCropPopup;
