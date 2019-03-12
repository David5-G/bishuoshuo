import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native'
import {Flex,} from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Score extends Component {
    static propTypes = {
        score: PropTypes.number.isRequired,
    }
    constructor() {
        super(...arguments)
        this.state={
            score: +this.props.score
        }
    }
    render () {
        const { score } = this.state
        return (
            <View style={{width:60,position:'relative'}}>
                <Flex>
                    <Icon style={{fontSize: 14}} color={'#dadada'} name={'ios-star'} />
                    <Icon style={{fontSize: 14}} color={'#dadada'} name={'ios-star'} />
                    <Icon style={{fontSize: 14}} color={'#dadada'} name={'ios-star'} />
                    <Icon style={{fontSize: 14}} color={'#dadada'} name={'ios-star'} />
                    <Icon style={{fontSize: 14}} color={'#dadada'} name={'ios-star'} />
                </Flex>

                <Flex style={{position:'absolute',left: 0,top: 0,width: score/10*60,overflow:'hidden'}}>
                    <Icon style={{fontSize: 14}} color={'#ffa800'} name={'ios-star'} />
                    <Icon style={{fontSize: 14}} color={'#ffa800'} name={'ios-star'} />
                    <Icon style={{fontSize: 14}} color={'#ffa800'} name={'ios-star'} />
                    <Icon style={{fontSize: 14}} color={'#ffa800'} name={'ios-star'} />
                    <Icon style={{fontSize: 14}} color={'#ffa800'} name={'ios-star'} />
                </Flex>
            </View>
        )
    }
}