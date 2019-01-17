import React from 'react';
import { Alert, View, AsyncStorage, ActivityIndicator, TouchableOpacity, WebView, ScrollView, Button, StyleSheet, TextInput, Text } from 'react-native'

import Route from './route/index.js'

export default class Root extends React.Component {
	
	render() {
		
		return (
			<View style={styles.container}>
                <Text>Root</Text>
                <Route />
			</View>
		);
	}
}

/* */
const styles = StyleSheet.create({
	container: { flex: 1, },
});
