import TabBarIcon from '../component/TabBarIcon.js'
import Colors from '../constants/Colors.js'
import React from 'react'
import Home from '../views/home'
import News from '../views/news'

// leftButton={<Eicon.Ionicons style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}

import { StackNavigator, TabNavigator, TabBarBottom, createTabNavigator, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'

const Tab = createBottomTabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				tabBarLabel: '学堂',
				// tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={Platform.OS === 'ios'? `ios-information-circle${focused ? '' : '-outline'}`: 'md-information-circle'} />),
				tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={'md-aperture'} />),
			}
        },
        News: {
			screen: News,
			navigationOptions: {
				tabBarLabel: '234',
				// tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={Platform.OS === 'ios'? `ios-information-circle${focused ? '' : '-outline'}`: 'md-information-circle'} />),
				tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={'md-aperture'} />),
			}
		},
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
	});