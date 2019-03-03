import React from 'react'
import { View, Text, Button, WebView, ScrollView, StyleSheet } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import DeviceInfo from 'react-native-device-info'
import { List } from '@ant-design/react-native'
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
				{/* <NavigationBar
					leftButton={<Icon name='md-menu' size={26} color='#fff' onPress={() => navigation.openDrawer()} />}
					rightButton={
						<Image
							style={{ width: 48, height: 22 }}
							source={{
								uri:
									'data:image/png;base64,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'
							}}
						/>
					}
				/> */}
				<Text>about</Text>
				<ScrollView style={{ flex: 1, backgroundColor: '#f5f5f9' }} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
					<List renderHeader={'关于本机'}>
						<Item extra={this.state.brand} >品牌</Item>
						<Item extra={this.state.deviceCountry} >国家</Item>
						<Item extra={this.state.deviceLocale} >语言</Item>
						<Item extra={isIos ? (this.state.freeDiskStorage / (1024 * 1024 * 1024)).toFixed(2) + 'G' : this.state.freeDiskStorage} >可用空间</Item>
						<Item extra={this.state.systemVersion} >系统版本</Item>
						<Item extra={this.state.uniqueId} >uniqueId</Item>
						<Item extra={this.state.isEmulator ? '模拟器' : '真机'} >类型</Item>
						<Item extra={this.state.hasNotch ? '是' : '否'} >Notch</Item>
						<Item extra={this.state.manufacturer} >制造商</Item>
						<Item extra={this.state.applicationName} >应用名称</Item>
						<Item extra={this.state.bundleId} >应用Id</Item>
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
