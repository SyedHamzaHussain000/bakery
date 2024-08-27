import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../screens/RiderScreens/EditProfile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RoutesScreen from '../screens/RiderScreens/RoutesScreen';
import NeighbourHood from '../screens/RiderScreens/NeighbourHood';
import Bakeries from '../screens/RiderScreens/Bakeries';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator  screenOptions={{headerShown:false}}>
      <Tab.Screen name="RoutesScreen" component={RoutesScreen} />
      <Tab.Screen name="NeighbourHood" component={NeighbourHood} />
      <Tab.Screen name="Bakeries" component={Bakeries} />
    </Tab.Navigator>
  );
}
export function RiderStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}
