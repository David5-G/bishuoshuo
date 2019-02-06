import React from 'react';
import { View, WebView, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, SwipeRow, Text, Thumbnail, Card, CardItem, Left, Right, Body, Icon, Button } from 'native-base';
import NavigationBar from '../common/NavigationBar'
// import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native';
import { width } from '../../constants/Scale'
import { toJS } from 'mobx';
import { timeago } from '../../utils/times'
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
		const {navigation} = this.props
		return (
			<TouchableOpacity onPress={() => {navigation.navigate('WallDetail', item)}}>
				<Card style={{ marginLeft: 10, marginRight: 10 }}>
					<CardItem>
						<Left>
							<Thumbnail square source={{ uri: item.image_uri }} />
							<Body>
								<Text>{item.title}</Text>
							</Body>
						</Left>
					</CardItem>
					<CardItem cardBody>
						{/* <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: null, flex: 1 }} /> */}
					</CardItem>
					<CardItem>
						{/* <Left>
							<Icon style={{ fontSize: 20, color: Colors.bodyTextGray }} name="ios-star" />
							<Text style={{ fontSize: 14, color: Colors.bodyTextGray }}>取消收藏</Text>
						</Left> */}
						<Right>
							<Text style={{ fontSize: 14, color: Colors.bodyTextGray }}>{item.display_time ? timeago(item.display_time * 1000) : ''}</Text>
						</Right>
					</CardItem>
				</Card></TouchableOpacity>)
	}
	_renderHeader() {
		return (<Text>
		</Text>)
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
				<FlatList
					data={articleCollection}
					renderItem={this._renderItemView.bind(this)}
					keyExtractor={this._keyExtractor} //唯一的key
					ListHeaderComponent={this._renderHeader.bind(this)}
					ListFooterComponent={this._renderFooter.bind(this)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
