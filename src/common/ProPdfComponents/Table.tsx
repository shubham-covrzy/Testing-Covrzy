import React from 'react';
import { Page, Document, StyleSheet, View } from '@react-pdf/renderer';
import ItemsTable from './ItemsTable';

interface TableProps {
    data: any;
}

const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: 'column',
    },
    document: {
        position: 'absolute',
        top: '20%',
        left: '0%',
        right: '0%',
    },
});

const Table: React.FC<TableProps> = ({ data }) => (
    <View style={styles.document}>
        <ItemsTable data={data} />
    </View>
);

export default Table;
