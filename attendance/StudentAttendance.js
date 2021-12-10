import React, { Component,useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Button, Text, ImageBackground, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Avatar, CheckBox } from 'react-native-elements';
import HeadderComponent from "../component/headder/LeftComponent";
import FooterComponent from "../component/footer/FooterComponent";
import { Card, ListItem, Icon,FAB,Tab, TabView} from 'react-native-elements';
import axios from 'axios';
import HomeWorkComponent from '../task/homework';
export default function StudentAttendanceComponent({ route, navigation, props }) {

    // constructor(props) {
    //     super(props);
        
    //     this.state = {
    //         data: props.route.params["slist"],
    //         cls:props.route.params["cls"],
    //         subject:props.route.params["subject"],
    //         name:props.route.params["name"],
    //         email:props.route.params["email"],
    //         tabIndex:""
    //     };
    //     console.log(this.state.name);
    // }
    const data=route.params["slist"];
    const cls=route.params["cls"];
    const subject=route.params["subject"];
    const name=route.params["name"];
    const email=route.params["email"];
    const [tabIndex,setTabIndex]=useState("");
    const[stdlst,setStdlst]=useState("");
    const onCheckChanged=(id)=> {
        const index = data.findIndex(x => x._id === id);
        data[index]["checked"] = !data[index]["checked"];
        setStdlst(data);

        
       
    }
    const onsubmit=()=>{
        let arr={};
        const studentlistdata = stdlst;
        for (var key in studentlistdata){
            if(studentlistdata[key]["checked"]==true){
                arr[studentlistdata[key]["_id"]]="present"
            }
            else{
                arr[studentlistdata[key]["_id"]]="false"
            }
               
        }
        console.log(arr)
        const date=new Date().toLocaleString();
        const InsertList=JSON.stringify({
            "Date":date,
            "Time":{
                "starttime":"11:00",
                "endtime":"12:00"
                },
            "class":cls,
            "subject":subject,
            "attendance":{
                arr
            }
        });
        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/attendace',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': 'null'
            },
            data: InsertList
        };
      
        axios(config)
            .then(response => {
                const msg = response.data["message"]
                const clas=cls;
               // console.log(slist)
                this.props.navigation.navigate('attendance-t',{name:name,mail:email,cls:clas.toUpperCase()});
                console.warn(msg)

            })
            .catch(function (error) {
                console.log(error);
            });
         
        //console.log(arr);
    }
  
        return (<View style={[styles.container]}>
            <View>
                <HeadderComponent name={name}/>
            </View>
            <View>
                <Text style={{ color: "#1976D2", fontWeight: "600", fontSize: 17, lineHeight: 25, marginLeft:15 }}>MyClass</Text>
            </View>
            <View>
                <Tab value={tabIndex} onChange={setTabIndex}  indicatorStyle={{
                            backgroundColor: 'white',
                            height: 3,
                }}>
                    <Tab.Item title="Attendance"   titleStyle={{ fontSize: 10 ,color:"black"}} />
                    <Tab.Item title="Class Work" titleStyle={{ fontSize: 10 ,color:"black"}}/>
                    <Tab.Item title="Home Work" titleStyle={{ fontSize: 10 ,color:"black"}}/>
                </Tab>
            </View>
            <View style={{ height: 650 }}>
            <TabView value={tabIndex} onChange={setTabIndex} >
                    <TabView.Item style={{width: '100%' }}>
                    <View>
                    <Text style={{ color: "#9E9E9E", fontWeight: "500", fontSize: 17, lineHeight: 25, marginLeft:15 }}>List of Students</Text>        
                    <View style={{marginTop:"5%",marginLeft:"2%"}}>
                    <SafeAreaView>
                                <ScrollView  style={{height:530}} decelerationRate={0.9} bounces={true} bouncesZoom={true}>
                                    {
                                        data.map((item, key) =>
                                        <View style={styles.footerRow} >
                                            <Avatar
                                                rounded
                                                source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}

                                            />
                                            <View style={[styles.sbox, styles.fcol]} >
                                                <Text style={{ fontSize: 12, marginTop: 5 }}>{item.name}</Text>
                                                <Text style={{ fontSize: 6, fontWeight: "300", marginTop: 3 }}>BEHESA6</Text>

                                            </View>
                                            <View style={[styles.cbox, styles.fcol]} >
                                                <CheckBox title="present" key={key} checked={item.checked} onPress={() => onCheckChanged(item["_id"])} checkedColor="green" />
                                            </View>

                                        </View>
                                        )}   
                                    </ScrollView>
                            </SafeAreaView>
                           <View style={{alignItems:"center"}}>             
                            <TouchableOpacity  style={styles.loginBtn} >
                                <Text style={styles.loginText}  onPress={onsubmit}>Submit Attendance</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                        <HomeWorkComponent></HomeWorkComponent>
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                        <Text>hello</Text>
                    </TabView.Item>
                </TabView>
                </View>
            <FooterComponent email={email} name={name} ></FooterComponent>
        </View>)
    
}
const styles = StyleSheet.create({
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
        width: 340,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#420fbf"

    },
    loginText: {
        color: "#ffff",
        marginTop: "0.5%",
        textDecorationLine: "underline"
    },
    flex: {
        display: "flex",
        flexWrap: "nowrap",
     
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
        marginTop: 18,
        textDecorationLine: "underline",
        fontSize: 20
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
        marginLeft:"3%"
    },
    fcol: {
        flex: 2,
    },
    cbox: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        marginLeft:10,
        marginTop:"-2%"
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

