import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import PlainHeader from '../../Components/PlainHeader';
import {Color} from '../../assets/Utils';
import {Images} from '../../assets';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';

const NotificationDetails = ({navigation}) => {
  const data = [
    {
      id: 1,
      item: 'Chocolate Fudge Brownie',
      quanntity: 4,
      madeWith: 'made with delicious chocos ',
      price: '$78.9',
    },
    {
      id: 2,
      item: 'Dark Choco Balls',
      quanntity: 2,
      madeWith: 'made with delicious chocos  ',
      price: '$22.6',
    },
    {
      id: 3,
      item: 'Croissants',
      quanntity: 7,
      madeWith: 'made with delicious sweetness  ',
      price: '$105.89',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('RoadWay')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          flexWrap:'wrap',
          backgroundColor: '#F3EDED',
          paddingHorizontal: 30,
          paddingVertical: 15,
          alignItems:'center'
        }}>
        <View style={{}}>
          <Text style={{color: Color.black, fontSize: 18, fontWeight: 400,width:responsiveWidth(60)}}>
            {item.item}{' '}
            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 20}}>
              {' '}
              x{item.quanntity}
            </Text>
          </Text>
          <Text>{item.madeWith}</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#FB8456',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
            height: responsiveHeight(4),
            borderRadius: 10,
          }}>
          <Text style={{color: Color.black, fontSize: 16, fontWeight: '500'}}>
            $22.6
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      <PlainHeader
        notification={true}
        bgColor={'#FB8456'}
        fntWeight={'600'}
        color={Color.white}
        handlePress={() => navigation.goBack()}
        text={'Details'}
      />

      <View
        style={{
          backgroundColor: '#F3EDED',
          alignItems: 'center',
          alignSelf: 'center',
          paddingHorizontal: responsiveWidth(10),
          paddingVertical: responsiveHeight(3),
          borderRadius: 30,
          marginTop: responsiveHeight(7),
        }}>
        <Image source={Images.image5} />
        <Text
          style={{
            color: Color.black,
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Alex Sims
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{gap: 10, marginTop: 30}}
      />
    </View>
  );
};

export default NotificationDetails;
