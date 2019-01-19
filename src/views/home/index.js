import React from 'react'
import PropTypes from 'prop-types';
import { View,Image,Dimensions,TouchableOpacity, Text,ActivityIndicator, Button, FlatList, WebView, ScrollView, StyleSheet } from 'react-native'
import { Container, List, ListItem, Body, Header, Content, Card, CardItem, Item, Input, Icon, Button as NeButton, Text as NeText } from 'native-base';

import { observer, inject } from 'mobx-react/native'
import Colors from '../../constants/Colors'
import NavigationBar from '../common/NavigationBar'

// const deviceH = Dimensions.get('window').height
const width = Dimensions.get('window').width
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
                <NavigationBar
                    title={'资讯'}
                    style={{ color: Colors.headerText, fontSize: 20 }}
                    titleLayoutStyle={{ fontSize: 30 }}
                    titleView={<Image style={{width: 100,height: 24,marginTop: 13,}} source={{uri: 'https://s3b.pstatp.com/growth/mobile_list/image/wap_logo@3x_581de69e.png'}} />}
                    rightButton={(<Text></Text>)}
                />
                <View style={styles.nav}>
                    <Text style={styles.navItem}>行业</Text>
                    <Text style={styles.navItem}>宏观</Text>
                    <Text style={styles.navItem}>公司</Text>
                    <Text style={styles.navItem}>数据</Text>
                    <Text style={styles.navItem}>市场</Text>
                    <Text style={styles.navItem}>观点</Text>
                    <Text style={styles.navItem}>全球</Text>
                    <Text style={styles.navItem}>A股</Text>
                    <Text style={styles.navItem}>其它</Text>
                </View>
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
    nav: {
        flexDirection: 'row',
        width,
        flexWrap: 'wrap',
        backgroundColor: 'rgba(255,60,75,0.1)',
        padding: 5,
        
    },
    navItem: {
        width: (width - 10)/6,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 32,
        color: '#333'
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

