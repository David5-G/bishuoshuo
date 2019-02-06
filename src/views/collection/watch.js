import React from 'react';
import { View, WebView, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, List, SwipeRow, ListItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import NavigationBar from '../common/NavigationBar'
// import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react/native';

@inject('MediaStore', 'UserStore')
@observer
export default class Watch extends React.Component {
	static navigationOptions = {
		title: 'Watch',
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
		const { item } = listItem
		return (
			<SwipeRow
				leftOpenValue={60}
				rightOpenValue={-60}
				left={
					<Button success onPress={() => alert('Add')}>
						<Text>查看</Text>
					</Button>
				}
				body={
					<View style={{flexDirection: 'row',justifyContent: 'space-between',paddingLeft: 10,paddingRight: 10}}>
						{/* <Thumbnail square source={{ uri: item.image }} /> */}
						<Text style={{marginLeft: 20,}}>{item.display_name}</Text>
					</View>
				}
				right={
					<Button danger onPress={() => alert('Trash')}>
						<Text>删除</Text>
					</Button>
				}
			/>)
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
					title={'关注'}
					style={{}}
					leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20, color: Colors.headerText }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
				/>
				<FlatList
					style={{margin: 0,padding: 0,}}
					data={collection}
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
	},
});
