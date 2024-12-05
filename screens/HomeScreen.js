import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';
import SearchStacks from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Animated,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MyContext } from '../utils/Provider';



const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


const HomeScreen = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const x_screen = Dimensions.get('window').width;
    const y_screen = Dimensions.get('window').height;

    const { data, fetchBooks, fetchTopBooks } = useContext(MyContext);

    const navigation = useNavigation();
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.containerTitle}>
        <View style={styles.titleContainer}>
        <Text style={{fontSize: 40, fontWeight: 'bold', padding: '7%'}}>Welcome 📚</Text>
      </View>

      <Text style={{
        marginHorizontal: '5%',
        paddingHorizontal: '6%',
        fontSize: 20, color: '#333333', marginLeft: 15, fontWeight: 'bold', marginBottom: "5%"}}>
            Popular Books
      </Text>

      <View style={{marginBottom: '2%',
        }}>
        <Animated.FlatList
          horizontal={true}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          data={data.topBooks}  // Use topBooks from context
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{
            marginLeft: '3%',
            marginBottom: '5%',
            width: 1411,
          }}
          renderItem={({ item, index }) => (
            <View style={{

              backgroundColor: '#ffffff',
              borderRadius: 8,
              width: 186,
              height: 250,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#f2f2f2',
            }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',  // Center the content horizontally
                  alignItems: 'center',      // Vertically align the content
                  width: '100%',             // Ensure full width of the container
                  height: 280,               // Set a fixed height for the image container
                }}
              >
                <Image
                  style={[styles.bookImage, { width: 185, height: 250 }]}  // Explicitly set width and height
                  resizeMode="stretch"
                  source={{ uri: `data:image/jpeg;base64,${item.cover_image_binary}` }}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.isbn}  // Assuming `isbn` is unique
          ItemSeparatorComponent={() => <View style={{ width: 13 }} />}
        />
        </View>

        <Text style={{
          marginHorizontal: '5%',
          paddingHorizontal: '6%',
          fontSize: 20, color: '#333333', marginLeft: 15, fontWeight: 'bold', marginBottom: "3%"}}>
              Best Reviewed Books
        </Text>

        <ScrollView contentContainerStyle={styles.container2}
          showsVerticalScrollIndicator={false}
        >
          {data.reviews?.map((review) => (

            <View key={review.review_id} style={styles.reviewItem}>
              <View style={{
                flexDirection: 'row',
                marginBottom: '1%',
                borderRadius: 8,
                backgroundColor: '#fbfbfb',
                width: '100%',
                padding: '3%',
              }}>
                <Image
                  style={[styles.bookImage, { width: 120, height: 170 }]}  // Explicitly set width and height
                  resizeMode="stretch"
                  source={{ uri: `data:image/jpeg;base64,${data.books[review.book_id - 1]?.cover_image_binary}` }}
                  />
                <View style={{flexDirection: 'column',
                  marginLeft: '5%',
                  flex: 1,
                  // backgroundColor: '#ccc',
                 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginBottom: '7%',
                      marginTop: '4%',
                    }}
                  >
                    {review.book_title}</Text>

                    <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                        fontWeight: 'medium',
                      }}
                    >{review.review_text}</Text>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 12,
                        fontWeight: 'medium',
                        marginTop: '5%',
                      }}
                    >

                    Reviewed by {review.username}</Text>

                    <Text
                      style={{
                        color: '#000',
                        fontSize: 12,
                        fontWeight: 'medium',
                        marginTop: '1%',
                      }}
                    >
                        {review.review_date}
                    </Text>

                    <View style={styles.row}>
                      {/* Star icon */}
                      <Icon name="star" size={20} color="#FFD700" style={styles.icon} />
                      {/* Review text */}
                      <Text style={styles.reviewTextr}>{review.rating}</Text>
                    </View>


                </View>


                
              </View>
            </View>
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
    );

  };

  const HomeTabs = ({navigation}) => {
    return (
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: '10%', paddingBottom: '8%', paddingTop: '2%'},
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
      }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#1a1a1a',
          tabBarInactiveTintColor: '#cccccc',
        }}/>
        <Tab.Screen name="Search" component={SearchStacks} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name="magnify" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#1a1a1a',
          tabBarInactiveTintColor: '#cccccc',
        }}/>
        <Tab.Screen name="Books" component={ProfileScreen} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="user" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#1a1a1a',
          tabBarInactiveTintColor: '#cccccc',
        }}/>
      </Tab.Navigator>
    );
  };

  const styles = StyleSheet.create({

    row: {
      marginTop: '8%',
      flexDirection: 'row', // Align items horizontally
      justifyContent: 'flex-end', // Aligns items to the end horizontally
      alignItems: 'center', // Vertically centers the items in the row
    },
    icon: {
      marginRight: 10, // Adds space between the icon and the text
    },

    reviewTextr: {
      fontSize: 16,
      color: '#333',
    },

    reviewItem: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 12,
      width: '90%',
    },

    bookImage: {
      width: '43%',
      height: '110%',
      borderRadius: 10,
      marginLeft: 5,
    },
    containerTitle: {
      backgroundColor: '#fff',
      height: '20%',
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    container2: {
      flexGrow: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: '2%',
      // paddingBottom: '602%',
    },
    columnWrapper: {
      flexDirection: 'row',
      flexBasis: '100%',
    },
    smallItem: {
      // flex: 1,
      borderRadius: 15,
      height: 150,
      width: 150,
      backgroundColor: 'lightblue',
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    largeItem: {
      // flex: 2,
      borderRadius: 15,
      height: 150,
      width: 300,
      // backgroundColor: item.color,
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textAppBar: {
      padding: '5%',
      fontSize: 20,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      color: 'lightgrey'
    },
    widgetsIcon: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 50,
    },
    widgetsText: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
    },
    blackContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
      borderRadius: 10,
      height: 20,
      width: 20,
      margin: 20,
    },
    scrollBar: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  export default HomeTabs;

  // export {MyTabs};i

  export {HomeScreen};
