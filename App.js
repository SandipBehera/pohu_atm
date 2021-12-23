import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import ViewTask from './task/ViewTask';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FooterComponent from './component/footer/FooterComponent';
import Sidebar from './component/headder/sidebar';
import ScannerComponent from './QrCode/qrCode';
import TakeAttendanceComponent from './attendance/TakeAttendance';
import StudentAttendanceComponent from './attendance/StudentAttendance';
import HomeWorkComponent from './task/homework';
import ParentScreen from './home/MainScreenParents';
import Calender from './component/calender/Calender';
import TaskProfile from './task/taskprofile';
import TaskCreated from './task/TaskCreated';
import Dashboard from './home/new_dashboard';
import Root from './component/headder/LeftComponent';
import { TaskProvide } from './DataContext/TaskContext';
const Stack=createNativeStackNavigator();
const  App=() => {
  return (
    <TaskProvide>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="home" component={Dashboard} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="task" component={ViewTask} options={{ headerShown: false }}/> */}
        <Stack.Screen name="footer" component={FooterComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="home_work" component={HomeWorkComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="sidebar" component={Sidebar} options={{ headerShown: false }}/>
        <Stack.Screen name="qr-scanner" component={ScannerComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="attendance-t" component={TakeAttendanceComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="attendance-s" component={StudentAttendanceComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="meetings" component={Calender} options={{ headerShown: false }}/>
        <Stack.Screen name="parent-home" component={ParentScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="task-create" component={TaskCreated} options={{headerShown:false}}/>
        {/* <Stack.Screen name="task-profile" component={TaskProfile} options={{headerShown:false}}/> */}
        <Stack.Screen name="task-update" component={TaskProfile} />
      </Stack.Navigator>
    </NavigationContainer>   
    </TaskProvide>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;