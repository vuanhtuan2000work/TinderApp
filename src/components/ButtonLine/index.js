import React from 'react'
import { Pressable, Text } from 'react-native'
import { buttonLineStyles } from './styles'

const ButtonLine = ({content, onPress, borderColor, contentColor}) => {
  return (
    <Pressable style={[buttonLineStyles.container, {borderColor: borderColor}]} onPress={onPress}>
      <Text style={[buttonLineStyles.titleStyle, {color: contentColor}]}>{content}</Text>
    </Pressable>
  )
}

export default ButtonLine
