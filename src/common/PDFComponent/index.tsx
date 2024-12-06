import React from 'react';
import ReactToPrint from 'react-to-print';
import print from '../../assets/images/printicon.png';
import PreImageButton from '../Buttons/PreImageButton';
import DataComponent from './invoiceData';

interface PDFState {
    imageShow: boolean;
}

interface PDFProps {
    invoiceData: Object | any;
}

class PdfComponent extends React.Component<PDFProps, PDFState> {
    componentRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            imageShow: false,
        };
    }

    setInPrintPreview(status: boolean) {
        this.setState({ ...this.state, imageShow: status });
    }

    render() {
        return (
            <div>
                <div className="bottom_button">
                    <ReactToPrint
                        onBeforePrint={() => this.setInPrintPreview(true)}
                        content={() => this.componentRef}
                        trigger={() => (
                            <PreImageButton
                                buttonTitle="Print"
                                PreImage={print}
                                loading={this.state.imageShow}
                            />
                        )}
                        pageStyle="print"
                        documentTitle=" "
                        onAfterPrint={() => this.setInPrintPreview(false)}
                    />
                </div>

                <div className="d-none">
                    <DataComponent
                        {...this.props}
                        ref={(response: any) => (this.componentRef = response)}
                    />
                </div>
            </div>
        );
    }
}

export default PdfComponent;
