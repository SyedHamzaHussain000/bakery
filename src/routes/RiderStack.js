import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RoutesScreen from '../screens/RiderScreens/RoutesScreen';
import NeighbourHood from '../screens/RiderScreens/NeighbourHood';
import Bakeries from '../screens/RiderScreens/Bakeries';
import {useState} from 'react';
import {Text, View} from 'react-native';
import {Color} from '../assets/Utils';
import {
  bakeryActive,
  bakeryIcon,
  menu,
  menuActive,
  routesActive,
  routesIcon,
} from '../assets/icons';
import SvgIcons from '../Components/SvgIcons';
import OrderStatus from '../screens/RiderScreens/OrderStatus';
import Gallery from '../screens/RiderScreens/Gallery';
import OrderComplete from '../screens/RiderScreens/OrderComplete';
import Map from '../screens/RiderScreens/Map';
import EditProfile from '../screens/authScreens/EditProfile';
import RiderNotification from '../screens/RiderScreens/RiderNotification';
import NotifyDetailsRider from '../screens/RiderScreens/NotifyDetailsRider';
import RoadWay from '../screens/RiderScreens/RoadWay';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  const [activeTab, setActiveTab] = useState('');

  console.log('activeTab', activeTab);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: '100%',
          justifyContent: 'center',
          height: 70,
          backgroundColor: '#EEEEEE',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: focused ? 'row' : 'column',
                alignItems: focused ? 'center' : 'center',
                gap: focused ? 10 : null,
                backgroundColor: focused ? Color.themeColor : null,
                justifyContent: 'center',
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                borderBottomLeftRadius: 11,
                marginTop: 15,
                padding: 10,
              }}>
              <SvgIcons
                height={'30'}
                width={'30'}
                xml={focused ? routesActive : routesIcon}
              />
              <Text
                style={{
                  color: focused ? Color.white : Color.black,
                  fontSize: 14,
                }}>
                Routes
              </Text>
            </View>
          ),
          tabBarLabel: '',
        }}
        name="Routes"
        component={RoutesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: focused ? 'row' : 'column',
                alignItems: focused ? 'center' : 'center',
                gap: focused ? 10 : null,
                backgroundColor: focused ? Color.themeColor : null,
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                borderBottomLeftRadius: 11,
                padding: 10,
                marginTop: 15,
              }}>
              <SvgIcons
                height={'25'}
                width={'25'}
                xml={focused ? menuActive : menu}
              />
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: focused ? Color.white : Color.black,
                    fontSize: 10,
                  }}>
                  NEIGHBOURHOOD
                </Text>
                <Text
                  style={{
                    color: focused ? Color.white : Color.black,
                    fontSize: 10,
                  }}>
                  WALL
                </Text>
              </View>
            </View>
          ),
          tabBarLabel: '',
        }}
        name="NeighbourHood"
        component={NeighbourHood}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: focused ? 'row' : 'column',
                alignItems: focused ? 'center' : 'center',
                gap: focused ? 10 : null,
                marginTop: 15,
                padding: 10,
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                borderBottomLeftRadius: 11,
                backgroundColor: focused ? Color.themeColor : null,
                justifyContent: 'center',
              }}>
              <SvgIcons
                height={'30'}
                width={'30'}
                xml={focused ? bakeryActive : bakeryIcon}
              />
              <Text
                style={{
                  color: focused ? Color.white : Color.black,
                  fontSize: 12,
                }}>
                BAKERY
              </Text>
            </View>
          ),
          tabBarLabel: '',
        }}
        name="Bakeries"
        component={Bakeries}
      />
    </Tab.Navigator>
  );
}

export function RiderStack() {
  const updatedProfile = useSelector(state => state.user.updatedProfile);
  console.log('updatedProfile', updatedProfile);

  return (
    <Stack.Navigator
      // initialRouteName={updatedProfile === 0 ?  'EditProfile' : 'BottomTabs'}
      initialRouteName='BottomTabs'
      screenOptions={{headerShown: false}}>
      {updatedProfile == 0 ? (
        <>
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </>
      ) : (
        <>
          <Stack.Screen name="OrderStatus" component={OrderStatus} />
          <Stack.Screen name="Gallery" component={Gallery} />
          <Stack.Screen name="OrderComplete" component={OrderComplete} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="EditProfile" component={EditProfile} />

          <Stack.Screen name="RoadWay" component={RoadWay} />
          <Stack.Screen
            name="NotificationDetails"
            component={NotifyDetailsRider}
          />
          <Stack.Screen name="Notification" component={RiderNotification} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        </>
      )}
    </Stack.Navigator>
  );
}
