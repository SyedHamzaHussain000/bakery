import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import SvgIcons from '../../Components/SvgIcons';
import {Gallery, Location, Notification} from '../../assets/icons';
import {Color} from '../../assets/Utils';
import {Images} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const NeighbourHood = () => {
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

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          padding: 20,
          shadowColor: '#000',
          backgroundColor: Color.white,
          shadowOffset:
            Platform.OS === 'ios' ? {width: 0, height: 0} : undefined,
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 4, 
          borderWidth: 1,
          borderColor: '#d4d4d4',
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View>
            <Image source={item.profilePic} />
          </View>
          <View>
            <Text style={{color: Color.black, fontSize: 18,fontWeight:'medium'}}>
              {item.name}
              {'  '}
              <Text style={{color: Color.black, fontSize: 12}}>
                added a new photo
              </Text>
            </Text>
            <Text style={{fontSize:17,color:Color.black,fontWeight:'medium'}}>{item.time}</Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: Color.themeColor,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              paddingBottom: 20,
              paddingHorizontal: 10,
              width: '90%',
              color: Color.black,
            }}>
            {item.title}
          </Text>
          <Image style={{width: '100%', borderRadius: 10}} source={item.pic} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', gap: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <TouchableOpacity>
              <AntDesign name="like2" color={Color.black} size={22} />
              </TouchableOpacity>
              <Text style={styles.postReaction}>196</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity>

              <MaterialCommunityIcons
                color={Color.black}
                size={22}
                name="comment-outline"
              />
              </TouchableOpacity>
              <Text style={styles.postReaction}>20</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity>

              <MaterialCommunityIcons
                color={Color.black}
                size={22}
                name="share-outline"
              />
              </TouchableOpacity>
              <Text style={styles.postReaction}>5</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Entypo color={Color.black} size={18} name="dots-three-vertical" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{backgroundColor: Color.white, flexGrow: 1}}>
      <TouchableOpacity style={{padding: 20, alignSelf: 'flex-end'}}>
        <SvgIcons
          color={Color.black}
          height={'30'}
          width={'30'}
          xml={Notification}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 12,
          alignItems: 'center',
          backgroundColor: Color.white,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 4,
          borderWidth: 2,
          borderColor: '#D6D6D6',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{}}>
            <Image source={Images.profile} />
          </View>
          <View style={{gap: 5, marginTop: 5}}>
            <Text style={{fontSize: 18, color: Color.black}}>John Doe</Text>
            <Text style={{color: Color.black, fontSize: 13,fontWeight:'light'}}>
              What do you want to talk about?
            </Text>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <SvgIcons height={'20'} width={'20'} xml={Gallery} />
                <Text style={{color: Color.black, fontSize: 15}}>Photos</Text>
                <SvgIcons height={'20'} width={'20'} xml={Location} />
                <Text style={{color: Color.black, fontSize: 15}}>Location</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Color.themeColor,
            paddingHorizontal:10,
            paddingVertical:5,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 17,
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
          }}>
          <Ionicons name="chevron-forward" color={Color.white} size={35} />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{paddingBottom: 20, gap: 25, marginTop: 10}}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        data={data}
      />
    </ScrollView>
  );
};

export default NeighbourHood;
const styles = StyleSheet.create({
  postReaction: {
    color: Color.black,
    fontSize: 16,
  },
});
