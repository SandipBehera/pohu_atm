import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native';
import { Divider, Icon, Avatar, Button } from 'react-native-elements';
import FooterComponent from '../component/footer/FooterComponent';
import HeadderComponent from '../component/headder/LeftComponent';


const styles = StyleSheet.create({

    headerContainer: {

        flexDirection: 'row'
    },
    titleOne: {
        color: 'grey',
        fontSize: 15,
        top: 18,
        left: 32


    },
    titleTwo: {
        color: 'grey',
        fontSize: 15,
        top: 17,
        left: 122


    },
    titleThree: {
        color: 'grey',
        fontSize: 15,
        top: 83,
        left: 35


    },
    titleFour: {
        color: 'grey',
        fontSize: 15,
        top: 119,
        left: 35


    },
    titleFive: {
        color: 'grey',
        fontSize: 15,
        top: 144,
        left: 35


    },
    titleSix: {
        color: 'grey',
        fontSize: 15,
        top: 164,
        left: 35


    },
    input: {
        height: 40,
        borderRadius: 10,
        width: 180,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 20,
    },
    inputTwo: {
        height: 90,
        borderRadius: 10,
        width: 345,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
    },
    inputThree: {
        height: 40,
        borderRadius: 10,
        width: 350,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 20,
    },

});




const TaskCreated = (props) => {
    const name=props.route.params["name"];
    const mail=props.route.params["mail"];
    return (
        <View>
           <View>
                <HeadderComponent name={name} />
            </View>
        <SafeAreaView >
              
            <View>
                <View style={styles.headerContainer}>
                    <View style={{ left: 25, top: 15 }}>
                        <Icon
                            name='person-outline'
                            type='ionicon'
                            color='grey'
                        />
                    </View>
                    <Text style={styles.titleOne}>Designation</Text>

                    <View style={{ left: 112, top: 15 }}>
                        <Icon
                            name='insert-chart-outlined'
                            type='material'
                            color='grey'
                        />
                    </View>
                    <Text style={styles.titleTwo}>Reporting To</Text>


                </View>

                <View style={styles.headerContainer}>
                    <View style={{ left: 10, top: 45 }}>
                        <TextInput placeholder="Teacher" style={styles.input}></TextInput>
                    </View>
                    <View style={{ left: 25, top: 45 }}>
                        <TextInput placeholder="Ch.Madhuri" style={styles.input}></TextInput>
                    </View>
                </View>

                <View style={styles.headerContainer}>
                    <View style={{ left: 25, top: 75 }}>
                        <Icon
                            name='newspaper-outline'
                            type='ionicon'
                            color='grey'
                        />
                    </View>
                    <Text style={styles.titleThree}>Task Description</Text>
                </View>
                <View style={{ left: 25, top: 95 }}>
                    <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                        multiline={true}></TextInput>
                </View>
                <View style={styles.headerContainer}>
                    <View style={{ left: 25, top: 110 }}>
                        <Icon
                            name='edit'
                            type='material'
                            color='grey'
                        />
                    </View>
                    <Text style={styles.titleFour}>Task Priority</Text>
                </View>

                <View style={{ left: 25, top: 125 }}>
                    <TextInput placeholder="Urgent" style={styles.inputThree}></TextInput>
                </View>

                <View style={styles.headerContainer}>
                    <View style={{ left: 25, top: 135 }}>
                        <Icon
                            name='person-outline'
                            type='ionicon'
                            color='grey'
                        />
                    </View>
                    <Text style={styles.titleFive}>Assigned By</Text>
                </View>
                <View style={{ left: 25, top: 145 }}>
                    <TextInput placeholder="Employee name" style={styles.inputThree}></TextInput>
                </View>


                <View style={styles.headerContainer}>
                    <View style={{ left: 25, top: 155 }}>
                        <Icon
                            name='calendar'
                            type='entypo'
                            color='grey'
                        />
                    </View>
                    <Text style={styles.titleSix}>Task Deadline</Text>
                </View>



            </View>
            <View >
                <FooterComponent email={mail} name={name}></FooterComponent>
            </View>
        </SafeAreaView>
           
            </View>

    );
}
export default TaskCreated;
