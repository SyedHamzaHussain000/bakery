import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './AuthStack';
import {OwnerStack} from './OwnerStack';
import {RiderStack} from './RiderStack';
import {SubscriberStack} from './Subscriber';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

export function Routes() {
  const {userType, token} = useSelector(state => state.user);
  console.log('userType routes', userType);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="AuthStack">
        {token ? (
          userType === 'Subscriber' ? (
            <Stack.Screen name="SubscriberStack" component={SubscriberStack} />
          ) : userType === 'Rider' ? (
            <Stack.Screen name="RiderStack" component={RiderStack} />
          ) : (
            <Stack.Screen name="OwnerStack" component={OwnerStack} />
          )
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
