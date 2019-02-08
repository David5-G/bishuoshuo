import React from 'react';
import {View, Text, WebView, ScrollView, StyleSheet } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';

export default class Trade extends React.Component {
	static navigationOptions = {
		title: 'trade',
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
		return (
			<View style={styles.container}>
                <Text>trade</Text>
			</View>
		);
	}
}a

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
