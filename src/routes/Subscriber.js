import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../screens/SubscriberScrees/EditProfile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Schedule from '../screens/SubscriberScrees/Schedule';
import Vendors from '../screens/SubscriberScrees/Vendors';
import NeighbourHood from '../screens/SubscriberScrees/NeighbourHood';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator  screenOptions={{headerShown:false}}>
      <Tab.Screen name="NeighbourHood" component={NeighbourHood} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Vendors" component={Vendors} />
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
