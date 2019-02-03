import { Dimensions, Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const notch = DeviceInfo.hasNotch()


const NAV_BAR_HEIGHT_IOS = notch ? 60 : 40;
const NAV_BAR_HEIGHT_ANDROID = 50;
const barHeight = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
const statusBarHeight = Platform.OS === 'ios' ? 20 : 0

export {
    width,
    height,
    notch,
    barHeight,
    statusBarHeight,
}