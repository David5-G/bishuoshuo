import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors.js'


export default class TabBarIcon extends React.Component {
	render() {
		return (
			<Icon
				name={this.props.name}
				size={26}
				style={{ }}
				color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			/>
		);
	}
}