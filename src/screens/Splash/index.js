import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ButtonLine from '../../components/ButtonLine'
import TextContent from '../../components/TextContent'
import { COLOR, hexToRGBA } from '../../styles/common'
import { TEXT_CONSTANTS } from '../../textConstants'
import { splashStyles } from './styles'

const Splash = () => {
  const navigation = useNavigation()
  return (
    <LinearGradient colors={[ hexToRGBA('#ff5a5f', 0.7), hexToRGBA('#ff5a5f', 0.8), hexToRGBA('#EA4080', 0.85)]}
      start={{ x: 0.9, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image style={splashStyles.logo} source={require('../../assets/logoText.png')} resizeMode='contain'/>
      <TextContent content={TEXT_CONSTANTS.cookie_policy} color={COLOR.primaryColor} fontSize={13} />
      <ButtonLine content={'LOGIN/SIGN UP WITH EMAIL'} onPress={()=> navigation.navigate('Login')} contentColor={COLOR.primaryColor} borderColor={COLOR.primaryColor}/>
    </LinearGradient>
  )
}

export default Splash

const styles = StyleSheet.create({}) 