import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../assets/Utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../Styles';
import moment from 'moment';
import {Images} from '../assets';
import {
  responsiveHeight,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {baseUrl} from '../baseUrl';
import CommentModal from './CommentModal';
const Post = ({data, setUpdateLike}) => {
  const token = useSelector(state => state.user.token);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  console.log('data._id', `${data.item._id}`);
  const likePost = id => {
    let data = JSON.stringify({
      postId: id,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}post/LikeAPost`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setUpdateLike(response.data);
        console.log('response.data', JSON.stringify(response.data));
      })
      .catch(error => {
        console.log('error', error);
      });
  };

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
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <View>
          <Image
            style={{
              height: responsiveHeight(4.9),
              width: responsiveWidth(10.7),
              borderRadius: responsiveHeight(2.5),
              backgroundColor: 'gray',
            }}
            source={
              data.item.postCreatorId.profilePic
                ? {
                    uri: `https://appsdemo.pro/Bakery/api/Post/${data.item.postCreatorId.profilePic}`,
                  }
                : Images.profileImage
            }
          />
        </View>
        <View>
          <Text
            style={{color: Color.black, fontSize: 18, fontWeight: 'medium'}}>
            {data.item.postCreatorId.userName}
            {'  '}
            <Text style={{color: Color.black, fontSize: 12}}>
              added a new photo
            </Text>
          </Text>
          <Text
            style={{fontSize: 17, color: Color.black, fontWeight: 'medium'}}>
            {/* {data.time} */}
            {moment(data.item.createdAt).fromNow()}
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
          {data.item.caption}
        </Text>
        {data.item.PostImage && (
          <Image
          resizeMode='stretch'
            style={{width: '100%', aspectRatio: 1.3, borderRadius: 10}}
            source={{
              uri: `https://appsdemo.pro/Bakery/api/post/${data.item.PostImage}`,
            }}
          />
        )}
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
            <TouchableOpacity onPress={() => likePost(data.item._id)}>
              <AntDesign name="like2" color={Color.black} size={22} />
            </TouchableOpacity>
            <Text style={styles.postReaction}>
              {data.item.PostLikes.length}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity
              onPress={() => setShowCommentBox(!showCommentBox)}>
              <MaterialCommunityIcons
                color={Color.black}
                size={22}
                name="comment-outline"
              />
            </TouchableOpacity>
            <Text style={styles.postReaction}>
              {data.item.PostComment.length}
            </Text>
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                color={Color.black}
                size={22}
                name="share-outline"
              />
            </TouchableOpacity>
            <Text style={styles.postReaction}>0</Text>
          </View> */}
        </View>
        <TouchableOpacity>
          <Entypo color={Color.black} size={18} name="dots-three-vertical" />
        </TouchableOpacity>
      </View>
      {showCommentBox ? (
        <CommentModal
          data={data}
          showCommentBox={showCommentBox}
          postId={data.item._id}
          setShowCommentBox={setShowCommentBox}
        />
      ) : null}
    </View>
  );
};

export default Post;
