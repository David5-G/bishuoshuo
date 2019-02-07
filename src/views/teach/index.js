import React from 'react';
import { View, Text, Button, Dimensions, WebView,TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
const deviceW = Dimensions.get('window').width

export default class Teach extends React.Component {
    static navigationOptions = {
        title: 'Teach',
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
                    title={'小课堂'}
                    style={{}}
                    leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
                />
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.pic}>
                            <Image resizeMode={'cover'} source={require('../../pics/t1.png')} />
                        </View>

                        <View style={styles.pic}>
                            <Image resizeMode={'cover'} source={require('../../pics/t2.png')} />
                        </View>

                        <View style={styles.pic}>
                            <Image resizeMode={'cover'} source={require('../../pics/t3.png')} />
                        </View>

                        <View style={styles.pic}>
                            <Image resizeMode={'cover'} source={require('../../pics/t4.png')} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Player')
                    }}>
                        <Text>player</Text>
                    </TouchableOpacity>
                </ScrollView>
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
