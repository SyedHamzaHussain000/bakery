import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../assets/Utils';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import {styles} from '../../Styles';
import {handleLogin} from '../../GlobalFunctionns/auth';
import {useDispatch, useSelector} from 'react-redux';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import { responsiveFontSize } from '../../assets/Responsive_Dimensions';
const Login = ({navigation}) => {
  const {isLoading, token, userType} = useSelector(state => state.user);
  console.log('token', token);
  console.log('user redux', userType);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChangeText = (changedText, key) => {
    setForm(oldForm => {
      console.log('oldForm', oldForm);
      return {...oldForm, [key]: changedText};
    });
  };
  const {email, password} = form;
  const login = async () => {
    if (email && password) {
      try {
        const res = await handleLogin(email, password, dispatch, userType);
        console.log('res', res);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      return ShowToast('error', 'Plz Fill The Required Fields');
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Color.white,
        padding: 20,
      }}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text style={{color: Color.themeColor, fontSize: responsiveFontSize(3)}}>Sign In</Text>
        <Text style={[styles.mediumBlack3, {marginTop: 10}]}>
          Add your details to sign in
        </Text>
      </View>
      <View style={{alignItems: 'center', gap: 25, marginTop: 40}}>
        <Input
          handleInputChange={text => handleChangeText(text, 'email')}
          placeholder={'Email'}
        />
        <Input
          handleInputChange={text => handleChangeText(text, 'password')}
          placeholder={'Password'}
        />
        <Button
          styleName={'plainButton'}
          handleOnPress={() => login()}
          fontWeight={'light'}
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={Color.white} />
            ) : (
              'Login'
            )
          }
          color={Color.themeColor}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text style={{color: '#7C7D7E', fontSize: responsiveFontSize(1.7)}}>
            Dont have an Account?
          </Text>
          <Text style={{color: Color.themeColor, fontSize: responsiveFontSize(1.7)}}>Register!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
