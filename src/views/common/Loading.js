import React from 'react';
import {
    ActivityIndicator, Text, StyleSheet, View
} from 'react-native';

import {Dimensions} from 'react-native'
const deviceH = Dimensions.get('window').height
const deviceW = Dimensions.get('window').width

const LoadingView = (obj) => (
        <View style={obj.show ? Lodingstyles.loading : Lodingstyles.hide}>
            <ActivityIndicator animating={obj.show} size="large" />
            <Text style={Lodingstyles.loadingText}>{obj.text ? obj.text : ''}</Text>
        </View>)

const Lodingstyles = StyleSheet.create({
    loading: {
        position:'absolute',
        flex: 1,
        top:0,
        left:0,
        width: deviceW,
        height: deviceH - 200,
        // alignItems: 'center',
        // backgroundColor: 'red',
        // alignItems: 'center',
        justifyContent: 'center',
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
