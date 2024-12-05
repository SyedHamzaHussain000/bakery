import {FlatList, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import SvgIcons from '../../Components/SvgIcons';
import {Notification} from '../../assets/icons';
import {Color} from '../../assets/Utils';
import {Images} from '../../assets';
import PostHeader from '../../Components/PostHeader';
import Post from '../../Components/Post';
const NeighbourHood = ({navigation}) => {
  console.log('edit subscriber');
  const data = [
    {
      id: 1,
      name: 'Charles James',
      time: '7h',
      title:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy',
      pic: Images.pic1,
      profilePic: Images.profile1,
    },
    {
      id: 2,
      name: 'Mary Gold Café:',
      time: '7h',
      title:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy',
      pic: Images.pic2,
      profilePic: Images.profile2,
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{backgroundColor: Color.white, flexGrow: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notification')}
        style={{padding: 20, alignSelf: 'flex-end'}}>
        <SvgIcons
          color={Color.black}
          height={'30'}
          width={'30'}
          xml={Notification}
        />
      </TouchableOpacity>

      <PostHeader
        handleProfilePress={() => navigation.navigate('UserProfile')}
      />

      <FlatList
        contentContainerStyle={{paddingBottom: 20, gap: 25, marginTop: 10}}
        showsVerticalScrollIndicator={false}
        renderItem={item => {
          return <Post data={item.item} />;
        }}
        data={data}
      />
    </ScrollView>
  );
};

export default NeighbourHood;
