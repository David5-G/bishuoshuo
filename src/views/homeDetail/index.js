import React from 'react';
import {View, Text,Image, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import { Flex,Icon,WingBlank, List, Badge,WhiteSpace,Modal,Tag } from '@ant-design/react-native';
import { GET,POST } from '../../utils/request'

import { observer, inject } from 'mobx-react/native'

const Item = List.Item
const Brief = Item.Brief

@inject('UserStore', 'MainStore')
@observer
export default class About extends React.Component {
	static navigationOptions = {
		title: 'About',
        header: null,
	};
	constructor(){
		super(...arguments)
		this.state = {
            loading: false,
            lines: 3,
            actors: null,
            detail: null,
        }
    }
    componentDidMount() {
        this._initData()
        GET('https://m.douban.com/rexxar/api/v2/movie/27060077/interests?count=20&order_by=hot&start=0&ck=Kl55&for_mobile=1',{},{}).then(res => {
            console.log(res)
        }).catch(() => {
            console.log('err')
        })
    }
    async _initData () {
        const { loading } = this.state
        const { navigation } = this.props
        const { params } = navigation.state

        if (loading) return
        this.setState({loading: true})

        const detail = await GET('https://m.douban.com/rexxar/api/v2/elessar/subject/' + params)
        // const actors = await GET('https://m.douban.com/rexxar/api/v2/movie/'+params+'/credits')
        if (!this) return
        this.setState({loading: false})
        detail && this.setState({detail})

        // actors && this.setState({actors: actors.credits})

        console.log('detail--->', detail)
        // console.log('actors--->', actors)
    }
    
	render() {
        const { navigation } = this.props
        const { loading,detail, lines, actors } = this.state
        if ( !detail) {
            return <View>
                <NavigationBar
                    childView = {
                        <Flex justify='between'>
                            <Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
                        </Flex>
                    }
				/>
                <View>
                    <Text>加载中...</Text>
                </View>
            </View>
        }

        let des = detail.desc.match(/<div[^>]*>([\s\S]*)<\/div>/g)
        des = des[0].replace(/<\/?.+?\/?>/g,'')
		return (
			<View style={styles.container}>
				<NavigationBar
                    childView = {
                        <Flex justify='between'>
                            <Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
                        </Flex>
                    }
				/>
                <WingBlank>
                    <WhiteSpace />
                    <Flex justify='start' align='start'>
                        <Flex.Item style={{marginRight: 10}}>
                            <Text style={{fontSize: 20,lineHeight: 25,}}>{detail.title}({detail.extra.year})</Text>
                            <Brief>{detail.extra.short_info}</Brief>
                            <WhiteSpace />
                            <Flex justify='start' wrap='wrap'>{detail.tags.map((item,i) => <Tag key={i}>{item.name}</Tag>)}</Flex>
                        </Flex.Item>
                        <Badge>
                            <Image style={{ width: 100, height: 138 }} source={{ uri: detail.cover_img.url }} />
                        </Badge>
                    </Flex>
                    <WhiteSpace />
                    <Text style={{lineHeight:25,fontSize: 18,}}>剧情简介</Text>
                    <TouchableOpacity onPress={() => {this.setState({lines: lines === 0 ? 3 : 0})}}>
                        <Icon name='down' />
                        <Text numberOfLines={lines} style={{lineHeight: 20,fontSize: 16,marginTop: 5}}>{des}</Text>
                    </TouchableOpacity>
                    <WhiteSpace />
                    <Text style={{lineHeight:25,fontSize: 18,}}>演职员</Text>
                </WingBlank>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    
                </ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
