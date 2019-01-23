import React from 'react';
import {View, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
export default class About extends React.Component {
	static navigationOptions = {
		title: 'About',
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
				<NavigationBar
					title={'关于'}
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
