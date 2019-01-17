import React from 'react';
import {View, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';

export default class Account extends React.Component {
	static navigationOptions = {
		title: 'account',
	};
	constructor(props){
		super(props)
		this.state = {}
    }
    componentDidMount() {
        console.log('account--> componentDidMount')
    }
    componentWillUnmount() {
        console.log('account--> componentWillUnmount')
    }
	render() {
		return (
			<View style={styles.container}>
				<Text>account</Text>
                <Button 
                    onPress={()=>this.props.navigation.navigate('Home')}
                    title='Go to Home'
                ></Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
