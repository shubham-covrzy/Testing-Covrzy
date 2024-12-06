import React from 'react';
import { PopupModal } from 'react-calendly';

class CalendlyPopup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <PopupModal
                    url="https://calendly.com/covrzy/30min"
                    // pageSettings={this.props.pageSettings}
                    // utm={this.props.utm}
                    // prefill={this.props.prefill}
                    onModalClose={this.props.onModalClose}
                    // onModalClose={() => this.props.setIsOpen(false)}
                    open={this.props.isOpen}
                    rootElement={document.getElementById('root') as HTMLElement}
                />
            </div>
        );
    }
}

export default CalendlyPopup;
