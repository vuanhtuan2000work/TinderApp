import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { processBarStyles } from './styles'

const ProcessBar = ({percent}) => {
  return (
    <View style={processBarStyles.container}>
        <View style={[processBarStyles.percentBar, {width: `${percent}%`}]}/>
    </View>
  )
}

export default ProcessBar

const styles = StyleSheet.create({})