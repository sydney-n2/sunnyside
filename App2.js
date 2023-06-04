import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Svg } from 'react-native-svg'

export default function FigmatoReact () {
  return (
    <View style={FigmatoReactStyles.FigmatoReact}>
      <Text style={FigmatoReactStyles.Title}>
        Figma to React
      </Text>
      <Inputfield />
      <Button />
      <View style={FigmatoReactStyles.TabMenu}>
        <TabButton />
        <TabButton />
        <TabButton />
      </View>
      <Code />
    </View>
  )
}

const FigmatoReactStyles = StyleSheet.create({
  FigmatoReact: {
    backgroundColor: '#f9f9f9',
  },
  Title: {
    width: 643,
    height: 109,
    margin: '318 60',
    color: '#000000',
    fontFamily: 'Inter, sans-serif',
    fontSize: 90,
    fontWeight: '500',
    lineHeight: 105.46875,
    textAlign: 'center',
  },
  TabMenu: {
    width: 990,
    height: 84,
    margin: '144 517',
  },

})

function Inputfield () {
  return (
    <View style={InputfieldStyles.Inputfield}>
      <View style={InputfieldStyles.Shape} />
      <Text style={InputfieldStyles.Label}>
        Figma URL:
      </Text>
      <Text style={InputfieldStyles.Value}>
        https://www.figma.com/file/qosbLLy02hcWkJDEcodamN
      </Text>
    </View>
  )
}

const InputfieldStyles = StyleSheet.create({
  Inputfield: {
    width: 945,
    height: 83,
    margin: '167 213',
  },
  Shape: {
    width: '76.08%',
    height: '100%',
    borderRadius: 8,
    margin: '226 0',
    backgroundColor: '#ffffff',
    borderColor: '#888888',
    borderWidth: 2,
  },
  Label: {
    width: 216,
    height: 48,
    color: '#000000',
    fontFamily: 'Inter, sans-serif',
    fontSize: 40,
    fontWeight: '500',
    lineHeight: 46.875,
    textAlign: 'right',
  },
  Value: {
    width: '115.34%',
    height: '57.83%',
    margin: '246 17',
    color: '#000000',
    fontFamily: 'Inter, sans-serif',
    fontSize: 40,
    fontWeight: '500',
    lineHeight: 46.875,
  },

})

function Button () {
  return (
    <View style={ButtonStyles.Button}>
      <Text style={ButtonStyles.Label}>
        Generate
      </Text>
    </View>
  )
}

const ButtonStyles = StyleSheet.create({
  Button: {
    width: 450,
    height: 120,
    borderRadius: 16,
    margin: '417 321',
    backgroundColor: '#2d9cdb',
  },
  Label: {
    width: '40%',
    height: '40%',
    margin: '135 36',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: 40,
    lineHeight: 46.875,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

})

function Code () {
  return (
    <View style={CodeStyles.Code}>
      <View style={CodeStyles.Rectangle1} />
      <Text style={CodeStyles.Outputcode}>
        Text
      </Text>
    </View>
  )
}

const CodeStyles = StyleSheet.create({
  Code: {
    width: 990,
    height: 422,
    margin: '144 601',
  },
  Rectangle1: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  Outputcode: {
    width: '95.56%',
    height: '6.87%',
    margin: '23 24',
    color: '#000000',
    fontFamily: 'Inter, sans-serif',
    fontSize: 24,
    lineHeight: 28.125,
  },

})

function TabButton () {
  return (
    <View style={TabButtonStyles.TabButton}>
      <View style={TabButtonStyles.Shape} />
      <Text style={TabButtonStyles.Label}>
        React Web
      </Text>
    </View>
  )
}

const TabButtonStyles = StyleSheet.create({
  TabButton: {
    width: 330,
    height: 84,
  },
  Shape: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#eeeeee',
    borderColor: '#000000',
    borderWidth: 2,
  },
  Label: {
    width: '100%',
    height: '57.14%',
    color: '#000000',
    fontFamily: 'Inter, sans-serif',
    fontSize: 40,
    lineHeight: 46.875,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

})