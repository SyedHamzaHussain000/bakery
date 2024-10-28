import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import React, { useState } from 'react';
import SearchHeader from '../../Components/SearchHeader';
import {Color} from '../../assets/Utils';
import Button from '../../Components/Button';
import SvgIcons from '../../Components/SvgIcons';
import { clock, rider } from '../../assets/icons';
import { Images } from '../../assets';
import Hr from '../../Components/Hr';
import Modal from 'react-native-modal'
const Bakeries = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
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
   
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 20}}>
      <SearchHeader />
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 22, fontWeight: '400',color:Color.black}}>
          Hello{' '}
          <Text style={{color: Color.black, fontWeight: 'bold', fontSize: 22}}>
            Dave,
          </Text>
        </Text>
        <Text style={{marginTop: 5,fontSize:15,color:Color.black,fontWeight:'400'}}>Your Todays Job</Text>
      </View>

      <View style={{}}>
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
            <Text style={{color: Color.black, fontSize: 22}}>Dave Miller</Text>
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
                <Text style={{color: Color.black, fontSize: 18}}>
                  Mary Gold Café & Bakery:
                </Text>
                <Text
                  style={{
                    color: '#C5C5C5',
                    fontSize: 16,
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
                <Text style={{color: Color.black, fontSize: 18}}>Time:</Text>
                <Text
                  style={{
                    color: '#C5C5C5',
                    fontSize: 16,
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
              {/* <TouchableOpacity onPress={()=>navigation.navigate('OrderStatus')} style={styles.buttonStyle}>
                <Text style={{color: Color.white, fontSize: 16}}>
                  Start Delivery
                </Text>
              </TouchableOpacity> */}
               <Button
               handleOnPress={()=>navigation.navigate('OrderStatus')}
                  color={Color.themeColor}
                  txtColor={Color.white}
                  title={' Start Delivery'}
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
                  title={'View Order'}
                  width={'auto'}
                  fontWeight={'light'}
                  fontSize={16}
                  styleName={'viewDetails'}
                />
              </View>
            </View>
          );
        })}
     

    
      </View>
    </ScrollView>
  );
};

export default Bakeries;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Color.themeColor,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 13,
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
