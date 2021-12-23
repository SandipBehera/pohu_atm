import React from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, ScrollView, FlatList, TouchableHighlight } from "react-native";
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
export default function FooterComponent(props) {
    const mail=props.email;
    const name=props.name;
    const navigation = useNavigation();
    let Home = () => {
                navigation.navigate('Root', {screen:"Dashboard"});
    }
    let events = () => {
        navigation.navigate('Root',{screen:"calender"});

    }
    let news = () => {
        navigation.navigate('Root', {screen:"Dashboard"});
    }
    let task = () => {
                navigation.navigate('Root',{screen:"MyTask"});
    }
    return (
        <View style={styles.footer} style={{ height: 80 }}>
            <View style={styles.footerRow} >
                <View style={[styles.sbox, styles.fcol]}>
                    <TouchableOpacity style={styles.footerbtn} onPressIn={Home}>
                        <Icon name='home' type='material' color='#263238' size={40}  />
                       
                    </TouchableOpacity>
                </View>
                <View style={[styles.sbox, styles.fcol]}>
                    <TouchableOpacity style={styles.footerbtn} onPressIn={task}>
                        <Icon name='assignment' type='material' color='#263238' size={40} />
                       
                    </TouchableOpacity>
                </View>
                <View style={[styles.sbox, styles.fcol]}>
                    <TouchableOpacity style={styles.footerbtn} onPressIn={events}>
                        <Icon name='today' type='material' color='#263238' size={40} />
                        
                    </TouchableOpacity>
                </View>
                <View style={[styles.sbox, styles.fcol]}>
                    <TouchableOpacity style={styles.footerbtn} onPressIn={news}>
                        <Icon name='newspaper' type='ionicon' color='#263238' size={40} />
                        
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
        justifyContent: 'space-around',
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
        borderTopWidth: 1,


    },
    fcol: {
        flex: 2,
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
    }

});

