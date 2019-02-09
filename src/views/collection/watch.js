import React from 'react';
import { View, WebView, FlatList, ScrollView,Image, StyleSheet } from 'react-native';
import { Container, Header, Content,Text, Card, CardItem, List, SwipeRow, ListItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import NavigationBar from '../common/NavigationBar'
// import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import { width} from '../../constants/Scale'
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
		const { MediaStore } = this.props
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
					<View style={{flexDirection: 'row',paddingLeft: 10,paddingRight: 10,width}}>
						<Left>
							<Thumbnail source={{ uri: item.image }} />
							<Text style={{marginLeft: 20}}>{item.display_name}</Text>
						</Left>
						<Right>
							<Button style={{alignSelf:'center',}} light small>
								<Text>已关注</Text>
							</Button>
						</Right>
					</View>
				}
				right={
					<Button danger onPress={() => {
						MediaStore.toggleCollection({author: item})
					}}>
						<Text>删除</Text>
					</Button>
				}
			/>)
	}
	_renderHeader() {
		return  null
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
					title={'我的关注'}
					style={{}}
					leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20, color: Colors.headerText }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
				/>
				{
					collection.length?
					<FlatList
						style={{marginTop: 0}}
						data={collection}
						renderItem={this._renderItemView.bind(this)}
						keyExtractor={this._keyExtractor} //唯一的key
						ListHeaderComponent={this._renderHeader.bind(this)}
						ListFooterComponent={this._renderFooter.bind(this)}
					/> :
					<View style={{flex: 1,alignItems:'center',justifyContent:'center',}}>
						<View style={{}}>
							<Image source={require('../../pics/blank.png')} />
							<Text style={{fontSize: 13,color:Colors.bodyTextGray,lineHeight: 30}}>在这个星球找不到</Text>
						</View>
					</View>
				}
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
});
