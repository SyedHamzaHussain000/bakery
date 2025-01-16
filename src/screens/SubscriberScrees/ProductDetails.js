import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PlainHeader from '../../Components/PlainHeader';
import SvgIcons from '../../Components/SvgIcons';
import {category1} from '../../assets/icons';
import {Color} from '../../assets/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {getProductById} from '../../GlobalFunctionns';
import {useDispatch, useSelector} from 'react-redux';
import {baseUrl} from '../../baseUrl';
import Button from '../../Components/Button';
import {addToCart} from '../../redux/Slices';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import {Dropdown} from 'react-native-element-dropdown';
import {styles} from '../../Styles';
const ProductDetails = ({navigation, route}) => {
  const {productData} = route?.params;
  const id = productData;
  console.log('productData', productData);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const availabilityData = [
    {
      label: 'Once A Week',
      value: '1',
    },
    {
      label: 'Once A Month',
      value: '2',
    },
    {
      label: 'Daily',
      value: '3',
    },
  ];
  const daysData = [
    {label: 'Monday', value: '1'},
    {label: 'Tuesday', value: '2'},
    {label: 'Wednesday', value: '3'},
    {label: 'Thursday', value: '4'},
    {label: 'Friday', value: '5'},
    {label: 'Saturday', value: '6'},
    {label: 'Sunday', value: '7'},
  ];
  const [totalProducts, setTotalProducts] = useState(1);
  const [data, setData] = useState({});
  const [isFocusAvailability, setIsFocusAvailability] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [availabilityValue, setAvailabilityValue] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState('Daily');
  const [dayValue, setDayValue] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [totalPrice, setTotalPrice] = useState(Number(0));
  const {token, addToCartProducts} = useSelector(state => state.user);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  console.log('data=====>>>>', data);

  console.log('selectedDate', selectedDate);
  console.log('selectedTime', selectedTime);
  const handleDateChange = date => {
    const formattedDate = date.toDateString();
    setSelectedDate(formattedDate);
  };

  console.log('selectedAvailability', selectedAvailability);
  const getProduct = async () => {
    try {
      const response = await getProductById(id, token);
      setData(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    setTotalPrice(data.discountPrice * totalProducts);
    console.log('totalPrice', totalPrice);
  }, [totalProducts, data]);

  const handleAddToCart = () => {
    const productData = [
      ...addToCartProducts,
      {
        ...data,
        quantity: totalProducts,
        totalPrice: totalPrice,
        availability: selectedAvailability,
        days: selectedDay ? selectedDay : null,
        // date:selectedDate,
        // time:selectedTime
      },
    ];
    const isMatched = addToCartProducts.some(
      product => product._id === data._id,
    );

    if (isMatched) {
      ShowToast('error', 'This Product is already added to carts');
    } else {
      dispatch(addToCart(productData));
      navigation.goBack();

      ShowToast('success', 'Product Successfully Added To Carts');
    }
  };

  console.log('current Product', data);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
        flexGrow: 1,
        backgroundColor: Color.white,
      }}>
      <PlainHeader
        handlePress={() => navigation.goBack()}
        text={'Product Details'}
      />
      {loading && (
        <View>
          <ActivityIndicator
            size="large"
            color={Color.black}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              marginTop: 100,
              zIndex: 10,
            }}
          />
        </View>
      )}
      <Image
        style={{
          alignSelf: 'center',
          marginTop: 30,
          height: 170,
          width: 300,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Color.themeColor, // Replace 'blue' with your theme color
        }}
        source={{uri: `${baseUrl}bakery/${data.productImage}`}}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)} // Stop loader on error as well
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <View>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: Color.black}}>
            {data.productName}
          </Text>
          <Text style={localStyles.textStyle}>
            Flavor - {data.flavor ? data.flavor : 'Creamy'}
          </Text>
        </View>
        <View
          style={{backgroundColor: '#EBEBEB', padding: 12, borderRadius: 30}}>
          <SvgIcons xml={category1} height={'33'} width={'33'} />
        </View>
      </View>

      <View>
        <Text style={localStyles.heading}>Product Description</Text>
        <Text style={localStyles.textStyle}>{data.productDescp}</Text>
        <Text style={localStyles.heading}>Category</Text>
        <Text style={localStyles.textStyle}>{data.chooseCategory}</Text>
        <Text style={localStyles.heading}>Availability Stock</Text>
        <Text style={localStyles.textStyle}>{data.stockQuantity}</Text>
        <Text style={localStyles.heading}>Select The Availability?</Text>
        <View
          style={{
            marginTop: responsiveHeight(2),
          }}>
          <Dropdown
            style={[
              styles.dropdown,
              isFocusAvailability && {borderColor: 'gray'},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={availabilityData}
            search
            maxHeight={'90%'}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Daily' : '...'}
            searchPlaceholder="Search..."
            value={availabilityValue}
            onFocus={() => setIsFocusAvailability(true)}
            onBlur={() => setIsFocusAvailability(false)}
            onChange={item => {
              console.log(item);
              setAvailabilityValue(item.value);
              setSelectedAvailability(item.label);
              setIsFocusAvailability(false);
            }}
          />
          {(selectedAvailability === 'Once A Week' ||
            selectedAvailability === 'Once A Month') && (
            <View
              style={{
                gap: responsiveHeight(2),
              }}>
              <Text style={localStyles.heading}>Select A Day?</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'gray'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={daysData}
                search
                maxHeight={'90%'}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Monday' : '...'}
                searchPlaceholder="Search..."
                value={dayValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  console.log(item);
                  setDayValue(item.value);
                  setSelectedDay(item.label);
                  setIsFocus(false);
                }}
              />
            </View>
          )}
        </View>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text
          style={{color: Color.themeColor, fontSize: 25, fontWeight: 'bold'}}>
          ${totalPrice ? totalPrice : 0}
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: Color.themeColor,
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          <TouchableOpacity
            onPress={() =>
              totalProducts > 0 ? setTotalProducts(totalProducts - 1) : null
            }>
            <Feather name="minus" color={'#959595'} size={20} />
          </TouchableOpacity>
          <Text
            style={{color: Color.themeColor, fontSize: 20, fontWeight: 'bold'}}>
            {totalProducts}
          </Text>
          <TouchableOpacity
            onPress={() =>
              data.stockQuantity > totalProducts
                ? setTotalProducts(totalProducts + 1)
                : null
            }>
            <Feather name="plus" color={'#959595'} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Color.themeColor,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 20,
            padding: 12,
          }}>
          <Ionicons name="cart-outline" color={Color.white} size={25} />
        </TouchableOpacity>
      </View>
      <Button
        styleName={'plainButton'}
        handleOnPress={() => handleAddToCart()}
        fontWeight={'light'}
        marginTop={20}
        title={'Add To Cart'}
        color={Color.themeColor}
      />
    </ScrollView>
  );
};

export default ProductDetails;
const localStyles = StyleSheet.create({
  textStyle: {
    color: '#8D8D8D',
    fontSize: 14,
    fontWeight: 'medium',
    marginTop: 10,
  },
  heading: {
    color: Color.black,
    fontSize: 18,
    fontWeight: 'medium',
    marginTop: 20,
  },

  outerContainer: {
    height: responsiveHeight(2.7),
    width: responsiveWidth(5.9),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveHeight(2),
    borderWidth: 1.3,
    borderColor: Color.black,
    padding: 4,
  },
  innerContainer: {
    backgroundColor: Color.black,
    height: responsiveHeight(1.5),
    width: responsiveWidth(3),
    borderRadius: responsiveHeight(1.5),
  },
});
