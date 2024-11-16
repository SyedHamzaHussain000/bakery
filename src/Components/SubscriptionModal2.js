import { View, Text, ScrollView, TouchableOpacity, Image, } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { Color } from '../assets/Utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from './Button';
import { Images } from '../assets';
import Hr from './Hr';
const SubscriptionModal2 = ({modalVisible2,setModalVisible2}) => {

  return (
    <Modal
          animationInTiming={600}
          animationOutTiming={600}
          isVisible={modalVisible2}
          style={{
            backgroundColor: Color.white,
            margin: 0,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            height: '80%',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            overflow: 'hidden',
          }}
          backdropOpacity={0.5}
          onBackdropPress={() => setModalVisible2(false)}>
          <View style={{height: '100%'}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}>
              <View
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setModalVisible2(false)}>
                  <MaterialCommunityIcons
                    name="keyboard-backspace"
                    color={Color.black}
                    size={30}
                  />
                </TouchableOpacity>
                <Text
                  style={{color: Color.black, fontSize: 22, fontWeight: '400'}}>
                  Subscription
                </Text>
                <TouchableOpacity onPress={() => setModalVisible2(false)}>
                  <Entypo name="cross" color={Color.black} size={30} />
                </TouchableOpacity>
              </View>
              <Hr/>
              <View style={{alignItems: 'center', paddingTop: 40}}>
                <Text
                  style={{fontSize: 17, fontWeight: '400', color: Color.black}}>
                  Thank you For
                </Text>
                <Text
                  style={{fontSize: 17, fontWeight: '400', color: Color.black}}>
                  Subscribing.
                </Text>
                <Image style={{marginTop: 20}} source={Images.verified} />
                <Text style={{marginTop: 20, color: Color.black}}>
                  Your Subscription is Confirmed.
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 40,
                  gap: 20,
                  marginBottom: 30,
                }}>
                <Button
                  handleOnPress={() => setModalVisible2(false)}
                  title="Back to Home"
                  styleName={'plainButton'}
                  fontSize={16}
                  fontWeight={'400'}
                  width={'80%'}
                  color={Color.themeColor}
                />
                <Button
                  title="Report a Problem"
                  fontSize={15}
                  styleName={'plainButton'}
                  fontWeight={'300'}
                  width={'80%'}
                  txtColor={'#000000'}
                  color={'#E4E4E4'}
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
  )
}

export default SubscriptionModal2