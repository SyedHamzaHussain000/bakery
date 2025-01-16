import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchHeader from '../../Components/SearchHeader';
import {Color} from '../../assets/Utils';
import {useSelector} from 'react-redux';
import PendingOrders from '../../Components/PendingOrders';
import {getAllBookedProductsHandler} from '../../GlobalFunctionns';
import CompletedOrders from '../../Components/CompletedOrders';
import {useIsFocused} from '@react-navigation/native';

import {styles} from '../../Styles';
const Order = ({navigation}) => {
  const {token,userData,user} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const focus = useIsFocused();

  console.log('updatedProfile====>>>>',userData.updatedProfile)
  const getAllBookedProducts = async () => {
    setIsLoading(true);
    const response = await getAllBookedProductsHandler(token);
    console.log('responnse',response)
    setIsLoading(false);
    setData(response.userId);
  };
  useEffect(() => {
    getAllBookedProducts();
  }, [focus]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        flexGrow: 1,
        backgroundColor: Color.white,
      }}>
      <SearchHeader handlePress={() => navigation.navigate('UserProfile')} />
      <Text style={styles.headerText}>
        Hello <Text style={{fontWeight: 'bold'}}>{userData.userName}</Text>
      </Text>
      <Text style={styles.text1}>Your Todays Orders</Text>
      {/* <CompletedOrders /> */}
      <View style={{flexGrow: 1}}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={Color.black} />
          </View>
        ) : (
          data?.reverse().map((area, index) => {
            return (
              <PendingOrders
                btnTitle={'View Order'}
                profilePic={area.subscriberId.profilePic}
                userName={area.subscriberId.userName}
                status={area.status}
                totalPrice={area.TotalPrice}
                productName={area.productId.productName}
                chooseCategory={area.productId.chooseCategory}
                navigation={navigation}
                navigationScreen={'OrderDetails'}
                area={area}
                key={index}
              />
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default Order;
