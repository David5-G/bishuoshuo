import React from 'react';
import { View, Text, Button, WebView, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
export default class Chart extends React.Component {
    static navigationOptions = {
        title: 'Chart',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            symbol: this.props.navigation.state.params,
            loading: false,
        }
    }
    componentDidMount() {
        console.log('symbol-->', this.state.symbol)
    }
    componentWillUnmount() {
    }
    render() {
        const { navigation } = this.props
        const { symbol } = this.state
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'实时行情'}
                    style={{}}
                    leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
                />
                {symbol ? <WebView
                    ref={(ww) => this._chart = ww}
                    source={{ uri: 'http://localhost:2002?symbol=' + symbol + '&interval=1' }}
                    onLoadStart={() => {
                        this.setState({ loading: true })
                        console.log('onLoadStart')
                    }}
                    onLoad={() => { }}
                    onLoadEnd={() => {
                        this.setState({ loading: false })
                        console.log('onLoadEnd')
                    }}
                    injectedJavaScript={``}
                /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
