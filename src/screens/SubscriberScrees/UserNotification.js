import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import PlainHeader from '../../Components/PlainHeader';
import {Color} from '../../assets/Utils';
import {styles} from '../../Styles';
import {Images} from '../../assets';
import { responsiveHeight, responsiveWidth } from '../../assets/Responsive_Dimensions';

const UserNotification = ({navigation}) => {
  const [zeroNotification, setZeroNotification] = useState(true);

  const data = [
    {
      id: 1,
      name: 'Nathan Lucas',
      image: Images.image1,
      time: '2hrs ago',
    },
    {
      id: 2,
      name: 'Alizabeth',
      image: Images.image2,
      time: '3hrs ago',
    },
    {
      id: 3,
      name: 'Alex Sims',
      image: Images.image3,
      time: '5hrs ago',
    },
    {
      id: 4,
      name: 'Rachel',
      image: Images.image4,
      time: '6hrs ago',
    },
    {
      id: 5,
      name: 'Salazar',
      image: Images.image2,
      time: '8hrs ago',
    },
    {
      id: 6,
      name: 'Dlane Guzman',
      image: Images.image5,
      time: '9hrs ago',
    },
    {
      id: 7,
      name: 'Jack Jolie',
      image: Images.image6,
      time: '12hrs ago',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
      onPress={()=>navigation.navigate('NotificationDetails')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          backgroundColor:'#F3EDED'
        }}>
        <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
          <Image source={item.image} style={{height:responsiveHeight(7),width:responsiveHeight(7),borderRadius:100,resizeMode:'cover'}} />
          <View style={{gap:10}}>
            <Text style={{color:Color.black,fontWeight:'bold',fontSize:16}}>{item.name}</Text>
            <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
              <TouchableOpacity
                style={{backgroundColor: '#FB8456',paddingHorizontal:10, padding: 2,justifyContent:'center',alignItems:'center',borderRadius:5}}>
                <Text style={{color:Color.black}}>new order</Text>
              </TouchableOpacity>
              <Text style={{}}>{item.time}</Text>
            </View>
          </View>
        </View>
       <TouchableOpacity onPress={()=>navigation.navigate('NotificationDetails')}>
        <Text style={{color:Color.black}}>View Details</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <PlainHeader
        notification={true}
        bgColor={'#FB8456'}
        fntWeight={'600'}
        color={Color.white}
        handlePress={() => navigation.goBack()}
        text={'Notifications'}
      />
      {!zeroNotification ? (
        <View
          style={{alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
          <Image style={{}} resizeMode="contain" source={Images.notification} />

          <Text style={{color: Color.black, fontSize: 18, fontWeight: 'bold'}}>
            Nothing Here!
          </Text>
          <Text style={{color: Color.black, fontSize: 15}}>
            Your notification box is empty
          </Text>
        </View>
      ) : (
        <FlatList data={data} contentContainerStyle={{gap:8,marginTop:responsiveHeight(5)}} renderItem={renderItem} />
      )}
    </View>
  );
};

export default UserNotification;
