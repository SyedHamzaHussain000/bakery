import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import PlainHeader from '../../Components/PlainHeader'
import { baseUrl } from '../../baseUrl'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../assets/Responsive_Dimensions'
import { Color } from '../../assets/Utils'
import SvgIcons from '../../Components/SvgIcons'
import {category1} from '../../assets/icons';

const OrderProductDetails = ({navigation,route}) => {
  const {area} = route.params
  console.log('area===>>>>>>',area)
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,padding:20}}>
        <PlainHeader
        iconSize={25}
        fntSize={22}
        fntWeight={600}
        handlePress={() => navigation.goBack()}
        text={'Product Details'}
      />
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
        source={{uri: `${baseUrl}bakery/${area.productId.productImage}`}}
        // onLoadStart={() => setLoading(true)}
        // onLoad={() => setLoading(false)}
        // onError={() => setLoading(false)} // Stop loader on error as well
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
            {area.productId.productName}
          </Text>
          <Text style={styles.textStyle}>
            Flavor - {area.productId.flavor ? area.productId.flavor : 'Creamy'}
          </Text>
        </View>
        <View
          style={{backgroundColor: '#EBEBEB', padding: 12, borderRadius: 30}}>
          <SvgIcons xml={category1} height={'33'} width={'33'} />
        </View>
      </View>

      <View>
        <Text style={styles.heading}>Product Description</Text>
        <Text style={styles.textStyle}>{area.productId.productDescp}</Text>
        <Text style={styles.heading}>Category</Text>
        <Text style={styles.textStyle}>{area.productId.chooseCategory}</Text>
        <Text style={styles.heading}>Price</Text>
        <Text style={styles.textStyle}> ${area.TotalPrice}</Text>
        <Text style={styles.heading}>Quantity</Text>
        <Text style={styles.textStyle}>{area.quantity}</Text>
        <Text style={styles.heading}>Availability</Text>
        <Text style={styles.textStyle}>{area.availabilty}</Text>
        <Text style={styles.heading}>Days</Text>
        <Text style={styles.textStyle}>{area.days}</Text>
        <Text style={styles.heading}>Status</Text>
        <Text style={styles.textStyle}>{area.status}</Text>

        <Text style={{fontSize: 22, fontWeight: 'bold', color: Color.black,marginTop:responsiveHeight(2)}}>
            Owner Details
          </Text>
          <Text style={styles.heading}>Name</Text>
        <Text style={styles.textStyle}>{area.BakeryId.userName}</Text>
        <Text style={styles.heading}>Email</Text>
        <Text style={styles.textStyle}>{area.BakeryId.email}</Text>
      </View>
    </ScrollView>
  )
}

export default OrderProductDetails

const styles = StyleSheet.create({
  textStyle: {
    color: '#8D8D8D',
    fontSize: 17,
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