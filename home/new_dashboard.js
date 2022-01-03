import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native';
import { Avatar, ListItem, Icon, Card } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import HeadderComponent from '../component/headder/LeftComponent';
import axios from 'axios';
import FooterComponent from "../component/footer/FooterComponent";
import { TaskContext } from '../DataContext/TaskContext';
export default function Dashboard(props) {
    const [school, setSchool] = useState('Srishti World Schools');
    const tddt=useContext(TaskContext)
    const name = tddt.name;
    const mail = tddt.email;

    const onsubmit = () => {
        const data = JSON.stringify({
            "assigned": mail
        });
        var config = {
            method: 'POST',
            url: 'http://10.0.0.4:5001/taskassign',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': 'null'
            },
            data: data
        };

        axios(config)
            .then(response => {
                var description = response.data["data"]
                var TaskData = response.data["populator"]
                props.navigation.navigate("Root",{screen:'ViewTask', params:{ desc: description, mail: mail, name: name, taskdata: TaskData }});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onQR = () => {
        const datas = JSON.stringify({
            "data": "b9355707-0fb2-464f-bc87-a5fa3ff1bc15"
        });
        console.log(datas);
        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/qrcode',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': 'null'
            },
            data: datas
        };

        axios(config)
            .then(response => {
                const QR_Data = response.data["data"]
                props.navigation.navigate("attendance-t", { cls: QR_Data["class"], name: name, mail: mail });
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (<ListItem key={item} bottomDivider>
        <Avatar size="medium" rounded source={{ uri: item.avatar_url }} />

        <ListItem.Content style={{ paddingLeft: 10, paddingRight: 20, padingBottom: 20, paddingTop: 10 }}>
            <ListItem.Title style={{ fontSize: 15 }}>{item.name}</ListItem.Title>
            <Text style={{ fontSize: 11 }}>{item.subtitle}</Text>
        </ListItem.Content>
        <Icon name="checkcircle" type="antdesign" color="green" />
        <Icon name="circle-with-cross" type="entypo" color="red" />
    </ListItem>)
    const renderMsg = ({ item }) => (<ListItem key={item} bottomDivider>
        <Avatar size="medium" rounded source={{ uri: item.avatar_link }} />

        <ListItem.Content style={{ paddingLeft: 10, paddingRight: 20, padingBottom: 20, paddingTop: 10 }}>
            <ListItem.Title style={{ fontSize: 15 }}>{item.title}</ListItem.Title>
            <Text style={{ fontSize: 11 }}>{item.msg}</Text>
        </ListItem.Content>
        <Icon name="checkcircle" type="antdesign" color="green" />
        <Icon name="circle-with-cross" type="entypo" color="red" />
    </ListItem>)
    const list = [
        {
            name: 'Teacher asked for approval',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: ''
        },
        {
            name: 'Teacher asked for approval',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Reason for rejection.Reason for rejection.Reason for rejection.'
        },
        {
            name: 'Teacher asked for approval',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Reason for rejection.Reason for rejection.Reason for rejection.'
        },

    ]

    const Message = [
        {
            title: 'Teacher asked for approval',
            avatar_link: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            msg: ''
        },


    ]

    return (
        <View>
            {/* <View>
                <HeadderComponent name={name} mail={mail} />
            </View> */}
            <ScrollView style={{marginTop:10}}>
                <SafeAreaView style={styles.middleContent}>

                    <View >
                        <View style={{ marginTop: 0, marginLeft: 18 }}>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#1976D2' }}>Welcome Back,</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#1976D2' }}>{name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', left: 35 }}>
                            <TouchableOpacity style={{ backgroundColor: '#1976D2', width: 93, height: 33, borderRadius: 10, top: 30, paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 11 }}><Text style={{ color: 'white' }}>Approvals</Text></TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 93, height: 33, borderRadius: 10, top: 30, paddingTop: 8, paddingBottom: 8, paddingLeft: 18, paddingRight: 18, marginLeft: 30 }}><Text style={{}}>Circulars</Text></TouchableOpacity>
                        </View>
                        <Text style={{ fontWeight: '500', fontSize: 13, top: 40, left: 31, top: 50 }}>Today</Text>

                        <View style={{ top: 60 }}>
                            <FlatList
                                keyExtractor={keyExtractor}
                                data={list}
                                renderItem={renderItem}
                            />
                        </View>
                        <View style={{ top: 60 }}>
                            <Text style={{ fontWeight: '500', fontSize: 13, left: 31, top: 20 }}>Yesterday</Text>
                            <View style={{ top: 30 }}>
                                <FlatList
                                    keyExtractor={keyExtractor}
                                    data={Message}
                                    renderItem={renderMsg}
                                />
                            </View>
                        </View>
                    </View>
                    
                </SafeAreaView>
                
            </ScrollView>
            <View >
                <FooterComponent email={mail} name={name} ></FooterComponent>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
        justifyContent: 'space-around',
    },
    middleContent:{
        ...Platform.select({
            ios:{
                height:670
            },
            android:{
                height:650
            }
        })
    },
    bgImage: {
        flex: 1,
        marginHorizontal: -20,
    },
    section: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:160
    },
    sectionLarge: {
        flex: 2,
        justifyContent: 'space-around',
    },
    sectionHeader: {
        marginBottom: 8,
    },
    priceContainer: {
        alignItems: 'center',
    },
    description: {
        padding: 15,
        lineHeight: 25,
    },
    titleDescription: {
        color: '#19e7f7',
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
        fontSize: 15,
    },
    title: {
        marginTop: 30,
    },
    price: {
        marginBottom: 5,
    },
    priceLink: {
        borderBottomWidth: 1,
        borderBottomColor: '#555CC4',
    },
    row: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginTop: 10
    },
    box: {
        flex: 1,
        height: 170,
        backgroundColor: 'transparent',
    },
    sbox: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
    },
    two: {
        flex: 2,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,

    },
    fcol: {
        flex: 1,
    },
    loginBtn: {
        height: 170,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 20,

    },
    footerbtn: {
        height: 60,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10,
    },
    card: {
        flex: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        marginBottom: 1.85,
        width: 420
    },

    bgone: {
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: "#fdbb38",
        backgroundColor: "#f0c162",
        height: 100,
        width: 409,
        marginLeft: 12
    },
    pgmargin: {
        marginLeft: 10,
        height: 100,
        width: 300,
    },
    alignItemCenter: {
        alignItems: "center"
    },
    justifycontentbetwwn: {
        justifyContent: "center"
    },
    dflex: {
        display: "flex"
    },
    dbIcon: {
        fontSize: 25,
        width: 60,
        height: 60,
        borderRadius: 10,
        color: "#ffff"
    },
    cardbody: {
        padding: 24,
        flex: 1,
        backgroundColor: "#eaeaea"
    },
    cardHeader: {
        backgroundColor: "#ffff",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea",
        padding: 15
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,

    },
    playButton: {
        backgroundColor: '#FEFEFE',
        alignItems: 'flex-start',
        height: 30,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    footerRow: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    activityfeed: {
        marginLeft: 5,
        padding: 0
    },
    feeditem: {
        borderLeftWidth: 1,
        borderLeftColor: "#e4e8eb",
        paddingLeft: 20,
        position: "relative"
    },
    feedtext: {
        color: "#777",
        position: "relative",
        fontSize: 20
    },
    feeddate: {
        position: "relative",
        color: "#777",
        textTransform: "uppercase",
        fontSize: 13
    },
    ititle: {
        marginTop: 30,
        fontSize: 20
    },
    emailText: {
        top: 5,
        fontSize: 10
    },

});
