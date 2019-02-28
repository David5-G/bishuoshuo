import React from 'react';
import {View, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
export default class Comming extends React.Component {
	static navigationOptions = {
		title: 'Comming',
		header: null,
	};
	constructor(props){
		super(props)
		this.state = {}
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
	render() {
        const { navigation } = this.props
		return (
			<View style={styles.container}>
				<Text>coming</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
