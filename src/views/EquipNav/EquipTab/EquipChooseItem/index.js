import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler, TouchableOpacity} from 'react-native';
import {Checkbox, Button, Toast} from '@ant-design/react-native';
import Header from '../../../components/Header';
import Iconfont from '../../../components/IconBasic';
import StyleBasic from '../../../components/StyleBasic';

const AgreeItem = Checkbox.AgreeItem;

const EquipChooseItem = props => {
    const {navigation} = props;
    const [listData, setListData] = useState(navigation.getParam('listData'));
    const [id, setId] = useState(navigation.getParam('id'));
    const [detailShow, setDetailShow] = useState(global.detailShowId || {});
    const [checkId, setCheckId] = useState([]);

    useEffect(() => {
        initCheck();
        BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
        };
    }, []);


    const initCheck = () => {
        setCheckId(detailShow[id] || []);
    };

    const onBackAndroid = () => {
        navigation.state.params.refresh();
        return false;
    };

    const goBack = () => {
        navigation.goBack();
        navigation.state.params.refresh();
    };

    const save = () => {
        if (checkId.length) {
            detailShow[id] = checkId;
            global.detailShowId = detailShow;
        }
        Toast.success('保存成功', 1, null, false);
    };

    const changeCheck = (id) => {
        if (checkId.includes(id)) {
            setCheckId(checkId.filter(c => c !== id));
        } else {
            setCheckId([...checkId, id]);
        }
    };

    const allCheck = () => {
        setCheckId(listData.map(l => l.id));
    };
    const unAllCheck = () => {
        setCheckId([]);
    };

    const renderList = () => {
        return listData.length ? listData.map(d => {
            return <View style={styles.list}>
                <AgreeItem
                    checked={checkId.includes(d.id)}
                    onChange={() => {
                        changeCheck(d.id);
                    }}
                >{d.name}</AgreeItem>
            </View>;
        }) : null;
    };

    const left = <TouchableOpacity onPress={goBack}><Iconfont name={'jiantou'} size={24} color={'#fff'}/></TouchableOpacity>

    const right = <TouchableOpacity style={styles.right} onPress={save}>
        <Text style={styles.headerText}>保存</Text>
    </TouchableOpacity>;

    return (<View style={styles.wrapper}>
        <Header left={left} title={'配置'} right={right}/>
        <ScrollView>
            {renderList()}
        </ScrollView>
        <View style={styles.footer}>
            <Button style={styles.btn} onPress={unAllCheck}>取消全选</Button>
            <Button style={styles.btn} onPress={allCheck}>全选</Button>
        </View>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        ...StyleBasic.wrapper,
        position: 'relative',
    },
    list: {
        ...StyleBasic.list,
        flex: 1,
    },
    right: {
        width: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    headerText: {
        fontSize:16,
        color: '#fff',
    },
    footer: {
        bottom: 0,
        flexDirection: 'row',
    },
    btn: {
        width: '50%',
    },
});
export default EquipChooseItem;
