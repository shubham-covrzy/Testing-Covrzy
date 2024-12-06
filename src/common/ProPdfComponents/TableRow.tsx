import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

interface Item {
    id: number;
    key: string;
    value: string;
    big: boolean;
}

interface TableRowProps {
    items: Item[];
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        margin: 'auto',
    },
    description: {
        width: '50%',
        textAlign: 'center',
        border: '1px solid black',
        padding: '8px',
        fontSize: '8px',
        fontWeight: 'bold',
    },
    bigDesciption: {
        width: '50%',
        textAlign: 'center',
        border: '1px solid black',
        padding: '32px',
        fontSize: '8px',
        fontWeight: 'bold',
    },
    xyz: {
        width: '50%',
        textAlign: 'center',
        border: '1px solid black',
        padding: '8px',
        fontSize: '8px',
    },
    bigxyz: {
        width: '50%',
        textAlign: 'center',
        border: '1px solid black',
        padding: '32px',
        fontSize: '8px',
    },
});

const TableRow: React.FC<TableRowProps> = ({ items }) => {
    const rows = items.map((item) => (
        <View style={styles.row} key={item.id.toString()}>
            {item.big ? (
                <Text style={styles.bigDesciption}>{item.key}</Text>
            ) : (
                <Text style={styles.description}>{item.key}</Text>
            )}
            {item.big ? (
                <Text style={styles.bigxyz}>{item.value}</Text>
            ) : (
                <Text style={styles.xyz}>{item.value}</Text>
            )}
        </View>
    ));
    return <Fragment>{rows}</Fragment>;
};

export default TableRow;
