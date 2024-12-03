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
  ActivityIndicator
} from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Buffer } from 'buffer';
import filter from 'lodash.filter';
import { MyContext} from '../utils/Provider'

const SearchScreen = () => {
  const {data, setData} = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState('');


  const [books, setBooks] = useState([]); // State to store books
  const [error, setError] = useState(null); // State to store error if any

    // Function to handle fetching all books from the backend
  const fetchBooks = () => {
    axios.post('http://localhost:30360/allbooks')
      .then(response => {
        // Set the books data to state
        setBooks(response.data.books);
        // console.log(response.data.books[0]);
        setError(null);  // Reset any previous errors
      })
      .catch(error => {
        // Handle error
        console.error("There was an error fetching the books:", error);
        setError('Failed to load books. Please try again.');
      });
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  function handleSearch (text) {
    setSearchQuery(text);
    // const formattedQuery = text?.toLowerCase() || '';
    // const filteredData = filter(data.employeeTmp, employee => {
    //   return contains(employee, formattedQuery);
    // });
    // updateEmployeeData(filteredData);
  }


  const BookItem = ({ bookInfo }) => {
    // Check if cover_image_binary exists
    const imageSource = {  }  // Fallback image if no cover_image_binary
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{bookInfo.title}</Text>
        <Text style={styles.author}>{bookInfo.author}</Text>
        <Image 
          style={styles.bookImage}
          source={imageSource} 
        />
      </View>
    );
  };



  const contains = ({ name, surname }, query) => {
    const fullName = `${name.toLowerCase()} ${surname.toLowerCase()}`;
    if (fullName.includes(query)) {
      return true;
    }
    return false;
  }

  const navigation = useNavigation();
  const onItemClick = (employeeInfo) => {
    console.log(employeeInfo);
    navigation.navigate('EmployeeProfileScreen', employeeInfo);
  };

  console.log(data.employee);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 40, fontWeight: 'bold', padding: '7%'}}>Search 🔎</Text>
      </View>
      <TextInput
        placeholder='Looking for a Book ?'
        clearButtonMode="always"
        placeholderTextColor= '#737373'
        style={{
          marginHorizontal: '5%',
          paddingHorizontal: '6%',
          paddingVertical: '3.5%',
          marginBottom: '3%',
          borderRadius: 12,
          borderColor: '#ffffff',
          backgroundColor: '#f2f2f2',
          borderWidth: 2,
        }}
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
      ></TextInput>
      <ScrollView contentContainerStyle={styles.container2}>
      {books.map((bookInfo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.bookContainer}
            onPress={() => onItemClick(bookInfo)}>
            <Image
              style={styles.bookImage}
              resizeMode="stretch"
              source={{ uri: `data:image/jpeg;base64,${bookInfo.cover_image_binary}` }}
            />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              flex: 1,
            }}
          >
            <View style={styles.bookInfo}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: '1%',
              }}>{bookInfo.title}</Text>
              <Text
                style={{
                  color: '#666666',
                  fontSize: 16,
                  marginTop: '1%',
              }}
              >{bookInfo.author}</Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: '-4%',
              }}
              >Available: {bookInfo.available_copies}</Text>
            </View>
            <View
              style={{
                width: bookInfo.genre.length <= 5 ? '30%'
                : bookInfo.genre.length < 9 ? '33%'
                : bookInfo.genre.length > 11 ? '45%'
                : '40%',
                borderRadius: 5,
                height: '15%',
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ccddff",
                marginLeft: "8%",
              }}
            >
              <Text style={{
                color: '#000',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
                {bookInfo.genre}
              </Text>
            </View>

          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '15%',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

    container2: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '2%',
        paddingBottom: '602%',
    },
    bookContainer: {
      padding: '3%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 16,
      width: '90%',

      flexDirection: 'row',
      height: "3.65%",
    },
    bookInfo: {
      flex: 1,
      marginLeft: "8%",
      marginTop: "3%",
    },
    bookImage: {
      width: "33%",
      height: "110%",
      borderRadius: 12,
      marginLeft: 5,
    },
});

export default SearchScreen;
