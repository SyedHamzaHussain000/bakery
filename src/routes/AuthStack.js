import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screens/authScreens/Signup';
import ContinueAs from '../screens/authScreens/ContinueAs';
import Login from '../screens/authScreens/Login';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ContinueAs" component={ContinueAs} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
