/**
 * NavigationBar
 *
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, StatusBar, Text, Dimensions, View } from 'react-native'
import Colors from '../../constants/Colors'
import { width, barHeight, notch, statusBarHeight } from '../../constants/Scale'
import LinearGradient from 'react-native-linear-gradient'

const StatusBarShape = {
	// barStyle: PropTypes.oneOf(['light-content', 'default',]),
	// hidden: PropTypes.bool,
	// backgroundColor: PropTypes.string,
}

export default class NavigationBar extends Component {
	static propTypes = {
		// style: PropTypes.style,
		title: PropTypes.string,
		//     childView: PropTypes.element,
		//     titleLayoutStyle:View.propTypes.style,
		hide: PropTypes.bool,
		//     statusBar: PropTypes.shape(StatusBarShape),
		rightButton: PropTypes.element,
		leftButton: PropTypes.element
	}
	static defaultProps = {
		statusBar: {
			barStyle: 'light-content',
			hidden: false
		}
	}
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			hide: false
		}
	}

	getButtonElement(data) {
		return <View style={styles.navBarButton}>{data ? data : null}</View>
	}
	render() {
		let statusBar = !this.props.statusBar.hidden ? (
			<View style={styles.statusBar}>
				<StatusBar {...this.props.statusBar} />
			</View>
		) : null

		let childView = this.props.childView ? (
			this.props.childView
		) : (
			<Text ellipsizeMode='head' ellipsizeMode='tail' numberOfLines={1} style={[styles.title, this.props.style || null]}>
				{this.props.title}
			</Text>
		)

		let content = (
			<View style={styles.navBar}>
				<View style={{width,marginTop: notch ? 25 : 0,paddingBottom: 5,paddingLeft: 10,paddingRight: 10}}>{childView}</View>
			</View>
		)
		return (
			<View style={[styles.container, this.props.style]}>
				{statusBar}
				{content}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.tintColor,
		width
	},
	title: {
		fontSize: 20,
		color: Colors.headerText,
		marginTop: notch ? 20 : 0
	},
	statusBar: {
		height: statusBarHeight
	}
})
