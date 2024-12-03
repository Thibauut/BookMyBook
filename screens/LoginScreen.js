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
  Alert,
  Animated
} from 'react-native';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { MyContext} from '../utils/Provider'
import { Buffer } from 'buffer';

window.userToken = '';

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setIsPasswordFocused(false);
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    setIsEmailFocused(false);
  };
  const emailBorderColor = isEmailFocused ? '#82a3ff' : '#e6e6e6';
  const passwordBorderColor = isPasswordFocused ? '#82a3ff' : '#e6e6e6';
  const { data, fetchBooks, fetchTopBooks } = useContext(MyContext);

  const navigation = useNavigation();
  const handlePress = (email, password) => {
    const data_login = {
      email,
      password
    }
    console.log(data_login);
    axios.post('http://localhost:30360/login', data_login ).then(response => {
      if (response.status === 200) {
        console.log(response.data);

        fetchBooks();
        fetchTopBooks();


        navigation.navigate('HomeScreen');
      }
    }).catch(error => {
      console.log(error);
      if (error.response.status != 200) {
        console.log("Invalid Email and Password combination");
        setErrorMessage("Invalid Email and Password combination");
      }
    });
  };

  return (
      <SafeAreaView style={styles.container}>
          <View style={{
            paddingTop: '15%',
            paddingHorizontal: '8%',
            marginBottom: '80%',
          }}>
          <Text style={{fontSize: 50, color: '#000000', marginBottom: 30, fontWeight: 'bold'}}>
            Login
          </Text>
          <Text style={{fontSize: 20, color: '#333333', marginBottom: 70}}>
            Welcome back to the App 📚
          </Text>




          <Text style={{fontSize: 15, color: '#333333', marginLeft: 15, fontWeight: 'bold'}}>
            Email Address
          </Text>
          <View style={[styles.inputEmailContainer, { borderColor: emailBorderColor }]}>
            <TextInput
              placeholder="hello@exemple.com"
              value={email}
              style={styles.textBox}
              onChangeText={(text) => setEmail(text)}
              onFocus={handleEmailFocus}
            />
            <Icon name="email-outline" size={20} color="#000000" style={{ paddingHorizontal: '2%'}}/>
          </View>

          <Text style={{fontSize: 15, color: '#333333', marginLeft: 15, fontWeight: 'bold'}}>
            Password
          </Text>
          <View style={[styles.inputPasswordContainer, { borderColor: passwordBorderColor }]}>
            <TextInput
              placeholder="password"
              value={password}
              style={styles.textBox}
              secureTextEntry={!isPasswordVisible}
              onChangeText={(text) => setPassword(text)}
              onFocus={handlePasswordFocus}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
              <Icon2
                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                size={22}
                color="#000000"
              />
            </TouchableOpacity>


          </View>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : <Text style={styles.errorMessage}></Text>}
          <TouchableOpacity onPress={() => handlePress(email, password)} style={styles.loginBtn}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>
              Continue
            </Text>
          </TouchableOpacity>
          </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  inputEmailContainer: {
    marginTop: '2%',
    borderWidth: '2%',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    height: '11%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: '5%',
  },
  inputPasswordContainer: {
    marginTop: '2%',
    borderWidth: '2%',
    borderRadius: 12,
    height: '11%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: '10%',
  },
  loginBtn: {
    width: "60%",
    borderRadius: 10,
    height: '8%',
    alignItems: "center",
    justifyContent: "center",
    // marginTop: '30%',
    backgroundColor: "#82a3ff",
    alignSelf: 'center',
  },

  textBox:{
    margin: '3%',
    borderRadius: 12,
    padding: '2%',
    width:'80%',
    alignItems: "center",
    height: '80%',
  },
  iconContainer: {
    padding: '2%',
  },
  errorMessage: {
    color: '#ff4d4d',
    padding: '2%',
    // paddingHorizontal: '13%',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    marginBottom: '50%',
  },
});

export default LoginScreen;