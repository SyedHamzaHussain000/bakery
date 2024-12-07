import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {Color} from '../assets/Utils';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {baseUrl} from '../baseUrl';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Images} from '../assets';
import moment from 'moment';

const CommentModal = ({showCommentBox, setShowCommentBox, postId, data}) => {
  const [commentText, setCommentText] = useState('');
  const token = useSelector(state => state.user.token);
  const [commentData, setCommentData] = useState([]);
  console.log('commmentData====>>>', data.item.PostComment);
  useEffect(() => {
    setCommentData(data.item.PostComment);
  }, []);
  const addComment = id => {
    // console.log('iddddddddd',id)
    let data = JSON.stringify({
      postId: id,
      comment: commentText,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}post/CommentAPost`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data.post.PostComment));
        setCommentData(response.data.post.PostComment);
        setCommentText('');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Modal
      onBackdropPress={() => setShowCommentBox(!showCommentBox)}
      isVisible={showCommentBox}
      style={{
        flex: 1,
        overflow: 'hidden',
        margin: 0,
        justifyContent: 'flex-end', // Ensures modal content appears at the bottom
      }}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          overflow: 'hidden',
          backgroundColor: '#25292D',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: responsiveHeight(60),
          maxHeight: responsiveHeight(60),
          width: '100%',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: '#25292D',
            padding: 20,
            paddingBottom: 0,
            overflow: 'hidden',
          }}>
                 <TouchableOpacity style={{alignSelf:'flex-end',}} onPress={()=>setShowCommentBox(false)}>
            <Entypo name='circle-with-cross' color={Color.white} size={25} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              color: Color.white,
              fontSize: responsiveFontSize(2.5),
              fontWeight: '500',
              bottom:5
            }}>
            Comments
          </Text>
     
          {commentData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Image
                style={{
                  height: responsiveHeight(4.9),
                  width: responsiveWidth(10.7),
                  borderRadius: responsiveHeight(2.5),
                  backgroundColor: 'gray',
                }}
                source={Images.profileImage}
              />
              <View>
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 18,
                    fontWeight: 'medium',
                  }}>
                  user01{'  '}
                  <Text style={{color: Color.white, fontSize: 12}}>
                    {moment('2024-12-06T21:34:50.968Z').fromNow()}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: Color.white,
                    fontWeight: 'medium',
                  }}>
                  {item.comment}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={{margin:15,marginTop:0}}>
          <TextInput
            onChangeText={text => setCommentText(text)}
            placeholder="Add a comment..."
            value={commentText}
            style={{
              color: Color.black,
              backgroundColor: '#f1f2f5',
              marginTop: responsiveHeight(2),
              borderRadius: responsiveHeight(1),
              paddingHorizontal: responsiveHeight(2),
            }}
          />
          <TouchableOpacity
            onPress={() =>
              commentText
                ? addComment(postId)
                : console.log('plz enter some values')
            }
            style={{
              position: 'absolute',
              right: 10,
              height: '100%',
              justifyContent: 'center',
              marginTop: responsiveHeight(1),
            }}>
            <Ionicons
              name="send"
              color={commentText.length ? '#005FDA' : '#BDC3CA'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
