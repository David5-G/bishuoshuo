import React from 'react';
import {View, Text, WebView,Image, ScrollView, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import HTML from 'react-native-render-html'

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

export default class NewsDetail extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.post_title || '详情',
        header: null,
	})
	constructor(props){
		super(props)
		this.state = {}
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
	render() {
        const { params } = this.props.navigation.state
        const { navigation } = this.props
        // post_content_filtered
		return (
			<View style={{flex:1,}}>
                <NavigationBar
					title={params.post_title || params.title}
					style={{}}
					leftButton={<Icon style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
				/>
                <ScrollView style={styles.container}>
                    {
                        params.detal_img ?
                            <Image
                                style={{width: 300,height:300}}
                                source={{uri: params.detal_img}}
                            /> : null
                    }
                    {/* <Text style={{textAlign:'center',fontSize: 20,lineHeight:50,}}>{params.post_title}</Text> */}
                    <HTML
                        html={params.post_content_filtered || params.post_content ||  '<p style="font-size:18;line-height:30;color:#666">'+params.post_content+'</p>'}
                        ignoredStyles={['font-family','fontFamily','display']}
                        containerStyle={{width:DEVICE_WIDTH,paddingLeft:10,paddingRight:10}}
                        tagsStyles={{
                            img: {width:'100%',height:'auto'},

                    }}
                    />
                    <Text style={{fontSize: 14,lineHeight:20,marginTop:20,color:'#999'}}>{params.published_time}</Text>
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
});
