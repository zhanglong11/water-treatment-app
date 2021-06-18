import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import {InputItem, Button, Checkbox, Toast} from '@ant-design/react-native';
import StyleBasic from './components/StyleBasic';
import Iconfont from './components/IconBasic';
import * as sysService from '../service/sysService';
import AsyncStorage from '@react-native-community/async-storage';
const Login = props => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456');

    const login =() => {
        if(!username){
            Toast.fail('请输入用户名', 1);
            return;
        }else if(!password){
            Toast.fail('请输入密码', 1);
            return;
        }
        /*sysService.login({username,password}).then(res=>{
            if(res.flag){
                Toast.success('登录成功', 1, null, false);
                 global.token=res.data;
                AsyncStorage.setItem('userName','aaa')
                props.navigation.push('Nav');
             }else{
                 Toast.fail(res.msg, 2);
             }
         })*/
        AsyncStorage.setItem('userName','aaa')
        props.navigation.push('Nav');
    };

    const changeUserName = (val) => {
        setUsername(val);
    };
    const changePassword = val => {
        setPassword(val);
    };

    return (<View style={styles.wrapper}>
        <KeyboardAvoidingView
            behavior='height'
        >
            <View style={styles.imgWrapper}>
                <Image
                    style={styles.img}
                    source={require(`../assets/images/backF.png`)}
                />
            </View>
            <View style={styles.back}>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>登录</Text>
                <View style={styles.inputWrapper}>
                    <Iconfont name={'shouji'} style={styles.icon} size={24} color={'#6983FF'}/>
                    <TextInput
                        style={styles.input}
                        last
                        placeholder={'输入您的用户名/手机号'}
                        value={username}
                        onChangeText={changeUserName}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Iconfont name={'mima'} style={styles.icon} size={24} color={'#6983FF'}/>
                    <TextInput
                        style={styles.input}
                        last
                        placeholder={'输入您的密码'}
                        textContentType={'password'}
                        secureTextEntry
                        value={password}
                        onChangeText={changePassword}
                    />
                </View>
                <View style={styles.forgetWrapper}>
                    <Text style={styles.forgetText}>忘记密码？</Text>
                </View>
                <View style={styles.btnWrapper}>
                    <Button style={styles.btn} type={'primary'} onPress={login}>
                        登录
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        ...StyleBasic.wrapper,
        position: 'relative',
    },
    imgWrapper: {
        height: '40%',
    },
    back: {
        height: '60%',
        backgroundColor: '#eee',
    },
    img: {
        width: '100%',
        height: '100%',
    },

    content: {
        ...StyleBasic.shadow,
        position: 'absolute',
        top: '30%',
        width: '88%',
        backgroundColor: '#fff',
        borderRadius: 16,
        borderColor: '#eee',
        marginLeft: '6%',
        marginRight: '6%',
        paddingVertical: 40,
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 26,
        paddingBottom: 20,
    },
    inputWrapper: {
        position: 'relative',
        paddingBottom: 20,
    },
    icon: {
        position: 'absolute',
        left: 16,
        top: 12,
        zIndex: 2,
    },
    input: {
        borderRadius: 30,
        backgroundColor: '#F4F7FB',
        paddingLeft: 50,
    },
    forgetWrapper: {
        alignItems: 'flex-end',
        paddingBottom: 20,
    },
    forgetText: {
        color: '#8D95B6',
    },
    btnWrapper: {},
    btn: {
        backgroundColor: '#4370DD',
        borderRadius: 30,
    },
});


export default Login;
