import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import Button from './Button';
import { Color } from '../assets/Utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Hr from './Hr';
import {rider} from '../assets/icons';
import { responsiveWidth } from '../assets/Responsive_Dimensions';
import { Images } from '../assets';
import { styles } from '../Styles';
import Input from './Input';
import SvgIcons from './SvgIcons';
import SubscriptionModal2 from './SubscriptionModal2';

const SubscriptionModal = ({ modalVisible, setModalVisible}) => {
  const [modalVisible2, setModalVisible2] = useState(false);

  const handleSubscription = () => {
    setModalVisible(false);
    // setModalVisible2(true);
  };
  return (
    <View>
   <Modal
          animationInTiming={600}
          animationOutTiming={600}
          backdropOpacity={0.5}
          onBackdropPress={() => setModalVisible(false)}
          style={{
            height: '80%',
            backgroundColor: Color.white,
            margin: 0,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            overflow: 'hidden',
          }}
          isVisible={modalVisible}>
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
                <TouchableOpacity onPress={() => setModalVisible(false)}>
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
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Entypo name="cross" color={Color.black} size={30} />
                </TouchableOpacity>
              </View>
              <Hr />
              <View style={{paddingVertical: 20, paddingHorizontal: 30}}>
                <View>
                  <Text style={{fontSize: 16, color: Color.black}}>
                    Dave Miller
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
                  <View
                    style={{
                      height: 40,
                      width: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Color.themeColor,
                      borderTopLeftRadius: 17,
                      borderBottomLeftRadius: 17,
                      borderTopRightRadius: 17,
                    }}>
                    <SvgIcons height={'26'} width={'26'} xml={rider} />
                  </View>
                  <View>
                    <Text style={{color: Color.black, fontSize: 14}}>
                      Mary Gold Café & Bakery:
                    </Text>
                    <Text
                      style={{color: '#C5C5C5', fontSize: 12, marginTop: 5}}>
                      Sour Dough - Baggette - Cuban Bread
                    </Text>
                  </View>
                </View>
              </View>
              <Hr />
              <Text
                style={{
                  color: Color.themeColor,
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                  paddingHorizontal: 30,
                }}>
                $185.60
              </Text>

              <View style={{}}>
                <Text
                  style={{
                    paddingTop: 20,
                    paddingHorizontal: 30,
                    color: Color.black,
                  }}>
                  Card Number
                </Text>

                <View
                  style={[
                    styles.elevationStyle,
                    {
                      flexDirection: 'row',
                      backgroundColor: Color.white,
                      alignItems: 'center',
                      borderWidth: 1,
                      margin: 10,
                      alignSelf: 'center',
                      // width: '100%',
                      width: responsiveWidth(95),
                      borderTopLeftRadius: 25,
                      borderColor: '#DEDEDE',
                      elevation: 3,
                      paddingLeft: 10,
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 25,
                    },
                  ]}>
                  <View>
                    <Image source={Images.masterCard2} />
                  </View>
                  <TextInput
                    placeholderTextColor={'#C5C5C5'}
                    placeholder="**2238"
                    style={[
                      styles.elevationStyle,
                      {
                        height: 50,
                        flex: 1,
                        color: Color.black,
                        padding: 15,
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={{}}>
                <Text
                  style={{
                    paddingTop: 10,
                    paddingHorizontal: 30,
                    color: Color.black,
                  }}>
                  Card Holder's Name
                </Text>
                <View style={{padding: 10, alignSelf: 'center'}}>
                  <Input
                    width={responsiveWidth(95)}
                    placeholder={'Your name'}
                    placeHolderColor={'#C5C5C5'}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      paddingTop: 10,
                      marginBottom: 10,
                      paddingHorizontal: 30,
                      color: Color.black,
                    }}>
                    Valid Until
                  </Text>
                  <Input
                    width={responsiveWidth(48)}
                    placeholder={'Month/Year'}
                    placeHolderColor={'#C5C5C5'}
                  />
                </View>
                <View style={{flexGrow: 1}}>
                  <Text
                    style={{
                      paddingTop: 10,
                      marginBottom: 10,
                      paddingHorizontal: 30,
                      color: Color.black,
                    }}>
                    Valid Until
                  </Text>
                  <Input
                    width={'100%'}
                    placeholder={'Month/Year'}
                    placeHolderColor={'#C5C5C5'}
                  />
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 40,
                  gap: 20,
                  marginBottom: 30,
                }}>
                <Button
                  styleName={'plainButton'}
                  handleOnPress={() => {
                    setModalVisible(false)
                    setModalVisible2(true)
                  }}
                  title="Subscribe Now"
                  fontSize={16}
                  fontWeight={'400'}
                  width={'80%'}
                  color={Color.themeColor}
                />

                <Button
                  handleOnPress={() => setModalVisible(false)}
                  title="Cancel"
                  styleName={'plainButton'}
                  fontSize={15}
                  fontWeight={'300'}
                  width={'80%'}
                  txtColor={'#000000'}
                  color={'#E4E4E4'}
                />
              </View>
            </ScrollView>
          </View>
        </Modal>  
        <SubscriptionModal2
        modalVisible2={modalVisible2}
        setModalVisible2={setModalVisible2}
      />
        </View>
  )
}

export default SubscriptionModal