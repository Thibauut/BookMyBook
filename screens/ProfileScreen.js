import axios from 'axios';
import React, { useState, useContext } from 'react';
import {StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  Font,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert
} from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Buffer } from 'buffer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from '@react-native-material/core';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { MyContext } from '../utils/Provider';

const ProfileScreen = () => {
  const {data, setData} = useContext(MyContext);
  const [imageData, setImageData] = useState(null);
  const [Iuser, setIuser] = useState({});

  // const getUserInfo = async () => {
  //   const headers = {
  //     'accept': 'application/json',
  //     'X-Group-Authorization': 'DLjsqJHActEeYHiMzNZKdRbtOSeEe4J1',
  //     'Authorization': 'Bearer ' + window.userToken,
  //   };
  //   await axios.get('https://masurao.fr/api/employees/me', {headers})
  //     .then(response => {
  //       const userData = response.data;
  //       console.log(userData);
  //       setIuser(userData);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     if (Iuser.id) {
  //       const headers = {
  //         'accept': 'application/json',
  //         'X-Group-Authorization': 'DLjsqJHActEeYHiMzNZKdRbtOSeEe4J1',
  //         'Authorization': 'Bearer ' + window.userToken,
  //       };

  //       await axios.get(`https://masurao.fr/api/employees/${Iuser.id}/image`, {headers, responseType: 'arraybuffer'})
  //         .then(imageResponse => {
  //           const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');
  //           setImageData(`data:image/png;base64,${base64Image}`);
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     }
  //   };

  //   fetchImage();
  // }, [Iuser]);

  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    backgroundColor: '#fff',
    height: '20%',
  },
  titleContainer: {
    paddingTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: '29%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 180,
    position: 'relative',
    padding: '1%',
    left: '1%',
  },
  infoBox: {
    backgroundColor: '#b3d9ff',
    flexDirection: 'row',
    height: '82%',
    width: '90%',
    borderRadius: 20,
    position: 'absolute',
    marginBottom: '2%',
    marginTop: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '1%',
    left: '15%',
  },
  infoTextTitle: {
    fontSize: 30,
    color: '#000000',
    marginTop: '6%',
    marginBottom: '2%',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#000000',
    marginBottom: "2%",
    textAlign: 'center',
  },
  icon: {
    marginRight: '4%',
    marginBottom: '2.1%',
  },

});

export default ProfileScreen;