import React from 'react'
import { Linking,Alert, SafeAreaView, ActivityIndicator, NetInfo,Image, View, Text, WebView, ScrollView, StyleSheet, Button } from 'react-native';
import { Container, Header, Content, Item, Input, Segment, Button as NeButton,StyleProvider, Text as NeText } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import commonColor from '../../../native-base-theme/variables/commonColor'


import { observer, inject } from 'mobx-react/native'
import Colors from '../../constants/Colors'
import CoinNews from './subPage/coin'
import FlashNews from './subPage/flashNews'
import ImportantNews from './subPage/importantNews'
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'

@inject('UserStore')
@observer
export default class News extends React.Component {
	static navigationOptions = {
		title: 'news',
	}

	MediaStore = this.props.MediaStore

	constructor(props) {
		super(props)
		this.state = {
			active : 1,
		}
	}
	render() {
		const {active} = this.state
		const { navigation }  = this.props
		const { isLogin } = UserStore
		return (
			<View style={styles.container}>
				<NavigationBar
					title={'资讯'}
					style={{ color: Colors.headerText, fontSize: 20 }}
					titleLayoutStyle={{ fontSize: 30 }}
					titleView={<Image style={{width: 100,height: 24,marginTop: 13,}} source={{uri: 'https://s3b.pstatp.com/growth/mobile_list/image/wap_logo@3x_581de69e.png'}} />}
					rightButton={
						<Icon
							style={{paddingLeft:20,}}
							onPress={()=> {
								if (isLogin) {
									Alert.alert('已登录')
								} else {
									navigation.navigate('Login')
								}
							}}
							name={isLogin ? 'ios-contact' : 'ios-person'} size={28}
							color={Colors.headerText}
						/>}
				/>
				<StyleProvider style={getTheme(commonColor)}> 
					<Segment >
						<NeButton first active={active===1} onPress={() =>this.setState({active:1})}>
							<NeText>币圈</NeText>
						</NeButton>
						<NeButton active={active===2} onPress={() =>this.setState({active:2})}>
							<NeText>财经</NeText>
						</NeButton>
						<NeButton last active={active===3} onPress={() =>this.setState({active:3})}>
							<NeText>快讯</NeText>
						</NeButton>
					</Segment>
				</StyleProvider>
				
				{active===1?<CoinNews navigation={navigation} />:null}
				{active===2?<ImportantNews navigation={navigation} />:null}
				{active===3?<FlashNews navigation={navigation} />:null}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
