import React, {useEffect, useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import Header from '../../Components/Header';
import {Color} from '../../assets/Utils';
import {useSelector} from 'react-redux';
import PendingOrders from '../../Components/PendingOrders';
import CompletedOrders from '../../Components/CompletedOrders';
import {getAllBookedProductsHandler} from '../../GlobalFunctionns';
import {useIsFocused} from '@react-navigation/native';

const Vendors = ({navigation}) => {
  const {token} = useSelector(state => state.user);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const focus = useIsFocused();

  const getAllBookedProducts = async () => {
    setIsLoading(true);
    const response = await getAllBookedProductsHandler(token);
    setData(response.userId);
    setIsLoading(false);
  };
  useEffect(() => {
    if(focus){
      getAllBookedProducts();

    }
  }, [focus]);

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
      <Header
        handlePress={() => navigation.navigate('Cart')}
        handleNavigate={() => navigation.navigate('UserProfile')}
      />
      <View style={{padding: 10,flex:1}}>
        <CompletedOrders />
        {isLoading ? 
        (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={Color.black} />
          </View>
        ) : 
        
             data?.reverse().map((area, index) => {
              console.log('area===>>>',area)
              return (
                <PendingOrders
                  btnTitle={'View Details'}
                  profilePic={area.BakeryId?.profilePic}
                  userName={area.BakeryId?.userName}
                  status={area?.status}
                  totalPrice={area?.TotalPrice}
                  productName={area.productId?.productName}
                  chooseCategory={area.productId?.chooseCategory}
                  navigation={navigation}
                  navigationScreen={'OrderDetails'}
                  area={area}
                  key={index}
                />
              )
            })
          
        }    
      </View>
    </ScrollView>
  );
};
export default Vendors;
