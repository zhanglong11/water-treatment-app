import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import Home from './Home';
import EquipView from './EquipView';
import EquipNav from './EquipNav';
import Mine from './Mine';

const FooterNav = () => {
    const [curKey, setCurKey] = useState('home');

    const renderView = () => {
        switch (curKey) {
            case 'home':
                return <Home />;
            case 'equipView':
                return <EquipView />;
            case 'equipNav':
                return <EquipNav />;
            case 'mine':
                return <Mine />;
            default:
                break;
        }
    };

    return (<View style={styles.wrapper}>
        <View style={styles.content}>
            {renderView()}
        </View>
        <View style={styles.footer}>
            <TouchableOpacity onPress={()=>{setCurKey('home')}}>
                <Text>首页</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setCurKey('equipNav')}}>
                <Text>设备导航</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setCurKey('equipView')}}>
                <Text>设备可视化</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setCurKey('mine')}}>
                <Text>我的</Text>
            </TouchableOpacity>
        </View>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    footer:{
        flexDirection:'row',
        height:50,
    }
});

export default FooterNav;
