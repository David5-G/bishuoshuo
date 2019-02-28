/**
 * NavigationBar
 * 
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    StatusBar,
    Text,
    Dimensions,
    View
} from 'react-native'
import Colors from '../../constants/Colors'
import { width, barHeight, notch, statusBarHeight } from '../../constants/Scale'
import LinearGradient from 'react-native-linear-gradient';

const StatusBarShape = {
    // barStyle: PropTypes.oneOf(['light-content', 'default',]),
    // hidden: PropTypes.bool,
    // backgroundColor: PropTypes.string,
};

export default class NavigationBar extends Component {
    static propTypes = {
        // style: PropTypes.style,
        title: PropTypes.string,
        //     titleView: PropTypes.element,
        //     titleLayoutStyle:View.propTypes.style,
        hide: PropTypes.bool,
        //     statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,

    }
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false
        };
    }

    getButtonElement(data) {
        return (
            <View style={styles.navBarButton}>
                {data ? data : null}
            </View>
        );
    }
    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View> : null;

        let titleView = this.props.titleView ? this.props.titleView : <Text ellipsizeMode="head" ellipsizeMode="tail" numberOfLines={1} style={[styles.title, this.props.style || null]}>{this.props.title}</Text>;

        let content = (
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
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
        width,
        
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: barHeight,
        paddingLeft: 15,paddingRight: 15,
    },
    navBarTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    title: {
        fontSize: 20,
        color: Colors.headerText,
        marginTop: notch ? 20 : 0,
    },
    navBarButton: {
        alignItems: 'center',
        marginTop: notch ? 20 : 0,
    },
    statusBar: {
        height: statusBarHeight,
    },
})
