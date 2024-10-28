import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Schedule from '../screens/SubscriberScrees/Schedule';
import Vendors from '../screens/SubscriberScrees/Vendors';
import NeighbourHood from '../screens/SubscriberScrees/NeighbourHood';
import {Color} from '../assets/Utils';
import SvgIcons from '../Components/SvgIcons';
import {
  menu,
  menuActive,
  schedule,
  scheduleActive,
  vendor,
  vendorActive,
} from '../assets/icons';
import {useState} from 'react';
import {Text, View} from 'react-native';
import EditProfile from '../screens/authScreens/EditProfile';

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
        backgroundColor: focused ? Color.themeColor :null,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        borderBottomLeftRadius:15,
        padding:10,
        marginTop:15,
      }}>
      <SvgIcons
        height={'25'}
        width={'25'}
        xml={focused ? menuActive : menu}
      />
      <View style={{alignItems:'center'}}>

      <Text
        style={{
          color: focused ? Color.white : Color.black,
          fontSize: 10,
        }}>
        Neighbourhood
      </Text>
      <Text
        style={{
          color: focused ? Color.white : Color.black,
          fontSize: 10,
        }}>
        Wall
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
        backgroundColor: focused ? Color.themeColor :null,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        borderBottomLeftRadius:15,
        marginTop:15,
        padding:10,
      }}>
      <SvgIcons
        height={'30'}
        width={'30'}
        xml={focused ? scheduleActive : schedule}
      />
      <Text
        style={{
          color: focused ? Color.white : Color.black,
          fontSize: 12,
        }}>
        SCHEDULE
      </Text>
    </View>
    ),
    tabBarLabel: '',
  }}
  name="Schedule"
  component={Schedule}

/>
<Tab.Screen
  options={{
    tabBarIcon: ({focused}) => (
      <View
      style={{
        flexDirection: focused ? 'row' : 'column',
        alignItems: focused ? 'center' : 'center',
        gap: focused ? 10 : null,
        marginTop:15,
        padding:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        borderBottomLeftRadius:15,
        backgroundColor: focused ? Color.themeColor :null,
        justifyContent: 'center',
      }}>
      <SvgIcons
        height={'30'}
        width={'30'}
        xml={focused ? vendorActive : vendor}
      />
      <Text
        style={{
          color: focused ? Color.white : Color.black,
          fontSize: 12,
        }}>
        VENDOR
      </Text>
    </View>
    ),
    tabBarLabel: '',
  }}
  name="Vendor"
  component={Vendors}
/>
</Tab.Navigator>
  );
}
export function SubscriberStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}
