import React from 'react';
import {View, Dimensions, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'

import { GET } from '../../utils/request.js'
import { WallHost } from '../../config/index.js'
import HTML from 'react-native-render-html'
import { timeago } from '../../utils/times'

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')


export default class WallDetail extends React.Component {
	static navigationOptions = {
        title: 'WallDetail',
        header: null,
	};
	constructor(props){
		super(props)
        this.state = {
            loading: false,
            html: '',
            detail: {},
        }
    }
    componentDidMount() {
        this._getDetail()
    }
	render() {
        const { detail } = this.state
        const { navigation } = this.props
		return (
			<View style={styles.container}>
                <NavigationBar
					title={detail.title}
					style={{}}
					leftButton={<Icon style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
					// rightButton={<Text onPress={()=> navigation.navigate('Login')} style={{color:Colors.headerText,fontSize:16,}}>登录</Text>}
				/>
                <ScrollView style={{paddingTop: 30,paddingBottom: 100}}>
                    <View style={{marginLeft: 10,marginRight: 10}}>
                        <Text style={{fontSize: 20,fontWeight: '600',lineHeight: 30}}>{detail.title}</Text>
                    </View>

                    <View style={{marginLeft: 10,marginRight: 10,flexDirection: 'row',justifyContent: 'space-between',}}>
                        <Text style={{flex: 3,}}>{detail.author && detail.author.display_name}</Text>
                        <View style={{flex: 7,flexDirection: 'row',justifyContent: 'space-between'}}>
                            <View styles={{flex: 5,flexDirection: 'row',justifyContent: 'space-around'}}>
                                <Text style={{flex: 1}}>字数</Text>
                                <Text style={{flex: 1}}>{detail.words_count}</Text>
                            </View>
                            <View styles={{flex: 5,flexDirection: 'row',justifyContent: 'space-around'}}>
                                <Text style={{flex: 1}}>阅读</Text>
                                <Text style={{flex: 1}}>{parseInt(detail.words_count/600)}字</Text>
                            </View>
                        </View>
                    </View>
                    {
                        detail.content ? 
                        <HTML
                            html={detail.content}
                            ignoredStyles={['font-family','fontFamily','display']}
                            containerStyle={{width:DEVICE_WIDTH,paddingLeft:10,paddingRight:10}}
                            tagsStyles={{
                                p: {fontSize: 16,lineHeight: 25,color: '#333',textAlign: 'justify'}
                        }} /> : null
                    }
                </ScrollView>
			</View>
		);
    }
    async _getDetail () {
        console.log('_getDetail')
        const { loading } = this.state
        const { params } = this.props.navigation.state
        const id = params.resource.id
        if (!id) return
        if (loading) return 
        // https://api-prod.wallstreetcn.com/apiv1/content/articles/3473254?extract=1
        this.setState({loading: true})
        const res =  await GET(WallHost + '/apiv1/content/articles/' + id,{extract: 1})
        console.log('await res --> ', res)
        if (res.code === 20000) {
            this && this.setState({ detail: res.data})
        }
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#fff',
	},
});
