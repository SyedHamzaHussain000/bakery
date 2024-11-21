import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Order from '../screens/OwnerScreens/Order';
import NeighbourHood from '../screens/OwnerScreens/NeighbourHood';
import Bakeries from '../screens/OwnerScreens/Bakeries';
import {Color} from '../assets/Utils';
import {
  bakeryActive,
  bakeryIcon,
  menu,
  menuActive,
  OrderActive,
  orderIcon,
} from '../assets/icons';
import {Text, View} from 'react-native';
import SvgIcons from '../Components/SvgIcons';
import AddProduct from '../screens/OwnerScreens/AddProduct';
import ProductDetails from '../screens/OwnerScreens/ProductDetails';
import ChooseLocation from '../screens/OwnerScreens/ChooseLocation';
import EditProfile from '../screens/authScreens/EditProfile';
import OrderDetails from '../screens/common/OrderDetails';
import UserProfile from '../screens/common/UserProfile';

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
                flexDirection: focused ? 'row' : 'column',
                alignItems: focused ? 'center' : 'center',
                gap: focused ? 10 : null,
                backgroundColor: focused ? Color.themeColor : null,
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                borderBottomLeftRadius: 11,
                marginTop: 15,
                padding: 10,
              }}>
              <SvgIcons
                height={'30'}
                width={'30'}
                xml={focused ? OrderActive : orderIcon}
              />
              <Text
                style={{
                  color: focused ? Color.white : Color.black,
                  fontSize: 12,
                }}>
                ORDERS
              </Text>
            </View>
          ),
          tabBarLabel: '',
        }}
        name="Orders"
        component={Order}
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
        name="Bakery"
        component={Bakeries}
      />
    </Tab.Navigator>
  );
}

export function OwnerStack() {
  return (
    <Stack.Navigator
      initialRouteName="EditProfile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />

    </Stack.Navigator>
  );
}
