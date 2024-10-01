import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { textContentStyles } from './styles'

const TextContent = ({content, color, fontSize}) => {
  return (
    <View>
      <Text style={[textContentStyles.textStyle, {color: color, fontSize: fontSize}]}>{content}</Text>
    </View>
  )
}

export default TextContent

