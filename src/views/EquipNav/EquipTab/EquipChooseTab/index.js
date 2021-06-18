import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Checkbox, Button} from '@ant-design/react-native';
import Header from '../../../components/Header';
import Iconfont from '../../../components/IconBasic';
import StyleBasic from '../../../components/StyleBasic';

const AgreeItem = Checkbox.AgreeItem;

const EquipChooseProject = props => {
    const {navigation} = props;
    const listData = navigation.getParam('listData');
    const setShowId = navigation.getParam('setShowId');
    const [checkId, setCheckId] = useState(navigation.getParam('showId'));

    const goBack = () => {
        props.navigation.goBack();
    };

    const save = () => {
        if (setShowId) {
            setShowId(checkId);
        }
    };
    const changeCheck = (id) => {
        if (checkId.includes(id)) {
            setCheckId(checkId.filter(c => c !== id));
        } else {
            setCheckId([...checkId, id]);
        }
    };


    const renderList = () => {
        return listData.length ? listData.map(d => {
            return <View style={styles.list}>
                <AgreeItem
                    checked={checkId.includes(d.id)}
                    onChange={() => {
                        changeCheck(d.id);
                    }}
                    disabled={checkId.length === 3 && !checkId.includes(d.id)}
                >{d.name}</AgreeItem>
            </View>;
        }) : null;
    };

    const left = <Iconfont name={'jiantou'} onPress={goBack} size={24} color={'#fff'}/>;

    const right = <View style={styles.right}>
        <Text style={styles.headerText} onPress={save}>保存</Text>
    </View>;

    return (<View style={styles.wrapper}>
        <Header left={left} title={'配置'} right={right}/>
        <ScrollView>
            {renderList()}
        </ScrollView>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        ...StyleBasic.wrapper,
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
        color: '#fff',
    },
});
export default EquipChooseProject;
