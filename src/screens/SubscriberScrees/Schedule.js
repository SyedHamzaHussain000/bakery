import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../assets/Utils';
import {Images} from '../../assets';
import SvgIcons from '../../Components/SvgIcons';
import {cart, category1, category2, category3, logo} from '../../assets/icons';
import Hr from '../../Components/Hr';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import Header from '../../Components/Header';
import DiscoverCategory from '../../Components/DiscoverCategory';
import { getSubscriberProducts } from '../../GlobalFunctionns';
import { useSelector } from 'react-redux';

const Schedule = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const token = useSelector(state => state.user.token)
  const [products,setProducts] = useState()
  const onDateChange = date => {
    setSelectedStartDate(date);
  };
  const [activeCategory,setActiveCategory] = useState('bread')
const data = [
  {
    id:1,
    name:'bread',
    icon:category1
  },
  {
    id:2,
    name:'bread2',
    icon:category1
  },
  {
    id:3,
    name:'cheese',
    icon:category3
  },
  {
    id:4,
    name:'cheese2',
    icon:category3
  },
]
const getProductsHandler = async () => {
  const response = await getSubscriberProducts(token)
  setProducts(response.data)
  // console.log('response',response) 
}

useEffect(()=>{
  getProductsHandler()
},[])

console.log('products',products)
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1,paddingBottom:20, backgroundColor: Color.white}}>
      <View style={{padding: 40, alignItems: 'center'}}>
        <SvgIcons height={'113'} width={'140'} xml={logo} />
      </View>
<Header/>
 
      <View style={{marginTop: 20}}>
        <Hr />
      </View>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 22, color: Color.black}}>
          Discover by{' '}
          <Text style={{fontSize: 22, color: Color.black, fontWeight: 'bold'}}>
            Category.
          </Text>
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
         {data.map((area,index)=>{
          return(
            <View>
          <DiscoverCategory title={area.name} activeTab={activeCategory}  handleOnPress={()=>setActiveCategory(area.name)} icon={area.icon}/>
          </View>
          )
         })}
        </View>


{
  products?.map((area,index)=>{
     return(
      <View>
        <FlatList numColumns={2} data={products} renderItem={()=>{
          return(
            <View>
              <Text>{area.chooseCategory}</Text>
            </View>
          )
        }}/>
      </View>
     )
  })
}

        <Text style={{fontSize: 22, color: Color.black, marginTop: 20}}>
          Set Up{' '}
          <Text style={{fontSize: 22, color: Color.black, fontWeight: 'bold'}}>
            Your Delivery.
          </Text>
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: Color.white,
            alignItems: 'center',
            gap: 10,
            marginTop: 20,

            borderWidth: 1,
            borderColor: '#D4D4D4',
            width: 170,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            paddingHorizontal: 20,
            // height:70,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 4,
          }}>
          <Text style={{fontSize: 16, color: Color.black}}>Once A Week</Text>
          <Ionicons size={20} color={Color.black} name="chevron-down" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: Color.white,
            alignItems: 'center',
            gap: 10,
            marginTop: 15,
            borderWidth: 1,
            borderColor: '#D4D4D4',
            width: 250,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            paddingHorizontal: 20,
            // height:70,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 4,
          }}>
          <Text style={{fontSize: 16, color: Color.black}}>
            Once Sour Dough Bread $3
          </Text>
          <Ionicons size={20} color={Color.black} name="chevron-down" />
        </TouchableOpacity>

        <Text style={{fontSize: 22, color: Color.black, marginTop: 20}}>
          Availabilty
        </Text>
        <View style={styles.container}>
          <CalendarPicker
          
          onDateChange={onDateChange} />
          {/* <View>
            <Text>SELECTED DATE: {startDate}</Text>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Schedule;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderRadius:10,
    marginTop: 20,
  },
});
