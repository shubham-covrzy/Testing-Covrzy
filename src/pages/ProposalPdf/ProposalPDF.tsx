import React from 'react';
import {
    Document,
    Page,
    Text,
    PDFDownloadLink,
    Image,
    StyleSheet,
    View,
} from '@react-pdf/renderer';
import pdfPage from '../../assets/images/Proposal-page.jpg';
import pdfImg from '../../assets/images/Proposal_PageLast.jpg';
import heroProposal from '../../assets/images/heroPDFimg.jpeg';
import proposalPDFBackground1 from '../../assets/images/proposalPDFBackground1.jpeg';
import Table from '../../common/ProPdfComponents/Table';
import proposalPDFBackground2 from '../../assets/images/proposalPDFBackground2.jpeg';

// interface ProposalData {
//   title: string;
//   description: string;
// }

// interface ProposalPDFProps {
//   data: ProposalData;
// }

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        orientation: 'portrait',
    },
    view: {
        width: '100%',
        height: '100%',
        padding: 0,
        backgroundColor: 'white',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    companyName: {
        top: '33%',
        position: 'absolute',
        fontSize: 32,
        color: '#FF5733',
        textAlign: 'center',
        left: '0%',
        right: '0%',
        // transform: "translate(-50%, 0%)",
    },
    date: {
        top: '40%',
        position: 'absolute',
        fontSize: 16,
        color: '#FF5733',
        textAlign: 'center',
        left: '0%',
        right: '0%',
    },
    insuranceHeading: {
        fontSize: 32,
        position: 'absolute',
        top: '5%',
        left: 0,
        right: 0,
        margin: '5px',
        textAlign: 'center',
    },
});

const ProposalPDF = (props: any) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <PDFDownloadLink
                document={
                    <Document>
                        <Page style={styles.page}>
                            {/* Add the background image */}
                            <View style={styles.view}>
                                <Image
                                    src={heroProposal}
                                    style={styles.backgroundImage}
                                />
                            </View>
                            {/* Add text to the PDF */}
                            {/* <Text style={styles.companyName}>Date</Text> */}
                            <Text style={styles.date}>
                                {new Date().toLocaleDateString('en-GB')}
                            </Text>
                        </Page>
                        <Page>
                            <Image src={pdfPage} />
                        </Page>
                        {props.data.length !== 0 &&
                            props.data.map((el: any, index: number) => (
                                <Page style={styles.page} key={index}>
                                    <View style={styles.view}>
                                        <Image
                                            src={proposalPDFBackground1}
                                            style={styles.backgroundImage}
                                        />
                                    </View>
                                    <Text style={styles.insuranceHeading}>
                                        Insurance Policy 1
                                    </Text>
                                    <Table data={el} />
                                </Page>
                            ))}

                        <Page style={styles.page}>
                            <View style={styles.view}>
                                <Image
                                    src={proposalPDFBackground2}
                                    style={styles.backgroundImage}
                                />
                            </View>
                            {/* <Table data={props.data} /> */}
                        </Page>
                        <Page>
                            <Image src={pdfImg} />
                        </Page>
                    </Document>
                }
                fileName="proposal.pdf"
            >
                {({ blob, url, loading, error }) => (
                    <div>
                        <span style={{ color: '#7743DC' }}>
                            {loading
                                ? 'Loading document...'
                                : 'Save Quotation Package'}
                        </span>
                    </div>
                )}
            </PDFDownloadLink>
        </div>
    );
};

export default ProposalPDF;
