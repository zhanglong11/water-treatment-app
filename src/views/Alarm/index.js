import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import List from './List';
import HistortyList from './HistortyList';
import Header from '../components/Header';
import Iconfont from '../components/IconBasic';
import TabBasic from '../components/TabBasic';


const Alarm = props => {

    const tabTitle = [
        {title: '报警信息'}, {title: '历史信息'},
    ];

    const goBack = () => {
        props.navigation.goBack();
    };

    const left = <TouchableOpacity  onPress={goBack}><Iconfont name={'jiantou'} size={24} color={'#fff'}/></TouchableOpacity>

    return (<View style={styles.wrapper}>
        <Header left={left} title={'报警信息'}/>
        <TabBasic
            tabs={tabTitle}
        >
            <List navigation={props.navigation}/>
            <HistortyList navigation={props.navigation}/>
        </TabBasic>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F6F7',
    },
    lineStyle: {
        marginBottom: 2,
        backgroundColor: '#fff',
    },
});

export default Alarm;
