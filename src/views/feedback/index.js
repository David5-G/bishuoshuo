import React from 'react';
import { View, Text, Alert,StyleSheet, ScrollView } from 'react-native'
import { Container, Header, Content, Button as NeButton, Text as NeText, Textarea, Form, Input } from "native-base"
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import Loading from '../common/Loading'
export default class Feedback extends React.Component {
    static navigationOptions = {
        title: 'Feedback',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            userAccount: '',
            loading: false,
        }
    }
    componentDidMount() {
        this.setState({loading: false,text: '',userAccount: ''})
    }
    _feedback() {
        const { text, userAccount, loading } = this.state
        if (loading) return
        if (!text) {
            Alert.alert('请输入反馈内容')
            return
        }
        if (!userAccount) {
            Alert.alert('请输入您的联系方式')
            return
        }
        this.setState({loading: true})
        setTimeout(() => {
            this && this.setState({loading: false,text: '',userAccount: ''})
            Alert.alert('反馈成功')
        },1000)

    }
    render() {
        const { text, userAccount, loading } = this.state
        const { navigation } = this.props

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'用户反馈'}
                    style={{}}
                    leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
                />
                <ScrollView style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Form>
                        <Textarea
                            style={{ borderRadius: 4, backgroundColor: '#fff', lineHeight: 30 }}
                            rowSpan={5}
                            placeholder="多谢您给我们提供宝贵的意见或建议,请留下您的联系方式方便我们反馈给您结果"
                            value={ text }
                            onChangeText={(text) => this.setState({ text })}
                        />
                        <Text style={{ lineHeight: 50, color: Colors.bodyTextGray, textAlign: 'right' }}>字符数须小于200，当前字符数{text.length}</Text>
                        <Input
                            style={{ backgroundColor: "#fff", borderRadius: 4, fontSize: 16 }}
                            placeholder="请输入QQ、微信或者手机号"
                            value={ userAccount }

                            onChangeText={(userAccount) => this.setState({ userAccount })}
                        />
                    </Form>
                    <NeButton onPress={this._feedback.bind(this)} block style={{ marginTop: 30 }}><NeText>提交</NeText></NeButton>
                    <Loading show={loading} text={'反馈中···'} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
});
