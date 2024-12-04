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
import BorrowedCardScreen from './BorrowedCardScreen';
import { MyContext } from '../utils/Provider';
import { useFocusEffect } from '@react-navigation/native';



const ProfileScreen = () => {
  const {data, getUserBorrowedBooks } = useContext(MyContext);

  const navigation = useNavigation();

  const handleLogout = async () => {
    const response = await axios.post('http://localhost:30360/logout');
    if (response.status === 200) {
      // Logout successful, clear user data in context or state
      setData({ user: null }); // Assuming you're using context for user data
      Alert.alert('Logged out', 'You have successfully logged out.');

      // Redirect to login screen (using React Navigation)
      navigation.navigate('Login'); // Adjust to your navigation stack
    } else {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserBorrowedBooks(data.user.id); // Call this when HomeScreen is focused
    }, [])
  );

  function getBorrowedByBookID(bookID) {
    const book = data.borrowedBooks.find(borrowed => borrowed.book_id === bookID);

    if (book) {
        // console.log(`Details for Book ID ${bookID}:`, book);
        return book;
    } else {
        // console.warn(`No book found with Book ID: ${bookID}`);
        return null;
    }
}

  const onItemClick = (bookInfo) => {
    const borrowedDetails = getBorrowedByBookID(bookInfo.id);

    console.log('Borrowed Details:', borrowedDetails);
    navigation.navigate('BorrowedCardScreen', {
      bookInfo,
      borrowedDate: borrowedDetails.loan_date,
      dueDate: borrowedDetails.due_date,
    }
  );

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
    return genreColors[genre] || '#ccddff'; // Default light blue
  };

  const BookItem = ({ bookInfo }) => {
    const imageSource = {
      uri: `data:image/jpeg;base64,${bookInfo.cover_image_binary}`,
    };
    return (
      <TouchableOpacity
        style={styles.bookContainer}
        onPress={() => onItemClick(bookInfo)}
      >
        <Image
          style={styles.bookImage}
          resizeMode="stretch"
          source={imageSource}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            flex: 1,
            backgroundColor: '#fff',
          }}
        >
          <View style={styles.bookInfo}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginBottom: '1%',
              }}
            >
              {bookInfo.title}
            </Text>
            <Text
              style={{
                color: '#666666',
                fontSize: 13,
                marginTop: '1%',
              }}
            >
              {bookInfo.author}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', padding: '7%' }}>
          Books 📚
        </Text>
      </View>
        <View
          style={{flexDirection: 'column', alignItems: 'center'}}
        >
        <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>
            {data.user.first_name} {data.user.last_name}
          </Text>
          <Text style={styles.emailText}>
            {data.user.email}
          </Text>
        </View>
        {/* Logout Icon */}
        <TouchableOpacity style={styles.loginBtn}
            onPress={handleLogout}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#fff' }}>
              Logout
            </Text>
          </TouchableOpacity>
      </View>


    </View>
    <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: '8%',
          marginTop: '10%',
          marginBottom: '2%',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: '#333333',
            fontWeight: 'bold',
          }}
        >
          Books Borrowed
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: '#333333',
            fontWeight: 'bold',
          }}
        >
          ({data.borrowedBooks.length})
        </Text>
      </View>
      <View style={{ flex: 1}}>
      {data.borrowedBooks.length === 0 ? (
        <Text style={{ fontSize: 18, color: '#333', marginTop: 20 }}>
          No books borrowed yet
        </Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingTop: '2%',

          }}
          style={{ height: 10}} // Set a fixed height for the ScrollView
        >
          {data.borrowedBooks.map((book, index) => (
            <BookItem key={index} bookInfo={data.books[book.book_id - 1]} />
          ))}
        </ScrollView>
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bookImage: {
    width: 60,
    height: 80,
    borderRadius: 7,
    marginLeft: 5,
  },
  bookContainer: {
    padding: '3%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 3,
    width: '90%',
    flexDirection: 'row',
    height: 100,
  },

  bookInfo: {
    flex: 1,
    marginLeft: '10%',
    marginTop: '3%',
  },

  loginBtn: {
    width: 70,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffa0a0",
    alignSelf: 'center',

  },

  profileContainer: {
    flexDirection: 'row', // Arrange profile info and icon horizontally
    justifyContent: 'space-between', // Space between the profile info and logout icon
    alignItems: 'center', // Align items vertically centered
    marginBottom: '1%',
    borderRadius: 8,
    backgroundColor: '#fbfbfb',
    width: '90%',
    padding: '3%',
    height: 100,
  },
  profileInfo: {
    flexDirection: 'column', // Keep profile info vertically aligned
    // alignItems: 'center',
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '2%',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 15,
    marginBottom: '1%',
    // textAlign: 'center',
  },
  logoutButton: {
    marginLeft: 10, // Add some margin between the profile info and icon
  },

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
    // flex: 1,
    backgroundColor: '#fff',
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
    padding: '3%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
    width: '90%',
    flexDirection: 'row',
    height: 175,
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