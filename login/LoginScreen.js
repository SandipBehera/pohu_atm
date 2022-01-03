import React, { useContext, useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider, Button, Avatar, Input, Switch } from "react-native-elements";
import { useColorScheme } from 'react-native-appearance';
import { ImageBackground } from "react-native";
import { TaskContext } from "../DataContext/TaskContext";
const {width, height} = Dimensions.get('window');
const LoginScreen = ({ navigation, props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [swit, setSwt] = useState(false);
  const onToggleSwitch = () => setSwt(!swit);
  const taskdt=useContext(TaskContext)
  const theme = {
    Button: {
      raised: true,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: height
    },

  }
  let colorScheme = useColorScheme();
  let switchVal = swit;

  let description = '';
  let loginCredentials = ''
  const onsubmit = () => {

    if (switchVal == false) {
      loginCredentials = {
        "userName": email,
        "password": password,
        "isParent": "0"
      }
    }
    else {
      loginCredentials = {
        "userName": email,
        "password": password,
        "isParent": "1"
      }
    }
    const data1 = JSON.stringify({
      "assigned": email
    });
    var config = {
      method: 'POST',
      url: 'http://10.0.0.2:5001/taskassign',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': 'null'
      },
      data: data1
    };

    axios(config)
      .then(response => {
        description = response.data["populator"]
        
      })
      .catch(function (error) {
        console.log(error);
      });

    const data = JSON.stringify({
      "userDetails": loginCredentials
    });
    // navigation.navigate('home',{name:email})

    var doPost = {
      method: "post",
      url: 'http://34.136.41.197:5000/login',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': 'null'
      },
      data: data
    }
    axios(doPost).then(function (response) {
     
      const name = response.data.uName;

      if (response.data.stdId == "none") {
        
        taskdt.setTaskData(description);
        taskdt.setName(name);
        taskdt.setEmail(response.data.mailID[0]);
        navigation.navigate("Root",{screen:'Dashboard', params:{ name: response.data.uName, mail: response.data.mailID[0], desc: description }});
       
      }
      else {
        navigation.navigate('parent-home', { name: response.data.uName, stdId: response.data.stdId })
      }

    }).catch(function (error) {
      console.error(error);
    });

  }
  return (
    <View style={styles.container} >
      <SafeAreaView>
      <View style={{ marginTop: -13 }}>
        <ImageBackground source={require('../assets/login_back.png')} resizeMode="contain" style={styles.image}>
        </ImageBackground>
      </View>
      <View style={{ marginTop: "50%" }}>
        <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}>LOGIN</Text>
      </View>
      <View style={{ marginTop: "10%" }}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email/Parent's Mobile No."
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        </View>
        <View>
          <TouchableOpacity style={styles.forgotpass}>
            <Text style={styles.forgotpasstxt}>forgot Password</Text>
          </TouchableOpacity>
        </View>
        <View>
        <View style={{ marginLeft: "13%"}}>
          <Switch value={swit} onValueChange={onToggleSwitch} color="orange" style={{position:"absolute"}} />
          <Text style={{marginTop:"12%"}}>Click for parent's login</Text>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={onsubmit}>
          <Text style={styles.loginText} >LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:"2%"}}>
        <Text style={{textAlign:"center"}}>Or</Text>
      </View>
      <View style={{marginTop:-20}}>
      <TouchableOpacity style={styles.signGoogle} onPress={onsubmit}>
          <Icon  
          name='google'
          type='font-awesome'
          style={{marginLeft:"25%",marginRight:10}}
          color='#4285F4'
          />
          <Text style={styles.googelText} >Continue with Google</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#fff"

  },

  image: {
    flex: 1,
    justifyContent: "space-around",
    position: 'absolute',
    width: 417,
    height: 199.18,
    left: 0,
    top: 0,
    opacity: 1

  },
  inputView: {
    width: 305,
    height: 58,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1976D2",
    borderRadius: 15,
    marginLeft: "13%"
  },
  imageover: {
    position: 'absolute',
    width: 417,
    height: 199.18,
    left: 0,
    top: 0,
    opacity: 1,
  },
  TextInput: {
    height: 58,
    padding: 10,
    color: "#000",
    marginLeft: 10,
    alignItems: "center",
    width: 305,
    borderColor: "#1976D2",
  },
  loginBtn: {
    width: 305,
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#1976D2",
    marginLeft: 56
  },
  signGoogle: {
    width: 305,
    borderWidth: 1,
    borderColor: "#1976D2",
    borderRadius: 15,
    height: 50,
    flexDirection:"row",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#fff",
    marginLeft: 56
  },
  googelText: {
    color: "#2E353A",
  },
  loginText: {
    color: "#ffff",
    textAlign: "center"
  },
  forgotpass:{
    position:"absolute",
    width:261,
    height:14,
    marginLeft:261,
  },
  forgotpasstxt:{
    fontWeight:"500",
    fontSize:12,
    
  },
  diverline:{
    width:148,
    height:0,
    borderWidth:1,
    borderColor:"#000"
  },
  diverline1:{
    width:148,
    height:0,
    borderWidth:1,
    borderColor:"#000"
  }
});
