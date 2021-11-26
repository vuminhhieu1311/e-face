import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Change Password')}>
        <Text>Go to change password</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen