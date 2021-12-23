import React, { useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";

export default function LogoutComponent(props){
    const [closed,setClose]=useState(true);
    const close=()=>{
        props.navigation.navigate("Root",{screen:'Dashboard'});
        setClose(false);
    }
    const logout=()=>{
        props.navigation.navigate("login");
        setClose(false);
    }
    return(
        <View>
                        <Dialog.Container visible={closed}> 
                            <Dialog.Title>Do you want to logout</Dialog.Title>
                            <Dialog.Button label="Cancel" onPress={close} />
                            <Dialog.Button label="Logout" onPress={logout} />
                        </Dialog.Container>
                    </View>
    );
}