import React from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native'
// import { ExpoLinksView } from '@expo/samples';
import { Icon as Eicon } from 'expo'
import NavigationBar from '../common/NavigationBar'
import LoadingView from '../common/Loading'
import Colors from '../../constants/Colors'
import { Service as ServiceUrl } from '../../config'

console.log('Service-->', Service)
export default class Service extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        console.log('Service--> componentDidMount')
    }
    componentWillUnmount() {
        console.log('Service--> componentWillUnmount')
    }
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'在线小秘书'}
                    style={{ color: Colors.headerText, fontSize: 20 }}
                    titleLayoutStyle={{ fontSize: 30 }}
                    leftButton={<Eicon.Ionicons style={{paddingLeft:20,paddingRight:20}} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={'#fff'} />}
                />
                <LoadingView show={this.state.loading} text={'客服正在准备'} />
                <WebView
                    onLoadEnd={() => {
                        this.setState({ loading: false })
                        console.log('加载完成')
                    }}
                    source={{ uri: ServiceUrl }}
                    style={{ width: '100%', height: '100%' }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 48,
    },
});
