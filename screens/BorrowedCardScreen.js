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
import { Buffer } from 'buffer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Barcode } from 'expo-barcode-generator';
import { useNavigation } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import { MyContext } from '../utils/Provider';

const BorrowedCardScreen = ({ route }) => {
  const { bookInfo, borrowedDate, dueDate } = route.params;
  const { data, fetchBooks } = useContext(MyContext); // Accessing context
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>

        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <TouchableOpacity
          onPress={handleBackPress}>
            <Icon name="arrow-left" size={30} color="#000" style={{ paddingLeft: '6%', paddingTop: '6%'}} />
          </TouchableOpacity>
        </View>

        <View
          style={{flexDirection: 'column', alignItems: 'center'}}
        >
          <Image
            style={styles.bookImage}  // Explicitly set width and height
            resizeMode="stretch"
            source={{ uri: `data:image/jpeg;base64,${bookInfo.cover_image_binary}` }}
          />

          <View style={{
            marginBottom: '1%',
            borderRadius: 8,
            backgroundColor: '#fbfbfb',
            width: '90%',
            padding: '3%',
            alignContent: 'center',
            flexDirection: 'column',
          }}>
            <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      marginBottom: '5%',
                      textAlign: 'center',
                    }}
                  >
            {bookInfo.title}</Text>
            <Text
                    style={{
                      fontSize: 17,
                      marginBottom: '4%',
                      textAlign: 'center',
                    }}
                  >
            {bookInfo.author}</Text>
            <Text
                    style={{
                      fontSize: 15,
                      marginBottom: '2%',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
            Borrowed Date: {borrowedDate}</Text>
            <Text
                style={{
                    fontSize: 15,
                    marginBottom: '2%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
                  >
            Due Date: {dueDate}</Text>
        <View style={styles.containerCode}>
            <Barcode
                value="123456789012"
                options={{
                    format: 'UPC',
                    background: '#fff',
                    displayValue: false,
                    height: 50,
                }}
            />
        </View>
    <Text
        style={{
            fontSize: 15,
            marginBottom: '5%',
            textAlign: 'center',
            fontWeight: 'bold',
        }}
        >
        {bookInfo.isbn}</Text>

        <Text
        style={{
            fontSize: 15,
            marginBottom: '1%',
            textAlign: 'center',
            fontWeight: 'medium',
        }}
        >
        Show this barcode to pickup your Book</Text>

    <View
      style={{
        justifyContent: 'space-between',
        width: '100%',
        padding: '5%',
        marginTop: '5%',
        height: 78,
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
        <TouchableOpacity style={styles.loginBtn}
        // onPress={handleBorrowPress}
        >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>
            Cancel
        </Text>
        </TouchableOpacity>
    </View>
          </View>


        </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
    containerCode: {
        // flex: 1,             // Use full screen height and width
        alignItems: 'center', // Horizontally center the barcode
        justifyContent: 'center', // Vertically center the barcode
        marginTop: 1,
      },
  bookImage: {
    width: 200,
    height: 290,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 30,
  },

  loginBtn: {
    width: "45%",
    borderRadius: 9,
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: '7%',
    backgroundColor: "#ffa0a0",
    alignSelf: 'center',
  },

  unavailable: {
    width: "100%",
    borderRadius: 9,
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: '10%',
    backgroundColor: "#ccc",
    alignSelf: 'center',
  },

  containerTitle: {
    backgroundColor: '#fff',
    height: '40%',
  },
  titleContainer: {
    paddingTop: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
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
    padding: '7%',
    backgroundColor: '#ccc',

  },
  backButton: {
    flex: 1,
  }

});

export default BorrowedCardScreen;