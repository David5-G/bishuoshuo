import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, Image,Button, FlatList, WebView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { width, notch, barHeight } from '../../../constants/Scale.js'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
import { observer, inject, } from 'mobx-react/native'
import NavigationBar from '../../common/NavigationBar'
import { toJS } from 'mobx'
import {timeago} from '../../../utils/times'
@inject('MediaStore', 'UserStore')
@observer
export default class Bar extends React.Component {
    static navigationOptions = {
        title: 'Bar',
        header: null,
    };
    static proptypes = {
        navigation: PropTypes.object.isRequired,
        comments: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }
    _renderItemView(listItem) {
        const { item } = listItem
        const { user_info } = item
        return (
            <View style={{width,flexDirection: 'row',marginTop: 20,}}>
                <View style={{marginLeft: 10}}>
                    <Image style={{width:40,height:40,borderRadius: 20,}} source={{uri: user_info.avatar}} />
                </View>
                <View style={{flex: 1,marginLeft: 10}}>
                    <Text style={{lineHeight: 25,fontSize: 16}}>{user_info.display_name}</Text>
                    <Text style={{lineHeight: 25,fontSize: 12,color: Colors.bodyTextGray}}>{timeago(item.created_at * 1000)}</Text>
                    <Text style={{lineHeight: 25,fontSize: 15,marginTop: 5,color: '#666',textAlign:'justify',marginRight: 10,}}>{item.content}</Text>
                </View>
        </View>)
    }
    _renderHeader() {
        return (<Text>
            
            </Text>)
    }
    _renderFooter() {
        const { comments } = this.props
        return (<View style={{marginLeft: 10,marginRight: 10,marginTop: 10}}>
            <Image source={{with: width-20,height:200,uri: comments.resource_image_uri}} />
            <Text style={{fontSize: 18,fontWeight:'bold',lineHeight: 28,textAlign:'justify',marginTop: 20,}}>{comments.resource_title}</Text>
        </View>)
    }
    _keyExtractor(item, index) {
        return index.toString()
    }
    render() {
        try {
            const { navigation, comments, MediaStore } = this.props
            let { params } = navigation.state;

            const { isLogin } = this.props.UserStore

            const authorId = params.author.id

            const ariticleId = params.id

            const authorIdx = MediaStore.collection.findIndex(o => o.id === authorId)
            const articleIdx = MediaStore.articleCollection.findIndex(o => o.id === ariticleId)
            const keepAuthor = authorIdx === -1 ? 0 : 1
            const keepArticle = articleIdx === -1 ? 0 : 1
            const commentList = comments.items || []
            const { modalVisible } = this.state
            
            return (
                <View style={styles.bar}>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingLeft: 20, paddingRight: 20, }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ modalVisible: true })}
                            style={{ flex: 2, flexDirection: 'row', }}>
                            <Icon name={'ios-code-working'} size={33} style={{}} />
                            <View style={{ marginTop: -14, marginLeft: -5, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#fff', backgroundColor: Colors.bodyTextActive, alignSelf: 'center' }}>
                                <Text style={{ fontSize: 12, lineHeight: 14, paddingLeft: 3, paddingRight: 3, color: '#fff' }}>{commentList.length}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                if (isLogin) {
                                    MediaStore.toggleArticleCollection(params)
                                } else {
                                    navigation.navigate('Login')
                                }
                            }}
                            style={{ flex: 1, flexDirection: 'row' }}>
                            {/* ios-person-add */}
                            <Icon name={keepArticle?'ios-star':'ios-star-outline'} size={22} color={keepArticle ? Colors.collect : null} style={{ marginLeft: 10, lineHeight: 30 }} />
                            <Text style={{ marginLeft: 5, lineHeight: 30, fontSize: 14, color: keepArticle ? Colors.bodyTextGray : null  }}>{keepArticle?'已收藏':'收藏'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (isLogin) {
                                    MediaStore.toggleCollection(params)
                                } else {
                                    navigation.navigate('Login')
                                }
                            }}
                            style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
                            {/* ios-person-add */}
                            <Icon name={'ios-person-add'} size={24} color={keepAuthor ? Colors.raise : null} style={{ marginLeft: 10, lineHeight: 30 }} />
                            <Text style={{ marginLeft: 5, lineHeight: 30, fontSize: 14, color: keepAuthor ? Colors.bodyTextGray : null }}>{keepAuthor ? '已关注' : '关注'}</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal animationType="slide" visible={modalVisible}  style={{paddingBottom: 50}}>
                        <View style={{flex: 1,}}>
                            <NavigationBar
                                title={'热门评论'}
                                rightButton={<Icon name={'ios-arrow-down'} size={25} style={{ color: Colors.headerText }} onPress={() => this.setState({ modalVisible: false })} />}
                            />
                            <FlatList
                                data={commentList}
                                renderItem={this._renderItemView.bind(this)}
                                keyExtractor={this._keyExtractor} //唯一的key
                                ListHeaderComponent={this._renderHeader.bind(this)}
                                ListFooterComponent={this._renderFooter.bind(this)}
                            />
                        </View>
                    </Modal>
                </View>
            );
        } catch (err) {
            return (<View style={styles.bar}><Text>出错</Text></View>)
        }

    }
}

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        width,
        backgroundColor: '#fff',
        height: barHeight + 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderColor: Colors.borderGray,
        borderTopWidth: 1,
    },
});
