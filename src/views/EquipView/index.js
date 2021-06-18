import React,{useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../components/Header';
import Iconfont from '../components/IconBasic';

const EquipView = props => {

    const Right = <TouchableOpacity>
        <Iconfont name={'share'} size={20} color={'#fff'}/>
    </TouchableOpacity>;

    return (<View style={styles.wrapper}>
        <Header title={'设备可视化'} right={Right}/>
        <WebView
            style={styles.webWrapper}
            source={{uri: 'http://10.0.0.10:5000/'}}
        />
    </View>);
};

const styles=StyleSheet.create({
    wrapper:{
        flex:1
    },
    webWrapper:{
        flex:1
    }
})

export default EquipView;

