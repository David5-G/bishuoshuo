import React from 'react'
import PropTypes from 'prop-types';
import {View, WebView, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Thumbnail,
	Text,
	Button,
	Left,
	Body,
    Right,
    Icon
} from 'native-base'
import NavigationBar from '../common/NavigationBar'
// import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import {GET, POST} from '../../utils/request'
import { timeago } from '../../utils/times'
import {WallHost} from '../../config'
import Loading from '../common/Loading'
export default class WatchList extends React.Component {
	static navigationOptions = {
		title: 'WatchList',
		header: null
    }
    static proptypes = {
        navigation: PropTypes.object.isRequired,
    }
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			author: {},
			authorArtical: []
		}
	}
	componentDidMount() {
		this._getInfo()
	}
	componentWillUnmount() {}
	async _getInfo() {
        const { params } = this.props.navigation.state
		const {loading} = this.state
        if (loading) return
        if (!params) return
		this.setState({loading: true})
		const author = await GET(
			WallHost + '/apiv1/user/personal/internal',{
                uid: params,
            }
		)
		const authorArtical = await GET(
			WallHost + '/apiv1/content/user/articles',
			{
				user_id: params,
				limit: 20
			}
        )
        
		if (author.code === 20000 && authorArtical.code === 20000) {
			this.setState({
				author: author.data,
				authorArtical: authorArtical.data.items
			})
		}
		this.setState({loading: false})
		
	}
	render() {
		const {navigation} = this.props
        const {loading, author, authorArtical} = this.state
        if (loading) {
            return (
                <View>
                    <NavigationBar
                        title={''}
                        style={{}}
                        leftButton={
                            <Icon
                                style={{paddingLeft: 20, paddingRight: 20,color:'#fff'}}
                                onPress={() => navigation.goBack()}
                                name={'ios-arrow-back'}
                                size={28}
                                color={Colors.headerText}
                            />
                        }
                    />
					<Loading show={loading} />
                </View>
            )
        }
		return (
			<View style={styles.container}>
				<NavigationBar
					title={author.display_name || ''}
					style={{}}
					leftButton={
						<Icon
							style={{paddingLeft: 20, paddingRight: 20,color:'#fff'}}
							onPress={() => navigation.goBack()}
							name={'ios-arrow-back'}
							size={28}
							color={Colors.headerText}
						/>
					}
				/>
				<Content>
                    <Card style={{marginLeft: 5, marginRight: 5}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: author.image}} />
                                <Body>
                                    <Text>{author.display_name}</Text>
                                    <Text note>粉丝数: {author.fans_count}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <View>
                        {authorArtical.map((item, i) => {
                            item.author = author
                            return (
                                <TouchableOpacity key={i} onPress={() => navigation.navigate('WallDetail', item)} style={[styles.card]}>
                                    <View style={{ flex: 1.8 }}>
                                        <View style={{ flex: 1, justifyContent: 'space-between'}}>
                                            <Text numberOfLines={2} style={{ lineHeight: 30, fontSize: 18 }}>{item.title}</Text>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <Text style={{flex: 3,lineHeight: 50,fontSize: 14,color: Colors.bodyTextGray }}>{item.display_name} {timeago(item.display_time * 1000)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1,justifyContent: 'space-between' }}>
                                        <Image
                                            style={{ marginLeft: 10, height: 100 }}
                                            source={{ uri: item.image_url || 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
				</Content>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        minHeight: 130,
        borderColor: Colors.borderGray,
        borderBottomWidth: 1,
        backgroundColor: '#fff',

    },
})
