import React from 'react';
import { View, Text, Button, WebView, Dimensions, ImageBackground, Image, ScrollView, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'
import { GET } from '../../utils/request'
import { WallQuotaListHost } from '../../config'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'
import { observer, inject } from 'mobx-react/native';

const width = Dimensions.get('window').width

@inject('MainStore', 'UserStore')
@observer
export default class Cycle extends React.Component {
    static navigationOptions = {
        title: 'Cycle',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            theme: []
        }
    }
    componentDidMount() {
        this._getTheme()
        // https://api-prod.wallstreetcn.com/apiv1/content/mostview/themes
        // WallQuotaListHost: 'https://api-prod.wallstreetcn.com',
    }
    componentWillUnmount() {

    }
    async _getTheme() {
        const { loading } = this.state
        if (loading) return
        this.setState({ loading: true })
        let theme = await GET(WallQuotaListHost + '/apiv1/content/mostview/themes')
        this.setState({ loading: false })
        if (theme.code !== 20000) return
        theme = theme.data.items
        this.setState({ theme })
    }
    render() {
        const { navigation } = this.props
        const { theme } = this.state
        return (
            <View style={styles.container}>
                <Image resizeMode={'cover'} style={{width,position:'absolute',left: 0,top: 0}} source={require('../../pics/b1.png')} />
                <NavigationBar
                        title={'圈子'}
                        style={{backgroundColor: 'transparent'}}
                />
                <ScrollView >
                    <View style={styles.box}>
                        {
                            theme.map((item, i) => {
                                return (<View key={i} style={{width: '50%',}}>
                                    <View style={i%2===0?styles.l:styles.r}>
                                        
                                        <Image resizeMode={'cover'} style={{ height: 120 }} source={{ uri: item.image_uri }} />
                                        <Text>{item.title}</Text>
                                    </View>
                                </View>)
                            })
                        }
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
    box: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    l: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    r: {
        paddingRight: 20,
        paddingLeft: 10,
    }
});
