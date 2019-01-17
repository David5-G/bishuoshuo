import React from 'react';
import { Alert, View, AsyncStorage, ActivityIndicator, TouchableOpacity, WebView, ScrollView, Button, StyleSheet, TextInput, Text } from 'react-native'
export default class News extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: '',
		header: null,
	})
	componentDidMount() {
		console.log('News--> componentDidMount')
	}
	componentWillUnmount() {
		console.log('News--> componentWillUnmount')
	}
	render() {
		
		return (
			<View style={styles.container}>
                <Text>news</Text>
			</View>
		);
	}
}

/* */
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff'},
});
