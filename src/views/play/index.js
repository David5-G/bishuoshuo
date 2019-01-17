import React, { Component } from 'react'
import { View,Text,ScrollView, FlatList,TouchableOpacity } from 'react-native'
import { Video } from 'expo'
import NavigationBar from '../common/NavigationBar'

import {Dimensions} from 'react-native'
const deviceH = Dimensions.get('window').height
const deviceW = Dimensions.get('window').width
import Colors from '../../constants/Colors'
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlist: [
				"http://stock.fk7h.com/video/马云_ 未来的金融要靠什么来发展.mp4",
				"http://stock.fk7h.com/video/金融小百科-香港创业板股风险须知.mp4",
				"http://stock.fk7h.com/video/金融消费者的八项基本权利，本溪市金融办和本溪市银监分局联合发布金融公益广告.mp4",
				"http://stock.fk7h.com/video/俞凌雄互联网金融的未来发展趋势.mp4",
				"http://stock.fk7h.com/video/马云分析未来金融行业趋势，不愧是爸爸！.mp4",
				"http://stock.fk7h.com/video/金融百科-最便宜的股票.mp4",
				"http://stock.fk7h.com/video/清华大学五道口金融学院金融MBA教育中心主任专访.mp4",
				"http://stock.fk7h.com/video/如何在金融市场中盈利.mp4",
				"http://stock.fk7h.com/video/金融啪啪啪-西瓜底.mp4",
				"http://stock.fk7h.com/video/酷学习微观经济学.mp4",
				"http://stock.fk7h.com/video/金融小百科-香港新股与次新股要慎炒.mp4",
				"http://stock.fk7h.com/video/【行为经济学】获诺奖, 是因为它更有“人性”.mp4",
				"http://stock.fk7h.com/video/金融学院-超短线趋势投资策略的操作重点.mp4",
				"http://stock.fk7h.com/video/绿色金融.mp4",
				"http://stock.fk7h.com/video/金融啪啪啪-V型反转.mp4",
				"http://stock.fk7h.com/video/(国际金融)-外汇、汇率与外汇市场—教育.mp4",
				"http://stock.fk7h.com/video/初级经济师《金融专业知识与实务》导学班.mp4",
				"http://stock.fk7h.com/video/看女性如何助解决冰岛金融危机——凌石金融.mp4",
				"http://stock.fk7h.com/video/骗子最恨的视频！看完这个短片让你轻松原理金融诈骗.mp4",
				"http://stock.fk7h.com/video/加拿大金融专业就业前景怎么样- 工作好找吗.mp4",
				"http://stock.fk7h.com/video/2015新常态下的中国经济与新金融.mp4",
				"http://stock.fk7h.com/video/经济学速成课.mp4",
				"http://stock.fk7h.com/video/南安普顿大学经济&金融专业本科毕业生经验.mp4",
				"http://stock.fk7h.com/video/60秒了解经济学 菲利普斯曲线.mp4",
				"http://stock.fk7h.com/video/网络金融安全(北京银监局-邮储银行.mp4",
				"http://stock.fk7h.com/video/《宏皓财经（13）》金融服务外包.mp4",
				"http://stock.fk7h.com/video/开讲啦马云2017最新微访谈，互联网不是虚拟经济，金融才是.mp4",
				"http://stock.fk7h.com/video/金融学院-小崔引发的血馒头，华谊兄弟能否咽下.mp4",
				"http://stock.fk7h.com/video/亚洲金融论坛：「区块链技术」创造新商业价值.mp4",
				"http://stock.fk7h.com/video/经济金融会计.mp4",
				"http://stock.fk7h.com/video/最新金融课程 田大超.mp4",
				"http://stock.fk7h.com/video/金融小百科-CDR简介.mp4",
				"http://stock.fk7h.com/video/速成经济学和垄断.mp4",
				"http://stock.fk7h.com/video/识别违法金融广告 远离非法金融活动.mp4",
				"http://stock.fk7h.com/video/金融学院-盘中涨停板打开的几种操作建议.mp4",
				"http://stock.fk7h.com/video/互联网金融、金融创新授课金融学家宏皓讲投资银行操作实务（六）.mp4",
				"http://stock.fk7h.com/video/金融小百科-完结篇-香港低价股.mp4",
				"http://stock.fk7h.com/video/《馅饼 陷阱》 广发金融知识普及短片.mp4",
				"http://stock.fk7h.com/video/金融学院-解读巴菲特的价值投资.mp4",
				"http://stock.fk7h.com/video/京堂网 中国金融挑战与企业金融创新.mp4",
				"http://stock.fk7h.com/video/金融交易心理分析：为什么一个正常人，进入股市就疯狂.mp4",
				"http://stock.fk7h.com/video/金融_理财_房地产的骗局_都是用金融杠杠来骗老百姓的钱.mp4",
				"http://stock.fk7h.com/video/银行行业公共基础-金融经济区分.mp4",
				"http://wsiatest.bitballoon.com/videotrack.mp4",
				"http://www.html5videoplayer.net/videos/toystory.mp4",
			]
		}
	}
	videoUpdated(playbackStatus) {
		if (playbackStatus['didJustFinish']) {
			this.playNext();
		}
	}
	playNext() {
		
	}
	_renderItemView({item,index}) {
        const { navigation } = this.props
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('PlayVideo',item)
            }}>
                <View style={{}} keyExtractor={'key' + index} keys={index}>
                    <Text>{item.match(/[\u4E00-\u9FA5]/g)}</Text>
                </View>
            </TouchableOpacity>
        )
	}
	_keyExtractor (item, index) {
        return index.toString()
    }
	render() {
		const playlist = this.state.playlist
		return (
			<View style={{flex:1}}>
				<NavigationBar
					title={'视频列表'}
					style={{ color: Colors.headerText, fontSize: 20 }}
					titleLayoutStyle={{ fontSize: 30 }}
				/>
				<FlatList
					data={playlist}
					keyExtractor={this._keyExtractor} //唯一的key
					renderItem={this._renderItemView.bind(this)}
				>
				</FlatList>
			</View>
		);
	}
}
