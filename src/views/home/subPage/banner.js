import React from 'react';
import {View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import {Dimensions} from 'react-native'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
export default class Banner extends React.Component {
	static navigationOptions = {
		title: 'banner',
	}
	constructor(props){
		super(props)
		this.state = {}
    }
    componentDidMount() {}
    componentWillUnmount() {}
	render() {
        const {banners} = this.props
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
                                <View key={i}>
                                    <Image style={styles.image} source={{uri: item.image}} />
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
        height: 100,
    },
    image: {
        width,
        height: 200,
    }
});
