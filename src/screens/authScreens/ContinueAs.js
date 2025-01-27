import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../assets/Utils';
import Button from '../../Components/Button';
import {useDispatch} from 'react-redux';
import {setUserType} from '../../redux/Slices';
import {
  responsiveFontSize,
  responsiveHeight,
} from '../../assets/Responsive_Dimensions';
const ContinueAs = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, padding: 20}}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text
          style={{color: Color.themeColor, fontSize: responsiveFontSize(3)}}>
          Continue As
        </Text>
        <Text
          style={{
            color: Color.black,
            fontSize: responsiveFontSize(1.9),
            marginTop: 10,
          }}>
          Select Your User Type To Proceed
        </Text>
      </View>
      <View style={{alignItems: 'center', gap: 20, marginTop: 40}}>
        <Button
          disable={true}
          padding={responsiveHeight(1.8)}
          styleName={'plainButton'}
          handleOnPress={() => {
            navigation.navigate('Signup');
            dispatch(setUserType('Subscriber'));
          }}
          title={'Continue As Subscriber'}
          color={Color.themeColor}
        />
        <Button
          disable={true}
          padding={responsiveHeight(1.8)}
          styleName={'plainButton'}
          handleOnPress={() => {
            navigation.navigate('Signup');
            dispatch(setUserType('Rider'));
          }}
          title={'Continue As Rider'}
          color={Color.themeColor}
        />
        <Button
          disable={true}
          padding={responsiveHeight(1.8)}
          styleName={'plainButton'}
          handleOnPress={() => {
            navigation.navigate('Signup');
            dispatch(setUserType('Owner'));
          }}
          title={'Continue As Owner'}
          color={Color.themeColor}
        />
      </View>
    </ScrollView>
  );
};

export default ContinueAs;
