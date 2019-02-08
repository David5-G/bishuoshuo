import React from 'react';
import { View, Text, Button, Dimensions, WebView, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
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
                        <TouchableOpacity onPress={() => navigation.navigate('Player', 1)} style={styles.pic}>
                            <Icon style={styles.icon} name={'md-arrow-dropright-circle'} color={'#ddd'} />
                            <Image source={require('../../pics/t1.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Player', 2)} style={styles.pic}>
                            <Icon style={styles.icon} name={'md-arrow-dropright-circle'} color={'#ddd'} />
                            <Image resizeMode={'cover'} source={require('../../pics/t2.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Player', 3)} style={styles.pic}>
                            <Icon style={styles.icon} name={'md-arrow-dropright-circle'} color={'#ddd'} />

                            <Image resizeMode={'cover'} source={require('../../pics/t3.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Player', 4)} style={styles.pic}>
                            <Icon style={styles.icon} name={'md-arrow-dropright-circle'} color={'#ddd'} />

                            <Image resizeMode={'cover'} source={require('../../pics/t4.png')} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pic: {
        marginTop: 20,
        borderRadius: 4,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },
    },
    icon: {
        position: 'relative',
        zIndex: 3,
        width: 30, height: 30,
        fontSize: 30,
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -30 }]
    }
});
