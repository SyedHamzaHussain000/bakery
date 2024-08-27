import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../screens/OwnerScreens/EditProfile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Order from '../screens/OwnerScreens/Order';
import NeighbourHood from '../screens/OwnerScreens/NeighbourHood';
import Bakeries from '../screens/OwnerScreens/Bakeries';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="NeighbourHood" component={NeighbourHood} />
      <Tab.Screen name="Bakery" component={Bakeries} />
      <Tab.Screen name="Orders" component={Order} />
    </Tab.Navigator>
  );
}
export function OwnerStack() {
  return (
    <Stack.Navigator
      initialRouteName="EditProfile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}
