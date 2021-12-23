import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Avatar, Icon } from "react-native-elements";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import AttendanceReport from '../attendance/AttendanceReport';
import Barchart from '../component/Plot/barplot';
export default function ParentScreen () {
    const [month, setMonth] = useState('January');
    const [colorSC, setColorSC] = useState("black");
    const [backgroundSC, setBackgroundSC] = useState("white");
    const [colorB, setColorB] = useState("black");
    const [backgroundB, setBackgroundB] = useState("white");
    const [component, setComponent] = useState(<AttendanceReport />);
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
    const clearState = () => {
        setBackgroundB('white')
        setColorB('black')
        setColorSC('black')
        setBackgroundSC('white')
    }
    const onBarchartClick = () => {
        console.log("hellooo");
        clearState()
        setBackgroundB('#1976D2')
        setColorB('white')
        setComponent(<Barchart />)
    }
    const onAttendanceClick = () => {
        console.log('hiii');
        clearState()
        setBackgroundSC('#1976D2')
        setColorSC('white')
        setComponent(<AttendanceReport />)
    }
    return (
        <SafeAreaView>
            <View>
                <ScrollView>
                    <View style={{ width: 414, height: 212, backgroundColor: '#1976D2', borderBottomLeftRadius: 25 }}>
                        <View style={{ top: 72, left: 34 }}>
                            <Avatar
                                size="xlarge"
                                source={{
                                    uri:
                                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.9}
                                avatarStyle={{ borderRadius: 10, }}
                            />
                        </View>
                        <Text style={{ marginLeft: 200, color: 'white', fontSize: 20, fontWeight: 'bold' }}>Manushi-III B</Text>
                        <Text style={{ marginLeft: 200, color: 'white', fontSize: 13 }}>Y12345</Text>
                    </View>
                    <Text style={{
                        color: 'black', fontSize: 18, top: 40, left: 37, fontWeight: '500'
                    }}>Subjects</Text>
                    <View style={{ top: 72, left: 34, flexDirection: 'row', }}>
                        <Avatar
                            size="large"
                            source={require('../assets/subject.png')}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.9}
                            avatarStyle={{ borderRadius: 10, }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16, fontWeight: '400', left: 8 }}>Telugu</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', left: 8 }}>A_Jyothi</Text>
                        </View>
                        <View style={{ left: 45 }}>
                            <Avatar
                                size="large"
                                source={require('../assets/subject.png')}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.9}
                                avatarStyle={{ borderRadius: 10, }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', left: 40 }}>
                            <Text style={{ fontSize: 16, fontWeight: '400', left: 8 }}>English</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', left: 8 }}>A_Jyothi</Text>
                        </View>
                    </View>
                    <View style={{ top: 92, left: 34, flexDirection: 'row', }}>
                        <Avatar
                            size="large"
                            source={require('../assets/subject.png')}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.9}
                            avatarStyle={{ borderRadius: 10, }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16, fontWeight: '400', left: 8 }}>Hindi</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', left: 8 }}>A_Jyothi</Text>
                        </View>
                        <View style={{ left: 45 }}>
                            <Avatar
                                size="large"
                                source={require('../assets/subject.png')}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.9}
                                avatarStyle={{ borderRadius: 10, }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', left: 40 }}>
                            <Text style={{ fontSize: 16, fontWeight: '400', left: 8 }}>Mathematics</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', left: 8 }}>A_Jyothi</Text>
                        </View>
                    </View>
                    <View style={{ top: 112, left: 34, flexDirection: 'row', }}>
                        <Avatar
                            size="large"
                            source={require('../assets/subject.png')}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.9}
                            avatarStyle={{ borderRadius: 10, }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16, fontWeight: '400', left: 8 }}>Science</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', left: 8 }}>A_Jyothi</Text>
                        </View>
                        <View style={{ left: 45 }}>
                            <Avatar
                                size="large"
                                source={require('../assets/subject.png')}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.9}
                                avatarStyle={{ borderRadius: 10, }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', left: 40 }}>
                            <Text style={{ fontSize: 16, fontWeight: '400', left: 8 }}>Social</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', left: 8 }}>A_Jyothi</Text>
                        </View>
                    </View>
                    <Text style={{
                        color: 'black', fontSize: 18, top: 130, left: 37, fontWeight: '500'
                    }}>Reports</Text>
                    <View style={{ flexDirection: 'row', top: 150, left: 37 }}>
                        <TouchableHighlight style={{
                            backgroundColor: backgroundSC, width: 102,
                            height: 33, borderRadius: 10, alignItems: 'center'
                        }} onPress={onAttendanceClick}><Text style={{ fontSize: 13, color: colorSC, padding: 8 }}>Attendance</Text></TouchableHighlight>
                        <TouchableOpacity onPress={() => onBarchartClick()} style={{
                            backgroundColor: backgroundB, width: 70,
                            height: 33, borderRadius: 10, marginLeft: 30, alignItems: 'center'
                        }}  >
                            <Text style={{ fontSize: 13, color: colorB, padding: 8 }}>Marks</Text></TouchableOpacity>
                    </View>
                    {component}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { marginTop: 190, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1 },
    row: { height: 32 },
    text: { textAlign: 'center' }
});