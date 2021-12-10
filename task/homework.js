import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Keyboard, TouchableOpacity,ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon, Input } from 'react-native-elements'
import HeadderComponent from "../component/headder/LeftComponent";
import DocumentPicker from 'react-native-document-picker';
import FooterComponent from "../component/footer/FooterComponent";
import { width } from "styled-system";
export default function HomeWorkComponent(props) {
    const [singleFile, setSingleFile] = useState(null);
    const uploadImage = async () => {
        // Check if any file is selected or not
        if (singleFile != null) {
          // If file selected then create FormData
          const fileToUpload = singleFile;
          const data = new FormData();
          data.append('name', 'Image Upload');
          data.append('file_attachment', fileToUpload);
          // Please change file upload URL
          let res = await fetch(
            'http://localhost/upload.php',
            {
              method: 'post',
              body: data,
              headers: {
                'Content-Type': 'multipart/form-data; ',
              },
            }
          );
          let responseJson = await res.json();
          if (responseJson.status == 1) {
            alert('Upload Successful');
          }
        } else {
          // If no file selected the show alert
          alert('Please Select File first');
        }
      };
    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
          const res = await DocumentPicker.pick({
            // Provide which type of file you want user to pick
            type: [DocumentPicker.types.allFiles],
            // There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          });
          // Printing the log realted to the file
          console.log('res : ' + JSON.stringify(res));
          // Setting the state to show single file attributes
          setSingleFile(res);
        } catch (err) {
          setSingleFile(null);
          // Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            // If user canceled the document selection
            alert('Canceled');
          } else {
            // For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      };
    return (
        <View style={[styles.container]}>
            <ScrollView>
            <Card style={{ borderTopLeftRadius: 20, paddingLeft: 1 }}>
                <Card.Title style={{ textAlign: "left", alignItems: "flex-start", fontSize: 20 }}>Class Work</Card.Title>
                <Card.Divider />
                <View style={{ height: 120, marginBottom: 30 }} >
                    <Input
                       placeholder='Enter your questions !!!'
                       onScroll={() => Keyboard.dismiss()}
                       leftIcon={
                           <Icon
                               type='font-awesome'
                               name='question-circle'
                               size={22}
                               color='#1976D2'
                               style={{marginTop:7}}
                            />
                        }
                        style={{ textAlignVertical: "auto", textAlign: "left", lineHeight: 30, width: 440 }}
                        multiline={true}
                    />

                </View>
                <View style={{ height: 120, marginBottom: 30 }} >
                    <Text style={{ marginBottom: 10 }}>Please upload the Documents taught in the said class</Text>
                    <TouchableOpacity
                        style={{width:350,borderRadius: 1,height: 50,alignItems: "center",justifyContent: "center",marginTop: 40,backgroundColor: "#420fbf"}}
                        activeOpacity={0.5}
                        onPress={selectFile}>
                        <Text style={styles.loginText}>Upload File</Text>
                    </TouchableOpacity>

                </View>
                
            </Card>
            </ScrollView>
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
    loginText: {
        color: "#ffff",
        textAlign: "center"
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
        width: 410,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#420fbf"

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
