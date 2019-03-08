import React from 'react'
import { View, Text, Button, WebView, ScrollView, StyleSheet } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import DeviceInfo from 'react-native-device-info'
import { List, Icon, Flex } from '@ant-design/react-native'
import { isIos } from '../../constants/Scale'

const Item = List.Item
const Brief = Item.Brief

export default class About extends React.Component {
	static navigationOptions = {
		title: 'About',
		header: null
	}
	constructor(props) {
		super(props)
		this.state = {
			applicationName: DeviceInfo.getApplicationName(),
			brand: DeviceInfo.getBrand(),
			bundleId: DeviceInfo.getBundleId(),
			carrier: DeviceInfo.getCarrier(),
			deviceCountry: DeviceInfo.getDeviceCountry(),
			deviceLocale: DeviceInfo.getDeviceLocale(),
			deviceName: DeviceInfo.getDeviceName(),
			freeDiskStorage: DeviceInfo.getFreeDiskStorage(),
			systemName: DeviceInfo.getSystemName(),
			systemVersion: DeviceInfo.getSystemVersion(),
			uniqueId: DeviceInfo.getUniqueID(),
			isEmulator: DeviceInfo.isEmulator(),
			hasNotch: DeviceInfo.hasNotch(),
			manufacturer: DeviceInfo.getManufacturer()
		}
	}
	componentDidMount() {}
	componentWillUnmount() {}
	render() {
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<NavigationBar
					childView={
						<Flex justify='between'>
							<Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
						</Flex>
					}
				/>
				<Text>about</Text>
				<ScrollView style={{ flex: 1, backgroundColor: '#f5f5f9' }} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
					<List renderHeader={'关于本机'}>
						<Item extra={this.state.brand}>品牌</Item>
						<Item extra={this.state.deviceCountry}>国家</Item>
						<Item extra={this.state.deviceLocale}>语言</Item>
						<Item extra={isIos ? (this.state.freeDiskStorage / (1024 * 1024 * 1024)).toFixed(2) + 'G' : this.state.freeDiskStorage}>可用空间</Item>
						<Item extra={this.state.systemVersion}>系统版本</Item>
						<Item extra={this.state.uniqueId}>uniqueId</Item>
						<Item extra={this.state.isEmulator ? '模拟器' : '真机'}>类型</Item>
						<Item extra={this.state.hasNotch ? '是' : '否'}>Notch</Item>
						<Item extra={this.state.manufacturer}>制造商</Item>
						<Item extra={this.state.applicationName}>应用名称</Item>
						<Item extra={this.state.bundleId}>应用Id</Item>
					</List>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
