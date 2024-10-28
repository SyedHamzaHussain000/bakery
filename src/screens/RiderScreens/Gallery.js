import { View, Text, Image } from 'react-native'
import React from 'react'
import { Images } from '../../assets'
import Button from '../../Components/Button'
import { Color } from '../../assets/Utils'

const Gallery = ({navigation}) => {
  return (
    <View style={{backgroundColor:'#AFAFAF',flex:1,padding:20,alignItems:'center',justifyContent:'space-between'}}>
      <View style={{flex:1,justifyContent:'center'}}>

      <Image source={Images.gallery}/>
      </View>
      
            
            <Button styleName={'plainButton'} handleOnPress={()=>navigation.navigate('OrderComplete')} title={'Submit'} color={Color.themeColor} marginBottom={20}/>
    </View>
  )
}

export default Gallery