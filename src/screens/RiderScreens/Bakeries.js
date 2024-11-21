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
import CompletedOrders from '../../Components/CompletedOrders';
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
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 20,backgroundColor:Color.white}}>
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
   <CompletedOrders navigation={navigation}/>
        
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
