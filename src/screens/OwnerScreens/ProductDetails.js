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
import {Images} from '../../assets';
import SvgIcons from '../../Components/SvgIcons';
import {category1} from '../../assets/icons';
import {Color} from '../../assets/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {getProductById} from '../../GlobalFunctionns';
import {useSelector} from 'react-redux';
import {baseUrl} from '../../baseUrl';
const ProductDetails = ({navigation, route}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState(true);

  const [totalProducts, setTotalProducts] = useState(1);
  const [data, setData] = useState({});
  const token = useSelector(state => state.user.token);
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

  console.log(data);
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
          <Text style={styles.textStyle}>
            Flavor - {data.flavor ? data.flavor : 'Creamy'}
          </Text>
        </View>
        <View
          style={{backgroundColor: '#EBEBEB', padding: 12, borderRadius: 30}}>
          <SvgIcons xml={category1} height={'33'} width={'33'} />
        </View>
      </View>

      <View>
        <Text style={styles.heading}>Product Description</Text>
        <Text style={styles.textStyle}>{data.productDescp}</Text>
        <Text style={styles.heading}>Category</Text>
        <Text style={styles.textStyle}>{data.chooseCategory}</Text>
        <Text style={styles.heading}>Availability Stock</Text>
        <Text style={styles.textStyle}>{data.stockQuantity}</Text>
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
          ${data.discountPrice}
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
          <TouchableOpacity onPress={() => setTotalProducts(totalProducts + 1)}>
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
    </ScrollView>
  );
};

export default ProductDetails;
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
