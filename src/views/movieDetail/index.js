import React from 'react';
import {View, Text,Button, TouchableOpacity,WebView,Image, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { GET } from '../../utils/request'
import { width } from '.././../constants/Scale.js'
export default class MovieDetail extends React.Component {
	static navigationOptions = {
		title: 'MovieDetail',
		header: null,
	};
	constructor(props){
		super(props)
		this.state = {
            loading: true,
            lines: 3,
            detail: {
                genres: [],
                countries: [],
                images: [],
                genres: [],
                rating: {},
            }
        }
    }
    componentDidMount() {
        this._getDetail()
    }
    componentWillUnmount() {
    }
    async _getDetail () {
        const id = this.props.navigation.state.params
        const detail = await GET('https://api.douban.com/v2/movie/subject/' + id)
        this.setState({loading: false,detail})

    }
	render() {
        const { navigation } = this.props
        const{ loading,detail,lines } = this.state
        console.log('detail-->', detail)

		return (
			<View style={styles.container}>
				<NavigationBar
					title={'关于'}
					style={{}}
					leftButton={<Icon style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
				/>
                <View style={{flexDirection: 'row',width,paddingLeft: 8,paddingRight: 8,justifyContent: 'space-between',backgroundColor: '#fff',paddingTop: 10,paddingBottom: 10}}>
                    <View style={{width: width - 140}}>
                        <Text style={{fontSize: 18,lineHeight: 30,}}>{detail.title}</Text>
                        <Text style={{fontSize: 13,lineHeight: 20,color:Colors.bodyTextGray}}>{detail.year}年上映</Text>
                        <Text style={{fontSize: 13,lineHeight: 20,color:Colors.bodyTextGray}}>
                            {
                                detail.genres.map((item, i) => {
                                    if (i < detail.genres.length - 1) {
                                        return item + ' | '
                                    } else {
                                        return item
                                    }
                                })
                            }
                        </Text>
                        <Text style={{fontSize: 13,lineHeight: 20,color:Colors.bodyTextGray}}>
                            {detail.ratings_count}人评价
                        </Text>
                        <Text style={{fontSize: 13,lineHeight: 20,color:Colors.bodyTextGray}}>
                            {
                                detail.countries.map((item, i) => {
                                    if (i < detail.countries.length - 1) {
                                        return item + ' | '
                                    } else {
                                        return item
                                    }
                                })
                            }
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 30,color:'orange',lineHeight: 30,}}>{detail.rating.average}</Text>
                            <Text style={{fontSize: 12,color:'orange',marginLeft: 10,}}>分</Text>
                        </View>
                    </View>
                    <Image style={{width: 120,height: 162}} source={{uri: detail.images.medium}} />
                </View>

                <View style={{marginTop: 10,backgroundColor: '#fff',width,paddingLeft: 8,paddingRight: 8,}}>
                    <Text>所属频道</Text>
                    <View style={{flexDirection:'row'}}>
                        {
                            detail.genres.map((item, i) => {
                                return (
                                    <View key={i}>
                                        <Text>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text style={{lineHeight: 20,textAlign:'justify'}}>{detail.title}的剧情简介</Text>
                    <View>
                        <Text numberOfLines={lines}>{detail.summary}</Text>
                        {lines === 3 && <TouchableOpacity onPress={() => this.setState({lines: 100})}><Text>展开</Text></TouchableOpacity>}
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <Text>影人</Text>
                </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        width,
	},
});
