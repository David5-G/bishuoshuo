import React from 'react';
import { Text, StyleSheet, View,Image } from 'react-native';
import {  width , height } from '../../constants/Scale.js'

const LoadingView = (obj) => (
        <View style={obj.show ? Lodingstyles.loading : Lodingstyles.hide}>
            <View>
                <Image style={{width: 30,height: 30,marginLeft: width/2 - 15}} source={require('../../pics/load.gif')} />
                <Text style={Lodingstyles.loadingText}>{obj.text ? obj.text : ''}</Text>
            </View>
        </View>)

const Lodingstyles = StyleSheet.create({
    loading: {
        position:'absolute',
        flex: 1,
        top:0,
        left:0,
        width: width,
        height: height,
        justifyContent: 'center',
        zIndex: 100,
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center',
        color: '#999',
    },
    hide: {
        display: 'none'
    }
});

export default LoadingView;
