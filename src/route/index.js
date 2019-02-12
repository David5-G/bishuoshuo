import React from 'react'
import { Text, Platform,Animated,Easing } from 'react-native'
import TabBarIcon from '../component/TabBarIcon'
import Colors from '../constants/Colors'
import Home from '../views/home'
import News from '../views/news'
// import Cycle from '../views/cycle'
import Cycle from '../views/finance'
import Quota from '../views/quota'
import Mine from '../views/mine'
import Chart from '../views/chart'
// import Play from '../views/play'
// import PlayVideo from '../views/play/play.js'
import Player from '../views/teach/player.js'


import Login from '../views/login'
import Regist from '../views/regist'
import Findback from '../views/findback'
import Service from '../views/service'
import NewsDetail from '../views/newsDetail'
import WallDetail from '../views/wallDetail'
import Feedback from '../views/feedback'
import Userinfo from '../views/userinfo'
import About from '../views/about'
import Teach from '../views/teach'

import Watch from '../views/collection/watch'
import Collect from '../views/collection/collect'
// import Account from '../views/account'
// leftButton={<Eicon.Ionicons style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}

import { StackNavigator, TabNavigator, TabBarBottom, createTabNavigator, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'

const Tab = createBottomTabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				tabBarLabel: '首页',
				// tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={Platform.OS === 'ios'? `ios-information-circle${focused ? '' : '-outline'}`: 'md-information-circle'} />),
				tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={'ios-switch'} />),
			}
		},

		Cycle: {
			screen: Cycle,
			navigationOptions: {
				tabBarLabel: '财经',
				tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={'ios-today'} />),
			}
		},
		Quota: {
			screen: Quota,
			navigationOptions: {
				tabBarLabel: '波动',
				tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={'ios-pulse'} />),
			}
		},
		Mine: {
			screen: Mine,
			navigationOptions: {
				tabBarLabel: '更多',
				tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={'md-keypad'} />),
			}
		},
	},
	{
		initialRouteName: 'Home', //第一次加载时初始选项卡路由的routeName
		order: ['Home', 'Quota', 'Cycle', 'Mine'], //定义选项卡顺序的routeNames数组
		backBehavior: 'initialRoute', //后退按钮是否会导致标签切换到初始路由？如果是，则设置为initialRoute，否则none。默认为initialRoute。
		//tabBarComponent: null, //Options，覆盖用作标签栏的组件。
		tabBarOptions: {
			activeTintColor: Colors.bodyTextActive, // - 活动选项卡的标签和图标颜色。(选中的文字颜色)
			// activeBackgroundColor: '', // - 活动选项卡的背景颜色。(选中)
			// inactiveTintColor: '', // - 非活动选项卡的标签和图标颜色。(未选中)
			// inactiveBackgroundColor: '', // - 非活动选项卡的背景颜色。(未选中)
			// showLabel: '', // - 是否显示标签，默认为true。
			// style: '', // - 标签栏的样式。
			// labelStyle: '', // - 标签栏文字的样式, 文字的样式
			// tabStyle: '', // - 选项卡的样式。
			// allowFontScaling: '', // - 标题字体是否应该缩放以遵循系统设置。默认值为true。
		},
		navigationOptions: {
			title: 'test...', // - 通用标题可以用作headerTitle和tabBarLabel。
			tabBarVisible: '', // - 显示或隐藏底部标签栏，默认为true，不隐藏。
			//tabBarIcon: , // - React Element或给定{focused：boolean，tintColor：string}的函数返回一个React.Node，用来显示在标签栏中。
			tabBarLabel: 'text...', // - 接收字符串、React Element或者给定{focused：boolean，tintColor：string}的函数返回一个React.Node，用来显示在标签栏中。如果未定义，会使用title作为默认值。如果想要隐藏，可以参考上面的tabBarOptions.showLabel。
			// tabBarOnPress: (obj) => {}, // - 标签栏点击事件回调，接受一个对象，其中包含如下：
		}
	})


export default createStackNavigator(
	{
		// You could add another route here for authentication.
		// Read more at https://reactnavigation.org/docs/en/auth-flow.html

		Main: {
			screen: Tab,
			navigationOptions: { // 针对tab header 等的设置在这里配置
				header: null,
				headerStyle: {
					backgroundColor: 'rgba(0,0,0,0.2)'
				},
			}
		},

		NewsDetail, //查看资讯详情
		Login,
		Regist,
		Findback,
		Service,
		WallDetail,
		Feedback,
		Userinfo,
		About,
		Chart,
		Teach,
		Player,


		Watch,
		Collect,
		// PlayVideo: PlayVideo,
		// Play: Play,
		// Account: Account,
	}, {
		initialRouteName: 'Main', //默认页面，可不写
		mode: 'card', // card modal 使屏幕从底部滑入，这是一种常见的iOS模式。只适用于iOS，对Android没有影响
		headerMode: 'screen', // float - 在屏幕更改时渲染保留在顶部的单个标题和动画。这是iOS上的常见效果。
		// screen - 每个屏幕都附有一个标题，标题与屏幕一起淡入和淡出。这是Android上的常见效果。
		// none - 不会显示标题。
		transitionConfig() {
			return {
				transitionSpec: {
					duration: 200,
					easing: Easing.out(Easing.poly(4)),
					timing: Animated.timing,
					useNativeDriver: true,
				},
				screenInterpolator: sceneProps => {
					const { layout, position, scene } = sceneProps

					const thisSceneIndex = scene.index
					const width = layout.initWidth

					const translateX = position.interpolate({
						inputRange: [thisSceneIndex - 1, thisSceneIndex],
						outputRange: [width, 0],
					})

					return { transform: [{ translateX }] }
				},
			}
		},
		navigationOptions: {
			headerTitleStyle: {}, // - 标题组件的样式
			headerBackTitleStyle: {},
			headerTintColor: '', //标题组件的颜色，文字包括返回箭头
			//title: 'tab...', // 可用作的headerBackTitle的标题。此外，将用作tabBarLabel（如果嵌套在TabNavigator中）或drawerLabel（如果嵌套在DrawerNavigator中）的回退标题
			//header: (allowFontScaling, style, children) => (<Text>custom header</Text>), //是否显示 header null, 如果函数返回react组件 header即为该组件
		}
	});