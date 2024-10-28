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
import {useSelector} from 'react-redux';
import {registeration} from '../../GlobalFunctionns/auth';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import { responsiveFontSize } from '../../assets/Responsive_Dimensions';
const Signup = ({navigation, route}) => {
  const userType = useSelector(state => state.user.userType);
  const [isLoading, setIsLoading] = useState(false);
  console.log(userType, 'userType');
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const {name, email, address, password, confirmPassword} = form;
  const handleChangeText = (changedText, key) => {
    setForm(oldForm => {
      return {...oldForm, [key]: changedText};
    });
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    if (name && email && address && password && userType) {
      if (
        email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
      ) {
        if (password === confirmPassword) {
          try {
            const res = await registeration(
              name,
              email,
              address,
              password,
              userType,
            );
            console.log('res', res);
            setIsLoading(false);
            if (res.success) {
              ShowToast('success', res.message);
              navigation.navigate('Login');
            } else {
              ShowToast('error', res.message);
            }
          } catch (error) {
            setIsLoading(false);
            ShowToast('error', error.message);
            console.log('error', error);
          }
        } else {
          setIsLoading(false);

          return ShowToast('error', 'Passwords Doesnt Match');
        }
      } else {
        setIsLoading(false);

        return ShowToast('error', 'This email is not valid');
      }
    } else {
      setIsLoading(false);

      return ShowToast('error', 'Plz Fill All Fields');
    }
  };
  console.log(form.email);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Color.white,
        padding: 20,
      }}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text style={{color: Color.themeColor, fontSize: responsiveFontSize(3)}}>Sign Up</Text>
        <Text style={[styles.mediumBlack3, {marginTop: 10}]}>
          Add your details to sign up
        </Text>
      </View>
      <View style={{alignItems: 'center', gap: 25, marginTop: 40}}>
        <Input
          handleInputChange={text => handleChangeText(text, 'name')}
          placeholder={'User name'}
        />
        <Input
          handleInputChange={text => handleChangeText(text, 'email')}
          placeholder={'Email'}
        />
        <Input
          handleInputChange={text => handleChangeText(text, 'address')}
          placeholder={'Address'}
        />
        <Input
          handleInputChange={text => handleChangeText(text, 'password')}
          placeholder={'Password'}
        />
        <Input
          handleInputChange={text => handleChangeText(text, 'confirmPassword')}
          placeholder={'Confirm Password'}
        />
        <Button
          styleName={'plainButton'}
          handleOnPress={() => {
            handleSignUp();
          }}
          fontWeight={'light'}
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={Color.white} />
            ) : (
              'Sign Up'
            )
          }
          color={Color.themeColor}
        />

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text style={{color: '#7C7D7E', fontSize: responsiveFontSize(1.7)}}>
            Already have an Account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: Color.themeColor, fontSize: responsiveFontSize(1.7)}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
