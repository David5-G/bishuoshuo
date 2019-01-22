import React from 'react';
import {View, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
export default class Userinfo extends React.Component {
	static navigationOptions = {
		title: 'Userinfo',
		header: null,
	};
	constructor(props){
		super(props)
		this.state = {}
    }
    componentDidMount() {
        console.log('Userinfo--> componentDidMount')
    }
    componentWillUnmount() {
        console.log('Userinfo--> componentWillUnmount')
    }
	render() {
		return (
			<View style={styles.container}>
				<NavigationBar
					title={'个人信息'}
					style={{}}
					leftButton={<Icon style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
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
