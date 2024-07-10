import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function index() {
  return (
    <View style={styles.container}>
      
      <Link href={'/add'} style={styles.photo}> Camera </Link>
      <Link href={'/[preview]'} style={styles.photo}> Galeri </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})