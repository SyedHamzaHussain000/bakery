import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../assets/Utils';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
const Signup = ({navigation}) => {
  return (
    <View style={{flex: 1,backgroundColor:Color.white}}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text style={{color: Color.themeColor, fontSize: 25}}>Sign Up</Text>
        <Text style={{color: Color.black, fontSize: 16, marginTop: 10}}>
        Add your details to sign up
        </Text>
      </View>
      <View style={{alignItems: 'center', gap: 20, marginTop: 40}}>
        <Input
        placeholder={'User name'}
          
        />
       <Input
        placeholder={'Email'}
          
        />
        <Input
        placeholder={'Address'}
          
        />
        <Input
        placeholder={'Password'}
          
        />
        <Input
        placeholder={'Confirm Password'}
          
        />
        <Button title={'Sign Up'} color={Color.themeColor}/>

        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
          <Text style={{color:'#7C7D7E',fontSize:14}}>Already have an Account?</Text>
          <Text style={{color:Color.themeColor,fontSize:14}}>Login</Text>
        </View>
      </View>
    </View>
  );
};

export default Signup;
