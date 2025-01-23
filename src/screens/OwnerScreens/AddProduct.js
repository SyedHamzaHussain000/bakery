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
import PlainHeader from '../../Components/PlainHeader';
import SvgIcons from '../../Components/SvgIcons';
import {upload} from '../../assets/icons';
import {Color} from '../../assets/Utils';
import Input from '../../Components/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import {Dropdown} from 'react-native-element-dropdown';
import {PickImage} from '../../GlobalFunctionns/ImagePicker';
import {AddProductIntegration} from '../../GlobalFunctionns';
import {useSelector} from 'react-redux';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import {responsiveHeight, responsiveWidth} from '../../assets/Responsive_Dimensions';
import {styles} from '../../Styles';

const AddProduct = ({navigation}) => {
  const data = [
    {label: 'Pastry', value: '1'},
    {label: 'Cupcakes', value: '2'},
    {label: 'Donuts', value: '3'},
    {label: 'Biscuits', value: '4'},
  ];
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const token = useSelector(state => state.user.token);
  const [form, setForm] = useState({
    productName: '',
    price: '',
    discountPrice: '',
    productDetails: '',
    stockQuantity: '',
    flavour: '',
  });

  const onChangeText = (changedText, key) => {
    setForm(prevItems => {
      return {...prevItems, [key]: changedText};
    });
  };
  console.log(itemName);
  const ImageHandler = async () => {
    const image = await PickImage();
    setProfileImage(image);
  };
  const {
    productName,
    price,
    discountPrice,
    productDetails,
    stockQuantity,
    flavour,
  } = form;
  const addProductHandler = async () => {
    setIsLoading(true);
    try {
      const response = await AddProductIntegration(
        profileImage.mime,
        profileImage.path,
        productName,
        price,
        discountPrice,
        productDetails,
        itemName,
        stockQuantity,
        flavour,
        token,
      );
      console.log(response);
      if (response.success) {
        ShowToast('success', 'Product Has Been Uploaded');
        navigation.goBack();
      } else {
        ShowToast('error', response.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log('error', error);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        backgroundColor: Color.white,
        flexGrow: 1,
      }}>
      <PlainHeader
        handlePress={() => navigation.goBack()}
        text={'Add Product'}
      />
      <TouchableOpacity
        onPress={() => ImageHandler()}
        style={{
          alignItems: profileImage ? null : 'center',
          paddingHorizontal: !profileImage && 20,
          paddingVertical: !profileImage && 30,
          borderWidth: profileImage ? 1 : 2,
          borderRadius: 10,
          borderColor: Color.themeColor,
          borderStyle: profileImage ? null : 'dotted',
          marginTop: 30,
        }}>
        {profileImage ? (
          <Image
            resizeMode="cover"
            source={{uri: profileImage?.path}}
            style={{width: '100%', height: 200, borderRadius: 10}}
          />
        ) : (
          <View style={{alignItems: 'center'}}>
            <SvgIcons xml={upload} height={'58'} width={'44'} />
            <Text style={{textAlign: 'center', color: '#616161', fontSize: 18}}>
              Upload Image
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#8D8D8D',
                fontSize: 13,
                marginTop: 5,
              }}>
              (345x255 or larger recommended, up to{'\n'}1 MB each)
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={{marginTop: 20, gap: 20}}>
        <Input
          text={'Product Name'}
          handleInputChange={text => onChangeText(text, 'productName')}
          placeHolderColor={'#8D8D8D'}
          placeholder={'Cheese Pockets'}
        />
        <Input
          text={'Flavour'}
          handleInputChange={text => onChangeText(text, 'flavour')}
          placeHolderColor={'#8D8D8D'}
          placeholder={'Creamy'}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <View style={{gap: 5}}>
            <Input
              text={'Price'}
              width={responsiveWidth(44)}
              keyboardType={'number-pad'}
              handleInputChange={text => onChangeText(text, 'price')}
              placeHolderColor={'#8D8D8D'}
              placeholder={'$34.00'}
            />
          </View>
          <View style={{gap: 5, flexGrow: 1}}>
            <Input
              text={'Discount Price'}
              width={'100%'}
              keyboardType={'number-pad'}
              handleInputChange={text => onChangeText(text, 'discountPrice')}
              placeHolderColor={'#8D8D8D'}
              placeholder={'$30.00'}
            />
          </View>
        </View>
        <Input
          text={'Product Description'}
          handleInputChange={text => onChangeText(text, 'productDetails')}
          multiline={true}
          height={107}
          textAlignVertical={'top'}
          placeHolderColor={'#8D8D8D'}
          placeholder={'Write about your product...'}
        />
        <View style={{gap: 5}}>
          <Text style={{color: Color.black, fontSize: 16}}>
            Choose Category
          </Text>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              backgroundColor: 'white',
              borderRadius: 30,
              borderBottomRightRadius: 0,
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
            }}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={'90%'}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Cheese Pockets' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                console.log(item);
                setValue(item.value);
                setItemName(item.label);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        <Input
          text={'Stock Quantity'}
          keyboardType={'number-pad'}
          handleInputChange={text => onChangeText(text, 'stockQuantity')}
          placeHolderColor={'#8D8D8D'}
          placeholder={'6'}
        />

        <Button
          handleOnPress={() => addProductHandler()}
          marginTop={20}
          height={responsiveHeight(7)}
          styleName={'plainButton'}
          marginBottom={20}
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={Color.white} />
            ) : (
              'Create'
            )
          }
          color={Color.themeColor}
        />
      </View>
    </ScrollView>
  );
};

export default AddProduct;
