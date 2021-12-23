import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity,RefreshControl } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import { Divider, Icon, Avatar } from 'react-native-elements';
import { MaterialIcons } from 'react-native-vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskCreated from './TaskCreated';
import HeadderComponent from '../component/headder/LeftComponent';
import FooterComponent from '../component/footer/FooterComponent';
import Dialog from "react-native-dialog";
import axios from 'axios';
const PAGES = [<TaskCreated />, 'task started', 'task finished', 'task approved',];
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const firstIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    separatorFinishedColor: '#4aae4f',
    separatorUnFinishedColor: '#a4d4a5',
    stepIndicatorFinishedColor: '#4aae4f',
    stepIndicatorUnFinishedColor: '#a4d4a5',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: '#4aae4f',
};

const secondIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
};

const thirdIndicatorStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#7eaec4',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#7eaec4',
    stepStrokeUnFinishedColor: '#dedede',
    separatorFinishedColor: '#7eaec4',
    separatorUnFinishedColor: '#dedede',
    stepIndicatorFinishedColor: '#7eaec4',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#7eaec4',
};

const getStepIndicatorIconConfig = (
    position,
    stepStatus,
) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
        size: 15,
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'shopping-cart';
            break;
        }
        case 1: {
            iconConfig.name = 'location-on';
            break;
        }
        case 2: {
            iconConfig.name = 'assessment';
            break;
        }
        case 3: {
            iconConfig.name = 'payment';
            break;
        }
        case 4: {
            iconConfig.name = 'track-changes';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};

