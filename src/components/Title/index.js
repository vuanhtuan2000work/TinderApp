import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { titleStyles } from './styles'

const Title = ({content, fontSize}) => {
  return (
      <Text style={[titleStyles.titleStyle, {fontSize: fontSize}] }>{content}</Text>
  )
}

export default Title

