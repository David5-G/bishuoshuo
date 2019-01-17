import React from 'react'
import PropTypes from 'prop-types';
import { View,Image,TouchableOpacity, Text,ActivityIndicator, Button, FlatList, WebView, ScrollView, StyleSheet } from 'react-native'
import { Container, List, ListItem, Body, Header, Content, Card, CardItem, Item, Input, Icon, Button as NeButton, Text as NeText } from 'native-base';

import { observer, inject } from 'mobx-react/native'
import Colors from '../../../constants/Colors'
// import {Dimensions} from 'react-native'
// const deviceH = Dimensions.get('window').height
// const deviceW = Dimensions.get('window').width
@inject('MediaStore')
@observer
class ImportantNews extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
		title: '重新新闻',
	})
    constructor(props) {
        super(props)
        this.state = {
            // category: '1,2,3,4,5,6,7,8,9,10,0',
            category: '2',
            page: 1,
            total: 0,
            loading: false,
            done: false,
        }
    }
    componentDidMount() {
        this._loadMore()
    }
    componentWillUnmount() {
    }
    _renderItemView({item,index}) {
        const { navigation } = this.props
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('NewsDetail',item)
            }}>
                <View style={styles.card} keyExtractor={'key' + index} keys={index}>
                    {/* <Text style={{lineHeight:25,fontSize:16,}}>{item.C}</Text> */}
                    {/* <Text>{item.post_content}</Text> */}
                    <View style={{flex:1}}>
                        <View style={{flex:1,justifyContent: 'space-between'}}>
                            
                            <Text numberOfLines={2} style={{lineHeight:25,fontSize:16,}}>{item.post_title.replace(/\s/,'')}</Text>
                            <Text style={{lineHeight:50,fontSize:14,color:Colors.bodyTextGray}}>{item.post_source}</Text>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <Image
                            style={{marginLeft:10,height:80,borderRadius:3,}}
                            source={{uri: item.more.thumbnail || 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _renderFooter(){
        const {done,loading,} = this.state
        if (done) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:Colors.bodyTextGray,fontSize:14,marginTop:5,marginBottom:5,}}>没有更多数据了</Text>
                </View>
            )
        } else if (loading) {
            return (<View style={styles.footer}><ActivityIndicator /></View>)
        } else {
            return null
        }
    }
    _loadMore() {
        // category: 5,
        // page: 1,
        // loading: false,
        // done: false,
        const {category, page,loading ,done} = this.state
        const { MediaStore } = this.props
        if (loading || done) return
        this.setState({loading: true})
        MediaStore.getImportantNews({
            category,page,
        }).then(res => {
            if (res.code === 1) {
                this.setState({page: page + 1,})
            } else {
                this.setState({done: true})
            }
            this.setState({loading: false})
        })
    }
    _keyExtractor (item, index) {
        return index.toString()
    }
    render() {
        const { MediaStore } = this.props
        return (
            <Container style={styles.container}>
                <FlatList
                    data={MediaStore.importantNews}
                    refreshing={this.state.loading}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor} //唯一的key
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReached={this._loadMore.bind(this)}
                    onEndReachedThreshold={0}
                />
            </Container>
        );
    }
}
export default ImportantNews

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        minHeight:100,
        borderColor: Colors.borderGray,
        borderBottomWidth: 1,
    },
    
});

ImportantNews.proptypes = {
    navigation : PropTypes.object.isRequired,
}

