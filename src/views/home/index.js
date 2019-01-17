import React from 'react';
import { Alert, View, AsyncStorage, ActivityIndicator, TouchableOpacity, WebView, ScrollView, Button, StyleSheet, TextInput, Text } from 'react-native'
export default class Home extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: '',
		header: null,
	})
	componentDidMount() {
		console.log('Home--> componentDidMount')
	}
	componentWillUnmount() {
		console.log('Home--> componentWillUnmount')
	}
	render() {
		
		return (
			<View style={styles.container}>
                <Text>home</Text>
			</View>
		);
	}
}

/* */
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff'},
});
