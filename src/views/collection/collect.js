import React from 'react';
import { View, WebView, Text, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, SwipeRow, Thumbnail, Card, CardItem, Left, Right, Body, Icon, Button } from 'native-base';
import NavigationBar from '../common/NavigationBar'
// import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native';
import { width } from '../../constants/Scale'
import { toJS } from 'mobx';
import { timeago, dayhourMins } from '../../utils/times'
@inject('MediaStore', 'UserStore')
@observer
export default class Collect extends React.Component {
	static navigationOptions = {
		title: 'Collect',
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
	_renderItemView(listItem) {
		let { item } = listItem
		const { navigation } = this.props
		return (
			<TouchableOpacity onPress={() => { navigation.navigate('WallDetail', item) }}>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 10,
						backgroundColor: '#fff',
						marginTop: 1,
					}}>
					<View style={{ flex: 1.8 }}>
						<View style={{ flex: 1, justifyContent: 'space-between' }}>
							<Text numberOfLines={2} style={{ lineHeight: 30, fontSize: 18 }}>{item.title}</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text style={{ flex: 3, lineHeight: 50, fontSize: 14, color: Colors.bodyTextGray }}>{item.author.display_name} {dayhourMins(item.display_time)}</Text>
								<Text style={{ flex: 1, textAlign: 'right', lineHeight: 50, fontSize: 12, color: Colors.collect }}>已收藏</Text>
							</View>
						</View>
					</View>
					<View style={{ flex: 1, justifyContent: 'space-between' }}>
						<Image
							style={{ marginLeft: 10, height: 100 }}
							source={{ uri: item.image_uri || 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
						/>
					</View>
				</View>
			</TouchableOpacity>)
	}
	_renderHeader() {
		return null
	}
	_renderFooter() {
		const { comments } = this.props
		return (<Text>
		</Text>)
	}
	_keyExtractor(item, index) {
		return index.toString()
	}
	render() {
		const { navigation } = this.props
		const { collection, articleCollection } = this.props.MediaStore
		return (
			<View style={styles.container}>
				<NavigationBar
					title={'收藏'}
					style={{}}
					leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20, color: Colors.headerText, }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
				/>

				{
					articleCollection.length ?
						<FlatList
							data={articleCollection}
							renderItem={this._renderItemView.bind(this)}
							keyExtractor={this._keyExtractor} //唯一的key
							ListHeaderComponent={this._renderHeader.bind(this)}
							ListFooterComponent={this._renderFooter.bind(this)}
						/> :
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
							<View style={{}}>
								<Image source={require('../../pics/blank.png')} />
								<Text style={{ fontSize: 13, color: Colors.bodyTextGray, lineHeight: 30 }}>在这个星球找不到</Text>
							</View>
						</View>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
