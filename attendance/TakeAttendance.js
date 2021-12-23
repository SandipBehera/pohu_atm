import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, ScrollView, FlatList, TouchableHighlight } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { background, backgroundColor, boxShadow, height, marginTop, width } from "styled-system";
import { Center } from "native-base";
import { ThemeProvider, Button, Avatar, Input } from "@react-navigation/native";
import { Header } from "react-native-elements/dist/header/Header";
import Sidebar from "../component/headder/LeftComponent";
import HeadderComponent from "../component/headder/LeftComponent";
import FooterComponent from "../component/footer/FooterComponent";
import { Card, ListItem, Icon, FAB } from 'react-native-elements';
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from '@react-navigation/native';
export default function TakeAttendanceComponent(props) {
    const navigation = useNavigation();
    const cls = props.route.params["cls"];
    //const cls = "1A";
    const subject = ["select Subject","math", "english", "physics", "science"];
    const [selectDt,setSelectDt]=useState("math");
    
    const name = props.route.params["name"];
    const email = props.route.params["mail"];
    const [btnval,setBtnVal]=useState("");
    const bootstrapStyle = new BootstrapStyleSheet();
    const [logTime,setLogtime]=useState("");
    console.log(logTime)
    const { s } = bootstrapStyle;
    //submit phase running
    const onsubmit = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        const DT = year + '-' + month + '-' + date;
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const logtime = hours + ":" + minutes + ":" + seconds;
        
        const datas = JSON.stringify({
            "data": cls
        });
        let tattdenaceData = "";
        if(logTime){
            tattdenaceData = 
        JSON.stringify({
            "data": {
                "mail": email,
                "cls": cls,
                "sub": selectDt,
                "date": DT,
                "loginTime": logTime,
                "logoutTime": logtime
            }
        })

        }else{
        tattdenaceData = 
        JSON.stringify({
            "data": {
                "mail": email,
                "cls": cls,
                "sub": selectDt,
                "date": DT,
                "loginTime": logtime,
                "logoutTime": ""
            }
        })
    }
        console.log(datas)
        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/student_list',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': 'null'
            },
            data: datas
        };

        axios(config)
            .then(response => {
                const slist = response.data["data"]

                console.log(datas)

                var config1 = {
                    method: 'POST',
                    url: 'http://34.136.41.197:5000/teacherAttendance',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': 'null'
                    },
                    data: tattdenaceData
                };
               
                axios(config1)
                    .then(response => {
                        const teacherAttendance = response.data["message"]
                        console.log(teacherAttendance)
                        if(logTime){
                            alert("logout SuccessFully");
                            navigation.navigate('home_work', { slist: slist, cls: cls, subject: selectDt, name: name, email: email });
                        }
                        else{
                            alert("Login SuccessFully");
                            navigation.navigate('attendance-s', { slist: slist, cls: cls.toLocaleLowerCase(), subject: selectDt, name: name, email: email });
                        }
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                // console.log(slist)
                //navigation.navigate('attendance-s', { slist: slist,cls:cls.toLocaleLowerCase(),subject:selce,name:name,email:email});
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    return (
        <View style={[styles.container]}>
            {/* <HeadderComponent name={name} /> */}
            <ScrollView>
                <View style={[styles.flex, styles.roundlg, styles.shadowlg]}>
                    <View style={[styles.wd, styles.flex, s.p3, styles.bottom_border]}>
                        <View style={[styles.roundlg]}>
                            <Text style={styles.txtclr, styles.big_font}>Teacher Attendance</Text>
                        </View>
                    </View>
                    <View style={styles.container}>

                        <View style={styles.inputView}>
                            <Text >Class Type</Text>
                            <Text style={styles.TextInput}>
                                {cls}
                            </Text>
                        </View>
                        <View style={styles.inputView}>
                            <Text>Select Subject</Text>
                            <SelectDropdown
                                data={subject}
                                keyExtractor={item => item.index.toString()}
                                style={styles.TextInput}
                                onSelect={(selectedItem) => {
                                    setSelectDt(selectedItem)
                                    var date = new Date().getDate();
                                    var month = new Date().getMonth();
                                    var year = new Date().getFullYear();
                                    const DT = year + '-' + month + '-' + date;
                                    const subject = JSON.stringify({
                                        "data": {
                                            // "mail": email,
                                            // "date": DT,
                                            // "sub": selectDt,
                                            // "cls": cls,

                                            "mail": "admin@srishtiworldschools.in",
                                            "date": "2021-10-18",
                                            "sub": "science",
                                            "class": "1A"
                                        }
                                    })
                                    var config2 = {
                                        method: 'POST',
                                        url: 'http://34.136.41.197:5000/teachersJson',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Access-Control-Allow-Headers': '*',
                                            'Access-Control-Allow-Origin': 'null'
                                        },
                                        data: subject
                                    };
                                    console.log(subject)
                                    axios(config2)
                                        .then(response => {
                                            const subj= response.data["data"]
                                            console.log(subj)
                                            if(subj==="hello"){
                                                setBtnVal("Submit Login")
                                            }
                                            else{
                                                setLogtime(subj["data"]["loginTime"]);
                                                setBtnVal("Submit Logout");
                                            }
                                            console.log(logTime)
                                            //navigation.navigate('attendance-s', { slist: slist, cls: cls.toLocaleLowerCase(), subject: selce, name: name, email: email });
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                }
                                }

                            />
                        </View>
                        <TouchableOpacity disabled={!selectDt} style={styles.loginBtn} onPress={onsubmit} >
                            <Text style={styles.loginText}>{btnval}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <FooterComponent email={email} name={name}></FooterComponent>
        </View>
    )
}
const styles = StyleSheet.create({
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
        backgroundColor: '#f5f7f8',
    },
    two: {
        flex: 2,
        borderLeftWidth: 2,
        borderLeftColor: "#ffff"
    },
    container: {
        flex: 1,
        backgroundColor: "#ffff",
        justifyContent: 'space-around',
    },
    bimage: {
        flex: 1,
        justifyContent: "center"
    },
    image: {
        marginBottom: 40,
        width: "50%",
        height: "20%"

    },
    txtclr: {
        color: "#0d0c22",

    },
    txtMargin: {
        marginTop: "-0.5%",
        marginBottom: "0.5%"
    },
    txtclrlightblack: {
        color: "#9297ad",
    },
    txtprimary: {
        fontSize: 20,
        fontWeight: '600',
        position: "relative"
    },
    inputView: {
        backgroundColor: "#c6c1ca",
        borderRadius: 2,
        width: 410,
        height: 70,
        marginBottom: 20,

    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
        width: 410,
        textAlign: "center",
        borderColor: "#420fbf",
        fontWeight: "bold",
        fontSize: 18
    },
    loginBtn: {
        width: 410,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#420fbf"

    },
    loginText: {
        color: "#ffff",
        textAlign: "center"
    },
    flex: {
        display: "flex",
        flexWrap: "nowrap",
        backgroundColor: "#3ac6fb"
    },
    hedding: {
        paddingTop: 10,
        position: "relative",
        paddingBottom: 10,
        alignItems: "center",
        flex: 0.3,
        borderWidth: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: "beige",


    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    roundlg: {
        borderRadius: 4,
    },
    sm: {
        margin: 4,
    },
    wd: {
        width: 1250,

    },
    shadowlg: {
        shadowColor: "#0000",
        shadowRadius: 4,
        shadowOpacity: 0.5
    },
    big_font: {
        fontSize: 20,
    },
    bottom_border: {
        borderBottomWidth: 1,
        borderBottomColor: "#ffff"
    },
    fixed_height: {
        height: "50%",
    },
    full_height: {
        height: "330",
    },
    bottomMargin: {
        marginBottom: "0.5%",
        marginTop: "0.5%",
    },
});