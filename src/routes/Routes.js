import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './AuthStack';
import {OwnerStack} from './OwnerStack';
import {RiderStack} from './RiderStack';
import {SubscriberStack} from './Subscriber';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='AuthStack'>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="OwnerStack" component={OwnerStack} />
        <Stack.Screen name="RiderStack" component={RiderStack} />
        <Stack.Screen name="SubscriberStack" component={SubscriberStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
