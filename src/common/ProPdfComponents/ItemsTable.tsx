import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import TableRow from './TableRow';

interface ItemsTableProps {
    data: any;
}

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

const ItemsTable: React.FC<ItemsTableProps> = ({ data }) => (
    <View style={styles.tableContainer}>
        <TableRow items={data} />
    </View>
);

export default ItemsTable;
