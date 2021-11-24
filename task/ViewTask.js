import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Button, Text, ImageBackground, ScrollView, FlatList, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Sidebar from "../component/headder/LeftComponent";
import HeadderComponent from "../component/headder/LeftComponent";
import FooterComponent from "../component/footer/FooterComponent";
import { Card, ListItem, Icon, FAB, Tab, TabView } from 'react-native-elements';
import { verticalAlign } from "styled-system";

export default function ViewTask({ route, navigation, props }) {
    const bootstrapStyle = new BootstrapStyleSheet();
    const description = route.params["desc"];
    const [tabIndex,setTabIndex]=useState("");
    const { image } = { uri: "https://cutewallpaper.org/21/abstract-background-hd/light-grey-abstract-background-hd-cool-7-2-Tiffany-Hayes-.jpg" };
    const { s } = bootstrapStyle;
    const mail = route.params["mail"];
    const name = route.params["name"];
    const newTask = () => {
        navigation.navigate('task-profile', { name: name, mail: mail });
    }
   if(tabIndex===0){
    console.log(description['activeTask']);
   }
   else if(tabIndex===1){
    console.log("Urgent");
   }
   else if(tabIndex===2){
    console.log("Backlogs");
   }
   else if(tabIndex===3){
    console.log("Future");
   }
    const onsubmit = (index) => {
        const id = index;
        console.log(id);
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
                navigation.navigate('task-update', { cInput: ContentData, taskID: id, mailId: mail, name: name });
            })
            .catch(function (error) {
                console.error(error)
            })
    }


    const ActiveTask = Object.keys(description["activeTask"][0]).map((key, index) => (
        <View>
            <TouchableOpacity  key={index} onPress={() => onsubmit(description["activeTask"][0][key])}>
            <View style={styles.LowPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>{key}</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Satuarday</Text>
                    </View>
                </View>
            </View>
            
            {/* <View style={styles.highPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>Tasks to be done</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Sunday</Text>
                    </View>
                </View>
            </View>
            <View style={styles.MidPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>Tasks to be done</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                </View>
            </View> */}
            </TouchableOpacity>
        </View>
        // <TouchableOpacity style={styles.feeditem} key={index} onPress={() => onsubmit(description[key])}>
        //     <View style={styles.footerRow} >

        //         <Icon
        //             raised
        //             name='adjust'
        //             type='font-awesome'
        //             color='#18aefa'
        //         />
        //         <View style={[styles.sbox, styles.fcol]} >
        //             <Text style={styles.ltext}>{key}</Text>
        //         </View>
        //     </View>
        // </TouchableOpacity>
    ))
    const  UrgentTask= Object.keys(description["urgentTask"][0]).map((key, index) => (
        <View>
            <TouchableOpacity  key={index} onPress={() => onsubmit(description["urgentTask"][0][key])}>
            <View style={styles.LowPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>{key}</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Satuarday</Text>
                    </View>
                </View>
            </View>
            
            {/* <View style={styles.highPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>Tasks to be done</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Sunday</Text>
                    </View>
                </View>
            </View>
            <View style={styles.MidPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>Tasks to be done</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                </View>
            </View> */}
            </TouchableOpacity>
        </View>
        // <TouchableOpacity style={styles.feeditem} key={index} onPress={() => onsubmit(description[key])}>
        //     <View style={styles.footerRow} >

        //         <Icon
        //             raised
        //             name='adjust'
        //             type='font-awesome'
        //             color='#18aefa'
        //         />
        //         <View style={[styles.sbox, styles.fcol]} >
        //             <Text style={styles.ltext}>{key}</Text>
        //         </View>
        //     </View>
        // </TouchableOpacity>
    ))
    const  BacklogsTask= Object.keys(description["backlogTask"][0]).map((key, index) => (
        <View>
            <TouchableOpacity  key={index} onPress={() => onsubmit(description["backlogTask"][0][key])}>
            <View style={styles.LowPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>{key}</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Satuarday</Text>
                    </View>
                </View>
            </View>
            
            {/* <View style={styles.highPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>Tasks to be done</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Sunday</Text>
                    </View>
                </View>
            </View>
            <View style={styles.MidPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>Tasks to be done</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                </View>
            </View> */}
            </TouchableOpacity>
        </View>
        // <TouchableOpacity style={styles.feeditem} key={index} onPress={() => onsubmit(description[key])}>
        //     <View style={styles.footerRow} >

        //         <Icon
        //             raised
        //             name='adjust'
        //             type='font-awesome'
        //             color='#18aefa'
        //         />
        //         <View style={[styles.sbox, styles.fcol]} >
        //             <Text style={styles.ltext}>{key}</Text>
        //         </View>
        //     </View>
        // </TouchableOpacity>
    ))
    const  FutureTask= Object.keys(description["futureTask"][0]).map((key, index) => (
        <View>
            <TouchableOpacity  key={index} onPress={() => onsubmit(description["futureTask"][0][key])}>
            <View style={styles.LowPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>{key}</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Satuarday</Text>
                    </View>
                </View>
            </View>
            
            {/* <View style={styles.highPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>Tasks to be done</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Sunday</Text>
                    </View>
                </View>
            </View>
            <View style={styles.MidPrior}>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={28}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext}>Tasks to be done</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.ltext1}>Full Details</Text>
                    </View>

                </View>
                <View style={styles.footerRow} >
                    <Icon
                        name='sticky-note-2'
                        type='material'
                        color='#1C6A00'
                        size={20}
                        style={{ verticalAlign: "center", marginTop: 12, marginLeft: 20 }}
                    />
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Low Importance</Text>

                    </View>
                    <View style={[styles.sbox, styles.fcol]} >
                        <Text style={styles.stext}>Teacher</Text>
                    </View>
                </View>
            </View> */}
            </TouchableOpacity>
        </View>
        // <TouchableOpacity style={styles.feeditem} key={index} onPress={() => onsubmit(description[key])}>
        //     <View style={styles.footerRow} >

        //         <Icon
        //             raised
        //             name='adjust'
        //             type='font-awesome'
        //             color='#18aefa'
        //         />
        //         <View style={[styles.sbox, styles.fcol]} >
        //             <Text style={styles.ltext}>{key}</Text>
        //         </View>
        //     </View>
        // </TouchableOpacity>
    ))
    return (
        <View style={[s.body, styles.container]}>
            <View>
                <HeadderComponent name={name} />
            </View>
            <View>
                <Text style={{ color: "#1976D2", fontWeight: "600", fontSize: 17, lineHeight: 25, marginLeft:15 }}>MyTasks</Text>
            </View>
            <View>
                <Tab value={tabIndex} onChange={setTabIndex}  indicatorStyle={{
                            backgroundColor: 'white',
                            height: 3,
                }}>
                    <Tab.Item title="Active"   titleStyle={{ fontSize: 10 ,color:"black"}} />
                    <Tab.Item title="Urgent" titleStyle={{ fontSize: 10 ,color:"black"}}/>
                    <Tab.Item title="Backlogs" titleStyle={{ fontSize: 10 ,color:"black"}}/>
                    <Tab.Item title="Future" titleStyle={{ fontSize: 10 ,color:"black"}}/>
                </Tab>
            </View>
            <View style={{ height: 650 }}>
                <TabView value={tabIndex} onChange={setTabIndex} >
                    <TabView.Item style={{width: '100%' }}>
                      
                           <ScrollView  style={{ flex: 1}}>
                              {ActiveTask}
                           </ScrollView>
                       
                      
                    </TabView.Item>
                    <TabView.Item style={{width: '100%' }}>
                            <ScrollView  style={{ flex: 1}}>
                                    {UrgentTask}
                                </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={{ width: '100%' }}>
                    <ScrollView  style={{ flex: 1}}>
                                    {BacklogsTask}
                                </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={{ width: '100%' }}>
                    <ScrollView  style={{ flex: 1}}>
                                    {FutureTask}
                                </ScrollView>
                    </TabView.Item>
                </TabView>
                {/* <ScrollView >
                    <View >
                        <View>
                            <ScrollView style={{ flex: 1, height: 700 }}>
                                {x}
                            </ScrollView>
                        </View>
                    </View>
                    <FAB title="+" placement="right" size="large" color="#18aefa" style={{ marginRight: 40 }} onPress={newTask} />
                </ScrollView> */}
                    <FAB title="+" placement="right" size="large" color="#18aefa" style={{ marginRight: 40 }} onPress={newTask} />
            </View>
            <View >
                <FooterComponent email={mail} name={name}></FooterComponent>
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
    LowPrior:{
        width:'96%',
        height:90,
        marginLeft:"2%",
        marginRight:"2%",
        backgroundColor:"#91bf80",
        marginTop:"2%",
        borderRadius:15},
    highPrior:{
        width:'96%',
        height:90,
        marginLeft:"2%",
        marginRight:"2%",
        backgroundColor:"#eb614d",
        marginTop:"2%",
        borderRadius:15},
    MidPrior:{
        width:'96%',
        height:90,
        marginLeft:"2%",
        marginRight:"2%",
        backgroundColor:"#d9b566",
        marginTop:"2%",
        borderRadius:15},
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
        color: "#000",
        marginTop: 15,
        fontSize: 18,
        marginLeft:5,
        fontWeight:"600",
        color:"#1C6A00"
    },
    stext: {
        marginTop: 15,
        fontSize: 12,
        marginLeft:5,
        fontWeight:"600",
        color:"#1C6A00"
    },
    midstext:{
        marginTop: 15,
        fontSize: 12,
        marginLeft:5,
        fontWeight:"600",
        color:"#936E00"
    },
    midltext: {
        color: "#000",
        marginTop: 15,
        fontSize: 18,
        marginLeft:5,
        fontWeight:"600",
        color:"#936E00"
    },
    midltext1: {
        marginTop: 18,
        fontSize: 12,
        marginLeft:"40%",
        fontWeight:"600",
        color:"#936E00",
        textDecorationLine: "underline",

    },
    ltext1: {
        marginTop: 18,
        fontSize: 12,
        marginLeft:"40%",
        fontWeight:"600",
        color:"#1C6A00",
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

