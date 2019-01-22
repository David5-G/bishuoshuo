import React from 'react';
import {View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper'
import {Dimensions} from 'react-native'
import { observer, inject } from 'mobx-react/native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


@inject('MediaStore')
@observer
export default class Banner extends React.Component {
	static navigationOptions = {
		title: 'banner',
	}
	constructor(props){
		super(props)
        this.state = {
            channel: 'global-carousel',
            limit: 5,
        }
    }
    componentDidMount() {
        const { MediaStore } = this.props
        const { channel, limit } = this.state
        MediaStore.getBanners({
            channel,limit
        })
    }
    componentWillUnmount() {}
	render() {
        const { MediaStore } = this.props
        const banners = MediaStore.banners
		return (
			<View style={styles.container}>
                {banners.length ? (
                    <Swiper
                        autoplay
                        horizontal
                        autoplayTimeout={3}
                        containerStyle={{ width:width }}
                        removeClippedSubviews={false}
                    >
                        {banners.map((item,i) => {
                            return (
                                <View style={styles.wrap} key={i}>
                                    <Image style={styles.image} source={{uri: item.resource.image_uri}} />
                                    <Text style={styles.title}>{item.resource.title}</Text>
                                </View>
                            )
                        })}
                    </Swiper> 
                ) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        height: 160,
    },
    wrap: {
        height: 160,
    },
    title: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        width: width - 20,
        fontSize: 18,
        lineHeight: 25,
        color: '#fff',
    },
    image: {
        width,
        height: 160,
    }
});
