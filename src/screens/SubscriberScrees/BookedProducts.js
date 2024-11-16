import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlainHeader from '../../Components/PlainHeader'
import { baseUrl } from '../../baseUrl'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Color } from '../../assets/Utils'
import { responsiveWidth } from '../../assets/Responsive_Dimensions'

const BookedProducts = ({navigation}) => {
  const {token} = useSelector(state=> state.user)
  const [data,setData] = useState()
  const getAllBookedProducts = () => {
    let data = '';

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${baseUrl}subscriber/GetAllMyBookingProducts`,
  headers: { 
    'Authorization': `Bearer ${token}`
  },
  data : data
};

axios.request(config)
.then((response) => {
setData(response.data.userId)
  // console.log('response.data',JSON.stringify(response.data.userId));
})
.catch((error) => {
  console.log(error);
});
  }

  useEffect(()=>{
getAllBookedProducts()
  },[])
  return (
    <View style={{flex:1,padding:20}}>
     <PlainHeader
        iconSize={25}
        fntSize={22}
        fntWeight={600}
        handlePress={() => navigation.goBack()}
        text={'My Products'}
      />
        <FlatList
        showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between', gap: 10}}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginTop: 30,
          }}
          numColumns={2}
          data={data}
          renderItem={(area, index) => {
            console.log(area.item.productId);
            // return(
            //   <View>
            //     <Text>dsjkj</Text>
            //   </View>
            // )
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {id: area.item.productId._id})
                }
                style={{
                  backgroundColor: Color.white,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  elevation: 2,
                  marginBottom: 20,
                }}>
                <Image
                  style={{height: 120, width: responsiveWidth(42)}}
                  source={{uri: `${baseUrl}bakery/${area.item.productId.productImage}`}}
                />
                {/* <Text>{area.item.productName}</Text> */}

                <View style={{padding: 10}}>
                  <View>
                    <Text
                      style={{
                        color: Color.black,
                        fontSize: 16,
                        fontWeight: 'semibold',
                      }}>
                      {area.item.productId.productName}
                    </Text>
                  </View>
                  <Text style={{color: '#B8B8B8', fontSize: 10, marginTop: 10}}>
                    Flavor - {area.item.productId.flavor ? area.item.productId.flavor : 'Creamy'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        color: Color.themeColor,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      ${area.item.productId.discountPrice}
                    </Text>
                    <View>
                      <Text style={{color: Color.themeColor, fontSize: 10}}>
                        View Details
                      </Text>
                      <View
                        style={{
                          height: 1,
                          width: '100%',
                          backgroundColor: Color.themeColor,
                        }}></View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
    </View>
  )
}

export default BookedProducts