import {View, Text, Platform, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../assets/Utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../Styles';
const Post = ({data}) => {
  return (
    <View
      style={{
        padding: 20,
        shadowColor: '#000',
        backgroundColor: Color.white,
        shadowOffset: Platform.OS === 'ios' ? {width: 0, height: 0} : undefined,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#d4d4d4',
      }}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <View>
          <Image source={data.profilePic} />
        </View>
        <View>
          <Text
            style={{color: Color.black, fontSize: 18, fontWeight: 'medium'}}>
            {data.name}
            {'  '}
            <Text style={{color: Color.black, fontSize: 12}}>
              added a new photo
            </Text>
          </Text>
          <Text
            style={{fontSize: 17, color: Color.black, fontWeight: 'medium'}}>
            {data.time}
          </Text>
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
          {data.title}
        </Text>
        <Image style={{width: '100%', borderRadius: 10}} source={data.pic} />
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

export default Post;
