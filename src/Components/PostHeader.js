import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Gallery, Location} from '../assets/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../assets/Utils';
import {Images} from '../assets';
import SvgIcons from './SvgIcons';
import Modal from 'react-native-modal';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import Hr from './Hr';
import Button from './Button';
import PostModal from './PostModal';
import { useSelector } from 'react-redux';
import { baseUrl } from '../baseUrl';

const PostHeader = ({handleProfilePress,prevResponse}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {userData} = useSelector(state => state.user)
  console.log('uussserdaataaa',userData)
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 12,
          alignItems: 'center',
          backgroundColor: Color.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 4,
          borderWidth: 2,
          borderColor: '#D6D6D6',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleProfilePress} style={{}}>
            <Image 
            // source={Images.profile} 
            style={userData?.profilePic ? {height: responsiveHeight(9.8),width:responsiveWidth(18.4),borderRadius:responsiveHeight(0.5),marginRight:responsiveHeight(1)}:{
              height: responsiveHeight(9),width:responsiveWidth(17.5),borderRadius:responsiveHeight(0.5),marginRight:responsiveHeight(1)
            }}
            source={userData?.profilePic ? {uri: `${baseUrl}user/${userData.profilePic}`} : Images.user} 

            />
          </TouchableOpacity>
          <View style={{gap: 5, marginTop: 5}}>
            <Text style={{fontSize: 18, color: Color.black}}>{userData.userName}</Text>
            <Text
              style={{color: Color.black, fontSize: 13, fontWeight: 'light'}}>
              What do you want to talk about?
            </Text>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <SvgIcons height={'20'} width={'20'} xml={Gallery} />
                <Text style={{color: Color.black, fontSize: 15}}>Photos</Text>
                <SvgIcons height={'20'} width={'20'} xml={Location} />
                <Text style={{color: Color.black, fontSize: 15}}>Location</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            backgroundColor: Color.themeColor,
            paddingHorizontal: 10,
            paddingVertical: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 17,
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
          }}>
          <Ionicons name="chevron-forward" color={Color.white} size={35} />
        </TouchableOpacity>
      </View>
      <PostModal setResponse={(res)=>prevResponse(res)} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </View>
  );
};

export default PostHeader;
