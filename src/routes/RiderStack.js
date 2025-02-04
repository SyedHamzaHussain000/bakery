import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RoutesScreen from '../screens/RiderScreens/RoutesScreen';
// import NeighbourHood from '../screens/RiderScreens/NeighbourHood';
import Bakeries from '../screens/RiderScreens/Bakeries';
import {Text, View} from 'react-native';
import {Color} from '../assets/Utils';
import {
  bakeryActive,
  bakeryIcon,
  homeBlack,
  homeWhite,
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
import ViewRouteDetails from '../screens/common/ViewRouteDetails';
import Home from '../screens/RiderScreens/Home';
import {
  responsiveHeight,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import NeighbourHood from '../screens/SubscriberScrees/NeighbourHood';
import ChooseLocation from '../screens/common/ChooseLocation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
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
                alignItems: 'center',
                // gap: focused ? 10 : null,
                width: responsiveWidth(22),
                backgroundColor: focused ? Color.themeColor : null,
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                borderBottomLeftRadius: 11,
                // padding: 10,
                padding: responsiveHeight(0.5),
                marginTop: 15,
              }}>
              <>
                <SvgIcons
                  xml={focused ? homeWhite : homeBlack}
                  height={'30'}
                  width={'30'}
                />
                <Text
                  style={{
                    color: focused ? Color.white : Color.black,
                    fontSize: 12,
                  }}>
                  Home
                </Text>
              </>
            </View>
          ),
          tabBarLabel: '',
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                width: responsiveWidth(25),
                backgroundColor: focused ? Color.themeColor : null,
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                borderBottomLeftRadius: 11,
                padding: responsiveHeight(0.5),

                marginTop: 15,
              }}>
              <>
                <SvgIcons
                  xml={focused ? routesActive : routesIcon}
                  height={'30'}
                  width={'30'}
                />
                <Text
                  style={{
                    color: focused ? Color.white : Color.black,
                    fontSize: 12,
                  }}>
                  Routes
                </Text>
              </>
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
                alignItems: 'center',
                width: responsiveWidth(25),
                backgroundColor: focused ? Color.themeColor : null,
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                borderBottomLeftRadius: 11,
                padding: responsiveHeight(0.5),
                marginTop: 15,
              }}>
              <>
                <SvgIcons
                  xml={focused ? menuActive : menu}
                  height={'30'}
                  width={'30'}
                />
                <Text
                  style={{
                    color: focused ? Color.white : Color.black,
                    fontSize: 12,
                  }}>
                  NeighbourHood
                </Text>
              </>
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
                alignItems: 'center',
                width: responsiveWidth(25),
                backgroundColor: focused ? Color.themeColor : null,
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                borderBottomLeftRadius: 11,
                padding: responsiveHeight(0.5),
                marginTop: 15,
              }}>
              <>
                <SvgIcons
                  xml={focused ? bakeryActive : bakeryIcon}
                  height={'30'}
                  width={'30'}
                />
                <Text
                  style={{
                    color: focused ? Color.white : Color.black,
                    fontSize: 12,
                  }}>
                  Bakeries
                </Text>
              </>
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
      initialRouteName="BottomTabs"
      screenOptions={{headerShown: false}}>
      {updatedProfile === 0 ? (
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
          <Stack.Screen name="ViewRouteDetails" component={ViewRouteDetails} />
          <Stack.Screen name="RoadWay" component={RoadWay} />
          <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
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
