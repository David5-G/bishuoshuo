import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from 'native-base'
import { toJS } from 'mobx'
import Swiper from 'react-native-swiper'

import {
	View,
	Alert,
	Image,
	Platform,
	Dimensions,
	AsyncStorage,
	TouchableOpacity,
	StatusBar,
	Text,
	ActivityIndicator,
	FlatList,
	WebView,
	ScrollView,
	StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

import Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'
import { timeago } from '../../utils/times'
import { barHeight, statusBarHeight, isIos, width } from '../../constants/Scale'
import Block from './sub/block.js'
import Coming from './sub/coming.js'
@inject('UserStore','MainStore')
@observer
class Home extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		drawerLabel: '电影',
		drawerIcon: ({ tintColor }) => (
			<Icon
                name='md-menu'
                size={24}
                color='#fff'
            />
		)
	})
	static proptypes = {
		navigation: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
        this.state = {
            loading: false,
            start: 0,
            count: 6,
            active: 1,
        }
        this.initDate = this.initDate.bind(this)
	}
	componentDidMount() {
        this.initDate()
    }
    async initDate() {
        const { loading,start,count } = this.state
        const { MainStore } = this.props
        const { city,apikey } = MainStore
        if (loading) return
        this.setState({loading: true})
        await MainStore.getHotPlay({city,start,count})
        await MainStore.getMouth({city: MainStore.city,apikey})
        this.setState({loading: false})

    }
	render() {
        const { navigation,MainStore } = this.props
        const { subjects,weekJects } = MainStore
        const { active, loading } = this.state
        console.log(toJS(weekJects))
		return (
			<View style={styles.container}>
				<NavigationBar
					leftButton={
						<Icon
							name='md-menu'
							size={26}
                            color='#fff'
							onPress={() => navigation.openDrawer()}
						/>
					}
					rightButton={
                        <Image
                            style={{ width: 48, height: 22}}
							source={{ uri: 'data:image/png;base64,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'
							}}
						/>
					}
				/>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => this.setState({active: 1})} style={[styles.navItem,active===1&&styles.active]}>
                        <Text style={[styles.ft,active===1&&styles.active]}>影院热映</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({active: 2})} style={[styles.navItem,active===2&&styles.active,{marginLeft: 10,}]}>
                        <Text style={[styles.ft,active===2&&styles.active]}>即将上映</Text>
                    </TouchableOpacity>
                </View>
                {
                    active === 1 &&
                    <ScrollView>
                        <Block subjects={subjects} navigation={navigation} />
                        <Block subjects={weekJects} navigation={navigation} />
                    </ScrollView>
                }
                {
                    active === 2 && <Coming />
                    
                }
			</View>
		)
	}
}
export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: Colors.bodyBackground,
        backgroundColor:'#fff',
    },
    nav: {
        marginLeft: 15,flexDirection:'row',borderBottomWidth: 1,borderColor: Colors.borderGray
    },
    navItem: {},
    ft: {fontSize: 19,lineHeight: 47,color: Colors.bodyTextGray},
    active: {
        borderColor: '#111',
        borderBottomWidth: 2,
        color: '#111',
    }
})
