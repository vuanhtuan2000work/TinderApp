import React from 'react'
import { ActivityIndicator, Pressable, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLOR, hexToRGBA } from '../../styles/common'

const ButtonLinearColor = ({ loading, onPress, content }) => {
    return (
        <Pressable style={{ with: '100%', marginTop: 30 }} onPress={onPress}>
            <LinearGradient colors={[ hexToRGBA('#ff5a5f', 0.7), hexToRGBA('#ff5a5f', 0.8), hexToRGBA('#EA4080', 0.85)]}
                start={{ x: 0.7, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                    width: '100%',
                    height: 48,
                    paddingHorizontal: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 65
                }}>

               {!loading?  <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.primaryColor }}>{content}</Text>: <ActivityIndicator color={COLOR.primaryColor}/>}
            </LinearGradient>
        </Pressable>
    )
}

export default ButtonLinearColor