export default function TaskProfile(props) {
    const [currentPage, setCurrentPage] = useState(0);
    const name = props.route.params["name"];
    const email = props.route.params["mailId"];
    const taskid = props.route.params["taskID"];
    console.log("hello:"+email);
    const [visible, SetVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [datas,setDatas]=useState(props.route.params["cInput"]);
    console.log("task assigned by:"+datas["task assigned by"]);
    const renderViewPagerPage = (data) => {
        return (
            <View key={data} style={styles.page}>
                <Text>{data}</Text>
            </View>
        );
    };

    const renderStepIndicator = (params) => (
        <MaterialIcons {...getStepIndicatorIconConfig(params)} />
    );

    const renderLabel = (
        position,
        label,
        currentPosition,
    ) => {
        return (
            <Text
                style={
                    position === currentPosition
                        ? styles.stepLabelSelected
                        : styles.stepLabel
                }
            >
                {label}
            </Text>
        );
    };
    const Reporting_name = datas["task assigned by"];
    var nameReplace = Reporting_name.replace(/@.*$/, "");
    var Reportingname = nameReplace !== Reporting_name ? nameReplace : null;

    const Assigned_by = datas["task assigned by"];
    var nameReplaceAssign = Assigned_by.replace(/@.*$/, "");
    var Assignedname = nameReplaceAssign !== Assigned_by ? nameReplace : null;
    console.log("task assigned by"+datas["task assigned by"]);
    console.log(Assigned_by);
    var SubmitbtnVal = "";
    var sbtbtn = "";
    var approveBtn = "";
    var theView = "";
    const onsubmit = () => {
        let messages = "";
        console.log("submit btn value is:" + SubmitbtnVal);
        if (SubmitbtnVal === "Start Task") {
            messages = "Update Task Status"
        }
        else if (SubmitbtnVal === "Finish Task") {
            messages = "Pending Approval"
        }
        else if (SubmitbtnVal === "Approved") {
            messages = "Approved"
        }
        else {
            messages = "Update Task Status"
        }
        const data = JSON.stringify({
            "objid": taskid,
            "message": messages,
            "key": "task status"
        });
        var config = {
            method: 'POST',
            url: 'http://10.0.0.4:5001/edit',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': 'null'
            },
            data: data
        };

        axios(config)
            .then(response => {
                SetVisible(true);
                setDatas(response.data["json"]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const approval = (btnval) => {
        const btnvalue = btnval;
        const data = JSON.stringify({
            "objid": taskid,
            "message": btnvalue,
            "key": "task status"
        });
        var config = {
            method: 'POST',
            url: 'http://10.0.0.4:5001/edit',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': 'null'
            },
            data: data
        };

        axios(config)
            .then(response => {
                SetVisible(true);
                setDatas(response.data["json"]);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const refresh=React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const close = () => {
        SetVisible(false);
        refresh();
    }
    if (datas["task status"] === "Start Task") {
        SubmitbtnVal = "Start Task";
        theView = <SafeAreaView style={{ height: 700, top: "-5.7%", marginBottom: "5%" }}>
            <View style={styles.container}>
                <View>
                    <Dialog.Container visible={visible}>
                        <Dialog.Title>Task Status Updated</Dialog.Title>
                        <Dialog.Description>
                            Your Status has updated Successfully.
                        </Dialog.Description>
                        <Dialog.Button label="close" onPress={close} />
                    </Dialog.Container>
                </View>
                <View style={styles.headerContainer}>
                    <View style={{ left: 125 }}>
                        <Icon
                            name='edit'
                            type='material'
                            color='#1976D2'

                        />
                    </View>
                    <Text style={styles.title}>Task profile</Text>

                </View>
                <Divider orientation="horizontal" style={{ top: 40 }} />
                <View style={styles.stepIndicator}>
                    <StepIndicator
                        customStyles={firstIndicatorStyles}
                        currentPosition={currentPage}

                        labels={['Task Created', 'Task Started', 'Task Finished', 'Task Approved',]}
                        stepCount={4}

                        renderStepIndicator={(stepPosition, stepStatus) => {
                            renderStepIndicator(stepPosition, stepStatus);
                        }}

                    />
                </View>
                <View style={{ height: 450, top: -50 }}>
                    <ScrollView style={{ height: 500 }}>


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
                            <View style={{ left: 15, top: 30 }}>
                                <TextInput placeholder="Teacher" style={styles.input} value={datas["task type"]}></TextInput>
                            </View>
                            <View style={{ left: 25, top: 30 }}>
                                <TextInput placeholder="Ch.Madhuri" style={styles.input} value={Assignedname}></TextInput>
                            </View>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 55 }}>
                                <Icon
                                    name='newspaper-outline'
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleThree}>Task Description</Text>
                        </View>
                        <View style={{ left: 15, top: 80 }}>
                            <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                                multiline={true} value={datas["task description"]}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 80 }}>
                                <Icon
                                    name='edit'
                                    type='material'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleFour}>Task Priority</Text>
                        </View>
                        <View style={{ left: 15, top: 105 }}>
                            <TextInput placeholder="Urgent" style={styles.inputThree} value={datas["task priority"]}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 100 }}>
                                <Icon
                                    name='person-outline'
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleFive}>Assigned By</Text>
                        </View>
                        <View style={{ left: 15, top: 125 }}>
                            <TextInput placeholder="Employee name" style={styles.inputThree} value={Reportingname}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 125 }}>
                                <Icon
                                    name='calendar'
                                    type='entypo'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleSix}>Task Deadline</Text>
                        </View>
                        <View style={{ left: 15, top: 149 }}>
                            <TextInput placeholder="Task DeadSLine" style={styles.inputThree} value={datas["task deadline"]}></TextInput>
                        </View>


                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginBtn} onPress={onsubmit}>
                        <Text style={styles.loginText} >{SubmitbtnVal}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>;
    }
    else if (datas["task status"] === "Pending Approval") {
        SubmitbtnVal = "Pending Approval";
        theView =
            <SafeAreaView style={{ height: 700, top: "-5.7%", marginBottom: "5%" }}>
                <View style={styles.container}>
                <View>
                    <Dialog.Container visible={visible}>
                        <Dialog.Title>Task Status Updated</Dialog.Title>
                        <Dialog.Description>
                            Your Status has updated Successfully.
                        </Dialog.Description>
                        <Dialog.Button label="close" onPress={close} />
                    </Dialog.Container>
                </View>
                    <View style={styles.headerContainer}>
                        <View style={{ left: 125 }}>
                            <Icon
                                name='edit'
                                type='material'
                                color='#1976D2'

                            />
                        </View>
                        <Text style={styles.title}>Task profile</Text>

                    </View>
                    <Divider orientation="horizontal" style={{ top: 40 }} />
                    <View style={styles.stepIndicator}>
                        <StepIndicator
                            customStyles={firstIndicatorStyles}
                            currentPosition={currentPage}

                            labels={['Task Created', 'Task Started', 'Task Finished', 'Task Approved',]}
                            stepCount={4}

                            renderStepIndicator={(stepPosition, stepStatus) => {
                                renderStepIndicator(stepPosition, stepStatus);
                            }}

                        />
                    </View>
                    <View style={{ height: 450, top: -50 }}>
                        <ScrollView style={{ height: 500 }}>


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
                                <View style={{ left: 15, top: 30 }}>
                                    <TextInput placeholder="Teacher" style={styles.input} value={datas["task type"]}></TextInput>
                                </View>
                                <View style={{ left: 25, top: 30 }}>
                                    <TextInput placeholder="Ch.Madhuri" style={styles.input} value={Assignedname}></TextInput>
                                </View>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 55 }}>
                                    <Icon
                                        name='newspaper-outline'
                                        type='ionicon'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleThree}>Task Description</Text>
                            </View>
                            <View style={{ left: 15, top: 80 }}>
                                <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                                    multiline={true} value={datas["task description"]}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 80 }}>
                                    <Icon
                                        name='edit'
                                        type='material'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleFour}>Task Priority</Text>
                            </View>
                            <View style={{ left: 15, top: 105 }}>
                                <TextInput placeholder="Urgent" style={styles.inputThree} value={datas["task priority"]}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 100 }}>
                                    <Icon
                                        name='person-outline'
                                        type='ionicon'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleFive}>Assigned By</Text>
                            </View>
                            <View style={{ left: 15, top: 125 }}>
                                <TextInput placeholder="Employee name" style={styles.inputThree} value={Reportingname}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 125 }}>
                                    <Icon
                                        name='calendar'
                                        type='entypo'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleSix}>Task Deadline</Text>
                            </View>
                            <View style={{ left: 15, top: 149 }}>
                                <TextInput placeholder="Task DeadSLine" style={styles.inputThree} value={datas["task deadline"]}></TextInput>
                            </View>


                        </ScrollView>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.loginBtn} disabled={true}>
                            <Text style={styles.loginText} >{SubmitbtnVal}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>;
    }
    else if (datas["task status"] === "Approved") {
        SubmitbtnVal = "Task Approved";
        theView = <SafeAreaView style={{ height: 700, top: "-5.7%", marginBottom: "5%" }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={{ left: 125 }}>
                        <Icon
                            name='edit'
                            type='material'
                            color='#1976D2'

                        />
                    </View>
                    <Text style={styles.title}>Task profile</Text>

                </View>
                <Divider orientation="horizontal" style={{ top: 40 }} />
                <View style={styles.stepIndicator}>
                    <StepIndicator
                        customStyles={firstIndicatorStyles}
                        currentPosition={currentPage}

                        labels={['Task Created', 'Task Started', 'Task Finished', 'Task Approved',]}
                        stepCount={4}

                        renderStepIndicator={(stepPosition, stepStatus) => {
                            renderStepIndicator(stepPosition, stepStatus);
                        }}

                    />
                </View>
                <View style={{ height: 450, top: -50 }}>
                    <ScrollView style={{ height: 500 }}>


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
                            <View style={{ left: 15, top: 30 }}>
                                <TextInput placeholder="Teacher" style={styles.input} value={datas["task type"]}></TextInput>
                            </View>
                            <View style={{ left: 25, top: 30 }}>
                                <TextInput placeholder="Ch.Madhuri" style={styles.input} value={Assignedname}></TextInput>
                            </View>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 55 }}>
                                <Icon
                                    name='newspaper-outline'
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleThree}>Task Description</Text>
                        </View>
                        <View style={{ left: 15, top: 80 }}>
                            <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                                multiline={true} value={datas["task description"]}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 80 }}>
                                <Icon
                                    name='edit'
                                    type='material'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleFour}>Task Priority</Text>
                        </View>
                        <View style={{ left: 15, top: 105 }}>
                            <TextInput placeholder="Urgent" style={styles.inputThree} value={datas["task priority"]}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 100 }}>
                                <Icon
                                    name='person-outline'
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleFive}>Assigned By</Text>
                        </View>
                        <View style={{ left: 15, top: 125 }}>
                            <TextInput placeholder="Employee name" style={styles.inputThree} value={Reportingname}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 125 }}>
                                <Icon
                                    name='calendar'
                                    type='entypo'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleSix}>Task Deadline</Text>
                        </View>
                        <View style={{ left: 15, top: 149 }}>
                            <TextInput placeholder="Task DeadSLine" style={styles.inputThree} value={datas["task deadline"]}></TextInput>
                        </View>


                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginBtn} disabled={true}>
                        <Text style={styles.loginText} >{SubmitbtnVal}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>;
    }
    else if (datas["task status"] === "Update Task Status") {
        SubmitbtnVal = "Finish Task";
        theView = <SafeAreaView style={{ height: 700, top: "-5.7%", marginBottom: "5%" }}>
            <View style={styles.container}>
                <View>
                    <Dialog.Container visible={visible}>
                        <Dialog.Title>Task Status Updated</Dialog.Title>
                        <Dialog.Description>
                            Your Status has updated Successfully.
                        </Dialog.Description>
                        <Dialog.Button label="close" onPress={close} />
                    </Dialog.Container>
                </View>
                <View style={styles.headerContainer}>
                    <View style={{ left: 125 }}>
                        <Icon
                            name='edit'
                            type='material'
                            color='#1976D2'

                        />
                    </View>
                    <Text style={styles.title}>Task profile</Text>

                </View>
                <Divider orientation="horizontal" style={{ top: 40 }} />
                <View style={styles.stepIndicator}>
                    <StepIndicator
                        customStyles={firstIndicatorStyles}
                        currentPosition={currentPage}

                        labels={['Task Created', 'Task Started', 'Task Finished', 'Task Approved',]}
                        stepCount={4}

                        renderStepIndicator={(stepPosition, stepStatus) => {
                            renderStepIndicator(stepPosition, stepStatus);
                        }}

                    />
                </View>
                <View style={{ height: 450, top: -50 }}>
                    <ScrollView style={{ height: 500 }}>


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
                            <View style={{ left: 15, top: 30 }}>
                                <TextInput placeholder="Teacher" style={styles.input} value={datas["task type"]}></TextInput>
                            </View>
                            <View style={{ left: 25, top: 30 }}>
                                <TextInput placeholder="Ch.Madhuri" style={styles.input} value={Assignedname}></TextInput>
                            </View>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 55 }}>
                                <Icon
                                    name='newspaper-outline'
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleThree}>Task Description</Text>
                        </View>
                        <View style={{ left: 15, top: 80 }}>
                            <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                                multiline={true} value={datas["task description"]}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 80 }}>
                                <Icon
                                    name='edit'
                                    type='material'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleFour}>Task Priority</Text>
                        </View>
                        <View style={{ left: 15, top: 105 }}>
                            <TextInput placeholder="Urgent" style={styles.inputThree} value={datas["task priority"]}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 100 }}>
                                <Icon
                                    name='person-outline'
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleFive}>Assigned By</Text>
                        </View>
                        <View style={{ left: 15, top: 125 }}>
                            <TextInput placeholder="Employee name" style={styles.inputThree} value={Reportingname}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 125 }}>
                                <Icon
                                    name='calendar'
                                    type='entypo'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleSix}>Task Deadline</Text>
                        </View>
                        <View style={{ left: 15, top: 149 }}>
                            <TextInput placeholder="Task DeadSLine" style={styles.inputThree} value={datas["task deadline"]}></TextInput>
                        </View>


                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginBtn} onPress={onsubmit}>
                        <Text style={styles.loginText} >{SubmitbtnVal}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>;
    }
    else if (datas["task status"] === "Task Completed Successfully") {
        SubmitbtnVal = "Task Completed";
        theView = <SafeAreaView style={{ height: 700, top: "-5.7%", marginBottom: "5%" }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={{ left: 125 }}>
                        <Icon
                            name='edit'
                            type='material'
                            color='#1976D2'

                        />
                    </View>
                    <Text style={styles.title}>Task profile</Text>

                </View>
                <Divider orientation="horizontal" style={{ top: 40 }} />
                <View style={styles.stepIndicator}>
                    <StepIndicator
                        customStyles={firstIndicatorStyles}
                        currentPosition={currentPage}

                        labels={['Task Created', 'Task Started', 'Task Finished', 'Task Approved',]}
                        stepCount={4}

                        renderStepIndicator={(stepPosition, stepStatus) => {
                            renderStepIndicator(stepPosition, stepStatus);
                        }}

                    />
                </View>
                <View style={{ height: 450, top: -50 }}>
                    <ScrollView style={{ height: 500 }}>


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
                            <View style={{ left: 15, top: 30 }}>
                                <TextInput placeholder="Teacher" style={styles.input} value={datas["task type"]}></TextInput>
                            </View>
                            <View style={{ left: 25, top: 30 }}>
                                <TextInput placeholder="Ch.Madhuri" style={styles.input} value={Assignedname}></TextInput>
                            </View>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 55 }}>
                                <Icon
                                    name='newspaper-outline'
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleThree}>Task Description</Text>
                        </View>
                        <View style={{ left: 15, top: 80 }}>
                            <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                                multiline={true} value={datas["task description"]}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 80 }}>
                                <Icon
                                    name='edit'
                                    type='material'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleFour}>Task Priority</Text>
                        </View>
                        <View style={{ left: 15, top: 105 }}>
                            <TextInput placeholder="Urgent" style={styles.inputThree} value={datas["task priority"]}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 100 }}>
                                <Icon
                                    name='person-outline'
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleFive}>Assigned By</Text>
                        </View>
                        <View style={{ left: 15, top: 125 }}>
                            <TextInput placeholder="Employee name" style={styles.inputThree} value={Reportingname}></TextInput>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={{ left: 25, top: 125 }}>
                                <Icon
                                    name='calendar'
                                    type='entypo'
                                    color='grey'
                                />
                            </View>
                            <Text style={styles.titleSix}>Task Deadline</Text>
                        </View>
                        <View style={{ left: 15, top: 149 }}>
                            <TextInput placeholder="Task DeadSLine" style={styles.inputThree} value={datas["task deadline"]}></TextInput>
                        </View>


                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginBtn} disabled={true}>
                        <Text style={styles.loginText} >{SubmitbtnVal}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>;
    }
    else {
        SubmitbtnVal = "Task Rejected";
        theView =
            <SafeAreaView style={{ height: 700, top: "-5.7%", marginBottom: "5%" }}>
                <View style={styles.container}>
                <View>
                    <Dialog.Container visible={visible}>
                        <Dialog.Title>Task Status Updated</Dialog.Title>
                        <Dialog.Description>
                            Your Status has updated Successfully.
                        </Dialog.Description>
                        <Dialog.Button label="close" onPress={close} />
                    </Dialog.Container>
                </View>
                    <View style={styles.headerContainer}>
                        <View style={{ left: 125 }}>
                            <Icon
                                name='edit'
                                type='material'
                                color='#1976D2'

                            />
                        </View>
                        <Text style={styles.title}>Task profile</Text>

                    </View>
                    <Divider orientation="horizontal" style={{ top: 40 }} />
                    <View style={styles.stepIndicator}>
                        <StepIndicator
                            customStyles={firstIndicatorStyles}
                            currentPosition={currentPage}

                            labels={['Task Created', 'Task Started', 'Task Finished', 'Task Approved',]}
                            stepCount={4}

                            renderStepIndicator={(stepPosition, stepStatus) => {
                                renderStepIndicator(stepPosition, stepStatus);
                            }}

                        />
                    </View>
                    <View style={{ height: 450, top: -50 }}>
                        <ScrollView style={{ height: 500 }}>


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
                                <View style={{ left: 15, top: 30 }}>
                                    <TextInput placeholder="Teacher" style={styles.input} value={datas["task type"]}></TextInput>
                                </View>
                                <View style={{ left: 25, top: 30 }}>
                                    <TextInput placeholder="Ch.Madhuri" style={styles.input} value={Assignedname}></TextInput>
                                </View>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 55 }}>
                                    <Icon
                                        name='newspaper-outline'
                                        type='ionicon'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleThree}>Task Description</Text>
                            </View>
                            <View style={{ left: 15, top: 80 }}>
                                <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                                    multiline={true} value={datas["task description"]}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 80 }}>
                                    <Icon
                                        name='edit'
                                        type='material'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleFour}>Task Priority</Text>
                            </View>
                            <View style={{ left: 15, top: 105 }}>
                                <TextInput placeholder="Urgent" style={styles.inputThree} value={datas["task priority"]}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 100 }}>
                                    <Icon
                                        name='person-outline'
                                        type='ionicon'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleFive}>Assigned By</Text>
                            </View>
                            <View style={{ left: 15, top: 125 }}>
                                <TextInput placeholder="Employee name" style={styles.inputThree} value={Reportingname}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 125 }}>
                                    <Icon
                                        name='calendar'
                                        type='entypo'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleSix}>Task Deadline</Text>
                            </View>
                            <View style={{ left: 15, top: 149 }}>
                                <TextInput placeholder="Task DeadSLine" style={styles.inputThree} value={datas["task deadline"]}></TextInput>
                            </View>


                        </ScrollView>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.loginBtn} onPress={onsubmit}>
                            <Text style={styles.loginText} >{SubmitbtnVal}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: "#ff0000" }}>Please press the button again to start the task</Text>
                    </View>
                </View>
            </SafeAreaView>;
    }

    if (SubmitbtnVal === "Pending Approval" && (email === datas["task reporting to"] || email === datas["task assigned by"])) {

        theView =
            <SafeAreaView style={{ height: 700, top: "-5.7%", marginBottom: "5%", paddingBottom: 130 }}>
                <View style={styles.container}>
                    <View>
                        <Dialog.Container visible={visible}>
                            <Dialog.Title>Task Status Updated</Dialog.Title>
                            <Dialog.Description>
                                Your Status has updated Successfully.
                            </Dialog.Description>
                            <Dialog.Button label="close" onPress={close} />
                        </Dialog.Container>
                    </View>
                    <View style={styles.headerContainer}>
                        <View style={{ left: 125 }}>
                            <Icon
                                name='edit'
                                type='material'
                                color='#1976D2'

                            />
                        </View>
                        <Text style={styles.title}>Task profile</Text>

                    </View>
                    <Divider orientation="horizontal" style={{ top: 40 }} />
                    <View style={styles.stepIndicator}>
                        <StepIndicator
                            customStyles={firstIndicatorStyles}
                            currentPosition={currentPage}

                            labels={['Task Created', 'Task Started', 'Task Finished', 'Task Approved',]}
                            stepCount={4}

                            renderStepIndicator={(stepPosition, stepStatus) => {
                                renderStepIndicator(stepPosition, stepStatus);
                            }}

                        />
                    </View>
                    <View style={{ height: 570, top: -50 }}>
                        <ScrollView style={{ height: 700 }} refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                />
                                }>


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
                                <View style={{ left: 15, top: 30 }}>
                                    <TextInput placeholder="Teacher" style={styles.input} value={datas["task type"]}></TextInput>
                                </View>
                                <View style={{ left: 25, top: 30 }}>
                                    <TextInput placeholder="Ch.Madhuri" style={styles.input} value={Assignedname}></TextInput>
                                </View>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 55 }}>
                                    <Icon
                                        name='newspaper-outline'
                                        type='ionicon'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleThree}>Task Description</Text>
                            </View>
                            <View style={{ left: 15, top: 80 }}>
                                <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                                    multiline={true} value={datas["task description"]}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 80 }}>
                                    <Icon
                                        name='edit'
                                        type='material'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleFour}>Task Priority</Text>
                            </View>
                            <View style={{ left: 15, top: 105 }}>
                                <TextInput placeholder="Urgent" style={styles.inputThree} value={datas["task priority"]}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 100 }}>
                                    <Icon
                                        name='person-outline'
                                        type='ionicon'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleFive}>Assigned By</Text>
                            </View>
                            <View style={{ left: 15, top: 125 }}>
                                <TextInput placeholder="Employee name" style={styles.inputThree} value={Reportingname}></TextInput>
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 125 }}>
                                    <Icon
                                        name='calendar'
                                        type='entypo'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleSix}>Task Deadline</Text>
                            </View>
                            <View style={{ left: 15, top: 149 }}>
                                <TextInput placeholder="Task DeadSLine" style={styles.inputThree} value={datas["task deadline"]}></TextInput>
                            </View>

                            <View style={styles.headerContainer}>
                                <View style={{ left: 25, top: 145 }}>
                                    <Icon
                                        name='newspaper-outline'
                                        type='ionicon'
                                        color='grey'
                                    />
                                </View>
                                <Text style={styles.titleSeven}>Comment For Rejection</Text>
                            </View>
                            <View style={{ left: 15, top: 165 }}>
                                <TextInput placeholder="Enter Task Description Here" style={styles.inputTwo} numberOfLines={10}
                                    multiline={true} ></TextInput>
                            </View>
                            <View>
                        <View style={styles.bottonContainer}>
                            <TouchableOpacity style={styles.AcceptBtn} onPress={() => approval("Approved")}>
                                <Text style={styles.loginText} >Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.RejectBtn} onPress={() => approval("Rejected")}>
                                <Text style={styles.loginText} >Reject</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        </ScrollView>
                    </View>
                    
                </View>
            </SafeAreaView>;
    }

    return (
        <View style={{ backgroundColor: "#fff" }}>
            {theView}
            <View >
                <FooterComponent email={email} name={name}></FooterComponent>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    stepIndicator: {
        marginVertical: 50,
    },
    page: {
        flex: 1,

    },
    loginBtn: {
        width: 305,
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        backgroundColor: "#1976D2",
        marginLeft: 56,
        paddingRight: 10
    },
    AcceptBtn: {
        width: 189,
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        backgroundColor: "#91bf80",
        marginLeft: 5,
        paddingRight: 10
    },
    RejectBtn: {
        width: 189,
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        backgroundColor: "#eb614d",
        marginLeft: 20,
        paddingRight: 10
    },
    loginText: {
        color: "#ffff",
        textAlign: "center"
    },
    stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#999999',
    },
    headerContainer: {
        flexDirection: 'row',
        top: 15
    },
    bottonContainer: {
        flexDirection: 'row',
        top: 200,
        marginBottom:200
    },
    title: {
        color: '#1976D2',
        fontSize: 20,
        left: 125,


    },
    stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#4aae4f',
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
        top: 59,
        left: 35


    },
    titleFour: {
        color: 'grey',
        fontSize: 15,
        top: 84,
        left: 30


    },
    titleFive: {
        color: 'grey',
        fontSize: 15,
        top: 105,
        left: 30


    },
    titleSix: {
        color: 'grey',
        fontSize: 15,
        top: 130,
        left: 30


    },
    titleSeven: {
        color: 'grey',
        fontSize: 15,
        top: 150,
        left: 35


    },
    input: {
        height: 40,
        borderRadius: 10,
        width: 189,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 20,
    },
    inputTwo: {
        height: 90,
        borderRadius: 10,
        width: 384,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
    },
    inputThree: {
        height: 40,
        borderRadius: 10,
        width: 384,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 20,
    },

});