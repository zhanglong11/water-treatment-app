import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import Iconfont from '../../components/IconBasic';
import {TextareaItem, WingBlank, Button} from '@ant-design/react-native';
import * as sysService from '../../../service/sysService';
import {Toast} from '@ant-design/react-native';

const AlarmInfo = props => {
    const {navigation} = props;
    const id = navigation.getParam('id');
    const isHis = navigation.getParam('isHis');
    const [data, setData] = useState({});
    const [remark, setRemark] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        sysService.alarmInfo({id}, {}).then(res => {
            if (!res.flag) {
                return;
            }
            setData(res.data);
            setRemark(res.data.remark);
        });
    };

    const alarmConfirm = () => {
        sysService.alarmConfirm({id}, {}).then(res => {
            if (!res.flag) {
                Toast.fail(res.msg);
                return;
            }
            Toast.success(res.msg);
        });
    };

    const goBack = () => {
        props.navigation.goBack();
    };

    const left = <TouchableOpacity><Iconfont name={'jiantou'} onPress={goBack} size={24}
                                             color={'#fff'}/></TouchableOpacity>;

    return (<View style={styles.wrapper}>
        <Header left={left} title={'报警详情'}/>
        <ScrollView>
            <View style={styles.item}>
                <Text style={styles.title}>报警时间</Text>
                <Text style={styles.brief}>{data.alertTime || ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.title}>报警名称</Text>
                <Text style={styles.brief}>{data.alertName || ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.title}>报警来源</Text>
                <Text style={styles.brief}>{data.alertAttr || ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.title}>报警来源属性</Text>
                <Text style={styles.brief}>{data.tt || ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.title}>报警详情</Text>
                <Text style={styles.brief}>{data.alertDetail || ''}</Text>
            </View>
            <View style={styles.remarkWrapper}>
                <Text>报警确认备注</Text>
                <TextareaItem rows={5} last style={styles.textarea} editable={!isHis} value={remark} onChange={val => {
                    setRemark(val);
                }}/>
            </View>

            {isHis ? null : <TouchableOpacity style={styles.btnWrapper} onPress={alarmConfirm}>
                <Button style={styles.btn} activeStyle={styles.activeBtn} type="warning">
                    确认报警信息
                </Button>
            </TouchableOpacity>}
        </ScrollView>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#C7CDDF',
        alignItems: 'center',
    },
    title: {},
    brief: {
        maxWidth: '80%',
        color: '#bbb',
    },
    remarkWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 14,
        backgroundColor: '#fff',
    },
    textarea: {
        marginTop: 6,
        backgroundColor: '#EFEFEF',
        borderRadius: 5,
        borderWidth: 0,
    },
    btnWrapper: {
        paddingHorizontal: 10,
    },
    btn: {
        backgroundColor: '#132E7D',
        borderWidth: 0,
        borderRadius: 6,
    },
    activeBtn: {
        backgroundColor: '#132E7D',
    },
});

export default AlarmInfo;
