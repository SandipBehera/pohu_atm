import React, { Component,useState } from "react";
import { Text, View, Button, Image, StyleSheet, TouchableOpacity ,} from 'react-native';
import { Icon,Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Sidebar from "./sidebar";
import { SearchBar } from 'react-native-elements';
import Dashboard from "../../home/new_dashboard";
import ViewTask from "../../task/ViewTask";



// const HeadderComponent = ({props,}) => {
//   const name=props.name;
//   const email=props.mail;
//   const {search,SetSearch}=useState("");
//   console.log(email);
  
//   return (
//     <View style={{ flexDirection: 'row', height: 100, paddingTop: 40 }}>
//    <View style={{ marginLeft: "25%",width:250,marginBottom:10 }}>
        
//       <SearchBar
//         placeholder="Type Here..."
//         onChangeText={(search)=>SetSearch(search)}
//         value={search}
//         lightTheme ={true}
//         round={true}
//         containerStyle={{backgroundColor:"transparent",borderTopWidth:0,borderBottomWidth:0,marginBottom:10,shadowColor:"#000",shadowOpacity:0.30,shadowRadius:4.65,elevation:8,shadowOffset:{height:4}}}
//         inputContainerStyle={{backgroundColor:"white"}}
//       />
//         </View>
//     </View>
//   );
// }
// export default HeadderComponent;
import { createDrawerNavigator } from "@react-navigation/drawer";
import ScannerComponent from "../../QrCode/qrCode";
import Calender from "../calender/Calender";
import LogoutComponent from "../../login/LogoutScreen";
const Drawer=createDrawerNavigator();
function Root(){
return(
  <Drawer.Navigator>
  <Drawer.Screen name="Dashboard" component={Dashboard}/>
  <Drawer.Screen name="MyTask" component={ViewTask}/>
  <Drawer.Screen name="Scan" component={ScannerComponent}/>
  <Drawer.Screen name="Calender" component={Calender}/>
  <Drawer.Screen name="logout" component={LogoutComponent}/>
</Drawer.Navigator>
);
}
export default Root;