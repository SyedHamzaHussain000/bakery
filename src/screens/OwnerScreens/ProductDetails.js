import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PlainHeader from '../../Components/PlainHeader';
import SvgIcons from '../../Components/SvgIcons';
import {category1} from '../../assets/icons';
import {Color} from '../../assets/Utils';
import {getProductById} from '../../GlobalFunctionns';
import {useSelector} from 'react-redux';
import {baseUrl} from '../../baseUrl';
const ProductDetails = ({navigation, route}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState(true);
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
          borderColor: Color.themeColor,
        }}
        source={{uri: `${baseUrl}bakery/${data.productImage}`}}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
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
        <Text style={styles.heading}>Price</Text>
        <Text style={styles.textStyle}> ${data.discountPrice}</Text>
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
