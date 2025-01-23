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
import {baseUrl} from '../../baseUrl';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/Slices';
import {Dropdown} from 'react-native-element-dropdown';
import {responsiveHeight} from '../../assets/Responsive_Dimensions';
import Availability from '../../Components/Availability';

const EditCartProduct = ({navigation, route}) => {
  const {item} = route.params.productData;
  console.log('route.aparams========', item);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(item?.quantity);
  const [price, setPrice] = useState(item?.totalPrice);
  const addToCartProducts = useSelector(state => state.user.addToCartProducts);
  const [selectedDay, setSelectedDay] = useState(item.days);
  const [selectedAvailability, setSelectedAvailability] = useState(item.availability);
  console.log('selectedDay', selectedDay);
  console.log('selectedAvailability<<<<<<<<<<<', selectedAvailability);
  console.log('addToCartProducts', addToCartProducts);
  const dispatch = useDispatch();
  const id = item._id;
  useEffect(() => {
    setPrice(item.discountPrice * totalProducts);
  }, [totalProducts]);

  const handleEditCart = () => {
    const updatedProducts = addToCartProducts.map(product => {
      if (product._id === item._id) {
        return {
          ...product,
          quantity: totalProducts,
          totalPrice: price,
          days:selectedDay,
          availability:selectedAvailability
        };
      }
      return product;
    });

    dispatch(addToCart(updatedProducts));
    navigation.goBack();
  };

  useEffect(() => {
    if (selectedAvailability == 'Daily') {
      setSelectedDay(null);
    }
  }, [selectedAvailability]);
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
        text={'Edit Product Details'}
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
        onLoadEnd={() => setLoading(false)}
        style={{
          alignSelf: 'center',
          marginTop: 30,
          height: 170,
          width: 300,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Color.themeColor, // Replace 'blue' with your theme color
        }}
        source={{uri: `${baseUrl}bakery/${item.productImage}`}}
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
            {item.productName}
          </Text>
          <Text style={styles.textStyle}>
            Flavor - {item.flavor ? item.flavor : 'Creamy'}
          </Text>
        </View>
        <View
          style={{backgroundColor: '#EBEBEB', padding: 12, borderRadius: 30}}>
          <SvgIcons xml={category1} height={'33'} width={'33'} />
        </View>
      </View>

      <View>
        <Text style={styles.heading}>Product Description</Text>
        <Text style={styles.textStyle}>{item.productDescp}</Text>
        <Text style={styles.heading}>Category</Text>
        <Text style={styles.textStyle}>{item.chooseCategory}</Text>
        <Text style={styles.heading}>Availability Stock</Text>
        <Text style={styles.textStyle}>{item.stockQuantity}</Text>
        <Text style={styles.heading}>Quantity Selected for Cart</Text>
        <Text style={styles.textStyle}>{totalProducts}</Text>
        <Availability
        currentAvailability={item.availability}
        currentDay={item.days}
          onDayChange={day => setSelectedDay(day)}
          onAvailabilityChange={availability =>
            setSelectedAvailability(availability)
          }
        />
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
          ${price}
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
            onPress={() => {
              totalProducts > 0 ? setTotalProducts(totalProducts - 1) : null;
            }}>
            <Feather name="minus" color={'#959595'} size={20} />
          </TouchableOpacity>
          <Text
            style={{color: Color.themeColor, fontSize: 20, fontWeight: 'bold'}}>
            {totalProducts}
          </Text>
          <TouchableOpacity
            onPress={() => {
              item.stockQuantity > totalProducts
                ? setTotalProducts(totalProducts + 1)
                : null;
            }}>
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
      height={responsiveHeight(7)}
        styleName={'plainButton'}
        handleOnPress={() => handleEditCart()}
        fontWeight={'light'}
        marginTop={20}
        title={'Edit'}
        color={Color.themeColor}
      />
    </ScrollView>
  );
};

export default EditCartProduct;
const styles = StyleSheet.create({
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
});
