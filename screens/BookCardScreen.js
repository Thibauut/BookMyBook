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

import { useNavigation } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import { MyContext } from '../utils/Provider';

const BookCardScreen = ({ route }) => {
  const { bookInfo } = route.params;
  const { data, fetchBooks } = useContext(MyContext); // Accessing context
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const getGenreColor = genre => {
    const genreColors = {
      Conte: '#ffbf80',
      Literary: '#ffbf80',
      Magical: '#ffbf80',
      Historical: '#ffbf80',
      Speculative: '#ffbf80',

      Horror: '#b3b3ff',
      Realism: '#b3b3ff',
      Fantasy: '#b3b3ff',
      Romance: '#b3b3ff',
      Thriller: '#b3b3ff',

      Science: '#c2f0c2',
      Philosophical: '#c2f0c2',
      Psychological: '#c2f0c2',
      Apocalyptic: '#c2f0c2',
      Comedic: '#c2f0c2',

      Crime: '#ffb3cc',
      Mythological: '#ffb3cc',
      Memoir: '#ffb3cc',
      Mystery: '#ffb3cc',
      Contemporary: '#ffb3cc',
    };

    // Default color if genre is not mapped
    return genreColors[genre] || '#ccddff'; // Default light blue
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
                      marginBottom: '1%',
                      textAlign: 'center',
                    }}
                  >
            {bookInfo.author}</Text>
            <Text
                    style={{
                      fontSize: 18,
                      marginBottom: '5%',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
            Released in {bookInfo.publication_year}</Text>
            <Text
                    style={{
                      fontSize: 15,
                      marginBottom: '2%',
                      textAlign: 'center',
                    }}
                  >
            {bookInfo.synopsis}</Text>

            <View 
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: '5%',
        marginTop: '5%',
        height: 78,
      }}
    >
      {bookInfo.available_copies === 0 ? (
        // If available_copies is 0, show the "Unavailable" button
        <TouchableOpacity style={styles.unavailable}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>
            Unavailable
          </Text>
        </TouchableOpacity>
      ) : (
        // Otherwise, show the "Borrow" and "To Read" buttons
        <>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>
              Borrow
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>
              To Read
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
          </View>


        </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  bookImage: {
    width: 200,
    height: 290,
    borderRadius: 10,
    marginBottom: 10,

  },

  loginBtn: {
    width: "45%",
    borderRadius: 9,
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: '10%',
    backgroundColor: "#82a3ff",
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

export default BookCardScreen;