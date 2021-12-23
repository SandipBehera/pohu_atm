import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// @ts-expect-error
import {Agenda} from 'react-native-calendars';
import { height } from 'styled-system';
import MeetingScreen from '../../Meetings/MeetingComponent';
import FooterComponent from '../footer/FooterComponent';
import HeadderComponent from '../headder/LeftComponent';


export default function Calender({ route, navigation, props }) {
    // const mail = route.params["mail"];
    // const name = route.params["name"];
return(
    <View style={[ styles.container]}>
    <View style={{height:700}}>
        <MeetingScreen></MeetingScreen>
    </View>
    <View>
        <FooterComponent ></FooterComponent>
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