import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ActivityIndicator, Button, FlatList, WebView, ScrollView, StyleSheet } from 'react-native'
import { Container, List, ListItem, Body, Header, Content, Card, CardItem, Item, Input, Icon, Button as NeButton, Text as NeText } from 'native-base';

import { observer, inject } from 'mobx-react/native'
import Colors from '../../../constants/Colors'

@inject('MediaStore')
@observer
export default class Flash extends React.Component {
    static navigationOptions = {
        title: 'flash',
    }

    constructor(props) {
        super(props)
        this.state = {
            pidx: 1,
            ps: 10,
            types: '1,2,3,4,5,6,7,8,9',
            loading: false,
            done: false,
            fold: 0,
        }
    }
    componentDidMount() {
        this._loadMore()
    }
    componentWillUnmount() {
    }
    _renderItemView({ item, index }) {
        const { fold } = this.state
        return (
            <TouchableOpacity
                onPress={() => this.setState({ fold: index })} 
                style={{ flex: 1 }}>
                <View style={styles.card} keyExtractor={'key' + index} keys={index}>
                    <Item style={{ paddingBottom: 10, marginBottom: 10 }} >
                        {item.tags.map((tag, i) => {
                            return (<NeButton small light key={i} style={{ marginRight: 5 }}><NeText color>{tag}</NeText></NeButton>)
                        })}
                    </Item>
                    <Text numberOfLines={fold === index ? 0 : 2} style={{ lineHeight: 25, fontSize: 16, }}>{item.C}</Text>
                    <Text style={{ lineHeight: 25, fontSize: 14, color: Colors.bodyTextGray, marginLeft: 10 }}>{item['T']}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    _renderFooter() {
        const { done, loading, } = this.state
        if (done) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>没有更多数据了</Text>
                </View>
            )
        } else if (loading) {
            return (<View style={styles.footer}><ActivityIndicator /></View>)
        } else {
            return null
        }
    }
    _loadMore() {
        const { pidx, ps, types, loading, done } = this.state
        const { MediaStore } = this.props
        console.log('_loadMore-->')
        if (loading || done) return
        this.setState({ loading: true })
        MediaStore.getFlashNews({
            pidx,
            ps,
            types,
        }).then(res => {
            if (res.Code === 0) {
                if (!res.Obj.length || MediaStore.flashNews.length >= 120) {
                    this.setState({ done: true })
                }
                this.setState({ pidx: pidx + 1, })
            }
            this.setState({ loading: false })
        })
    }
    _keyExtractor(item, index) {
        return index.toString()
    }
    render() {
        const { MediaStore } = this.props

        console.log('MediaStore.flashNews-->', MediaStore.flashNews.length)
        return (
            <Container style={styles.container}>
                <FlatList
                    style={{backgroundColor:'#f4f4f4'}}
                    data={MediaStore.flashNews}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: Colors.bodyBackground,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        padding: 10,
    },

});
