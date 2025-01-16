import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchHeader from '../../Components/SearchHeader';
import {Color} from '../../assets/Utils';
import Button from '../../Components/Button';
import SvgIcons from '../../Components/SvgIcons';
import { clock, rider } from '../../assets/icons';
import { Images } from '../../assets';
import Hr from '../../Components/Hr';
import Modal from 'react-native-modal'
import CompletedOrders from '../../Components/CompletedOrders';
import { getAllReadyBookingHandler } from '../../GlobalFunctionns';
import { useSelector } from 'react-redux';
const Bakeries = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const {token} = useSelector(state => state.user)
  console.log('token',token)
  const [data,setData] = useState([])
  
  console.log('data',data)
 

  const getReadyBookings = async () => {
    try {
      const res = await getAllReadyBookingHandler(token);
      // console.log('Response:', res); // Check if data is returned as expected
      setData(res.data.data);
    } catch (error) {
      console.log('Error:', error); // Check for errors
    }
  };
  useEffect(()=>{
   getReadyBookings()
  },[])
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
        
     {data?.map((area, index) => {
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
                    {area.bakeryName}
                  </Text>
                  <Text style={{fontSize: 12, color: '#C5C5C5'}}>Just Now</Text>
                </View>

                <Text
                  style={{
                    color: Color.themeColor,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  $10
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{color: '#C5C5C5'}}>{area.productName}</Text>
                  <Button
                  color={Color.themeColor}
                  txtColor={Color.white}
                  title={'View Details'}
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

      {/* <Modal isVisible style={{flex:1}}>
        <View>

        </View>
      </Modal> */}
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
