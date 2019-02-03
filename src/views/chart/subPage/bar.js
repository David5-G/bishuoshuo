import React from 'react';
import PropTypes from 'prop-types';
import {View, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native'
import { dayhourMins } from '../../../utils/times'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
export default class Bar extends React.Component {
	static navigationOptions = {
		title: 'Bar',
		header: null,
    };
    static propTypes = {
        quota: PropTypes.array.isRequired,
        navigation: PropTypes.object.isRequired,
    }

	constructor(props){
		super(props)
		this.state = {}
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
	render() {
        const { navigation, quota } = this.props
		return (
			<View style={styles.container}>
                <View style={{flexDirection: 'row',paddingTop: 10,}}>
                    <View style={{flex: 1.5}}>
                        <Text style={[styles.lastPrice,quota[3]<0?styles.fall:styles.raise]}>{quota[2].toFixed(quota[19])}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.point,quota[3]<0?styles.fall:styles.raise]}>
                                {quota[3]<0?'':'+'}
                                {quota[3].toFixed(quota[19])}
                            </Text>
                            <Text style={[styles.point,quota[4]<0?styles.fall:styles.raise,{marginLeft:5,}]}>
                                {quota[4]<0?'':'+'}
                                {quota[4].toFixed(2)}%
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text]}>买</Text>
                            <Text style={[styles.num]}>{quota[5].toFixed(quota[19])}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text]}>卖</Text>
                            <Text style={[styles.num]}>{quota[5].toFixed(quota[19])}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text]}>开</Text>
                            <Text style={[styles.num]}>{quota[7].toFixed(quota[19])}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text]}>昨</Text>
                            <Text style={[styles.num]}>{quota[8].toFixed(quota[19])}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text]}>高</Text>
                            <Text style={[styles.num]}>{quota[8].toFixed(quota[19])}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text]}>低</Text>
                            <Text style={[styles.num]}>{quota[6].toFixed(quota[19])}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{lineHeight: 25,fontSize: 12,}}>
                        {(+new Date())/1000 - quota[18] > 10 ? '收盘，':'交易中，'}
                    </Text>
                    <Text style={{lineHeight: 25,fontSize: 12,color: '#666'}}>{dayhourMins(quota[18])}</Text>
                </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        backgroundColor:'#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 3,
    },
    lastPrice: {
        fontSize: 30,
        fontWeight: '600',
        marginTop: -10,
    },
    point: {
        fontSize: 14,
        lineHeight: 25,
    },
    text: {
        fontSize: 14,
        color: '#666',
        lineHeight: 25,
    },
    num: {
        fontSize: 14,
        marginLeft: 5,
        lineHeight: 25,
    },
    raise: {
        color: Colors.raise,
    },
    fall: {
        color: Colors.fall,
    }
});
