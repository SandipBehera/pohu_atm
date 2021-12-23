import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Avatar, Icon } from "react-native-elements";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
export default function AttendanceReport() {
    const [month, setMonth] = useState('January');
    const [tableHead, setTableHead] = useState(['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    const [tableTitle, setTableTitle] = useState(['Week 1', 'Week 2', 'Week 3', 'Week 4']);
    const [tableData, setTableData] = useState([
        [<Icon name='check-box' type='material' color='green' />, <Icon name='check-box' type='material' color='green' />,
        <Icon name='check-box' type='material' color='green' />, <Icon name='check-box' type='material' color='green' />,
        <Icon name='squared-cross' type='entypo' color='red' />, <Icon name='squared-cross' type='entypo' color='red' />],
        [<Icon name='check-box' type='material' color='green' />, <Icon name='check-box' type='material' color='green' />,
        <Icon name='check-box' type='material' color='green' />, <Icon name='check-box' type='material' color='green' />,
        <Icon name='squared-cross' type='entypo' color='red' />, <Icon name='squared-cross' type='entypo' color='red' />],
        [<Icon name='check-box' type='material' color='green' />, <Icon name='check-box' type='material' color='green' />,
        <Icon name='check-box' type='material' color='green' />, <Icon name='check-box' type='material' color='green' />,
        <Icon name='squared-cross' type='entypo' color='red' />, <Icon name='squared-cross' type='entypo' color='red' />],
        [<Icon name='check-box' type='material' color='green' />, <Icon name='check-box' type='material' color='green' />,
        <Icon name='check-box' type='material' color='green' />, <Icon name='check-box' type='material' color='green' />,
        <Icon name='squared-cross' type='entypo' color='red' />, <Icon name='squared-cross' type='entypo' color='red' />],
    ]);
    const styles = StyleSheet.create({
        container: { marginTop: 190, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
        head: { height: 40, },
        wrapper: { flexDirection: 'row' },
        title: { flex: 1 },
        row: { height: 32 },
        text: { textAlign: 'center' }
    });
return(
        <View>
            <View style={{ flexDirection: 'column', top: 180, height: 200 }}>
                <Text style={{ left: 37 }}>Select Month</Text>
                <Picker
                    selectedValue={month}
                    onValueChange={(itemValue, itemIndex) =>
                        setMonth(itemValue)
                    }
                >
                    <Picker.Item label="January" value="January" />
                    <Picker.Item label="February" value="February" />
                    <Picker.Item label="March" value="March" />
                    <Picker.Item label="April" value="April" />
                    <Picker.Item label="May" value="May" />
                    <Picker.Item label="June" value="June" />
                    <Picker.Item label="July" value="July" />
                    <Picker.Item label="August" value="August" />
                    <Picker.Item label="September" value="September" />
                    <Picker.Item label="October" value="October" />
                    <Picker.Item label="November" value="November" />
                    <Picker.Item label="December" value="December" />
                </Picker>
            </View>
            <Text style={{ left: 37, top: 190, fontWeight: '600' }}>{month}</Text>
            <View style={styles.container} >
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={tableHead} flexArr={[1, 1, 1, 1, 1, 1,]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={styles.wrapper}>
                        <Col data={tableTitle} style={styles.title} heightArr={[32, 32]} textStyle={styles.text} />
                        <Rows data={tableData} flexArr={[1, 1, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
                    </TableWrapper>
                </Table>
            </View>
        </View>
)
        }