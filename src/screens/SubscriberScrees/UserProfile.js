import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Button from '../../Components/Button';
import {Color} from '../../assets/Utils';
import Entypo from 'react-native-vector-icons/Entypo'
import { clearToken } from '../../redux/Slices';
import { useDispatch } from 'react-redux';
const UserProfile = ({navigation}) => {
  const dispatch = useDispatch()
  return (
    <View style={{flex:1,padding:20}}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{}}>
      <Entypo name='chevron-left' color={Color.black} size={25}/>
    </TouchableOpacity>
    <View style={{alignItems:'center'}}>

      <Button
        styleName={'plainButton'}
        marginTop={30}
        handleOnPress={() => dispatch(clearToken())}
        fontWeight={'light'}
        title={'Log Out'}
        color={Color.themeColor}
        />
        </View>
    </View>
  );
};

export default UserProfile;
