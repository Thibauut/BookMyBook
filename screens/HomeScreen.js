import * as React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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



const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


const HomeScreen = () => {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.containerTitle}>
        <View style={styles.titleContainer}>
        <Text style={{fontSize: 40, fontWeight: 'bold', padding: '7%'}}>Welcome 📚</Text>
      </View>

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
    containerTitle: {
      backgroundColor: '#fff',
      height: '20%',
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
