import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../assets/Utils'
import {clock, rider} from '../assets/icons';
import SvgIcons from './SvgIcons';
import Hr from './Hr';
import Button from './Button';
import { Images } from '../assets';
import SubscriptionModal from './SubscriptionModal';

const CompletedOrders = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
    style={{
      padding: 10,
      backgroundColor: Color.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      elevation: 4,
      marginTop: 30,
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
      <Text style={{color: Color.black, fontSize: 22, fontWeight: '500'}}>
        Dave Miller
      </Text>
      <Text style={{fontSize: 12, color: '#C5C5C5'}}>Just Now</Text>
    </View>

    <View>
      <View
        style={{
          backgroundColor: Color.themeColor,
          borderTopLeftRadius: 20,
        }}></View>
      <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
        <View
          style={{
            backgroundColor: Color.themeColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            height: 55,
            width: 65,
          }}>
          <SvgIcons xml={rider} height={'30'} width={'30'} />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{color: Color.black, fontSize: 17, fontWeight: '500'}}>
            Mary Gold Café & Bakery:
          </Text>
          <Text
            style={{
              color: '#C5C5C5',
              fontSize: 14,
              fontWeight: 'light',
              width: '100%',
              flexWrap: 'wrap',
              marginTop: 5,
            }}>
            Sour Dough - Baggette - Cuban Bread
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
        <View
          style={{
            backgroundColor: Color.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            height: 55,
            width: 65,
          }}>
          <SvgIcons xml={clock} height={'30'} width={'30'} />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{color: Color.black, fontSize: 17, fontWeight: '500'}}>
            Time:
          </Text>
          <Text
            style={{
              color: '#C5C5C5',
              fontSize: 14,
              width: '100%',
              flexWrap: 'wrap',
              marginTop: 5,
            }}>
            6am - 7am, 8am - 9am, 10am - 11am
          </Text>
        </View>
      </View>

      <View style={{marginTop: 20, marginBottom: 10}}>
        <Image style={{width: '100%'}} source={Images.map} />
      </View>

      <Hr />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 25,
            color: Color.themeColor,
            fontWeight: 'bold',
          }}>
          $185.60
        </Text>

        <Button
          color={Color.themeColor}
          txtColor={Color.white}
          handleOnPress={() => setModalVisible(true)}
          title={'Proceed With him'}
          width={'auto'}
          fontWeight={'light'}
          fontSize={16}
          styleName={'viewDetails'}
        />
      </View>
          <SubscriptionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  </View>
  )
}

export default CompletedOrders