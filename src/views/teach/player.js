import React from 'react';
import { View, Text, Button, Dimensions, TouchableOpacity,WebView, ScrollView, Image, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'

export default class Player extends React.Component {
    static navigationOptions = {
        title: 'Player',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'player'}
                    style={{}}
                    leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
                />
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Player')
                }}>
                    <Text>player</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pic: {
        marginTop: 20,
        borderRadius: 4,
        shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowOffset: { width: 0, height: 2 },
    }
});
