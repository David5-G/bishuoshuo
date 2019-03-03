import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native'
import { width,height} from '../../../constants/Scale'
import Colors from '../../../constants/Colors';

import { Carousel } from '@ant-design/react-native'

export default class Banner extends React.Component {
	static navigationOptions = {
		title: 'banner',
    }
    static proptypes = {
        navigation: PropTypes.object.isRequired,
    }
	constructor(props){
        super(props)
        this.state = {
            banners: [
                {
                    title: '如果一定要偷窃，请偷走我的悲伤',
                    tip: '电影，就是生活。',
                    uri: 'https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/7896efe7335b9c4.jpg'
                },
                {
                    title: '《X战警：黑凤凰》全新官方中字预告',
                    tip: '凤凰之力爆发！教授老万魔形女被虐~',
                    uri: 'https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/b69d08fe00a1bee.jpg'
                },
            ],
        }
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {}
	render() {
        const { navigation } = this.props
        const { banners } = this.state
		return (
			<View style={styles.container}>
                    <Carousel
                        style={styles.wrapper}
                        selectedIndex={2}
                        autoplay
                        infinite
                        afterChange={this.onVerticalSelectedIndexChange}
                        vertical
                    >
                        {
                            banners.map((item, i) => {
                                return (
                                    <View key={i} style={styles.item}>
                                        <Image style={styles.image} source={{uri: item.uri}}/>
                                        <View>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text style={styles.tip}>{item.tip}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </Carousel>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        width,
        backgroundColor: '#fff',
        height: 120,
    },
    item: {
        height: 120,
        width,
        flexDirection: 'row',
    },
    image: {
        width: 175,
        height: 120,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        lineHeight: 30,
        color: Colors.bodyTextDark,
        width: width - 200,
    },
    tip: {
        fontSize: 12,
        lineHeight: 50,
        width: width - 200,
        color: Colors.bodyTextGray
    }
});
