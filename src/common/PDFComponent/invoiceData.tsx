/* eslint-disable no-lone-blocks */
import React from 'react';
import { dateConverter } from '../../Helper/commonFunction';
import { NumberFormat } from '../NumberFormat';

interface DataProps {
    invoiceData: Object | any;
}

class DataComponent extends React.Component<DataProps> {
    render() {
        return (
            <>
                <div
                    className="p-3"
                    dangerouslySetInnerHTML={{
                        __html: `
                    <div style="max-width: 1140px; width: 100%; margin: 0 auto; -webkit-print-color-adjust: exact !important;   -webkit-print-color-adjust:exact !important;
                    print-color-adjust:exact !important;">
                        <div style="display: flex; align-items: baseline; justify-content: space-between;">
                            <div>
                                <h1 style="font-size: 40px; margin-bottom: 15px;">Invoice</h1>
                                <div
                                    style="max-width: 300px; width: 100%;  padding: 0 10px; border-top: 2px solid #7743DC; border-bottom: 2px solid #7743DC;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:15px;">
                                        <h5 style="font-size: 22px; margin: 0;">Invoice# </h5>
                                        <p style=" margin-bottom: 0;">${this.props.invoiceData?.purchased_policy_id}</p>
                                    </div>
                                    <div style="display: flex; gap:15px; align-items: center; justify-content: space-between;">
                                        <h5 style="font-size: 22px; margin: 0;">Invoice Date</h5>
                                        <p style=" margin-bottom: 0;">${dateConverter(this.props.invoiceData?.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                            <ul style="list-style: none; text-align: end;">
                                <img src="https://i.postimg.cc/DwD2fXdQ/Group-1.png" alt="img" />
                                <li style="max-width: 185px; margin-left: auto; width: 100%; margin-top:15px">
                                    <p>COVRZY Insurance Services</p>
                                </li>
                                <li style="max-width: 200px; width: 100%;">
                                    <p>San Francisco 5214F Diamond Heights Blvd Unit #1261 San Francisco, CA 94131</p>
                                </li>
                                <li>
                                    <p>1 844 436 2765</p>
                                </li>
                            </ul>
                        </div>
                
                        <div class="bill-detail">
                            <div
                                style=" display: flex; gap: 15px; align-items: baseline; justify-content: space-between; max-width: 100%; margin-bottom: 20px; margin-top: 20px;">
                                <div
                                    style=" display: flex; align-items: baseline; justify-content: space-between; max-width: 300px; width:100%;">
                                    <h5 style="margin-right: 10px; margin: 0; font-size: 16px;">Company Name</h5>
                                    <span>${this.props.invoiceData?.company?.company_name}</span>
                                </div>
                                <div
                                    style=" display: flex; align-items: baseline; justify-content: space-between; max-width: 300px; width:100%;">
                                    <h5 style="margin-right: 10px;  margin: 0; font-size: 16px;">Company Address</h5>
                                    <span>
                                        ${this.props.invoiceData?.company?.business_address ? this.props.invoiceData?.company?.business_address : '-'}
                                    </span>
                                </div>
                            </div>
                            <div
                                style="display: flex; gap: 15px; align-items: center; justify-content: space-between; max-width: 100%; width: 100%;">
                                <div
                                    style=" display: flex; align-items: baseline; justify-content: space-between; max-width: 300px; width:100%;">
                                    <h5 style="margin-right: 10px; margin: 0; font-size: 16px;">Start Date</h5>
                                    <span>${dateConverter(this.props.invoiceData?.start_date)}</span>
                                </div>
                                <div
                                    style=" display: flex; align-items: baseline; justify-content: space-between; max-width: 300px; width:100%;">
                                    <h5 style="margin-right: 10px;  margin: 0; font-size: 16px;">End Date</h5>
                                    <span>${dateConverter(this.props.invoiceData?.end_date)}</span>
                                </div>
                            </div>
                        </div>
                
                        <table style="width: 100%; margin-top: 20px; border-spacing: 0;">
                            <thead>
                                <tr style="text-align: justify;background-color: #7743DC; color: #fff; height: 40px;">
                
                                    <th style="padding-left: 15px;">${this.props.invoiceData?.package ? 'Package' : 'Policy'} Name</th>
                                    <th style="text-align: end; padding-right: 15px;">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background-color: #292c4e4d; height: 40px;">
                                    <td style="padding-left: 15px; width: 1080px;">
                                    ${
                                        this.props.invoiceData?.package
                                            ? this.props.invoiceData?.package
                                                  ?.package_name
                                            : this.props.invoiceData?.policy
                                              ? this.props.invoiceData?.policy
                                                    ?.policy_name
                                              : ''
                                    }
                                ${this.props.invoiceData?.package ? `<span>(${this.props.invoiceData?.plan_type.toUpperCase()})</span>` : ''}
                                    </td>
                                    <td style="padding-right: 15px; text-align: end; width: 250px;">
                                        ${NumberFormat(this.props.invoiceData?.payment_id?.amount - this.props.invoiceData?.payment_id?.taxes)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <div
                                style="display: flex; align-items: center; justify-content: space-between; max-width: max-content; height: 50px; margin-left: auto; ">
                                <p style="font-size: 18px; margin-right: 10px; margin-bottom: 0;">Subtotal</p>
                                <p style="margin-bottom: 0; padding-right: 10px;">
                                    ${NumberFormat(this.props.invoiceData?.payment_id?.amount - this.props.invoiceData?.payment_id?.taxes)}
                                </p>
                            </div>
                            <div
                                style="display: flex; align-items: center; justify-content: space-between; max-width: 150px; height: 50px; margin-left: auto; ">
                                <p style="font-size: 18px; margin-right: 10px !important; margin: 0;">Tax</p>
                                <p style="margin: 0; padding-right: 10px;">
                                    ${NumberFormat(this.props.invoiceData?.payment_id?.taxes)}
                                </p>
                            </div>
                
                            <div
                                style="display: flex; align-items: center; justify-content: space-between; max-width: 160px; height: 32px; color: #fff; width: 100%; background-color: #7743DC; margin-left: auto; ">
                                <p style="font-size: 18px; margin-left: 10px !important; margin: 0;">Total</p>
                                <p style="margin: 0; padding-right: 10px;">
                                    ${NumberFormat(this.props.invoiceData?.payment_id?.amount)}
                                </p>
                            </div>
                        </div>
                    </div>`,
                    }}
                ></div>
            </>
        );
    }
}

export default DataComponent;
