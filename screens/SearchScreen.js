import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyContext } from '../utils/Provider';
import BookCardScreen from './BookCardScreen';

const SearchScreen = () => {
  const { data, fetchBooks } = useContext(MyContext); // Accessing context
  const [searchQuery, setSearchQuery] = useState(''); // For handling search
  const [filteredBooks, setFilteredBooks] = useState([]); // To store filtered books
  const navigation = useNavigation();

  // Sync filteredBooks with fetched data initially
  useEffect(() => {
    if (data.books) {
      setFilteredBooks(data.books); // Copy data to filteredBooks
    }
  }, [data.books]);

  // Function to handle search query updates
  const handleSearch = text => {
    setSearchQuery(text);

    const lowerCaseQuery = text.toLowerCase();

    const newFilteredBooks = data.books.filter(book =>
      book.title.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredBooks(newFilteredBooks);
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

  // Render individual book item
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
          }}
        >
          <View style={styles.bookInfo}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: '1%',
              }}
            >
              {bookInfo.title}
            </Text>
            <Text
              style={{
                color: '#666666',
                fontSize: 16,
                marginTop: '1%',
              }}
            >
              {bookInfo.author}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: '-4%',
              }}
            >
              {bookInfo.available_copies > 0
                ? `Available: ${bookInfo.available_copies}`
                : 'Unavailable'}
            </Text>
          </View>
          <View
            style={{
              width:
                bookInfo.genre.length <= 5
                  ? '30%'
                  : bookInfo.genre.length < 9
                  ? '33%'
                  : bookInfo.genre.length > 11
                  ? '45%'
                  : '40%',
              borderRadius: 5,
              height: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: getGenreColor(bookInfo.genre),
              marginLeft: '8%',
            }}
          >
            <Text
              style={{
                color: '#000',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              {bookInfo.genre}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Navigate to book details
  const onItemClick = bookInfo => {
    navigation.navigate('BookCardScreen', { bookInfo });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', padding: '7%' }}>
          Search 🔎
        </Text>
      </View>
      <TextInput
        placeholder="Looking for a Book?"
        clearButtonMode="always"
        placeholderTextColor="#737373"
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
        onChangeText={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.container2}>
      {filteredBooks.map((bookInfo, index) => (
        <BookItem key={index} bookInfo={bookInfo} />
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
    // paddingBottom: '602%',
  },
  bookContainer: {
    padding: '3%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
    width: '90%',
    flexDirection: 'row',
    height: 175,
  },
  bookInfo: {
    flex: 1,
    marginLeft: '8%',
    marginTop: '3%',
  },
  bookImage: {
    width: '33%',
    height: '110%',
    borderRadius: 12,
    marginLeft: 5,
  },
});

export default SearchScreen;
