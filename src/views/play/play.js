import React, { Component } from 'react'
import { View, ScrollView,Dimensions } from 'react-native'
import { Video } from 'expo'

import NavigationBar from '../common/NavigationBar'
import { Icon as Eicon } from 'expo'
import Colors from '../../constants/Colors'
import LoadingView from '../common/Loading'


const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

const FONT_SIZE = 14
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 5.0 - FONT_SIZE * 2
// static navigationOptions = ({ navigation, screenProps }) => ({
//     title: navigation.state.params.post_title || '详情',
//     header: null,
// })
// constructor(props){
//     super(props)
//     this.state = {}
// }
// componentDidMount() {
// }
// componentWillUnmount() {
// }
// render() {
//     const { params } = this.props.navigation.state
//     const { navigation } = this.props
//     // post_content_filtered

export default class App extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.post_title || '播放',
        header: null,
    })

    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            videoWidth: DEVICE_WIDTH,
            videoHeight: VIDEO_CONTAINER_HEIGHT,

            playlist: [
                { src: 'http://wsiatest.bitballoon.com/videotrack.mp4', name: 'dancers' },
                { src: 'https://mohammadhunan.herokuapp.com/coding.mp4', name: 'portfolio' },
                { src: 'http://www.html5videoplayer.net/videos/toystory.mp4', name: 'toys' }
            ]
        }
    }
    videoUpdated(playbackStatus) {

        console.log(`videoUpdated-->${playbackStatus}`)
        if (playbackStatus['didJustFinish']) {
            this.playNext();
        }
        if (playbackStatus.isLoaded) {

            // this.setState({
            //     playbackInstancePosition: playbackStatus.positionMillis,
            //     playbackInstanceDuration: playbackStatus.durationMillis,
            //     shouldPlay: playbackStatus.shouldPlay,
            //     isPlaying: playbackStatus.isPlaying,
            //     isBuffering: playbackStatus.isBuffering,
            //     rate: playbackStatus.rate,
            //     muted: playbackStatus.isMuted,
            //     volume: playbackStatus.volume,
            //     loopingType: playbackStatus.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
            //     shouldCorrectPitch: playbackStatus.shouldCorrectPitch,
            // });
            // if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            //     this._advanceIndex(true);
            //     this._updatePlaybackInstanceForIndex(true);
            // }
        } else {
            if (playbackStatus.error) {
                console.log(`FATAL PLAYER ERROR: ${playbackStatus.error}`);
            }
        }
    }
    playNext() {
        // playNext() method takes the first item in the this.state.playlist array and moves it to the back
        console.log('video did just finish');
        let playlist = this.state.playlist;
        let temp = playlist[0];
        playlist.shift();
        playlist.push(temp);
        this.setState({ playlist, })
    }
    _onLoadStart() {
        this.setState({ loading: true })
        console.log(`_onLoadStart :`);
    }
    _onLoad (status) {
        this.setState({ loading: false })
        console.log(`_onLoad : ${JSON.stringify(status)}`);
    };
    _onError (error) {
        console.log(`_onError : ${error}`);
    };
    _onReadyForDisplay (event) { //让视频自动适配播放尺寸
        const widestHeight = DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width;
        if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
            this.setState({
                videoWidth: VIDEO_CONTAINER_HEIGHT * event.naturalSize.width / event.naturalSize.height,
                videoHeight: VIDEO_CONTAINER_HEIGHT,
            });
        } else {
            this.setState({
                videoWidth: DEVICE_WIDTH,
                videoHeight: DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width,
            });
        }
    };
    render() {
        const { loading, videoWidth, videoHeight} = this.state
        const { navigation } = this.props
        const { params: playUrl } = navigation.state
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    title={playUrl}
                    style={{}}
                    leftButton={<Eicon.Ionicons style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
                />
                {/* <LoadingView show={loading} /> */}
                <Video
                    style={{ flex: 1, bckgroundColor: 'red' }}
                    onPlaybackStatusUpdate={(playbackStatus) => this.videoUpdated(playbackStatus)}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    onLoadStart={this._onLoadStart.bind(this)}
                    onLoad={this._onLoad.bind(this)}
                    onError={this._onError.bind(this)}
                    source={{ uri: playUrl }}
                    useNativeControls
                    onReadyForDisplay={this._onReadyForDisplay.bind(this)}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    style={{maxWidth: DEVICE_WIDTH, width: videoWidth,height: videoHeight, }}
                />
            </View>
        );
    }
}
