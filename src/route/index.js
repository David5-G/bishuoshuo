import React from 'react'
import TabBarIcon from '../views/common/TabBarIcon'
import Colors from '../constants/Colors'
import Home from '../views/home'
import HomeList from '../views/home/list'
import Icon from 'react-native-vector-icons/Ionicons'

import Login from '../views/login'
import Regist from '../views/regist'
import Findback from '../views/findback'
import Drawer from '../views/drawer'
import Book from '../views/book'
import Game from '../views/game'
import Team from '../views/team'
import Program from '../views/program'
import Music from '../views/music'
import MusicList from '../views/music/list.js'

/* detail */
import MovieDetail from '../views/home/detail.js'
import BookDetail from '../views/book/detail.js'
import GameDetail from '../views/game/detail.js'
import TeamDetail from '../views/team/detail.js'
import MusicDetail from '../views/music/detail.js'

import Search from '../views/search'

import About from '../views/about'

import {
	StackNavigator,
	DrawerNavigator,
	TabNavigator,
	TabBarBottom,
	createTabNavigator,
    createStackNavigator,
    createDrawerNavigator,
	createBottomTabNavigator,
	createAppContainer
} from 'react-navigation'

const SimpleAppNavigator = createDrawerNavigator(
	{
        Home,
        Book,
        Game,
        Team,
        Program,
        Music,
        
	}, 
	{
		initialRouteName: 'Home',
		contentComponent: Drawer,
		// contentOptions
		// order,
		drawerWidth: 300,
		swipeEnabled: true,
		animationEnabled: true,
		lazy: false,
		tabBarPosition: 'bottom'
	}
)
export default createStackNavigator(
	{
		// You could add another route here for authentication.
		// Read more at https://reactnavigation.org/docs/en/auth-flow.html

		Main: {
			screen: SimpleAppNavigator,
			navigationOptions: {
				header: null,
				headerStyle: {
					backgroundColor: 'rgba(0,0,0,0.2)'
				}
			}
        },
		Login,
		Regist,
        Findback,
        About,
        
        
        MovieDetail,
        BookDetail,
        GameDetail,
        TeamDetail,
        HomeList,
        MusicList,
        MusicDetail,
        Search,
	},
	{
		initialRouteName: 'Main', //默认页面，可不写
		mode: 'card', // card modal 使屏幕从底部滑入，这是一种常见的iOS模式。只适用于iOS，对Android没有影响
		headerMode: 'screen', // float - 在屏幕更改时渲染保留在顶部的单个标题和动画。这是iOS上的常见效果。
		// screen - 每个屏幕都附有一个标题，标题与屏幕一起淡入和淡出。这是Android上的常见效果。
		// none - 不会显示标题。
		transitionConfig() {
			return {
				// transitionSpec: {
				// 	duration: 200,
				// 	easing: Easing.out(Easing.poly(4)),
				// 	timing: Animated.timing,
				// 	useNativeDriver: true,
				// },
				// screenInterpolator: sceneProps => {
				// 	const { layout, position, scene } = sceneProps
				// 	const thisSceneIndex = scene.index
				// 	const width = layout.initWidth
				// 	const translateX = position.interpolate({
				// 		inputRange: [thisSceneIndex - 1, thisSceneIndex],
				// 		outputRange: [width, 0],
				// 	})
				// 	return { transform: [{ translateX }] }
				// },
			}
		},
		navigationOptions: {
			headerTitleStyle: {}, // - 标题组件的样式
			headerBackTitleStyle: {},
			headerTintColor: '' //标题组件的颜色，文字包括返回箭头
			//title: 'tab...', // 可用作的headerBackTitle的标题。此外，将用作tabBarLabel（如果嵌套在TabNavigator中）或drawerLabel（如果嵌套在DrawerNavigator中）的回退标题
			//header: (allowFontScaling, style, children) => (<Text>custom header</Text>), //是否显示 header null, 如果函数返回react组件 header即为该组件
		}
	}
)
