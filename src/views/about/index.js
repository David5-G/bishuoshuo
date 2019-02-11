import React from 'react';
import { Container, Left, Right, Body, Content, List, ListItem, Text, Separator } from 'native-base'
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import DeviceInfo from 'react-native-device-info'


export default class About extends React.Component {
    static navigationOptions = {
        title: 'About',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            // applicationName: DeviceInfo.getApplicationName(),
            // brand: DeviceInfo.getBrand(),
            // bundleId: DeviceInfo.getBundleId(),
            // carrier: DeviceInfo.getCarrier(),
            // deviceCountry: DeviceInfo.getDeviceCountry(),
            // deviceLocale: DeviceInfo.getDeviceLocale(),
            // deviceName: DeviceInfo.getDeviceName(),
            // freeDiskStorage: DeviceInfo.getFreeDiskStorage(),
            // systemName: DeviceInfo.getSystemName(),
            // systemVersion: DeviceInfo.getSystemVersion(),
            // uniqueId: DeviceInfo.getUniqueID(),
            // isEmulator: DeviceInfo.isEmulator(),
            // hasNotch: DeviceInfo.hasNotch(),
            // manufacturer: DeviceInfo.getManufacturer(),
        }
    }
    componentDidMount() {

    }
    componentWillUnmount() {
    }
    render() {
        const { navigation } = this.props
        return (
            <Container>
                <NavigationBar
                    title={'关于'}
                    style={{}}
                    leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
                />
                {/* <Content>
                    <Separator bordered><Text>本机</Text></Separator>
                    <ListItem icon>
                        <Body><Text>品牌</Text></Body>
                        <Right><Text>{this.state.brand}</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>国家</Text></Body>
                        <Right><Text>{this.state.deviceCountry}</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>语言</Text></Body>
                        <Right><Text>{this.state.deviceLocale}</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>可用空间</Text></Body>
                        <Right><Text>{(this.state.freeDiskStorage / (1024 * 1024 * 1024)).toFixed(2)}G</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>系统版本</Text></Body>
                        <Right><Text>{this.state.systemVersion}</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>uniqueId</Text></Body>
                        <Right><Text>{this.state.uniqueId}</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>类型</Text></Body>
                        <Right><Text>{this.state.isEmulator ? '模拟器' : '真机'}</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>Notch</Text></Body>
                        <Right><Text>{this.state.hasNotch ? '是' : '否'}</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>制造商</Text></Body>
                        <Right><Text>{this.state.manufacturer}</Text></Right>
                    </ListItem>
                    <Separator bordered>
                        <Text>应用</Text>
                    </Separator>
                    <ListItem icon>
                        <Body><Text>应用名称</Text></Body>
                        <Right><Text>{this.state.applicationName}</Text></Right>
                    </ListItem>
                    <ListItem icon>
                        <Body><Text>应用Id</Text></Body>
                        <Right><Text>{this.state.bundleId}</Text></Right>
                    </ListItem>
                </Content> */}
            </Container>
        );
    }
}
