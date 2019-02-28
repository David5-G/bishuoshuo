import React from 'react'
import PropTypes from 'prop-types';
import {
	View,
	Text,
	Button,
	WebView,
    ScrollView,
    TouchableOpacity,
    Image,
	StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
import { barHeight, statusBarHeight, isIos, width } from '../../../constants/Scale'

export default class About extends React.Component {
	static navigationOptions = {
		title: 'About',
		header: null
    }
    static proptypes = {
        navigation: PropTypes.object.isRequired,
        subjects: PropTypes.object.isRequired,
    }
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {}
	componentWillUnmount() {}
	render() {
        const { navigation, subjects } = this.props
		return (
			<View style={{ marginLeft: 15 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<Text style={styles.title}>{subjects.title}</Text>
					<Text
						style={{
							lineHeight: 50,
							marginRight: 14,
							color: '#999'
						}}
					>
						更多
					</Text>
				</View>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
					{subjects.subjects.map((item, i) => {
						if (i > 5) {
							return
                        }
                        const { id } = item
						const { average, max } = item.rating
						return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MovieDetail', id)}
                                key={i}
                                style={styles.item}>
								<Image
									source={{ uri: item.images.small }}
									style={styles.img}
								/>
								<View>
									<Text
										style={{
											lineHeight: 20,
											fontSize: 14,
											marginTop: 5
										}}
										numberOfLines={1}
									>
										{item.title}
									</Text>

									<View style={{ flexDirection: 'row' }}>
										<View style={styles.starWrap}>
											<View
												style={{ flexDirection: 'row' }}
											>
												<Icon
													name='ios-star'
													color='#e8e9e8'
													size={13}
												/>
												<Icon
													name='ios-star'
													color='#e8e9e8'
													size={13}
												/>
												<Icon
													name='ios-star'
													color='#e8e9e8'
													size={13}
												/>
												<Icon
													name='ios-star'
													color='#e8e9e8'
													size={13}
												/>
												<Icon
													name='ios-star'
													color='#e8e9e8'
													size={13}
												/>
											</View>

											<View
												style={[
													styles.colorStar,
													{
														width:
															(average / max) *
															13 *
															5
													}
												]}
											>
												<Icon
													name='ios-star'
													color='#ffc012'
													size={13}
												/>
												<Icon
													name='ios-star'
													color='#ffc012'
													size={13}
												/>
												<Icon
													name='ios-star'
													color='#ffc012'
													size={13}
												/>
												<Icon
													name='ios-star'
													color='#ffc012'
													size={13}
												/>
												<Icon
													name='ios-star'
													color='#ffc012'
													size={13}
												/>
											</View>
										</View>
										<View>
											<Text
												style={{
													fontSize: 12,
													color: '#aaa',
													marginLeft: 3
												}}
											>
												{average}
											</Text>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						)
					})}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	img: {
		width: (width - 50) / 3,
		height: ((width - 50) / 3 / 100) * 142,
		borderRadius: 4
	},
	title: {
		lineHeight: 50,
		fontSize: 18
	},
	item: {
		width: (width - 50) / 3,
		marginRight: 10,
		marginBottom: 20
	},
	starWrap: {},
	colorStar: {
		flexDirection: 'row',
		overflow: 'hidden',
		position: 'absolute',
		left: 0,
		top: 0
	}
})
