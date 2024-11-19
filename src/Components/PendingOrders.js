import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from './Button'
import { Color } from '../assets/Utils'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../assets/Responsive_Dimensions'
import { baseUrl } from '../baseUrl'
import { styles } from '../Styles'

const PendingOrders = ({area,key,navigation,navigationScreen,profilePic,userName,totalPrice,status,productName,chooseCategory}) => {
  return (
    <View
    style={[
      styles.elevationStyle,
      styles.buttonStyle,
      {
        elevation: 4,
        backgroundColor: Color.white,
        marginTop: 25,
        padding: 10,
      },
    ]}
    key={key}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <View>
          <Image
        source={{uri: `${baseUrl}user/${profilePic}`}}
        style={{
              height: responsiveHeight(6),
              width: responsiveWidth(13),
              borderRadius: responsiveHeight(4),
            }}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveWidth(2),
            }}>
            <Text
              style={{
                color: Color.black,
                fontSize: 20,
                fontWeight: '500',
              }}>
              {userName}
            </Text>
            <Text style={{fontSize: 12, color: '#C5C5C5'}}>
              Just Now
            </Text>
          </View>
          <Text style={{color: 'gray', fontSize: 14}}>
            {status}
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: Color.themeColor,
          fontSize: 22,
          fontWeight: 'bold',
        }}>
        ${totalPrice}
      </Text>
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <Text
        style={{
          color: '#C5C5C5',
          fontSize: responsiveFontSize(1.7),
        }}>{`${productName},${chooseCategory}`}</Text>
      <Button
        color={Color.themeColor}
        txtColor={Color.white}
        handleOnPress={()=>navigation.navigate(navigationScreen,{area})}
        title={'View Details'}
        width={'auto'}
        fontWeight={'light'}
        styleName={'viewDetails'}
      />
    </View>
  </View>
  )
}

export default PendingOrders