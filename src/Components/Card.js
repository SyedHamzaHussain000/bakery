import { View, Text } from 'react-native'
import React from 'react'
import Button from './Button'
import { Color } from '../assets/Utils'
import { styles } from '../Styles'

const Card = ({ area, handlePress,type }) => {
    return (
        <View
            style={[
                styles.elevationStyle,
                styles.buttonStyle,
                {
                    elevation: 4,
                    backgroundColor: Color.white,
                    marginTop: 25,
                    padding: 10,
                },
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: Color.black,
                            fontSize: 20,
                            fontWeight: '500',
                        }}>
                        {type === 'Completed' ?  area?.BakeryId?.bakeryName : area?.bakeryName}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#C5C5C5' }}>Just Now</Text>
                </View>

                <Text
                    style={{
                        color: Color.themeColor,
                        fontSize: 22,
                        fontWeight: 'bold',
                    }}>
                    $10
                </Text>
            </View>
            <Text>{area?.orderStatus}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                }}>
                <Text style={{ color: '#C5C5C5' }}>{type === 'Completed' ? area?.productId?.productName : area?.productName}</Text>
                <Button
                    handleOnPress={handlePress}
                    color={Color.themeColor}
                    txtColor={Color.white}
                    title={'View Details'}
                    width={'auto'}
                    fontWeight={'light'}
                    fontSize={16}
                    styleName={'viewDetails'}
                />
            </View>
        </View>
    )
}

export default Card