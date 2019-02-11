import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, Button, View, } from 'react-native';
import Video from 'react-native-video';
export default class VideoPlayer extends Component {
    static navigationOptions = ({ navigation }) => ({ header: null })
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: true,
            paused: true,
            skin: 'embed',
            ignoreSilentSwitch: null,
            isBuffering: false,
            loading: false,
        };
        this.uri = '';
        this.item = this.props.navigation.state.params
        if (this.item === 1) {
            this.uri = 'https://vdse.bdstatic.com//d22da83011d68bf053fe4abac8180555?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//490783c1e42e3b35339fc19e5fb16e32b1a2e6822cd6fb2e3b2a2a11287df34e'
        } else if (this.item === 2) {
            this.uri = 'https://vdse.bdstatic.com//ba4533f324184f110c92925316541e96?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//85e247c30a3255e7fad1deabc212cc833efabbebcae937003b0fc3e06c72809a'
        } else if (this.item === 3) {
            this.uri = 'https://vdse.bdstatic.com//0145f276882e51655abc68e09161863a?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//04533baf944f6e307869e8674b9b712a6bd814d153cce0dfb19ea0cbe44f8104'
        } else {
            this.uri = 'https://vdse.bdstatic.com//0145f276882e51655abc68e09161863a?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//04533baf944f6e307869e8674b9b712a6bd814d153cce0dfb19ea0cbe44f8104'
        }
    }
    componentDidMount() {
        // 快速了解期货
        // https://vdse.bdstatic.com//d22da83011d68bf053fe4abac8180555?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//490783c1e42e3b35339fc19e5fb16e32b1a2e6822cd6fb2e3b2a2a11287df34e
        // 什么是期货
        // https://vdse.bdstatic.com//ba4533f324184f110c92925316541e96?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//85e247c30a3255e7fad1deabc212cc833efabbebcae937003b0fc3e06c72809a
        // 贵金属
        // https://vdse.bdstatic.com//0145f276882e51655abc68e09161863a?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//04533baf944f6e307869e8674b9b712a6bd814d153cce0dfb19ea0cbe44f8104
    }
    onLoad(data) {
        this.setState({loading: false,duration: data.duration });
    }

    onProgress(data) {
        this.setState({ currentTime: data.currentTime });
    }
    onBuffer({ isBuffering }) {
        this.setState({ isBuffering });
    }
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) { return parseFloat(this.state.currentTime) / parseFloat(this.state.duration); } else { return 0; }
    }
    renderSkinControl(skin) {
        const isSelected = this.state.skin == skin;
        const selectControls = skin == 'native' || skin == 'embed';
        return (
            <TouchableOpacity onPress={() => {
                this.setState({
                    controls: selectControls,
                    skin: skin
                })
            }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {skin}
                </Text>
            </TouchableOpacity>
        );
    }
    renderRateControl(rate) {
        const isSelected = (this.state.rate == rate);
        return (
            <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        )
    }
    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode == resizeMode);
        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode: resizeMode }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }
    renderVolumeControl(volume) {
        const isSelected = (this.state.volume == volume);
        return (
            <TouchableOpacity onPress={() => { this.setState({ volume: volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }
    renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
        const isSelected = (this.state.ignoreSilentSwitch == ignoreSilentSwitch);
        return (
            <TouchableOpacity onPress={() => { this.setState({ ignoreSilentSwitch: ignoreSilentSwitch }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>{ignoreSilentSwitch}</Text>
            </TouchableOpacity>
        )
    }
    renderCustomSkin() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.fullScreen} onPress={() => { this.setState({ paused: !this.state.paused }) }}>
                    <Video
                        source={{uri: this.uri}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                        resizeMode={this.state.resizeMode}
                        onLoadStart={() => {this.setState({loading: true})}}
                        onLoad={this.onLoad}
                        onBuffer={this.onBuffer}
                        onProgress={this.onProgress}
                        onEnd={() => {}}
                        repeat={false}
                    />
                </TouchableOpacity>
                <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        <View style={styles.skinControl}>
                            {this.renderSkinControl('custom')}
                            {this.renderSkinControl('native')}
                            {this.renderSkinControl('embed')}
                        </View>
                    </View>
                    <View style={styles.generalControls}>
                        <View style={styles.rateControl}>
                            {this.renderRateControl(0.5)}
                            {this.renderRateControl(1.0)}
                            {this.renderRateControl(2.0)}
                        </View>
                        <View style={styles.volumeControl}>
                            <View>{this.renderVolumeControl(0.5)}</View>
                            <View>{this.renderVolumeControl(1)}</View>
                            <View>{this.renderVolumeControl(1.5)}</View>
                        </View>
                        <View style={styles.resizeModeControl}>
                            {this.renderResizeModeControl('cover')}{this.renderResizeModeControl('contain')}{this.renderResizeModeControl('stretch')}
                        </View>
                    </View>
                    <View style={styles.generalControls}>
                        {(Platform.OS === 'ios') ? <View style={styles.ignoreSilentSwitchControl}>{this.renderIgnoreSilentSwitchControl('ignore')}{this.renderIgnoreSilentSwitchControl('obey')}</View> : null}
                    </View>
                    <View style={styles.trackingControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                        </View>
                    </View>
                </View>
            </View>);
    }
    renderNativeSkin() {
        const videoStyle = this.state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
        return (
            <View style={styles.container}>
                <View style={styles.fullScreen}>
                    {/* <Video
                        source={{uri: this.uri}}
                        style={videoStyle}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                        resizeMode={this.state.resizeMode}
                        onLoadStart={() => {this.setState({loading: true})}}
                        onLoad={this.onLoad}
                        onBuffer={this.onBuffer}
                        onProgress={this.onProgress}
                        onEnd={() => {}}
                        repeat={false}
                        controls={this.state.controls}
                    /> */}
                </View>
                {/* <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        <View style={styles.skinControl}>
                            {this.renderSkinControl('custom')}
                            {this.renderSkinControl('native')}
                            {this.renderSkinControl('embed')}
                        </View>
                    </View>
                    <View style={styles.generalControls}>
                        <View style={styles.rateControl}>
                            {this.renderRateControl(0.5)}
                            {this.renderRateControl(1.0)}
                            {this.renderRateControl(2.0)}
                        </View>
                        <View style={styles.volumeControl}>
                            <View>{this.renderVolumeControl(0.5)}</View>
                            <View>{this.renderVolumeControl(1)}</View>
                            <View>{this.renderVolumeControl(1.5)}</View>
                        </View>
                        <View style={styles.resizeModeControl}>{this.renderResizeModeControl('cover')}{this.renderResizeModeControl('contain')}{this.renderResizeModeControl('stretch')}
                        </View>
                    </View>
                    <View style={styles.generalControls}>
                        {(Platform.OS === 'ios') ? <View style={styles.ignoreSilentSwitchControl}>
                            {this.renderIgnoreSilentSwitchControl('ignore')}{this.renderIgnoreSilentSwitchControl('obey')}</View> : null}
                    </View>
                </View> */}
            </View>);
    }
    render() {
        return this.renderNativeSkin()
        // return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
    }
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 44,
        left: 4,
        right: 4,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc'
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 10,
    },
    skinControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ignoreSilentSwitchControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    nativeVideoControls: {
        top: 184,
        height: 300
    }
});