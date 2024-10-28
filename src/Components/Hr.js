import { View, Text } from 'react-native'
import React from 'react'

const Hr = ({marginVertical}) => {
  return (
    <View style={{height:1,width:'100%',backgroundColor:'#dedede',marginVertical:marginVertical ? marginVertical : null}}>
    </View>
  )
}

export default Hr