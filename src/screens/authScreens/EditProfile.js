import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../assets/Utils';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import EditProHeader from '../../Components/EditProHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Modal from 'react-native-modal';
import Checkbox from '../../Components/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken, setUpdatedProfile, setUserData} from '../../redux/Slices';
import DatePicker from 'react-native-date-picker';
import {PickImage} from '../../GlobalFunctionns/ImagePicker';
import {styles} from '../../Styles';
import {EditProfileHandler} from '../../GlobalFunctionns/auth';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
const EditProfile = ({navigation, route}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [profileImage, setProfileImage] = useState();
  const {token, userType, userData, updatedProfile} = useSelector(
    state => state.user,
  );
  console.log('userType', userType);
  const latLng = route?.params?.latLng || null;
  console.log('latlng', latLng);
  const dispatch = useDispatch();
  console.log('selectedItems=====>>>', selectedItems);
  const handleImage = async () => {
    const image = await PickImage();
    setProfileImage(image);
  };
  const [form, setForm] = useState({
    userName: '',
    phone: '',
    city: '',
    state: '',
    zipCode: '',
    bakeryName: '',
    bakeryWeb: '',
    businessHours: '',
  });

  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return {...oldForm, [key]: changedText};
    });
  };
  const {
    userName,
    phone,
    city,
    state,
    zipCode,
    bakeryName,
    bakeryWeb,
    businessHours,
  } = form;
  const editHandler = async () => {
    setIsLoading(true);
    try {
      const response = await EditProfileHandler(
        userType,
        profileImage.mime,
        profileImage.path,
        userName,
        phone,
        date.toISOString().split('T')[0],
        state,
        city,
        zipCode,
        bakeryName,
        bakeryWeb,
        businessHours,
        selectedItems,
        latLng,
        token,
      );
      // console.log('response', response);
      if (response.success) {
        dispatch(setUserData(response.data));

        dispatch(setUpdatedProfile(response.data.updatedProfile));
      

        console.log('respooooooooosnnse', response.data.updatedProfile);
        ShowToast('success', 'Profile Updated');
      } else {
        ShowToast('error', response.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error', error.message);
    }
  };
  const handleSelectedItems = items => {
    setSelectedItems(items);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Color.white,
        paddingVertical: 40,
        paddingHorizontal: 20,
      }}>
      <View style={{}}>
        <EditProHeader
          handleOnPress={() => {
            if (userData.updatedProfile == 0) {
              return ShowToast(
                'error',
                'Plz Set Your Profile In Order To Proceed',
              );
            } else {
              navigation.navigate('BottomTabs');
            }
          }}
        />
      </View>

      <TouchableOpacity
        onPress={handleImage}
        style={{
          backgroundColor: Color.themeColor,
          height: responsiveHeight(15),
          width: responsiveWidth(31.5),
          borderRadius: 65,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        {profileImage ? (
          <Image
            style={{
              height: '100%',
              width: '100%',
              borderWidth: 1,
              borderColor: Color.themeColor,
              borderRadius: 100,
            }}
            source={{uri: profileImage.path}}
          />
        ) : null}
        <TouchableOpacity
          onPress={handleImage}
          style={{
            position: 'absolute',
            bottom: 2,
            right: -10,
            padding: 10,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: Color.themeColor,
            backgroundColor: Color.white,
          }}>
          <AntDesign name="plus" size={25} color={Color.themeColor} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{gap: 20, marginTop: 40}}>
        <Input
          handleInputChange={changedText =>
            onChangeText(changedText, 'userName')
          }
          text={'Full Name'}
          placeHolderColor={'#8D8D8D'}
          placeholder={'John Doe'}
        />
        <Input
          handleInputChange={changedText => onChangeText(changedText, 'phone')}
          text={'Phone Number'}
          placeHolderColor={'#8D8D8D'}
          placeholder={'081234567892'}
        />
        <View style={{gap: 10}}>
          <Text style={{color: Color.black, fontSize: responsiveFontSize(1.9)}}>
            Date of Birth
          </Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={[
              styles.inputStyle,
              {
                justifyContent: 'center',
                height: 52,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 30,
              },
            ]}>
            <Text
              style={[
                {
                  color: date ? Color.black : '#8D8D8D',
                  // alignSelf: 'center',
                },
              ]}>
              {date ? date.toISOString().split('T')[0] : 'dd/mm/yy'}
            </Text>
          </TouchableOpacity>
        </View>
        {userType !== 'Owner' ? (
          <Input
            handleInputChange={changedText =>
              onChangeText(changedText, 'state')
            }
            text={'State'}
            placeHolderColor={'#8D8D8D'}
            placeholder={'Dummy Street,...'}
          />
        ) : null}
        <Input
          handleInputChange={changedText => onChangeText(changedText, 'city')}
          text={'City'}
          placeHolderColor={'#8D8D8D'}
          placeholder={'Dummy Street,...'}
        />
        {userType === 'Owner' ? (
          <>
            <Input
              handleInputChange={changedText =>
                onChangeText(changedText, 'bakeryName')
              }
              text={'Your Bakery Name'}
              placeHolderColor={'#8D8D8D'}
              placeholder={'Nice Bakery'}
            />
            <Input
              handleInputChange={changedText =>
                onChangeText(changedText, 'bakeryWeb')
              }
              text={'Your Bakery Website'}
              placeHolderColor={'#8D8D8D'}
              placeholder={'www...'}
            />
            <Input
              handleInputChange={changedText =>
                onChangeText(changedText, 'businessHours')
              }
              text={'Business Hours'}
              placeHolderColor={'#8D8D8D'}
              placeholder={'09:00 - 06:00'}
            />
            <View style={{gap: 10}}>
              <Text style={myStyles.textStyle}>Categories</Text>
              <Checkbox
                setModalVisible={() => setOpenModal(!openModal)}
                modalVisible={openModal}
                onSelectedItemsChange={handleSelectedItems}
              />
            </View>
            {/* <Input
              handleInputChange={changedText =>
                onChangeText(changedText, 'contact')
              }
              text={'Contact Number'}
              placeHolderColor={'#8D8D8D'}
              placeholder={'081234567892'}
            /> */}
            <View style={{gap: 10}}>
              <Text style={myStyles.textStyle}>Choose Location</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChooseLocation')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#D4D4D4',
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.05,
                  shadowRadius: 3.84,
                  elevation: 2,
                  backgroundColor: Color.white,
                  paddingVertical: 13,
                }}>
                <Text
                  style={{color: '#8D8D8D', fontSize: responsiveFontSize(1.7)}}>
                  {latLng ? latLng.location : 'Dummy Street,...'}
                </Text>
                <FontAwesome6
                  name="location-crosshairs"
                  color={Color.themeColor}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Input
            text={'Zip Code'}
            handleInputChange={changedText =>
              onChangeText(changedText, 'zipCode')
            }
            placeHolderColor={'#8D8D8D'}
            placeholder={'Dummy Street,...'}
          />
        )}

        <View style={{marginTop: 10}}>
          <Button
            styleName={'plainButton'}
            handleOnPress={() => editHandler()}
            title={
              isLoading ? (
                <ActivityIndicator size={'large'} color={Color.white} />
              ) : (
                'Submit'
              )
            }
            color={Color.themeColor}
          />
          {/* <Button
            styleName={'plainButton'}
            handleOnPress={() => dispatch(clearToken())}
            title={isLoading ? (<ActivityIndicator size={'large'} color={Color.white}/>) : 'Submit'}
            color={Color.themeColor}
          /> */}
        </View>
      </View>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </ScrollView>
  );
};

export default EditProfile;

const myStyles = StyleSheet.create({
  textStyle: {
    color: Color.black,
    fontSize: 14,
    fontWeight: 'medium',
  },
});
