import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {Color} from '../assets/Utils';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import Button from './Button';
import Hr from './Hr';
import {Images} from '../assets';
import {PickImage} from '../GlobalFunctionns/ImagePicker';

const PostModal = ({modalVisible, setModalVisible}) => {
  const [value, setValue] = useState();
  const [imagePath, setImagePath] = useState();
  const selectImageHandler = async () => {
    const res = await PickImage();
    setImagePath(res.path);
    console.log('res', res.path);
  };
  return (
    <Modal
      style={{margin: 0, padding: 20}}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={400}
      animationOutTiming={400}
      backdropOpacity={0.4}
      onBackdropPress={() => setModalVisible(false)}
      isVisible={modalVisible}>
      <View
        style={{backgroundColor: Color.white, padding: 10, borderRadius: 5}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: Color.white}}>s</Text>
          <Text
            style={{
              color: Color.black,
              fontSize: responsiveFontSize(2.2),
              fontWeight: 'bold',
            }}>
            Create Post
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              backgroundColor: Color.crossContainer,
              height: responsiveHeight(3.7),
              width: responsiveWidth(8.2),
              borderRadius: 17,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="cross" size={25} color={Color.crossColor} />
          </TouchableOpacity>
        </View>
        <Hr marginVertical={responsiveHeight(1.5)} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginTop: responsiveHeight(1),
          }}>
          <Image
            resizeMode="contain"
            source={Images.profile2}
            style={{
              height: responsiveHeight(5),
              borderRadius: responsiveHeight(2),
            }}
          />
          <Text style={{fontSize: responsiveFontSize(2), fontWeight: '500'}}>
            Debbie Moran
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1.3,
            borderRadius: responsiveHeight(3),
            marginVertical: responsiveHeight(2.5),
            paddingHorizontal: 15,
            borderColor: Color.postPlaceholder,
          }}>
          <TextInput
            onChangeText={changedText => setValue(changedText)}
            style={{
              color: Color.black,
              fontSize: responsiveFontSize(2.1),
              // marginTop: 10,

              width: '85%',
            }}
            placeholder="Whats on your mind, Debbie?"
            placeholderTextColor={Color.postPlaceholder}
          />
          <TouchableOpacity onPress={() => selectImageHandler()}>
            <Ionicons name="image-outline" color={Color.themeColor} size={30} />
          </TouchableOpacity>
        </View>
        {imagePath ? (
          <View>
            <Image
              source={{uri: imagePath}}
              resizeMode="contain"
              style={{
                height: responsiveHeight(20),
                width: responsiveWidth(30),
                marginBottom: 10,
                borderRadius: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => setImagePath('')}
              style={{
                backgroundColor: Color.themeColor,
                height: responsiveHeight(3.6),
                width: responsiveWidth(7.3),
                borderRadius: 20,
                left: 5,
                top: 10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
              }}>
              <MaterialCommunityIcons
                name="delete"
                color={Color.white}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <Button
          disable={value ? true : false}
          title={'Post'}
          styleName={'createPostButton'}
          color={Color.themeColor}
          height={responsiveHeight(5.5)}
          marginBottom={10}
          width={'100%'}
        />
      </View>
    </Modal>
  );
};

export default PostModal;
