import React from 'react';
import {View, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Account extends React.Component {
	static navigationOptions = {
		title: 'account',
		header: null,
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
				<NavigationBar
					title={''}
					style={{}}
					leftButton={<Icon style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
					rightButton={<Text onPress={()=> navigation.navigate('Login')} style={{color:Colors.headerText,fontSize:16,}}>登录</Text>}
				/>
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
