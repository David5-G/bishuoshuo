import React from 'react';
import { View, Text, Button, Dimensions, TouchableOpacity, WebView, ScrollView, Image, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import Video from 'react-native-video';
export default class Player extends React.Component {
    static navigationOptions = {
        title: 'Player',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'player'}
                    style={{}}
                    leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
                />
                {/* <Video source={{ uri: "Url" }}   // Can be a URL or a localfile.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onEnd={this.onEnd}                      // Callback when playback finishes
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} /> */}

                <Video
                    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ width: 300, height: 300 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
