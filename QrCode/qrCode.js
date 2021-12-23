import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TaskContext } from '../DataContext/TaskContext';
export default function ScannerComponent(props) {
  const navigation=useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const tddt=useContext(TaskContext);
  const name=tddt.name;
  const email=tddt.email;
console.log(email);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const datas = JSON.stringify({
      // "data": data
      "data":"b9355707-0fb2-464f-bc87-a5fa3ff1bc15"
  });
  console.log(datas);
  var config = {
      method: 'POST',
      url: 'http://34.136.41.197:5000/qrcode',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': 'null'
      },
      data: datas
  };

  axios(config)
      .then(response => {
          const QR_Data = response.data["data"]
          console.log(email);  
          navigation.navigate("attendance-t",{cls:QR_Data["class"],name:name,mail:email});
      })
      .catch(function (error) {
          console.log(error);
      });
   

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});