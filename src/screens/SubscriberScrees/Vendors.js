import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Header from '../../Components/Header';
import {Color} from '../../assets/Utils';
import {Images} from '../../assets';
import SvgIcons from '../../Components/SvgIcons';
import {clock, masterCard, rider} from '../../assets/icons';
import Hr from '../../Components/Hr';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../Components/Input';
import Modal from 'react-native-modal';
import Button from '../../Components/Button';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../redux/Slices';
const Vendors = () => {
  const refRBSheet = useRef();
  const bottomSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  // callbacks
  const dispatch = useDispatch()
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSubscription = () => {
    setModalVisible(false);
    setModalVisible2(true);
  };
  const data = [
    {
      name: 'John Davis',
      text: 'Chocolate Croissant, Muffins',
      price: '$175.00',
    },
    {
      name: 'Elijah Dav',
      text: 'Baggette - Cuban Bread',
      price: '$200.00',
    },
    {
      name: 'Frank John',
      text: 'Duck Eggs - Cuban Bread',
      price: '$150.00',
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 20,
        backgroundColor: Color.white,
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <Header />
      <View style={{padding: 10}}>
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
                  handleOnPress={()=>dispatch(clearToken())}
                  color={Color.themeColor}
                  txtColor={Color.white}
                  title={'Proceed With him'}
                  width={'auto'}
                  fontWeight={'light'}
                  fontSize={16}
                  styleName={'viewDetails'}
                />
            </View>
          </View>
        </View>
        {data.map((area, index) => {
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
              key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Color.black,
                      fontSize: 20,
                      fontWeight: '500',
                    }}>
                    {area.name}
                  </Text>
                  <Text style={{fontSize: 12, color: '#C5C5C5'}}>Just Now</Text>
                </View>

                <Text
                  style={{
                    color: Color.themeColor,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  {area.price}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{color: '#C5C5C5'}}>{area.text}</Text>
                <Button
                  color={Color.themeColor}
                  txtColor={Color.white}
                  title={'View Details'}
                  width={'auto'}
                  fontWeight={'light'}
                  styleName={'viewDetails'}
                  handleOnPress={() => setModalVisible(true)}
                />
              </View>
            </View>
          );
        })}
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
                        width: '100%',
                        // borderWidth: 1,
                        flex: 1,
                        color: Color.black,
                        // elevation: 1,
                        // borderColor: '#DEDEDE',
                        // borderTopLeftRadius: 25,
                        // borderTopRightRadius: 25,
                        // borderBottomRightRadius: 25,
                        // borderBottomLeftRadius: 0,
                        padding: 15,
                        // backgroundColor: Color.white,
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
                <View style={{padding: 10}}>
                  <Input
                    placeholder={'Your name'}
                    placeHolderColor={'#C5C5C5'}
                  />
                </View>
              </View>

              <View
                style={{flexDirection: 'row', gap: 20, paddingHorizontal: 10}}>
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
                  handleOnPress={() => handleSubscription()}
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
              <Hr />
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
      </View>
    </ScrollView>
  );
};

export default Vendors;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Color.themeColor,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 13,
    paddingVertical: 15,
  },

  elevationStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    // flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
