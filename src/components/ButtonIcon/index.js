import React from 'react'
import { Image, Pressable } from 'react-native'
import { buttonIconStyles } from './styles'

const ButtonIcon = ({onPress, source = require('../../assets/close.png')}) => {
  return (
    <Pressable style={buttonIconStyles.container} onPress={onPress}>
        <Image style={buttonIconStyles.icon} source={source} resizeMode='contain'/>
    </Pressable>
  )
}

export default ButtonIcon
