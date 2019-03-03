import React from 'react'
import { View, Text, Button, WebView, ScrollView, StyleSheet } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
export default class Program extends React.Component {
	static navigationOptions = {
		title: 'Program',
		header: null
	}
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {}
	componentWillUnmount() {}
	render() {
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<NavigationBar title={'应用'} style={{}} leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />} />
                <Text>program</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
