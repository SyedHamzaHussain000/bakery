import { View, Text } from 'react-native'
import React from 'react'
import SvgIcons from '../../Components/SvgIcons'
import { review } from '../../assets/icons'
import { Color } from '../../assets/Utils'
import Button from '../../Components/Button'
import { responsiveHeight } from '../../assets/Responsive_Dimensions'

const OrderComplete = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: Color.white }}>
      <View style={{ alignItems: 'center', flex: 0.9, justifyContent: 'center', }}>

        <SvgIcons xml={review} height={'200'} width={'200'} />
        <View style={{ alignItems: 'center', }}>
          <Text style={{ fontSize: 15, color: Color.black, fontWeight: 'semibold' }}>Success</Text>
          <View>
            <Text style={{ fontSize: 30, color: Color.themeColor, textAlign: 'center', marginTop: 5 }}>Order Completed &{'\n'} Review Placed</Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'light', textAlign: 'center', marginTop: 10 }}>A confirmation receipt has been sent to your{'\n'}
              registered email address.</Text>
          </View>
        </View>
      </View>
      <Button height={responsiveHeight(7)} styleName={'plainButton'} handleOnPress={() => navigation.navigate('BottomTabs')} width={'90%'} title={'Back To Home'} fontWeight={'400'} color={Color.themeColor} />
    </View>
  )
}

export default OrderComplete