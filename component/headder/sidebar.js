import React from "react";
import { Text, View, Button, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Card,Icon} from 'react-native-elements';
export default function Sidebar(){
    
    return(
        <View style={{width:250}}>
                 <Card style={styles.section}>
                        <View style={styles.row}>
                            <View style={[styles.box]}>
                                <TouchableOpacity style={styles.loginBtn} >
                                <Icon
                                    
                                    name='calendar'
                                    type='evilicon'
                                    color='#18aefa'
                                    size={90}
                                    style={{textAlign:"center",alignItems:"center",marginLeft:50}}
                                    />
                                    <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginLeft: "30%" }}>Tasks</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.box]}>
                                <TouchableOpacity style={styles.loginBtn} >
                                    <Icon
                                    name='qr-code-outline'
                                    type='ionicon'
                                    color='#18aefa'
                                    size={60}
                                    style={{textAlign:"center",alignItems:"center",marginLeft:60}}
                                    />
                                    
                                    <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginLeft: 50 }}>QR-Scan</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={styles.row}>
                            <View style={[styles.box]}>
                                <TouchableOpacity style={styles.loginBtn} >
                                <Icon
                                    name='clean-hands'
                                    type='material'
                                    color='#18aefa'
                                    size={60}
                                    style={{textAlign:"center",alignItems:"center",marginLeft:60}}
                                    />
                                    <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginLeft: 30 }}>Attendance</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
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