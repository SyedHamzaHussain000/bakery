import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../assets/Utils';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
const ContinueAs = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text style={{color: Color.themeColor, fontSize: 25}}>Continue As</Text>
        <Text style={{color: Color.black, fontSize: 16, marginTop: 10}}>
          Select Your User Type To Proceed
        </Text>
      </View>
      <View style={{alignItems: 'center', gap: 20, marginTop: 40}}>
        <Button
          handleOnPress={() =>
            navigation.navigate('Signup', {
              userType: 'SubscriberStack',
            })
          }
          title={'Continue As Subscriber'}
          color={Color.themeColor}
        />
        <Button
          handleOnPress={() =>
            navigation.navigate('Signup', {
              userType: 'RiderStack',
            })
          }
          title={'Continue As Rider'}
          color={Color.themeColor}
        />
        <Button
          handleOnPress={() =>
            navigation.navigate('Signup', {
              userType: 'OwnerStack',
            })
          }
          title={'Continue As Owner'}
          color={Color.themeColor}
        />
      </View>
    </View>
  );
};

export default ContinueAs;
