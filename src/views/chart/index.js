import React from 'react';
import { View, Text, Button, WebView, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import Bar from './subPage/bar'
import Articles from './subPage/article'

import { GET } from '../../utils/request'
import { WallQuotaListHost, WallQuotaHost } from '../../config'
import { hourMins } from '../../utils/times.js'

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
            quota: (new Array(22)).fill(0),
        }
    }
    componentDidMount() {
        this._initQuota ()
    }
    componentWillUnmount() {
    }
    async _initQuota () {
        const { symbol } = this.state
        let quota = await GET(WallQuotaHost + '/market/real', {
            prod_code: symbol,
            fields: 'symbol,en_name,prod_name,last_px,px_change,px_change_rate,high_px,low_px,open_px,preclose_px,market_value,turnover_volume,turnover_ratio,turnover_value,dyn_pb_rate,amplitude,dyn_pe,trade_status,circulation_value,update_time,price_precision,week_52_high,week_52_low,static_pe',
        })
        if (quota.code !== 20000) return
        quota = quota.data.snapshot[symbol]
        this.setState({quota})

    }
    render() {
        const { navigation } = this.props
        const { symbol,quota } = this.state
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={quota[1] || ''}
                    style={{}}
                    leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
					rightButton={<Icon style={{}} onPress={() => navigation.navigate('Teach')} name={'md-compass'} size={20} color={Colors.headerText} />}
                />
                <ScrollView>
                    <Bar navigation={navigation} quota={quota} />
                    <View style={{height: 350,}}>
                        {symbol ? <WebView
                            style={{flex: 1}}
                            ref={(ww) => this._chart = ww}
                            source={{ uri: 'http://localhost:2002?symbol=' + symbol + '&interval=1' }}
                            onLoadStart={() => this.setState({ loading: true })}
                            onLoad={() => {}}
                            onLoadEnd={() => this.setState({ loading: false })}
                            injectedJavaScript={``}
                        /> : null}
                    </View>
                    <Articles navigation={navigation} symbol={symbol} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
