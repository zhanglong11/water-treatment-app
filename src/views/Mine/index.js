import React, {useState,useEffect,useMemo} from 'react';
import {View, Text, StyleSheet, Image, Alert, Switch,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {WingBlank,Button} from '@ant-design/react-native';
import Iconfont from '../components/IconBasic';
import CommonCss from'../Common/commonCss'
import * as sysService from '../../service/sysService';

const Mine =  (props) => {
    const [isBell, setBell] = useState(false);
    const [isAuto, setAuto] = useState(false);
    const [avatarUri,setAvatarUri]=useState('');
    const [userName,setUserName]=useState('');
    const [data,setData]=useState({});
    const logout = () => {
        props.navigation.navigate('Login');
    };
    const navigationTo = (navigation, name) => {
        props.navigation.push(navigation, {name});
    };
    const handleBellChange=()=>{
        setBell(!isBell);
        AsyncStorage.setItem('isBell',`${!isBell}`)
    }
    const handleAutoChange=()=>{
        setAuto(!isAuto);
        AsyncStorage.setItem('isAuto',`${!isAuto}`)
    };
    useEffect( ()=>{
        AsyncStorage.getItem('userName').then(res=>setUserName(res))
        AsyncStorage.getItem('isBell').then(res=> {
                setBell(res === "true")
        })
        AsyncStorage.getItem('isAuto').then(res=> {
            setAuto(res === "true")
        })
        setAvatarUri('http://b-ssl.duitang.com/uploads/item/201511/27/20151127114941_2ZBeA.jpeg')
    },[])
    return <View style={styles.wrapper}>
        <View style={styles.title}>
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    //source={require('../../assets/images/backTh.png')}
                    source={{uri:avatarUri}}
                />
                <View>
                    <Text style={[styles.name,styles.fontRed]}>
                        {userName}
                    </Text>
                    <TouchableOpacity onPress={() => navigationTo('UserInformation', '个人信息')}>
                        <Text style={[styles.name, {marginTop: 5, color: '#9D9D9D', fontSize: 14}]}>
                            查看详情<Iconfont name={'arrow'} size={14} color={'#9D9D9D'}/>
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', top: 5, right: 5}}>
                    <TouchableOpacity onPress={() => props.navigation.push('Alarm')}>
                        <Text>
                            <Iconfont name={'bell'} size={20} color={'#fff'}/>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.list}>
            <View style={[styles.item,styles.borderBottom]}>
                <View style={styles.content}>
                    <Text style={styles.itemTitle}>
                        故障提醒发送
                    </Text>
                    <Text style={styles.brief}>
                        关闭打开请在系统设置-通知中操作
                    </Text>
                </View>
                <View style={styles.extra}>
                    <Switch
                        trackColor={{false: '#D2D2D2', true: '#A8B1CF'}}
                        value={isBell}
                        onValueChange={handleBellChange}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => navigationTo('Share', '分享')}>
                <View style={[styles.item,styles.borderBottom]}>
                    <View style={styles.content}>
                        <Text style={styles.itemTitle}>
                            关注分享
                        </Text>
                    </View>
                    <View style={styles.extra}>
                        <Iconfont name={'arrow'} size={20}/>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigationTo('SuggestReport', '意见反馈')}>
                <View style={[styles.item,styles.borderBottom]}>
                    <View style={styles.content}>
                        <Text style={styles.itemTitle}>
                            意见反馈
                        </Text>
                    </View>
                    <View style={styles.extra}>
                        <Iconfont name={'arrow'} size={20}/>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={[styles.item,styles.borderBottom]}>
                <View style={styles.content}>
                    <Text style={styles.itemTitle}>
                        设备参数自动刷新
                    </Text>
                </View>
                <View style={styles.extra}>
                    <Switch
                        trackColor={{false: '#D2D2D2', true: '#A8B1CF'}}
                        value={isAuto}
                        onValueChange={handleAutoChange}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => navigationTo('Update', '更新')}>
                <View style={[styles.item,styles.borderBottom]}>
                    <View style={styles.content}>
                        <Text style={styles.itemTitle}>
                            版本更新
                        </Text>
                    </View>
                    <View style={styles.extra}>
                        <Iconfont name={'arrow'} size={20}/>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigationTo('About', '关于我们')}>
                <View style={styles.item}>
                    <View style={styles.content}>
                        <Text style={styles.itemTitle}>
                            关于我们
                        </Text>
                    </View>
                    <View style={styles.extra}>
                        <Iconfont name={'arrow'} size={20}/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.btnWrapper}>
            <WingBlank  style={{paddingHorizontal:10}}>
                <Button style={styles.btn} activeStyle={styles.activeBtn} type="warning" onPress={logout}>
                    退出登录
                </Button>
            </WingBlank>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        position: 'relative',
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#132E7D',
        padding: 10,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    name: {
        marginLeft: 16,
        color: '#fff',
        fontSize: 20,
    },
    list: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 14,
        backgroundColor: '#fff',
    },
    borderBottom:{
        borderBottomWidth: 1,
        borderBottomColor: '#C7CDDF',
    },

    content: {
        paddingLeft: 4,
    },
    itemTitle: {
        fontSize: 16,
    },
    brief: {
        marginTop: 4,
        fontSize: 14,
        color: '#bbb',
    },
    btnWrapper: {
        position: 'absolute',
        width: '100%',
        bottom: 20,
    },
    btn: {
        backgroundColor: '#132E7D',
        borderWidth: 0,
        borderRadius: 6,
    },
    activeBtn: {
        backgroundColor: '#132E7D',
    },
    btnText: {
        color: '#fff',
    },
});

export default Mine;
