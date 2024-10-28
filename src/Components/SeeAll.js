import { View, Text } from 'react-native'
import React from 'react'
import { Color } from '../assets/Utils'
import { styles } from '../Styles'

const SeeAll = ({firstText,secondText}) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30,alignItems:'center'}}>
        <Text style={[styles.largeBlack2,{fontWeight:'light'}]}>
          {firstText} {' '}<Text style={{fontWeight:'bold'}}>{secondText}</Text>
        </Text>
        <View>
          <Text style={{color:Color.themeColor,fontSize:15,fontWeight:'light'}}>See All</Text>
          <View style={{height:2,width:'100%',backgroundColor:Color.themeColor}}></View>
        </View>
      </View>
  )
}

export default SeeAll