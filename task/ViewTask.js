import React, { useEffect, useContext, useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Button, Text, ImageBackground, ScrollView, FlatList, Dimensions } from "react-native";
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import axios from "axios";
import FooterComponent from "../component/footer/FooterComponent";
import { Card, ListItem, Icon, FAB, Tab, TabView } from 'react-native-elements';
import { TaskContext } from "../DataContext/TaskContext";
import { flex, verticalAlign } from "styled-system";
export default function ViewTask({ route, navigation, props }) {
    const bootstrapStyle = new BootstrapStyleSheet();
    const tsdt = useContext(TaskContext)
    let [TaskData, setTaskData] = useState(tsdt.taskdata);
    console.log(TaskData)
    const [tabIndex, setTabIndex] = useState("");
    const { image } = { uri: "https://cutewallpaper.org/21/abstract-background-hd/light-grey-abstract-background-hd-cool-7-2-Tiffany-Hayes-.jpg" };
    const { s } = bootstrapStyle;
    const mail = tsdt.email;
    const name = tsdt.name;
    //console.log(TaskData["activeTaskID"][0]);
    let [active, setActive] = useState("true");
    let [urgent, setUrgent] = useState("false");
    let [backlogs, setBacklogs] = useState("false");
    let [future, setFuture] = useState("false");
    let fetchMetrics = () => {
        const data1 = JSON.stringify({
            "assigned": mail
        });
        var config = {
            method: 'POST',
            url: 'http://10.0.0.2:5001/taskassign',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': 'null'
            },
            data: data1
        };

        axios(config)
            .then(response => {
                setTaskData(response.data["populator"]);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    let actionselect = (actionval) => {
        console.log("actio val:"+actionval);
        if (actionval === "Active") {
            setActive("true");
            setUrgent("false");
            setBacklogs("false");
            setFuture("false");
            fetchMetrics();
        }
        else if (actionval === "urgent") {
            setActive("false");
            setUrgent("true");
            setBacklogs("false");
            setFuture("false");
            fetchMetrics();
        }
        else if (actionval === "backlogs") {
            
            setActive("false");
            setUrgent("false");
            setBacklogs("true");
            setFuture("false");
            fetchMetrics();
        }
        else {
            setActive("false");
            setUrgent("false");
            setBacklogs("false");
            setFuture("true");
            fetchMetrics();
        }
    }
    const onsubmit = (index) => {
        const id = index;
        console.log("the post id is:" + id);
        const data = JSON.stringify({
            "obji": id
        });
        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/taskassign1',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(response => {
                var ContentData = response.data["json"];
                navigation.navigate('task-update', { cInput: ContentData, taskID: id, mailId: mail });
            })
            .catch(function (error) {
                console.error(error)
            })
    }


    function checkPriority(taskDescription, priority) {
        if (taskDescription === "s" && priority === 'm') {
            return (
                <View >
                    <View >
                        <View>
                            <Text style={{ textAlign: "center"}}>Nothing To Display</Text>
                        </View>
                    </View>
                </View>
            )
        }
        else{
        if (priority === "high") {
            return highPriorityTask(taskDescription, priority)
        }
        else if (priority === "medium") {
            return mediumPriorityTask(taskDescription, priority)
        }
        else {
            return lowPriorityTask(taskDescription, priority)
        }
        }
    }
    const lowPriorityTask = (taskDescription, priority) => {
            return (

                <View style={styles.LowPrior}>

                    <View style={styles.footerRow} >
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={28}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.ltext}>{taskDescription}</Text>

                        </View>
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.ltext1}>Full Details</Text>
                        </View>

                    </View>
                    <View style={styles.footerRow} >
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>{priority}</Text>

                        </View>
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>Teacher</Text>
                        </View>
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>Satuarday</Text>
                        </View>
                    </View>
                </View>
            );  
    }
    const highPriorityTask = (taskDescription, priority) => {
            return (
                <View style={styles.highPrior}>
                    <View style={styles.footerRow} >
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={28}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.ltext}>{taskDescription}</Text>

                        </View>
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.ltext1}>Full Details</Text>
                        </View>

                    </View>
                    <View style={styles.footerRow} >
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>{priority}</Text>

                        </View>
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>Teacher</Text>
                        </View>
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>Satuarday</Text>
                        </View>
                    </View>
                </View>
            );
        
    }
    const mediumPriorityTask = (taskDescription, priority) => {
            return (
                <View style={styles.MidPrior}>
                    <View style={styles.footerRow} >
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={28}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.ltext}>{taskDescription}</Text>

                        </View>
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.ltext1}>Full Details</Text>
                        </View>

                    </View>
                    <View style={styles.footerRow} >
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>{priority}</Text>

                        </View>
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>Teacher</Text>
                        </View>
                        <Icon
                            name='sticky-note-2'
                            type='material'
                            color='#000'
                            size={20}
                            style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                        />
                        <View style={[styles.sbox, styles.fcol]} >
                            <Text style={styles.stext}>Satuarday</Text>
                        </View>
                    </View>
                </View>
            );
        
    }
    const ActiveTask = Object.keys(TaskData["activeTaskID"][0]).map((key, index) => (

        <TouchableOpacity key={index} onPress={() => onsubmit(key)}>
            <View>
                {checkPriority(TaskData["activeTaskID"][0][key][3], TaskData["activeTaskID"][0][key][0])}
            </View>
        </TouchableOpacity>
    ));
    const UrgentTask = Object.keys(TaskData["urgentTaskID"][0]).map((key, index) => (
        <View>
            <TouchableOpacity key={index} onPress={() => onsubmit(key)}>
                {checkPriority(TaskData["urgentTaskID"][0][key][3], TaskData["urgentTaskID"][0][key][0])}
            </TouchableOpacity>
        </View>

    ))
    const BacklogsTask = Object.keys(TaskData["backlogTaskID"][0]).map((key, index) => (
        <View>
            <TouchableOpacity key={index} onPress={() => onsubmit(key)}>
                {checkPriority(TaskData["backlogTaskID"][0][key][3], TaskData["backlogTaskID"][0][key][0])}
            </TouchableOpacity>
        </View>
    ))
    const FutureTask = Object.keys(TaskData["futureTaskID"][0]).map((key, index) => (
        <View>
            <TouchableOpacity key={index} onPress={() => onsubmit(key)}>
                {checkPriority(TaskData["futureTaskID"][0][key][3], TaskData["futureTaskID"][0][key][0])}
            </TouchableOpacity>
        </View>

    ))

    return (
        <View style={[s.body, styles.container]}>
            <View>
                <Text style={{ color: "#1976D2", fontWeight: "600", fontSize: 17, lineHeight: 25, marginLeft: 15 }}>MyTasks</Text>
            </View>
            <View>
                <View style={{ flexDirection: 'row', left: 5 }}>
                    <TouchableOpacity onPress={() => actionselect('Active')} style={{ backgroundColor: '#1976D2', width: 93, height: 40, borderRadius: 10, top: 10, paddingTop: 9, paddingBottom: 8, }} >
                        <Text style={{ color: 'white',textAlign:"center" }}>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 93, height: 40, borderRadius: 10, top: 10, paddingTop: 9, paddingBottom: 8,marginLeft: 5 }} onPress={() => actionselect("urgent")}>
                        <Text style={{textAlign:"center"}}>Urgent</Text>
                        </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 93, height: 40, borderRadius: 10, top: 10, paddingTop: 9, paddingBottom: 8, marginLeft: 5 }} onPress={() => actionselect("backlogs")}>
                        <Text style={{ color: 'black',textAlign:"center" }}>Backlogs</Text>
                        </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 93, height: 40, borderRadius: 10, top: 10, paddingTop: 9, paddingBottom: 8,marginLeft: 5 }} onPress={() => actionselect("future")}>
                        <Text style={{textAlign:"center"}}>Future</Text>
                        </TouchableOpacity>
                </View>
                
            </View>
            <View style={styles.middleContent}>
               
                {active==="true"?<View style={{height:400,marginTop:"10%"}}><ScrollView style={{ flex: 1 }}>{ActiveTask}</ScrollView></View>:null}
                {urgent === "true" ? <View style={{height:400,marginTop:"10%"}}><ScrollView style={{ flex: 1 }}>{UrgentTask}</ScrollView></View> :null}
                {backlogs === "true" ? <View style={{height:400,marginTop:"10%"}}><ScrollView style={{ flex: 1 }}>{BacklogsTask}</ScrollView></View>:null}
                {future === "true" ? <View style={{height:400,marginTop:"10%"}}><ScrollView style={{ flex: 1 }}>{FutureTask}</ScrollView></View>:null}


                {/* <FAB title="+" placement="right" size="large" color="#18aefa" style={{ marginRight: 40 }} onPress={newTask} /> */}
            </View>
            <View >
                <FooterComponent email={mail} ></FooterComponent>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff"
    },
    middleContent: {
        ...Platform.select({
            ios: {
                height: 600
            },
            android: {
                height: 650
            }
        })
    },
    LowPrior: {
        width: '96%',
        height: 90,
        marginLeft: "2%",
        marginRight: "2%",
        backgroundColor: "#91bf80",
        marginTop: "2%",
        borderRadius: 15
    },
    highPrior: {
        width: '96%',
        height: 90,
        marginLeft: "2%",
        marginRight: "2%",
        backgroundColor: "#eb614d",
        marginTop: "2%",
        borderRadius: 15
    },
    MidPrior: {
        width: '96%',
        height: 90,
        marginLeft: "2%",
        marginRight: "2%",
        backgroundColor: "#d9b566",
        marginTop: "2%",
        borderRadius: 15
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
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
    },
    loginBtn: {
        height: 30,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 20,

    },
    loginText: {
        color: "#ffff",
        marginTop: "0.5%",
        textDecorationLine: "underline"
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
    ltext: {

        marginTop: 15,
        fontSize: 18,
        marginLeft: 5,
        fontWeight: "600",
        color: "#000"
    },
    stext: {
        marginTop: 15,
        fontSize: 12,
        marginLeft: 5,
        fontWeight: "600",
        color: "#000"
    },
    midstext: {
        marginTop: 15,
        fontSize: 12,
        marginLeft: 5,
        fontWeight: "600",
        color: "#936E00"
    },
    midltext: {
        color: "#000",
        marginTop: 15,
        fontSize: 18,
        marginLeft: 5,
        fontWeight: "600",
        color: "#936E00"
    },
    midltext1: {
        marginTop: 18,
        fontSize: 12,
        marginLeft: "40%",
        fontWeight: "600",
        color: "#936E00",
        textDecorationLine: "underline",

    },
    ltext1: {
        marginTop: 18,
        fontSize: 12,
        marginLeft: "40%",
        fontWeight: "600",
        color: "#000",
        textDecorationLine: "underline",

    },
    footerbtn: {
        height: 60,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10,
    },
    sbox: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
    },
    fcol: {
        flex: 2,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,

    },
    footerRow: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    feeditem: {
        borderLeftWidth: 1,
        borderLeftColor: "#e4e8eb",
        paddingLeft: 20,
        position: "relative"
    },
});

