import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler, TouchableOpacity} from 'react-native';
import {Checkbox, Button, Toast} from '@ant-design/react-native';
import Header from '../../../components/Header';
import Iconfont from '../../../components/IconBasic';
import StyleBasic from '../../../components/StyleBasic';

const AgreeItem = Checkbox.AgreeItem;

const EquipChooseProject = props => {
    const {navigation} = props;
    const [listData, setListData] = useState(navigation.getParam('listData'));
    const [checkId, setCheckId] = useState(global.projectShowId || []);
    const [sortByName, setSortByName] = useState(global.projectSort || null);

    useEffect(() => {
        initData();
        BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
        };
    }, [sortByName]);

    const onBackAndroid = () => {
        navigation.state.params.refresh();
        return false;
    };

    const goBack = () => {
        navigation.goBack();
        navigation.state.params.refresh();
    };

    const initData = () => {
        console.log(listData)
        if (sortByName) {
            listData.sort((a, b) => {
                return b.projectName.localeCompare(a.projectName);
            });
        } else {
            listData.sort((a, b) => {
                return a.projectName.localeCompare(b.projectName);
            });
        }
        setListData([...listData]);
    };

    const save = () => {
        global.projectShowId = checkId;
        global.projectSort = sortByName;
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
        setCheckId(listData.map(l => l.projectId));
    };
    const unAllCheck = () => {
        setCheckId([]);
    };

    const renderList = () => {
        return listData.length ? listData.map(d => {
            return <View style={styles.list}>
                <AgreeItem
                    checked={checkId.includes(d.projectId)}
                    onChange={() => {
                        changeCheck(d.projectId);
                    }}
                >{d.projectName}</AgreeItem>
            </View>;
        }) : null;
    };

    const left = <TouchableOpacity onPress={goBack}>
        <Iconfont name={'jiantou'} size={24} color={'#fff'}/>
    </TouchableOpacity>;

    const right = <View style={styles.right}>
        <TouchableOpacity onPress={save}>
            <Text style={styles.headerText}>保存</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            setSortByName(!sortByName);
        }}><Iconfont name={'sort_icon'} size={20} color={'#fff'}/></TouchableOpacity>
    </View>;

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
        width: 60,
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
export default EquipChooseProject;
